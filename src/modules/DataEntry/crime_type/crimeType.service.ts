import CrimeType from "./crimeType.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Crime type
 * @param name Class Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<CrimeType>("crime_type")
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
 * Insert Many Crime types
 * @param CrimeTypes Array Of Crime types
 * @returns Operation Result || Error Object
 */
export function insertMany(CrimeTypes: any) {
  return new Promise(async (resolve, reject) => {
    await db<CrimeType>("crime_type")
      .insert(CrimeTypes)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Crime types
 * @returns Array of All Crime types || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<CrimeType>("crime_type")
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
 * Find Crime typee By its id
 * @param id Crime types` ID
 * @returns Crime type Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<CrimeType>("crime_type")
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
 * Update Crime type
 * @param id Crime types` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateCrimeType(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<CrimeType>("crime_type")
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
 * Delete Crime type
 * @param id Crime types` ID
 * @returns Operation Result || Error Object
 */
export function deleteCrimeType(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<CrimeType>("crime_type")
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
