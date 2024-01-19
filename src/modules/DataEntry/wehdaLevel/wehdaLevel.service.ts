import WehdaLevel from "./wehdaLevel.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Wehda Level
 * @param name Wehda Level Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<WehdaLevel>("wehda_level")
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
 * Insert Many Wehda levels
 * @param Wehdalevels Array Of Wehda levels
 * @returns Operation Result || Error Object
 */
export function insertMany(Wehdalevels: any) {
  return new Promise(async (resolve, reject) => {
    await db<WehdaLevel>("wehda_level")
      .insert(Wehdalevels)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Wehda levels
 * @returns Array of All Wehda levels || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<WehdaLevel>("wehda_level")
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
 * Find Wehda Level By its id
 * @param id Wehda levels` ID
 * @returns Wehda Level Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<WehdaLevel>("wehda_level")
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
 * Update Wehda Level
 * @param id Wehda levels` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateWehdaLevel(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<WehdaLevel>("wehda_level")
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
 * Delete Wehda Level
 * @param id Wehda levels` ID
 * @returns Operation Result || Error Object
 */
export function deleteWehdaLevel(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<WehdaLevel>("wehda_level")
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
