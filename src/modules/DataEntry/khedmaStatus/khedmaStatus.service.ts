import KhedmaStatus from "./khedmaStatus.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Khedma Status
 * @param name Khedma Status Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<KhedmaStatus>("khedma_status")
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
 * Insert Many Khedma Statuses
 * @param KhedmaStatuses Array Of Khedma Statuses
 * @returns Operation Result || Error Object
 */
export function insertMany(KhedmaStatuses: any) {
  return new Promise(async (resolve, reject) => {
    await db<KhedmaStatus>("khedma_status")
      .insert(KhedmaStatuses)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Khedma Statuses
 * @returns Array of All Khedma Statuses || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<KhedmaStatus>("khedma_status")
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
 * Find Khedma Status By its id
 * @param id Khedma Statuses` ID
 * @returns Khedma Status Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<KhedmaStatus>("khedma_status")
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
 * Update Khedma Status
 * @param id Khedma Statuses` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateKhedmaStatus(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<KhedmaStatus>("khedma_status")
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
 * Delete Khedma Status
 * @param id Khedma Statuses` ID
 * @returns Operation Result || Error Object
 */
export function deleteKhedmaStatus(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<KhedmaStatus>("khedma_status")
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
