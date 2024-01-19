import { NextFunction, Request, Response } from "express";
import {
  find,
  insertOne,
  insertMany,
  findById,
  deleteMarkaz,
  updateMarkaz,
  findByMohafza,
} from "./markaz.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../shared/utils";
import HttpException from "../../../shared/models/HttpException.model";

/**
 * Add Markaz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addMarkaz(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.name, req.body.mohafza_id)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Marakaz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addMarakz(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Marakz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getMarakz(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Marakaz By Mohafza
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getByMohafza(req: Request, res: Response, next: NextFunction) {
    findByMohafza(parseInt(req.params.id))
      .then((results: any) => {
        handleResponse(res, 200, true, "Retrieved Successfully", results);
      })
      .catch((err: Error) => {
        next(new HttpException(...errMessage(err)));
      });
  }

/**
 * Get Markaz By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Markaz Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Markaz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editMarkaz(req: Request, res: Response, next: NextFunction) {
  updateMarkaz(
    parseInt(req.params.id),
    req.body
  )
    .then((result) => {
      if (!result) return next(new HttpException(404, "Markaz Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Markaz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeMarkaz(req: Request, res: Response, next: NextFunction) {
  deleteMarkaz(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Markaz Not Found"));
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
  if (!validateKeys(req.body, ["name", "mohafza_id"]))
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
  filterObject(req.body, ["name", "mohafza_id"]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Markaz");

export default {
  addMarkaz,
  addMarakz,
  editMarkaz,
  removeMarkaz,
  getMarakz,
  getById,
  getByMohafza,
  validate,
  filterBody,
};
