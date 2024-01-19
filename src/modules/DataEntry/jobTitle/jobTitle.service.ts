import JobTitle from "./jobTitle.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Job Title
 * @param name Class Name
 * @returns Operation Result || Error Object
 */
export function insertOne(name: string) {
  return new Promise(async (resolve, reject) => {
    await db<JobTitle>("job_title")
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
 * Insert Many Job Titles
 * @param JobTitles Array Of Job Titles
 * @returns Operation Result || Error Object
 */
export function insertMany(JobTitles: any) {
  return new Promise(async (resolve, reject) => {
    await db<JobTitle>("job_title")
      .insert(JobTitles)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Job Titles
 * @returns Array of All Job Titles || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<JobTitle>("job_title")
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
 * Find Job Titlee By its id
 * @param id Job Titles` ID
 * @returns Job Title Object || Error Object
 */
export function findById(id: number) {
    return new Promise(async (resolve, reject) => {
      await db<JobTitle>("job_title")
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
 * Update Job Title
 * @param id Job Titles` ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateJobTitle(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<JobTitle>("job_title")
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
 * Delete Job Title
 * @param id Job Titles` ID
 * @returns Operation Result || Error Object
 */
export function deleteJobTitle(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<JobTitle>("job_title")
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
