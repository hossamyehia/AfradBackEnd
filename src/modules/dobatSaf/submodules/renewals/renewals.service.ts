import { db } from "../../../../core";
import SQLError from "../../../../shared/models/SQLError.model";
import Renewal from "./renewals.model";

/**
 * Insert New Renewal
 * @param from
 * @param to
 * @param publish_date
 * @param recommendation
 * @param period
 * @param dabet_id
 * @returns Operation Result || Error Object
 */
export function insertOne(
  from: Date,
  to: Date,
  publish_date: Date,
  recommendation: boolean,
  period: boolean,
  dabet_id: number,
  reason?: string
) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let inst = await trx<Renewal>("renewal")
          .insert({
            from,
            to,
            publish_date,
            recommendation,
            period,
            dabet_id,
          })
          .onConflict(["dabet_id", "period"])
          .merge();

        if (reason == undefined || reason == null) return inst;

        const renewal = await trx("renewal")
          .select("*")
          .where({ period, dabet_id })
          .first();

        let queries: any[] = [
          db("renewal_reason")
            .insert({
              renewal_id: renewal.id,
              reason,
            })
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

/**
 * Insert Many Renewalt
 * @param Renewals Array Of Renewalt
 * @returns
 */
export function insertMany(Renewals: any) {
  return new Promise(async (resolve, reject) => {
    await db<Renewal>("renewal")
      .insert(Renewals)
      .onConflict(["dabet_id", "period"])
      .merge()
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Renewal By its id
 * @param id Renewal ID
 * @returns Renewal Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Renewal>("renewal as R")
      .leftJoin("renewal_reason as RR", "RR.renewal_id", "R.id")
      .select("R.*", "RR.reason as reason")
      .where({ "R.id": id })
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
 * Find Renewals By Dabet ID
 * @returns Array of All Renewals || Error Object
 */
export function findByDabet(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Renewal>("renewal as R")
      .leftJoin("renewal_reason as RR", "RR.renewal_id", "R.id")
      .select("R.*", "RR.reason as reason")
      .where({ dabet_id: id })
      .orderBy(["id", "period", "publish_date"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Renewals
 * @returns Array of All Renewals || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Renewal>("renewal as R")
      .leftJoin("renewal_reason as RR", "RR.renewal_id", "R.id")
      .select("R.*", "RR.reason as reason")
      .orderBy(["id", "period", "publish_date"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Update Renewal
 * @param id Renewal ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateRenewal(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let { reason, ...rest } = data;

        let queries: any[] = [
          db<Renewal>("renewal")
            .where({ id })
            .first()
            .update(rest)
            .transacting(trx),
          db("renewal_reason")
            .where({ renewal_id: id })
            .first()
            .update({ reason })
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

/**
 * Delete Renewal
 * @param id Renewal ID
 * @returns Operation Result || Error Object
 */
export function deleteRenewal(id: number) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let queries: any[] = [
          db("renewal_reason")
            .where({ renewal_id: id })
            .first()
            .delete()
            .transacting(trx),
          db<Renewal>("renewal")
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
