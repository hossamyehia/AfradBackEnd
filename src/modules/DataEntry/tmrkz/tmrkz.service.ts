import MantekatTmrkz from "./tmrkz.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Mantekat Tmrkz
 * @param name Mantekat Tmrkz Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<MantekatTmrkz>("mantekat_tmrkz")
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
 * Insert Many Manatek Tmrkz
 * @param ManatekTmrkz Array Of Manatek Tmrkz
 * @returns Operation Result || Error Object
 */
export function insertMany(ManatekTmrkz: any) {
  return new Promise(async (resolve, reject) => {
    await db<MantekatTmrkz>("mantekat_tmrkz")
      .insert(ManatekTmrkz)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Manatek Tmrkz
 * @returns Array of All Manatek Tmrkz || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<MantekatTmrkz>("mantekat_tmrkz")
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
 * Find Mantekat Tmrkz By its id
 * @param id Mantekat Tmrkzs` ID
 * @returns Mantekat Tmrkz Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<MantekatTmrkz>("mantekat_tmrkz")
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
 * Update Mantekat Tmrkz
 * @param id Mantekat Tmrkzs` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateMantekatTmrkz(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<MantekatTmrkz>("mantekat_tmrkz")
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
 * Delete Mantekat Tmrkz
 * @param id Mantekat Tmrkzs` ID
 * @returns Operation Result || Error Object
 */
export function deleteMantekatTmrkz(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<MantekatTmrkz>("mantekat_tmrkz")
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
