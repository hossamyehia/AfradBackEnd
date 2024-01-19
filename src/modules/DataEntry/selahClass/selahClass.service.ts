import SelahClass from "./selahClass.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Selah Class
 * @param name Class Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<SelahClass>("selah_class")
      .insert({
        name,
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
 * Insert Many Selah Classes
 * @param SelahClasses Array Of Selah Classes
 * @returns Operation Result || Error Object
 */
export function insertMany(SelahClasses: any) {
  return new Promise(async (resolve, reject) => {
    await db<SelahClass>("selah_class")
      .insert(SelahClasses)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Selah Classes
 * @returns Array of All Selah Classes || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<SelahClass>("selah_class")
      .select("*")
      .orderBy(["id"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Selah Classe By its id
 * @param id Selah Classes` ID
 * @returns Selah Class Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<SelahClass>("selah_class")
        .select("*")
        .where({ id })
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
 * Update Selah Class
 * @param id Selah Classes` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateSelahClass(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<SelahClass>("selah_class")
      .where({ id })
      .first()
      .update(data as { name?: string })
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Delete Selah Class
 * @param id Selah Classes` ID
 * @returns Operation Result || Error Object
 */
export function deleteSelahClass(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<SelahClass>("selah_class")
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
