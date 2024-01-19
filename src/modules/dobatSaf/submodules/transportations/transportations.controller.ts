import { NextFunction, Request, Response } from "express";
import {
  find,
  findById,
  insertOne,
  insertMany,
  deleteTransportation,
  updateTransportation,
  findByDabet,
} from "./transportations.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../../shared/utils";
import HttpException from "../../../../shared/models/HttpException.model";
import SQLError from "../../../../shared/models/SQLError.model";

/**
 * Add New Transportation
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addTransportation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  insertOne(
    req.body.approval_number,
    req.body.approval_date,
    req.body.from_id,
    req.body.to_id,
    req.body.done_date,
    req.body.selah_id,
    req.body.dabet_id
  )
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Transportation
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addTransportations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Transportationss
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getTransportations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Transportations By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result)
        return next(new HttpException(404, "Transportations Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Transportation By Dabet Id
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
 * Edit Transportation
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editTransportation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  updateTransportation(parseInt(req.params.id), req.body)
    .then((result) => {
      if (!result)
        return next(new HttpException(404, "Transportation Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Transportations
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeTransportation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  deleteTransportation(parseInt(req.params.id))
    .then((result) => {
      if (!result)
        return next(new HttpException(404, "Transportation Not Found"));
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
      "approval_number",
      "approval_date",
      "from_id",
      "to_id",
      "done_date",
      "selah_id",
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
    "approval_number",
    "approval_date",
    "from_id",
    "to_id",
    "done_date",
    "selah_id",
    "dabet_id",
  ]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Transportation");

export default {
  addTransportation,
  addTransportations,
  editTransportation,
  removeTransportation,
  getTransportations,
  getByDabet,
  getById,
  validate,
  filterBody,
};
