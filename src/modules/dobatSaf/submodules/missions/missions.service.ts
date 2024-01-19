import { db } from "../../../../core";
import SQLError from "../../../../shared/models/SQLError.model";
import Missions from "./missions.model";


/**
 * Insert New Mission
 * @param destination 
 * @param approval_date 
 * @param approval_number 
 * @param from 
 * @param to 
 * @param dabet_id 
 * @returns Operation Result || Error Object
 */
export function insertOne(
  destination: string,
  approval_date: Date,
  approval_number: string,
  from: Date,
  to: Date,
  dabet_id: number
) {
  return new Promise(async (resolve, reject) => {
    await db<Missions>("missions")
      .insert({
        destination,
        approval_date,
        approval_number,
        from,
        to,
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
 * Insert Many Missions
 * @param Missions Array Of Missionst
 * @returns
 */
export function insertMany(Missions: any) {
  return new Promise(async (resolve, reject) => {
    await db<Missions>("missions")
      .insert(Missions)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Mission By its id
 * @param id Mission ID
 * @returns Mission Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Missions>("missions")
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
 * Find Mission By Dabet ID
 * @returns Array of All Mission || Error Object
 */
export function findByDabet(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Missions>("missions")
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
 * Find All Missions
 * @returns Array of All Missions || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Missions>("missions")
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
 * Update Mission
 * @param id Mission ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateMission(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Missions>("missions")
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
 * Delete Mission
 * @param id Mission ID
 * @returns Operation Result || Error Object
 */
export function deleteMission(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Missions>("missions")
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
