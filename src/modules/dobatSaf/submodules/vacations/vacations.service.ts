import { db } from "../../../../core";
import SQLError from "../../../../shared/models/SQLError.model";
import Vacations from "./vacations.model";


/**
 * Insert New Vacation
 * @param type 
 * @param from 
 * @param to 
 * @param days 
 * @param months 
 * @param years 
 * @param dabet_id 
 * @returns Operation Result || Error Object
 */
export function insertOne(
  type: string,
  from: Date,
  to: Date,
  days: number,
  months: number,
  years: number,
  dabet_id: number
) {
  return new Promise(async (resolve, reject) => {
    await db<Vacations>("vacations")
      .insert({
        type,
        from,
        to,
        days,
        months,
        years,
        dabet_id
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
 * Insert Many Vacationst
 * @param Vacations Array Of Vacationst
 * @returns
 */
export function insertMany(Vacations: any) {
  return new Promise(async (resolve, reject) => {
    await db<Vacations>("vacations")
      .insert(Vacations)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Vacation By its id
 * @param id Vacation ID
 * @returns Vacation Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Vacations>("vacations")
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
 * Find Vacation By Dabet ID
 * @returns Array of All Vacation || Error Object
 */
export function findByDabet(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Vacations>("vacations")
      .select("*")
      .where({ dabet_id: id })
      .orderBy(["id", "from", "to"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Vacations
 * @returns Array of All Vacations || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Vacations>("vacations")
      .select("*")
      .orderBy(["id", "from", "to"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Update Vacation
 * @param id Vacation ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateVacation(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Vacations>("vacations")
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
 * Delete Vacation
 * @param id Vacation ID
 * @returns Operation Result || Error Object
 */
export function deleteVacation(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Vacations>("vacations")
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
