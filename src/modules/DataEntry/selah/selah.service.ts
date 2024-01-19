import Selah from "./selah.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Selah
 * @param name Selah Name
 * @param class_id Selah Class ID
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string, class_id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Selah>("selah")
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
 * Insert Many Asleha
 * @param Selahat Array Of Selahat
 * @returns Operation Result || Error Object
 */
export function insertMany(asleha: any) {
  return new Promise(async (resolve, reject) => {
    await db<Selah>("selah")
      .insert(asleha)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Asleha
 * @returns Array of All Asleha || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Selah>("selah")
      .join("selah_class as SC", "SC.id", "selah.class_id")
      .select(
        "selah.id as id",
        "selah.name as name",
        "selah.class_id as class_id",
        "SC.name as class_name"
      )
      .orderBy(["selah.id"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Selah By its id
 * @param id Selah ID
 * @returns Selah Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Selah>("selah")
      .join("selah_class as SC", "SC.id", "selah.class_id")
      .select(
        "selah.id as id",
        "selah.name as name",
        "selah.class_id as class_id",
        "SC.name as class_name"
      )
      .where({ "selah.id": id })
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
 * Update Selah
 * @param id Selah ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateSelah(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Selah>("selah")
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
 * Delete Selah
 * @param id Selah ID
 * @returns Operation Result || Error Object
 */
export function deleteSelah(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Selah>("selah")
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
