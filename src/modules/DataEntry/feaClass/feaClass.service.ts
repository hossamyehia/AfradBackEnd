import FeaClass from "./feaClass.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Fea Class
 * @param name Class Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<FeaClass>("fea_class")
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
 * Insert Many Fea Classes
 * @param feaClasses Array Of Fea Classes
 * @returns Operation Result || Error Object
 */
export function insertMany(feaClasses: any) {
  return new Promise(async (resolve, reject) => {
    await db<FeaClass>("fea_class")
      .insert(feaClasses)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Fea Classes
 * @returns Array of All Fea Classes || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<FeaClass>("fea_class")
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
 * Find Fea Classe By its id
 * @param id Fea Classes` ID
 * @returns Fea Class Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<FeaClass>("fea_class")
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
 * Update Fea Class
 * @param id Fea Classes` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateFeaClass(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<FeaClass>("fea_class")
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
 * Delete Fea Class
 * @param id Fea Classes` ID
 * @returns Operation Result || Error Object
 */
export function deleteFeaClass(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<FeaClass>("fea_class")
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
