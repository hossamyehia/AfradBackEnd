import { db } from "../../../../core";
import SQLError from "../../../../shared/models/SQLError.model";
import EfficiencyReports from "./efficiencyReports.model";


/**
 * Insert New efficiency Reports
 * @param year 
 * @param degree 
 * @param dabet_id 
 * @returns Operation Result || Error Object
 */
export function insertOne(
  year: number,
  degree: string,
  dabet_id: number,
) {
  return new Promise(async (resolve, reject) => {
    await db<EfficiencyReports>("efficiency_reports")
      .insert({
        year,
        degree,
        dabet_id,
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
 * Insert Many efficiencyReportst
 * @param efficiencyReportss Array Of efficiencyReportst
 * @returns
 */
export function insertMany(efficiencyReportss: any) {
  return new Promise(async (resolve, reject) => {
    await db<EfficiencyReports>("efficiency_reports")
      .insert(efficiencyReportss)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find efficiency Reports By its id
 * @param id efficiency Reports ID
 * @returns efficiency Reports Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<EfficiencyReports>("efficiency_reports")
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
 * Find efficiency Reports By Dabet ID
 * @returns Array of All efficiency Reports || Error Object
 */
export function findByDabet(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<EfficiencyReports>("efficiency_reports")
      .select("*")
      .where({ dabet_id: id })
      .orderBy(["id", "year"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All efficiency Reportss
 * @returns Array of All efficiency Reportss || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<EfficiencyReports>("efficiency_reports")
      .select("*")
      .orderBy(["id", "year"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Update efficiency Reports
 * @param id efficiency Reports ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateEfficiencyReport(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<EfficiencyReports>("efficiency_reports")
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
 * Delete efficiency Reports
 * @param id efficiency Reports ID
 * @returns Operation Result || Error Object
 */
export function deleteEfficiencyReport(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<EfficiencyReports>("efficiency_reports")
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
