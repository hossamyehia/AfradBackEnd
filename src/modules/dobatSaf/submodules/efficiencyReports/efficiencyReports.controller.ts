import { NextFunction, Request, Response } from "express";
import {
  find,
  findById,
  insertOne,
  insertMany,
  deleteEfficiencyReport,
  updateEfficiencyReport,
  findByDabet,
} from "./efficiencyReports.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../../shared/utils";
import HttpException from "../../../../shared/models/HttpException.model";
import SQLError from "../../../../shared/models/SQLError.model";

/**
 * Add New Efficiency Reports
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addEfficiencyReport(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.year, req.body.degree, req.body.dabet_id)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Efficiency Reports
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addEfficiencyReports(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All EfficiencyReportss
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getEfficiencyReports(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get EfficiencyReports By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "EfficiencyReports Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Efficiency Reports By Dabet Id
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
 * Edit Efficiency Reports
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editEfficiencyReport(req: Request, res: Response, next: NextFunction) {
  updateEfficiencyReport(parseInt(req.params.id), req.body)
    .then((result) => {
      if (!result) return next(new HttpException(404, "Efficiency Reports Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove EfficiencyReports
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeEfficiencyReport(
  req: Request,
  res: Response,
  next: NextFunction
) {
  deleteEfficiencyReport(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Efficiency Reports Not Found"));
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
  if (!validateKeys(req.body, ["year", "degree", "dabet_id"]))
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
  filterObject(req.body, ["year", "degree", "dabet_id"]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Efficiency Reports");

export default {
  addEfficiencyReport,
  addEfficiencyReports,
  editEfficiencyReport,
  removeEfficiencyReport,
  getEfficiencyReports,
  getByDabet,
  getById,
  validate,
  filterBody,
};
