import { db } from "../../../../core";
import SQLError from "../../../../shared/models/SQLError.model";
import Sanction from "./sanctions.model";

/**
 * Insert New Sanction
 * @param from
 * @param to
 * @param publish_date
 * @param recommendation
 * @param period
 * @param dabet_id
 * @returns Operation Result || Error Object
 */
export function insertOne(
  type_id: number,
  decision_id: number,
  crime_date: Date,
  evidance_date: Date,
  description: string,
  dabet_id: number,
  absence_from?: Date,
  absence_to?: Date,
  imprisoned_from?: Date,
  imprisoned_to?: Date
) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let inst = await trx<Sanction>("sanction").insert({
          type_id,
          decision_id,
          crime_date,
          evidance_date,
          description,
          dabet_id,
        });

        if (
          (absence_from == undefined || absence_from == null) &&
          (absence_to == undefined || absence_to == null) &&
          (imprisoned_from == undefined || imprisoned_from == null) &&
          (imprisoned_to == undefined || imprisoned_to == null)
        )
          return inst;

        const Sanction = await trx("sanction")
          .select("*")
          .where({ type_id, description, dabet_id })
          .first();

        let queries: any[] = [];
        if (
          !(absence_from == undefined || absence_from == null) &&
          !(absence_to == undefined || absence_to == null)
        ) {
          queries.push(
            db("absence_sanction")
              .insert({
                sanction_id: Sanction.id,
                absence_from,
                absence_to,
              })
              .transacting(trx)
          );
        }

        if (
          !(imprisoned_from == undefined || imprisoned_from == null) &&
          !(imprisoned_to == undefined || imprisoned_to == null)
        ) {
          queries.push(
            db("imprisoned_sanction")
              .insert({
                sanction_id: Sanction.id,
                imprisoned_from,
                imprisoned_to,
              })
              .transacting(trx)
          );
        }

        return Promise.all(queries).then(trx.commit).catch(trx.rollback);
      })
      .then(function (values) {
        resolve(values);
      })
      .catch(function (error: SQLError | any) {
        reject(error);
      });
  });
}

/**
 * Insert Many Sanctiont
 * @param Sanctions Array Of Sanctiont
 * @returns
 */
export function insertMany(Sanctions: any) {
  return new Promise(async (resolve, reject) => {
    await db<Sanction>("sanction")
      .insert(Sanctions)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Sanction By its id
 * @param id Sanction ID
 * @returns Sanction Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Sanction>("sanction as S")
      .leftJoin("crime_type as CT", "CT.id", "S.type_id")
      .leftJoin("crime_sanctions as CS", "CS.id", "S.decision_id")
      .leftJoin("absence_sanction as AS", "AS.sanction_id", "S.id")
      .leftJoin("imprisoned_sanction as IS", "IS.sanction_id", "S.id")
      .select(
        "S.*",
        "AS.absence_from as absence_from",
        "AS.absence_to as absence_to",
        "IS.imprisoned_from as imprisoned_from",
        "IS.imprisoned_to as imprisoned_to",
        "CT.name as type_name",
        "CS.name as decision_name"
      )
      .where({ "S.id": id })
      .first()
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Sanctions By Dabet ID
 * @returns Array of All Sanctions || Error Object
 */
export function findByDabet(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Sanction>("sanction as S")
      .leftJoin("crime_type as CT", "CT.id", "S.type_id")
      .leftJoin("crime_sanctions as CS", "CS.id", "S.decision_id")
      .leftJoin("absence_sanction as AS", "AS.sanction_id", "S.id")
      .leftJoin("imprisoned_sanction as IS", "IS.sanction_id", "S.id")
      .select(
        "S.*",
        "AS.absence_from as absence_from",
        "AS.absence_to as absence_to",
        "IS.imprisoned_from as imprisoned_from",
        "IS.imprisoned_to as imprisoned_to",
        "CT.name as type_name",
        "CS.name as decision_name"
      )
      .where({ dabet_id: id })
      .orderBy(["id", "crime_date", "type_id"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Sanctions
 * @returns Array of All Sanctions || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Sanction>("sanction as S")
      .leftJoin("crime_type as CT", "CT.id", "S.type_id")
      .leftJoin("crime_sanctions as CS", "CS.id", "S.decision_id")
      .leftJoin("absence_sanction as AS", "AS.sanction_id", "S.id")
      .leftJoin("imprisoned_sanction as IS", "IS.sanction_id", "S.id")
      .select(
        "S.*",
        "AS.absence_from as absence_from",
        "AS.absence_to as absence_to",
        "IS.imprisoned_from as imprisoned_from",
        "IS.imprisoned_to as imprisoned_to",
        "CT.name as type_name",
        "CS.name as decision_name"
      )
      .orderBy(["id", "crime_date", "type_id"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Update Sanction
 * @param id Sanction ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateSanction(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let {
          absence_from,
          absence_to,
          imprisoned_from,
          imprisoned_to,
          ...rest
        } = data;

        let queries: any[] = [
          db<Sanction>("sanction")
            .where({ id })
            .first()
            .update(rest)
            .transacting(trx),
        ];

        let isAdded = await db("imprisoned_sanction").select("*").where({ sanction_id: id });
        if(isAdded.length == 0 && imprisoned_from && imprisoned_to ){
          queries.push(
            db("imprisoned_sanction")
            .insert({ sanction_id: id, imprisoned_from, imprisoned_to })
            .transacting(trx),
          )
        }else{
          queries.push(
            db("imprisoned_sanction")
            .where({ sanction_id: id })
            .first()
            .update({ imprisoned_from, imprisoned_to })
            .transacting(trx),
          )
        }

        isAdded = await db("absence_sanction").select("*").where({ sanction_id: id });
        if(isAdded.length == 0 && absence_from && absence_to){
          queries.push(
            db("absence_sanction")
            .insert({ sanction_id: id, absence_from, absence_to })
            .transacting(trx),
          )
        }else{
          queries.push(
            db("absence_sanction")
            .where({ sanction_id: id })
            .first()
            .update({ absence_from, absence_to })
            .transacting(trx),
          )
        }

        return Promise.all(queries).then(trx.commit).catch(trx.rollback);
      })
      .then(function (values) {
        resolve(values);
      })
      .catch(function (error: SQLError | any) {
        reject(error);
      });
  });
}

/**
 * Delete Sanction
 * @param id Sanction ID
 * @returns Operation Result || Error Object
 */
export function deleteSanction(id: number) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let queries: any[] = [
          db("imprisoned_sanction")
            .where({ sanction_id: id })
            .first()
            .delete()
            .transacting(trx),
          db("absence_sanction")
            .where({ sanction_id: id })
            .first()
            .delete()
            .transacting(trx),
          db<Sanction>("sanction")
            .where({ id })
            .first()
            .delete()
            .transacting(trx),
        ];

        return Promise.all(queries).then(trx.commit).catch(trx.rollback);
      })
      .then(function (values) {
        resolve(values);
      })
      .catch(function (error: SQLError | any) {
        reject(error);
      });
  });
}
