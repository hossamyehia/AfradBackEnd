import { NextFunction, Request, Response } from "express";
import {
  find,
  insertOne,
  insertMany,
  findById,
  deleteWehdaLevel,
  updateWehdaLevel,
} from "./wehdaLevel.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../shared/utils";
import HttpException from "../../../shared/models/HttpException.model";

/**
 * Add Wehda Level
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addWehdaLevel(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.name)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Wehda Levels
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addWehdaLevels(
  req: Request,
  res: Response,
  next: NextFunction
) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Wehda Levels
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getWehdaLevels(
  req: Request,
  res: Response,
  next: NextFunction
) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Wehda Level By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Wehda Level Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Wehda Level
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editWehdaLevel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  updateWehdaLevel(
    parseInt(req.params.id),
    req.body
  )
    .then((result) => {
      if (!result) return next(new HttpException(404, "Wehda Level Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Wehda Level
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeWehdaLevel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  deleteWehdaLevel(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Wehda Level Not Found"));
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
  if (!validateKeys(req.body, ["name"]))
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
  filterObject(req.body, ["name"]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Wehda Level");

export default {
  addWehdaLevel,
  addWehdaLevels,
  editWehdaLevel,
  removeWehdaLevel,
  getWehdaLevels,
  getById,
  validate,
  filterBody,
};
