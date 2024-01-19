import { NextFunction, Request, Response } from "express";
import {
  find,
  findById,
  insertOne,
  insertMany,
  deleteSanction,
  updateSanction,
  findByDabet,
} from "./sanctions.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../../shared/utils";
import HttpException from "../../../../shared/models/HttpException.model";
import SQLError from "../../../../shared/models/SQLError.model";

/**
 * Add New Sanction
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addSanction(req: Request, res: Response, next: NextFunction) {
  insertOne(
    req.body.type_id,
    req.body.decision_id,
    req.body.crime_date,
    req.body.evidance_date,
    req.body.description,
    req.body.dabet_id,
    req.body.absence_from,
    req.body.absence_to,
    req.body.imprisoned_from,
    req.body.imprisoned_to
  )
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Sanctions
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addSanctions(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Sanctions
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getSanctions(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Sanction By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Sanction Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Sanction By Dabet Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getByDabet(req: Request, res: Response, next: NextFunction) {
  findByDabet(parseInt(req.params.id))
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Sanction
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editSanction(req: Request, res: Response, next: NextFunction) {
  updateSanction(parseInt(req.params.id), req.body)
    .then((result) => {
      if (!result) return next(new HttpException(404, "Sanction Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Sanction
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeSanction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  deleteSanction(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Sanction Not Found"));
      handleResponse(res, 200, true, "Deleted Successfully");
    })
    .catch((err: SQLError) => {
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
      "type_id",
      "decision_id",
      "crime_date",
      "evidance_date",
      "description",
      "dabet_id",
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
    "type_id",
    "decision_id",
    "crime_date",
    "evidance_date",
    "description",
    "dabet_id",
    "absence_from",
    "absence_to",
    "imprisoned_from",
    "imprisoned_to",
  ]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Sanction");

export default {
  addSanction,
  addSanctions,
  editSanction,
  removeSanction,
  getSanctions,
  getByDabet,
  getById,
  validate,
  filterBody,
};
