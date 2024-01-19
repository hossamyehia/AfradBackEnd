import { db } from "../../../../core";
import SQLError from "../../../../shared/models/SQLError.model";
import Transportations from "./transportations.model";

/**
 * Insert New Transportation
 * @param approval_number 
 * @param approval_date 
 * @param from_id 
 * @param to_id 
 * @param done_date 
 * @param selah_id 
 * @param dabet_id 
 * @returns Operation Result || Error Object
 */
export function insertOne(
  approval_number: string,
  approval_date: Date,
  from_id: number,
  to_id: number,
  done_date: Date,
  selah_id: number,
  dabet_id: number
) {
  return new Promise(async (resolve, reject) => {
    await db<Transportations>("transportations")
      .insert({
        approval_number,
        approval_date,
        from_id,
        to_id,
        done_date,
        selah_id,
        dabet_id,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Insert Many Transportationst
 * @param Transportations Array Of Transportationst
 * @returns
 */
export function insertMany(Transportations: any) {
  return new Promise(async (resolve, reject) => {
    await db<Transportations>("transportations")
      .insert(Transportations)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Transportation By its id
 * @param id Transportation ID
 * @returns Transportation Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Transportations>("transportations AS T")
      .leftJoin("wehda AS FW", "FW.id", "T.from_id")
      .leftJoin("wehda AS TW", "TW.id", "T.to_id")
      .leftJoin("selah AS S", "S.id", "T.selah_id")
      .select(
        "T.*",
        "FW.name as from_name",
        "TW.name as to_name",
        "S.name as selah_name"
      )
      .where({ "T.id": id })
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
 * Find Transportation By Dabet ID
 * @returns Array of All Transportation || Error Object
 */
export function findByDabet(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Transportations>("transportations AS T")
      .leftJoin("wehda AS FW", "FW.id", "T.from_id")
      .leftJoin("wehda AS TW", "TW.id", "T.to_id")
      .leftJoin("selah AS S", "S.id", "T.selah_id")
      .select(
        "T.*",
        "FW.name as from_name",
        "TW.name as to_name",
        "S.name as selah_name"
      )
      .where({ dabet_id: id })
      .orderBy(["id", "approval_date", "done_date"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Transportations
 * @returns Array of All Transportations || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Transportations>("transportations AS T")
      .leftJoin("wehda AS FW", "FW.id", "T.from_id")
      .leftJoin("wehda AS TW", "TW.id", "T.to_id")
      .leftJoin("selah AS S", "S.id", "T.selah_id")
      .select(
        "T.*",
        "FW.name as from_name",
        "TW.name as to_name",
        "S.name as selah_name"
      )
      .orderBy(["id", "approval_date", "done_date"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Update Transportation
 * @param id Transportation ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateTransportation(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Transportations>("transportations")
      .where({ id })
      .first()
      .update(data)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Delete Transportation
 * @param id Transportation ID
 * @returns Operation Result || Error Object
 */
export function deleteTransportation(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Transportations>("transportations")
      .where({ id })
      .first()
      .delete()
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}
