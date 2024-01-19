import { db } from "../../../../core";
import SQLError from "../../../../shared/models/SQLError.model";
import Promotion from "./promotion.model";

/**
 * Insert New Promotion
 * @param daraga Promotion Name
 * @param promotion_date Promotion Date
 * @returns Operation Result || Error Object
 */
export function insertOne(
  daraga_id: number,
  dabet_id: number,
  promotion_date: Date
) {
  return new Promise(async (resolve, reject) => {
    await db<Promotion>("promotion")
      .insert({
        daraga_id,
        dabet_id,
        promotion_date,
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
 * Insert Many Promotiont
 * @param promotions Array Of Promotiont
 * @returns
 */
export function insertMany(promotions: any) {
  return new Promise(async (resolve, reject) => {
    await db<Promotion>("promotion")
      .insert(promotions)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Promotion By its id
 * @param id Promotion ID
 * @returns Promotion Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Promotion>("promotion as P")
      .leftJoin("daraga as D", "D.id", "P.daraga_id")
      .select("P.*", "D.name as daraga_name")
      .where({ "P.id": id })
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
 * Find Promotions By Dabet ID
 * @returns Array of All Promotions || Error Object
 */
export function findByDabet(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Promotion>("promotion as P")
      .leftJoin("daraga as D", "D.id", "P.daraga_id")
      .select("P.*", "D.name as daraga_name")
      .where({ dabet_id: id })
      .orderBy(["id", "promotion_date"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Promotions
 * @returns Array of All Promotions || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Promotion>("promotion as P")
      .leftJoin("daraga as D", "D.id", "P.daraga_id")
      .select("P.*", "D.name as daraga_name")
      .orderBy(["id", "promotion_date"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Update Promotion
 * @param id Promotion ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updatePromotion(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Promotion>("promotion")
      .where({ id })
      .first()
      .update(data)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Delete Promotion
 * @param id Promotion ID
 * @returns Operation Result || Error Object
 */
export function deletePromotion(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Promotion>("promotion")
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
