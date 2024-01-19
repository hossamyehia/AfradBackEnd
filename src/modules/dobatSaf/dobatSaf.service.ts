import DobatSaf from "./dobatSaf.model";
import { db } from "../../core";
import SQLError from "../../shared/models/SQLError.model";

/**
 * Insert Dabet Saf
 * @param rkmaskry
 * @param name
 * @param birth_date
 * @param religion
 * @param blood
 * @param marital_state
 * @param mohafza_id
 * @param markaz_id
 * @param address
 * @param nearest
 * @param address2
 * @param fea_id
 * @param daraga_id
 * @param taraky_date
 * @param tatwa_date
 * @param moahel_tatwa_id
 * @param highest_moahel_id
 * @param rateb3aly_date
 * @param selah_id
 * @param selah_khedma_id
 * @param wehda_id
 * @param join_date
 * @param takhasos_id
 * @param job_title_id
 * @param job_title_edafy_id
 * @param khedma_id
 * @param marriage_date
 * @param number_of_sons
 * @param rkmakdmia
 * @returns Operation Result || Error Object
 */
export function insertOne(
  rkmaskry: string,
  name: string,
  birth_date: Date,
  religion: string,
  blood: string,
  marital_state: string,
  mohafza_id: number,
  markaz_id: number,
  address: string,
  nearest: string,
  address2: string,
  fea_id: number,
  khedma_id: number,
  daraga_id: number,
  taraky_date: Date,
  tatwa_date: Date,
  moahel_tatwa_id: number,
  highest_moahel_id: number,
  rateb3aly_date: Date,
  selah_id: number,
  selah_khedma_id: number,
  wehda_id: number,
  join_date: Date,
  takhasos_id: number,
  job_title_id: number,
  job_title_edafy_id: number,
  marriage_date?: Date,
  number_of_sons?: number
) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let inst = await trx<DobatSaf>("dobat_saf").insert({
          rkmaskry,
          name,
          birth_date,
          religion,
          blood,
          marital_state,
          mohafza_id,
          markaz_id,
          address,
          nearest,
          address2,
          fea_id,
          khedma_id,
          daraga_id,
          taraky_date,
          tatwa_date,
          moahel_tatwa_id,
          highest_moahel_id,
          rateb3aly_date,
          selah_id,
          selah_khedma_id,
          wehda_id,
          join_date,
          takhasos_id,
          job_title_id,
          job_title_edafy_id,
        });

        if (marriage_date == undefined || marriage_date == null) return inst;

        const dabetSaf = await trx("dobat_saf")
          .select("*")
          .where({ rkmaskry })
          .first();

        let queries: any[] = [
          db("married_dobatsaf")
            .insert({
              dabet_id: dabetSaf.id,
              marriage_date,
              number_of_sons,
            })
            .transacting(trx),
        ];

        return Promise.all(queries).then(trx.commit).catch(trx.rollback);
      })
      .then(function (values) {
        resolve(values);
      })
      .catch(function (error: SQLError | any) {
        reject(error);
      });
  });
}

/**
 * Find All dobat Saf
 * @returns Array of All dobat Saf || Error Object
 */
