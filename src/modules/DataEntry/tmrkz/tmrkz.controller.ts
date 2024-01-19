import { NextFunction, Request, Response } from "express";
import {
  find,
  insertOne,
  insertMany,
  findById,
  deleteMantekatTmrkz,
  updateMantekatTmrkz,
} from "./tmrkz.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../shared/utils";
import HttpException from "../../../shared/models/HttpException.model";

/**
 * Add Mantekat Tmrkz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addMantekatTmrkz(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.name)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Manatek Tmrkz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addManatekTmrkz(
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
 * Get All Manatek Tmrkz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getManatekTmrkz(
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
 * Get Mantekat Tmrkz By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Manatek Tmrkz Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Mantekat Tmrkz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editMantekatTmrkz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  updateMantekatTmrkz(
    parseInt(req.params.id),
    req.body
  )
    .then((result) => {
      if (!result) return next(new HttpException(404, "Manatek Tmrkz Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Mantekat Tmrkz
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeMantekatTmrkz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  deleteMantekatTmrkz(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Manatek Tmrkz Not Found"));
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

const errMessage = centralizedErrMsgs("Mantekat Tmrkz");

export default {
  addMantekatTmrkz,
  addManatekTmrkz,
  editMantekatTmrkz,
  removeMantekatTmrkz,
  getManatekTmrkz,
  getById,
  validate,
  filterBody,
};
