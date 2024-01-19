import Markaz from "./markaz.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Markaz
 * @param name Markaz Name
 * @param mohafza_id Markaz`s Mohafza ID
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string, mohafza_id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Markaz>("markaz")
      .insert({
        name,
        mohafza_id,
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
 * Insert Many Marakaz
 * @param Marakaz Array Of Marakaz
 * @returns Operation Result || Error Object
 */
export function insertMany(asleha: any) {
  return new Promise(async (resolve, reject) => {
    await db<Markaz>("markaz")
      .insert(asleha)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Marakaz
 * @returns Array of All Marakaz || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Markaz>("markaz")
      .join("mohafza as M", "M.id", "markaz.mohafza_id")
      .select(
        "markaz.id as id",
        "markaz.name as name",
        "markaz.mohafza_id as mohafza_id",
        "M.name as mohafza"
      )
      .orderBy(["markaz.id"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Markaz By its id
 * @param id Markaz ID
 * @returns Markaz Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Markaz>("markaz")
      .join("mohafza as M", "M.id", "markaz.mohafza_id")
      .select(
        "markaz.id as id",
        "markaz.name as name",
        "markaz.mohafza_id as mohafza_id",
        "M.name as mohafza"
      )
      .where({ "markaz.id": id })
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
 * Find Markaz By Mohafza ID
 * @param mohafza_id Mohafza ID
 * @returns Markaz Object || Error Object
 */
export function findByMohafza(mohafza_id: number) {
    return new Promise(async (resolve, reject) => {
      await db<Markaz>("markaz")
        .join("mohafza as M", "M.id", "markaz.mohafza_id")
        .select(
          "markaz.id as id",
          "markaz.name as name",
          "markaz.mohafza_id as mohafza_id",
          "M.name as mohafza"
        )
        .where({ "markaz.mohafza_id": mohafza_id })
        .then((result) => {
          resolve(result);
        })
        .catch((err: SQLError | any) => {
          reject(err);
        });
    });
  }

/**
 * Update Markaz
 * @param id Markaz ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateMarkaz(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Markaz>("markaz")
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
 * Delete Markaz
 * @param id Markaz ID
 * @returns Operation Result || Error Object
 */
export function deleteMarkaz(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Markaz>("markaz")
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
