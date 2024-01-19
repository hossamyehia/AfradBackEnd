import Wehda from "./wehda.model";
import { db } from "../../../core";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Insert New Wehda
 * @param ehsa Wehda Ehsa
 * @param level Wehda Level
 * @param mrtb_code Wehda mrtb_code
 * @param tmrkz_id Wehda tmrkz_id
 * @param code_tnz Wehda code_tnz
 * @param nesba Wehda Nesba
 * @param cod_tabaa Wehda cod_tabaa
 * @returns Operation Result || Error Object
 */
export function insertOne(
  name: string,
  ehsa: string,
  nesba: number,
  mrtb_code: string,
  code_tnz: string,
  cod_tabaa: string,
  level: number,
  tmrkz_id: number,
  b_code: number,
  r_code: number
) {
  return new Promise(async (resolve, reject) => {
    await db<Wehda>("wehda")
      .insert({
        name,
        ehsa,
        nesba,
        mrtb_code,
        code_tnz,
        cod_tabaa,
        level,
        tmrkz_id,
        b_code,
        r_code
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
 * Insert Many Wehdaat
 * @param Wehdaat Array Of Wehdaat
 * @returns Operation Result || Error Object
 */
export function insertMany(Wehdaat: any) {
  return new Promise(async (resolve, reject) => {
    await db<Wehda>("wehda")
      .insert(Wehdaat)
      .then((result) => {
        resolve(result);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Wehdaat
 * @returns Array of All Wehdaat || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<Wehda>("wehda")
      .leftJoin("wehda_level as WC", "WC.id", "Wehda.level")
      .leftJoin("mantekat_tmrkz as MT", "MT.id", "Wehda.tmrkz_id")
      .select(
        "wehda.id as id",
        "wehda.ehsa as ehsa",
        "wehda.name as name",
        "wehda.nesba as nesba",
        "wehda.mrtb_code as mrtb_code",
        "wehda.code_tnz as code_tnz",
        "wehda.cod_tabaa as cod_tabaa",
        "wehda.b_code as b_code",
        "wehda.r_code as r_code",
        "wehda.level as level_id",
        "WC.name as level",
        "wehda.tmrkz_id as tmrkz_id",
        "MT.name as tmrkz"
      )
      .orderBy(["wehda.ehsa", "wehda.id"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find Wehda By its id
 * @param id Wehda ID
 * @returns Wehda Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Wehda>("wehda")
      .leftJoin("wehda_level as WC", "WC.id", "Wehda.level")
      .leftJoin("mantekat_tmrkz as MT", "MT.id", "Wehda.tmrkz_id")
      .select(
        "wehda.id as id",
        "wehda.ehsa as ehsa",
        "wehda.name as name",
        "wehda.nesba as nesba",
        "wehda.mrtb_code as mrtb_code",
        "wehda.code_tnz as code_tnz",
        "wehda.cod_tabaa as cod_tabaa",
        "wehda.b_code as b_code",
        "wehda.r_code as r_code",
        "wehda.level as level_id",
        "WC.name as level",
        "wehda.tmrkz_id as tmrkz_id",
        "MT.name as tmrkz"
      )
      .where({ "wehda.id": id })
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
 * Update Wehda
 * @param id Wehda ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateWehda(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db<Wehda>("wehda")
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
 * Delete Wehda
 * @param id Wehda ID
 * @returns Operation Result || Error Object
 */
export function deleteWehda(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<Wehda>("wehda")
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