export function find() {
  return new Promise(async (resolve, reject) => {
    await db<DobatSaf>("dobat_saf as DS")
      .leftJoin("selah as S", "S.id", "DS.selah_id")
      .leftJoin("selah as SK", "SK.id", "DS.selah_khedma_id")
      .leftJoin("wehda as W", "W.id", "DS.wehda_id")
      .leftJoin("fea as F", "F.id", "DS.fea_id")
      .leftJoin("khedma_status as KS", "KS.id", "DS.khedma_id")
      .leftJoin("daraga as D", "D.id", "DS.daraga_id")
      .leftJoin("job_title as T", "T.id", "DS.takhasos_id")
      .leftJoin("job_title as JT", "JT.id", "DS.job_title_id")
      .leftJoin("job_title as JTE", "JTE.id", "DS.job_title_edafy_id")
      .leftJoin("mohafza as MF", "MF.id", "DS.mohafza_id")
      .leftJoin("markaz as MK", "MK.id", "DS.markaz_id")
      .leftJoin("qualification as MT", "MT.id", "DS.moahel_tatwa_id")
      .leftJoin("qualification as HM", "HM.id", "DS.highest_moahel_id")
      .leftJoin("married_dobatsaf as MDS", "MDS.dabet_id", "DS.id")
      .select(
        "DS.*",
        "S.name as selah",
        "SK.name as selah_khedma",
        "W.name as wehda",
        "F.name as fea",
        "KS.name as khedma_status",
        "D.name as daraga",
        "T.name as takhasos",
        "JT.name as job_title",
        "JTE.name as job_title_edafy",
        "MF.name as mohafza",
        "MK.name as markaz",
        "MT.name as moahel_tatwa",
        "HM.name as highest_moahel",
        "MDS.marriage_date as marriage_date",
        "MDS.number_of_sons as number_of_sons"
      )
      .orderBy(["DS.id", "DS.rkmaskry"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Dobat Saf In Specific Selah
 * @param selah_id Selah ID
 * @returns Array of dobat Saf || Error Object
 */
export function findBySelah(selah_id: number) {
  return new Promise(async (resolve, reject) => {
    await db<DobatSaf>("dobat_saf as DS")
      .leftJoin("selah as S", "S.id", "DS.selah_id")
      .leftJoin("selah as SK", "SK.id", "DS.selah_khedma_id")
      .leftJoin("wehda as W", "W.id", "DS.wehda_id")
      .leftJoin("fea as F", "F.id", "DS.fea_id")
      .leftJoin("khedma_status as KS", "KS.id", "DS.khedma_id")
      .leftJoin("daraga as D", "D.id", "DS.daraga_id")
      .leftJoin("job_title as T", "T.id", "DS.takhasos_id")
      .leftJoin("job_title as JT", "JT.id", "DS.job_title_id")
      .leftJoin("job_title as JTE", "JTE.id", "DS.job_title_edafy_id")
      .leftJoin("mohafza as MF", "MF.id", "DS.mohafza_id")
      .leftJoin("markaz as MK", "MK.id", "DS.markaz_id")
      .leftJoin("qualification as MT", "MT.id", "DS.moahel_tatwa_id")
      .leftJoin("qualification as HM", "HM.id", "DS.highest_moahel_id")
      .leftJoin("married_dobatsaf as MDS", "MDS.dabet_id", "DS.id")
      .select(
        "DS.*",
        "S.name as selah",
        "SK.name as selah_khedma",
        "W.name as wehda",
        "F.name as fea",
        "KS.name as khedma_status",
        "D.name as daraga",
        "T.name as takhasos",
        "JT.name as job_title",
        "JTE.name as job_title_edafy",
        "MF.name as mohafza",
        "MK.name as markaz",
        "MT.name as moahel_tatwa",
        "HM.name as highest_moahel",
        "MDS.marriage_date as marriage_date",
        "MDS.number_of_sons as number_of_sons"
      )
      .where({ "DS.selah_id": selah_id })
      .orderBy(["DS.id", "DS.rkmaskry"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Dobat Saf In Specific Wehda
 * @param wehda_id Wehda ID
 * @returns Array of dobat Saf || Error Object
 */
export function findByWehda(wehda_id: number) {
  return new Promise(async (resolve, reject) => {
    await db<DobatSaf>("dobat_saf as DS")
      .leftJoin("selah as S", "S.id", "DS.selah_id")
      .leftJoin("selah as SK", "SK.id", "DS.selah_khedma_id")
      .leftJoin("wehda as W", "W.id", "DS.wehda_id")
      .leftJoin("fea as F", "F.id", "DS.fea_id")
      .leftJoin("khedma_status as KS", "KS.id", "DS.khedma_id")
      .leftJoin("daraga as D", "D.id", "DS.daraga_id")
      .leftJoin("job_title as T", "T.id", "DS.takhasos_id")
      .leftJoin("job_title as JT", "JT.id", "DS.job_title_id")
      .leftJoin("job_title as JTE", "JTE.id", "DS.job_title_edafy_id")
      .leftJoin("mohafza as MF", "MF.id", "DS.mohafza_id")
      .leftJoin("markaz as MK", "MK.id", "DS.markaz_id")
      .leftJoin("qualification as MT", "MT.id", "DS.moahel_tatwa_id")
      .leftJoin("qualification as HM", "HM.id", "DS.highest_moahel_id")
      .leftJoin("married_dobatsaf as MDS", "MDS.dabet_id", "DS.id")
      .select(
        "DS.*",
        "S.name as selah",
        "SK.name as selah_khedma",
        "W.name as wehda",
        "F.name as fea",
        "KS.name as khedma_status",
        "D.name as daraga",
        "T.name as takhasos",
        "JT.name as job_title",
        "JTE.name as job_title_edafy",
        "MF.name as mohafza",
        "MK.name as markaz",
        "MT.name as moahel_tatwa",
        "HM.name as highest_moahel",
        "MDS.marriage_date as marriage_date",
        "MDS.number_of_sons as number_of_sons"
      )
      .where({ "DS.wehda_id": wehda_id })
      .orderBy(["DS.id", "DS.rkmaskry"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Dobat Saf In Specific Daraga
 * @param daraga_id Daraga ID
 * @returns Array of dobat Saf || Error Object
 */
export function findByDaraga(daraga_id: number) {
  return new Promise(async (resolve, reject) => {
    await db<DobatSaf>("dobat_saf as DS")
      .leftJoin("selah as S", "S.id", "DS.selah_id")
      .leftJoin("selah as SK", "SK.id", "DS.selah_khedma_id")
      .leftJoin("wehda as W", "W.id", "DS.wehda_id")
      .leftJoin("fea as F", "F.id", "DS.fea_id")
      .leftJoin("khedma_status as KS", "KS.id", "DS.khedma_id")
      .leftJoin("daraga as D", "D.id", "DS.daraga_id")
      .leftJoin("job_title as T", "T.id", "DS.takhasos_id")
      .leftJoin("job_title as JT", "JT.id", "DS.job_title_id")
      .leftJoin("job_title as JTE", "JTE.id", "DS.job_title_edafy_id")
      .leftJoin("mohafza as MF", "MF.id", "DS.mohafza_id")
      .leftJoin("markaz as MK", "MK.id", "DS.markaz_id")
      .leftJoin("qualification as MT", "MT.id", "DS.moahel_tatwa_id")
      .leftJoin("qualification as HM", "HM.id", "DS.highest_moahel_id")
      .leftJoin("married_dobatsaf as MDS", "MDS.dabet_id", "DS.id")
      .select(
        "DS.*",
        "S.name as selah",
        "SK.name as selah_khedma",
        "W.name as wehda",
        "F.name as fea",
        "KS.name as khedma_status",
        "D.name as daraga",
        "T.name as takhasos",
        "JT.name as job_title",
        "JTE.name as job_title_edafy",
        "MF.name as mohafza",
        "MK.name as markaz",
        "MT.name as moahel_tatwa",
        "HM.name as highest_moahel",
        "MDS.marriage_date as marriage_date",
        "MDS.number_of_sons as number_of_sons"
      )
      .where({ "DS.daraga_id": daraga_id })
      .orderBy(["DS.id", "DS.rkmaskry"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find All Dobat Saf In Specific Fea
 * @param fea_id Fea ID
 * @returns Array of dobat Saf || Error Object
 */
export function findByFea(fea_id: number) {
  return new Promise(async (resolve, reject) => {
    await db<DobatSaf>("dobat_saf as DS")
      .leftJoin("selah as S", "S.id", "DS.selah_id")
      .leftJoin("selah as SK", "SK.id", "DS.selah_khedma_id")
      .leftJoin("wehda as W", "W.id", "DS.wehda_id")
      .leftJoin("fea as F", "F.id", "DS.fea_id")
      .leftJoin("khedma_status as KS", "KS.id", "DS.khedma_id")
      .leftJoin("daraga as D", "D.id", "DS.daraga_id")
      .leftJoin("job_title as T", "T.id", "DS.takhasos_id")
      .leftJoin("job_title as JT", "JT.id", "DS.job_title_id")
      .leftJoin("job_title as JTE", "JTE.id", "DS.job_title_edafy_id")
      .leftJoin("mohafza as MF", "MF.id", "DS.mohafza_id")
      .leftJoin("markaz as MK", "MK.id", "DS.markaz_id")
      .leftJoin("qualification as MT", "MT.id", "DS.moahel_tatwa_id")
      .leftJoin("qualification as HM", "HM.id", "DS.highest_moahel_id")
      .leftJoin("married_dobatsaf as MDS", "MDS.dabet_id", "DS.id")
      .select(
        "DS.*",
        "S.name as selah",
        "SK.name as selah_khedma",
        "W.name as wehda",
        "F.name as fea",
        "KS.name as khedma_status",
        "D.name as daraga",
        "T.name as takhasos",
        "JT.name as job_title",
        "JTE.name as job_title_edafy",
        "MF.name as mohafza",
        "MK.name as markaz",
        "MT.name as moahel_tatwa",
        "HM.name as highest_moahel",
        "MDS.marriage_date as marriage_date",
        "MDS.number_of_sons as number_of_sons"
      )
      .where({ "DS.fea_id": fea_id })
      .orderBy(["DS.id", "DS.rkmaskry"])
      .then((results: any[]) => {
        resolve(results);
      })
      .catch((err: SQLError | any) => {
        reject(err);
      });
  });
}

/**
 * Find dabet Saf By its id
 * @param id dobatSaf ID
 * @returns dobatSaf Object || Error Object
 */
export function findById(id: number) {
  return new Promise(async (resolve, reject) => {
    await db<DobatSaf>("dobat_saf as DS")
      .leftJoin("selah as S", "S.id", "DS.selah_id")
      .leftJoin("selah as SK", "SK.id", "DS.selah_khedma_id")
      .leftJoin("wehda as W", "W.id", "DS.wehda_id")
      .leftJoin("fea as F", "F.id", "DS.fea_id")
      .leftJoin("khedma_status as KS", "KS.id", "DS.khedma_id")
      .leftJoin("daraga as D", "D.id", "DS.daraga_id")
      .leftJoin("job_title as T", "T.id", "DS.takhasos_id")
      .leftJoin("job_title as JT", "JT.id", "DS.job_title_id")
      .leftJoin("job_title as JTE", "JTE.id", "DS.job_title_edafy_id")
      .leftJoin("mohafza as MF", "MF.id", "DS.mohafza_id")
      .leftJoin("markaz as MK", "MK.id", "DS.markaz_id")
      .leftJoin("qualification as MT", "MT.id", "DS.moahel_tatwa_id")
      .leftJoin("qualification as HM", "HM.id", "DS.highest_moahel_id")
      .leftJoin("married_dobatsaf as MDS", "MDS.dabet_id", "DS.id")
      .select(
        "DS.*",
        "S.name as selah",
        "SK.name as selah_khedma",
        "W.name as wehda",
        "F.name as fea",
        "KS.name as khedma_status",
        "D.name as daraga",
        "T.name as takhasos",
        "JT.name as job_title",
        "JTE.name as job_title_edafy",
        "MF.name as mohafza",
        "MK.name as markaz",
        "MT.name as moahel_tatwa",
        "HM.name as highest_moahel",
        "MDS.marriage_date as marriage_date",
        "MDS.number_of_sons as number_of_sons"
      )
      .where({ "DS.id": id })
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
 * Find Dabet Saf By Rkm Askry
 * @param rkmaskry
 * @returns
 */
export function findByRkmaskry(rkmaskry: string) {
  return new Promise(async (resolve, reject) => {
    await db<DobatSaf>("dobat_saf as DS")
      .leftJoin("selah as S", "S.id", "DS.selah_id")
      .leftJoin("selah as SK", "SK.id", "DS.selah_khedma_id")
      .leftJoin("wehda as W", "W.id", "DS.wehda_id")
      .leftJoin("fea as F", "F.id", "DS.fea_id")
      .leftJoin("khedma_status as KS", "KS.id", "DS.khedma_id")
      .leftJoin("daraga as D", "D.id", "DS.daraga_id")
      .leftJoin("job_title as T", "T.id", "DS.takhasos_id")
      .leftJoin("job_title as JT", "JT.id", "DS.job_title_id")
      .leftJoin("job_title as JTE", "JTE.id", "DS.job_title_edafy_id")
      .leftJoin("mohafza as MF", "MF.id", "DS.mohafza_id")
      .leftJoin("markaz as MK", "MK.id", "DS.markaz_id")
      .leftJoin("qualification as MT", "MT.id", "DS.moahel_tatwa_id")
      .leftJoin("qualification as HM", "HM.id", "DS.highest_moahel_id")
      .leftJoin("married_dobatsaf as MDS", "MDS.dabet_id", "DS.id")
      .select(
        "DS.*",
        "S.name as selah",
        "SK.name as selah_khedma",
        "W.name as wehda",
        "F.name as fea",
        "KS.name as khedma_status",
        "D.name as daraga",
        "T.name as takhasos",
        "JT.name as job_title",
        "JTE.name as job_title_edafy",
        "MF.name as mohafza",
        "MK.name as markaz",
        "MT.name as moahel_tatwa",
        "HM.name as highest_moahel",
        "MDS.marriage_date as marriage_date",
        "MDS.number_of_sons as number_of_sons"
      )
      .where({ "DS.rkmaskry": rkmaskry })
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
 * Update dabet Saf
 * @param id dabet Saf ID
 * @param data New Data
 * @returns Operation Result || Error Object
 */
export function updateDabetSaf(id: number, data: any) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let queries: any[] = [
          db<DobatSaf>("dobat_saf")
            .where({ id })
            .first()
            .update(
              (({ marriage_date, number_of_sons, ...rest }) => rest)(data)
            )
            .transacting(trx),
          db("married_dobatsaf")
            .where({
              dabet_id: id,
            })
            .first()
            .update({
              marriage_date: data.marriage_date,
              number_of_sons: data.number_of_sons,
            })
            .transacting(trx),
        ];

        return Promise.all(queries).then(trx.commit).catch(trx.rollback);
      })
      .then(function (values) {
        resolve(values);
      })
      .catch(function (error: SQLError | any) {
        reject(error);
      });
  });
}

/**
 * Delete dobatSaf
 * @param id dobatSaf ID
 * @returns Operation Result || Error Object
 */
export function deleteDabetSaf(id: number) {
  return new Promise(async (resolve, reject) => {
    await db
      .transaction(async (trx) => {
        let queries: any[] = [
          db("married_dobatsaf")
            .where({
              dabet_id: id,
            })
            .first()
            .delete()
            .transacting(trx),
          db<DobatSaf>("dobat_saf")
            .where({ id })
            .first()
            .delete()
            .transacting(trx),
        ];

        return Promise.all(queries).then(trx.commit).catch(trx.rollback);
      })
      .then(function (values) {
        resolve(values);
      })
      .catch(function (error: SQLError | any) {
        reject(error);
      });
  });
}
