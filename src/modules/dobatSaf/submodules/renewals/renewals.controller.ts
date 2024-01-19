import { NextFunction, Request, Response } from "express";
import {
  find,
  findById,
  insertOne,
  insertMany,
  deleteRenewal,
  updateRenewal,
  findByDabet,
} from "./renewals.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../../shared/utils";
import HttpException from "../../../../shared/models/HttpException.model";
import SQLError from "../../../../shared/models/SQLError.model";

/**
 * Add New Renewal
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addRenewal(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.from, req.body.to, req.body.publish_date, req.body.recommendation, req.body.period, req.body.dabet_id, req.body.reason)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Renewals
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addRenewals(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Renewals
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getRenewals(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Renewal By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Renewal Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Renewal By Dabet Id
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
 * Edit Renewal
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editRenewal(req: Request, res: Response, next: NextFunction) {
  updateRenewal(parseInt(req.params.id), req.body)
    .then((result) => {
      if (!result) return next(new HttpException(404, "Renewal Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Renewal
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeRenewal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  deleteRenewal(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Renewal Not Found"));
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
  if (!validateKeys(req.body, ["from", "to", "publish_date", "recommendation", "period", "dabet_id"]))
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
  filterObject(req.body, ["from", "to", "publish_date", "recommendation", "period", "dabet_id", "reason"]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Renewal");

export default {
  addRenewal,
  addRenewals,
  editRenewal,
  removeRenewal,
  getRenewals,
  getByDabet,
  getById,
  validate,
  filterBody,
};
