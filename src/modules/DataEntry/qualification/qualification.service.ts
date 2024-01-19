import Qualification from "./qualification.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Qualification
 * @param name Qualification Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<Qualification>("qualification")
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
 * Insert Many Qualifications
 * @param Qualifications Array Of Qualifications
 * @returns Operation Result || Error Object
 */
export function insertMany(Qualifications: any) {
  return new Promise(async (resolve, reject) => {
    await db<Qualification>("qualification")
      .insert(Qualifications)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Qualifications
 * @returns Array of All Qualifications || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Qualification>("qualification")
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
 * Find Qualificatione By its id
 * @param id Qualifications` ID
 * @returns Qualification Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<Qualification>("qualification")
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
 * Update Qualification
 * @param id Qualifications` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateQualification(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Qualification>("qualification")
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
 * Delete Qualification
 * @param id Qualifications` ID
 * @returns Operation Result || Error Object
 */
export function deleteQualification(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Qualification>("qualification")
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
