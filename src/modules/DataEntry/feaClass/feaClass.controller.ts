import { NextFunction, Request, Response } from "express";
import {
  find,
  insertOne,
  insertMany,
  findById,
  deleteFeaClass,
  updateFeaClass,
} from "./feaClass.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../shared/utils";
import HttpException from "../../../shared/models/HttpException.model";

/**
 * Add Fea Class
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addFeaClass(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.name)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Fea Classes
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addFeaClasses(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Fea Classes
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getFeaClasses(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Fea Class By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Class Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Fea Class
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editFeaClass(req: Request, res: Response, next: NextFunction) {
  updateFeaClass(
    parseInt(req.params.id),
    req.body
  )
    .then((result) => {
      if (!result) return next(new HttpException(404, "Class Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Fea Class
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeFeaClass(req: Request, res: Response, next: NextFunction) {
  deleteFeaClass(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Class Not Found"));
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

const errMessage = centralizedErrMsgs("Fea Class");

export default {
  addFeaClass,
  addFeaClasses,
  editFeaClass,
  removeFeaClass,
  getFeaClasses,
  getById,
  validate,
  filterBody,
};
