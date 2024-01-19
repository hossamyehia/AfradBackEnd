import { NextFunction, Request, Response } from "express";
import {
  find,
  findById,
  insertOne,
  insertMany,
  deleteDaraga,
  updateDaraga,
} from "./daraga.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../shared/utils";
import HttpException from "../../../shared/models/HttpException.model";
import SQLError from "../../../shared/models/SQLError.model";

/**
 * Add New Daraga
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addDaraga(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.name, req.body.sort_order)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Daragat
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addDaragat(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Daragat
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getDaragat(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Daraga By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Daraga Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Daraga
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editDaraga(req: Request, res: Response, next: NextFunction) {
  updateDaraga(
    parseInt(req.params.id),
    req.body
  )
    .then((result) => {
      if (!result) return next(new HttpException(404, "Daraga Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Daraga
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeDaraga(req: Request, res: Response, next: NextFunction) {
  deleteDaraga(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Daraga Not Found"));
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
  if (!validateKeys(req.body, ["name", "sort_order"]))
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
  filterObject(req.body, ["name", "sort_order"]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Daraga");

export default {
  addDaraga,
  addDaragat,
  editDaraga,
  removeDaraga,
  getDaragat,
  getById,
  validate,
  filterBody,
};
