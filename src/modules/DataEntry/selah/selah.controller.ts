import { NextFunction, Request, Response } from "express";
import {
  find,
  insertOne,
  insertMany,
  findById,
  deleteSelah,
  updateSelah,
} from "./selah.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../shared/utils";
import HttpException from "../../../shared/models/HttpException.model";

/**
 * Add Selah
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addSelah(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.name, req.body.class_id)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Asleha
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addAsleha(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Selahat
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getAsleha(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Selah By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Selah Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Selah
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editSelah(req: Request, res: Response, next: NextFunction) {
  updateSelah(
    parseInt(req.params.id),
    req.body
  )
    .then((result) => {
      if (!result) return next(new HttpException(404, "Selah Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Selah
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeSelah(req: Request, res: Response, next: NextFunction) {
  deleteSelah(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Selah Not Found"));
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
  if (!validateKeys(req.body, ["name", "class_id"]))
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
  filterObject(req.body, ["name", "class_id"]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Selah");

export default {
  addSelah,
  addAsleha,
  editSelah,
  removeSelah,
  getAsleha,
  getById,
  validate,
  filterBody,
};
