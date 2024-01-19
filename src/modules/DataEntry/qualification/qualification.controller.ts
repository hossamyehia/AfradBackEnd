import { NextFunction, Request, Response } from "express";
import {
  find,
  insertOne,
  insertMany,
  findById,
  deleteQualification,
  updateQualification,
} from "./qualification.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../shared/utils";
import HttpException from "../../../shared/models/HttpException.model";

/**
 * Add Qualification
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addQualification(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.name)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Qualifications
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addQualifications(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Qualifications
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getQualifications(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Qualification By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Title Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Qualification
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editQualification(req: Request, res: Response, next: NextFunction) {
  updateQualification(
    parseInt(req.params.id),
    req.body
  )
    .then((result) => {
      if (!result) return next(new HttpException(404, "Qualification Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Qualification
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeQualification(req: Request, res: Response, next: NextFunction) {
  deleteQualification(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Qualification Not Found"));
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

const errMessage = centralizedErrMsgs("Qualification");

export default {
  addQualification,
  addQualifications,
  editQualification,
  removeQualification,
  getQualifications,
  getById,
  validate,
  filterBody,
};
