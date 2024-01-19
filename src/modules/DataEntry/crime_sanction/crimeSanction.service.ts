import CrimeSanction from "./crimeSanction.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Crime Sanction
 * @param name Class Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<CrimeSanction>("crime_sanctions")
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
 * Insert Many Crime Sanctions
 * @param CrimeSanctions Array Of Crime Sanctions
 * @returns Operation Result || Error Object
 */
export function insertMany(CrimeSanctions: any) {
  return new Promise(async (resolve, reject) => {
    await db<CrimeSanction>("crime_sanctions")
      .insert(CrimeSanctions)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Crime Sanctions
 * @returns Array of All Crime Sanctions || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<CrimeSanction>("crime_sanctions")
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
 * Find Crime Sanctione By its id
 * @param id Crime Sanctions` ID
 * @returns Crime Sanction Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<CrimeSanction>("crime_sanctions")
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
 * Update Crime Sanction
 * @param id Crime Sanctions` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateCrimeSanction(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<CrimeSanction>("crime_sanctions")
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
 * Delete Crime Sanction
 * @param id Crime Sanctions` ID
 * @returns Operation Result || Error Object
 */
export function deleteCrimeSanction(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<CrimeSanction>("crime_sanctions")
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
