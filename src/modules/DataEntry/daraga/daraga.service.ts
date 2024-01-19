import Daraga from "./daraga.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Daraga
 * @param name Daraga Name
 * @param sort_order Sort Order
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string, sort_order: string) {
  return new Promise(async (resolve, reject) => {
    await db<Daraga>("daraga")
      .insert({
        name,
        sort_order,
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
 * Insert Many Daragat
 * @param daragat Array Of Daragat
 * @returns 
 */
export function insertMany(daragat: any){
  return new Promise(async (resolve, reject) => {
    await db<Daraga>("daraga")
      .insert(daragat)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Daraga By its id
 * @param id Role Tag
 * @returns Role Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Daraga>("daraga")
      .select("*")
      .where({ id })
      .first()
      .then((daraga) => {
        resolve(daraga);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Daragat
 * @returns Array of All Roles || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Daraga>("daraga")
      .select("*")
      .orderBy(["id", "sort_order"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Update Daraga
 * @param id Daraga ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateDaraga(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Daraga>("daraga")
      .where({ id })
      .first()
      .update(data as { name?: string; sort_order?: string })
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Delete Daraga
 * @param id Daraga ID
 * @returns Operation Result || Error Object
 */
export function deleteDaraga(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Daraga>("daraga")
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
