import Fea from "./fea.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Fea
 * @param name Fea Name
 * @param class_id Fea Class ID
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string, class_id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Fea>("fea")
      .insert({
        name,
        class_id,
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
 * Insert Many Feaat
 * @param feaat Array Of Feaat
 * @returns Operation Result || Error Object
 */
export function insertMany(feaat: any) {
  return new Promise(async (resolve, reject) => {
    await db<Fea>("fea")
      .insert(feaat)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Feaat
 * @returns Array of All Feaat || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Fea>("fea")
      .join("fea_class as FC", "FC.id", "fea.class_id")
      .select(
        "fea.id as id",
        "fea.name as name",
        "fea.class_id as class_id",
        "FC.name as class_name"
      )
      .orderBy(["fea.id"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Fea By its id
 * @param id Fea ID
 * @returns Fea Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Fea>("fea")
      .join("fea_class as FC", "FC.id", "fea.class_id")
      .select(
        "fea.id as id",
        "fea.name as name",
        "fea.class_id as class_id",
        "FC.name as class_name"
      )
      .where({ "fea.id":id })
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
 * Update Fea
 * @param id Fea ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateFea(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Fea>("fea")
      .where({ id })
      .first()
      .update(data as { name?: string; class_id?: number })
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Delete Fea
 * @param id Fea ID
 * @returns Operation Result || Error Object
 */
export function deleteFea(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Fea>("fea")
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
