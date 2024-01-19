import Mohafza from "./mohafza.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Mohafza
 * @param name Mohafza Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<Mohafza>("Mohafza")
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
 * Insert Many Mohafzat
 * @param Mohafzat Array Of Mohafzat
 * @returns Operation Result || Error Object
 */
export function insertMany(Mohafzat: any) {
  return new Promise(async (resolve, reject) => {
    await db<Mohafza>("Mohafza")
      .insert(Mohafzat)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Mohafzat
 * @returns Array of All Mohafzat || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Mohafza>("Mohafza")
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
 * Find Mohafzae By its id
 * @param id Mohafzat` ID
 * @returns Mohafza Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<Mohafza>("Mohafza")
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
 * Update Mohafza
 * @param id Mohafzat` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateMohafza(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Mohafza>("Mohafza")
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
 * Delete Mohafza
 * @param id Mohafzat` ID
 * @returns Operation Result || Error Object
 */
export function deleteMohafza(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Mohafza>("Mohafza")
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
