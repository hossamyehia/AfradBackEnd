import { NextFunction, Request, Response } from "express";
import {
  insertOne,
  findById,
  findByRkmaskry,
  find,
  findBySelah,
  findByDaraga,
  findByWehda,
  findByFea,
  deleteDabetSaf,
  updateDabetSaf,
} from "./dobatSaf.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../shared/utils";
import HttpException from "../../shared/models/HttpException.model";

/**
 * Add Dabet Saf
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addDabetSaf(req: Request, res: Response, next: NextFunction) {
  insertOne(
    req.body.rkmaskry,
    req.body.name,
    req.body.birth_date,
    req.body.religion,
    req.body.blood,
    req.body.marital_state,
    req.body.mohafza_id,
    req.body.markaz_id,
    req.body.address,
    req.body.nearest,
    req.body.address2,
    req.body.fea_id,
    req.body.khedma_id,
    req.body.daraga_id,
    req.body.taraky_date,
    req.body.tatwa_date,
    req.body.moahel_tatwa_id,
    req.body.highest_moahel_id,
    req.body.rateb3aly_date,
    req.body.selah_id,
    req.body.selah_khedma_id,
    req.body.wehda_id,
    req.body.join_date,
    req.body.takhasos_id,
    req.body.job_title_id,
    req.body.job_title_edafy_id,
    req.body.marriage_date,
    req.body.number_of_sons
  )
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Dabet Saf By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Dabet Saf Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Dabet Saf By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getByRkmAskry(req: Request, res: Response, next: NextFunction) {
  findByRkmaskry(req.params.Rkmaskry)
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Dabet Saf Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All dobat Saf
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getDobatSaf(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Dobat Saf In Specific Selah
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getBySelah(req: Request, res: Response, next: NextFunction) {
  findBySelah(parseInt(req.params.id))
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Dobat Saf In Specific Wehda
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getByWehda(req: Request, res: Response, next: NextFunction) {
  findByWehda(parseInt(req.params.id))
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Dobat Saf In Specific Daraga
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getByDaraga(req: Request, res: Response, next: NextFunction) {
  findByDaraga(parseInt(req.params.id))
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Dobat Saf In Specific Fea
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getByFea(req: Request, res: Response, next: NextFunction) {
  findByFea(parseInt(req.params.id))
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Dabet Saf
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editDabetSaf(req: Request, res: Response, next: NextFunction) {
  updateDabetSaf(parseInt(req.params.id), req.body)
    .then((result) => {
      if (!result) return next(new HttpException(404, "Dabet Saf Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Dabet Saf
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeDabetSaf(
  req: Request,
  res: Response,
  next: NextFunction
) {
  deleteDabetSaf(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Dabet Saf Not Found"));
      handleResponse(res, 200, true, "Deleted Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Validate All Input Existant
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function validate(req: Request, res: Response, next: NextFunction) {
  if (
    !validateKeys(req.body, [
      "rkmaskry",
      "name",
      "birth_date",
      "religion",
      "blood",
      "marital_state",
      "mohafza_id",
      "markaz_id",
      "address",
      "nearest",
      "address2",
      "fea_id",
      "daraga_id",
      "taraky_date",
      "tatwa_date",
      "moahel_tatwa_id",
      "highest_moahel_id",
      "rateb3aly_date",
      "selah_id",
      "selah_khedma_id",
      "wehda_id",
      "join_date",
      "takhasos_id",
      "job_title_id",
      "job_title_edafy_id",
    ])
  )
    next(new HttpException(422, "Please Fill All Inputs"));
  next();
}

/**
 * Filter Body
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function filterBody(req: Request, res: Response, next: NextFunction) {
  filterObject(req.body, [
    "rkmaskry",
    "name",
    "birth_date",
    "religion",
    "blood",
    "marital_state",
    "mohafza_id",
    "markaz_id",
    "address",
    "nearest",
    "address2",
    "fea_id",
    "daraga_id",
    "taraky_date",
    "tatwa_date",
    "moahel_tatwa_id",
    "highest_moahel_id",
    "rateb3aly_date",
    "selah_id",
    "selah_khedma_id",
    "wehda_id",
    "join_date",
    "takhasos_id",
    "job_title_id",
    "job_title_edafy_id",
    "rkmakdmia",
    "marriage_date",
    "number_of_sons"
  ]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Dabet Saf");

export default {
  addDabetSaf,
  editDabetSaf,
  removeDabetSaf,
  getDobatSaf,
  getBySelah,
  getByWehda,
  getByDaraga,
  getByFea,
  getById,
  getByRkmAskry,
  validate,
  filterBody,
};
