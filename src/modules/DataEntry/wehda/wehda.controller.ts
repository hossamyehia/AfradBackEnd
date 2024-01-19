import { NextFunction, Request, Response } from "express";
import {
  find,
  insertOne,
  insertMany,
  findById,
  deleteWehda,
  updateWehda,
} from "./wehda.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../shared/utils";
import HttpException from "../../../shared/models/HttpException.model";

/**
 * Add Wehda
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addWehda(req: Request, res: Response, next: NextFunction) {
  insertOne(
    req.body.name,
    req.body.ehsa,
    req.body.nesba,
    req.body.mrtb_code,
    req.body.code_tnz,
    req.body.cod_tabaa,
    req.body.level,
    req.body.tmrkz_id,
    req.body.b_code,
    req.body.r_code
  )
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Wehdaat
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addWehdaat(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Wehdaat
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getWehdaat(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: Error) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Wehda By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Wehda Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Edit Wehda
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editWehda(req: Request, res: Response, next: NextFunction) {
  updateWehda(parseInt(req.params.id), req.body)
    .then((result) => {
      if (!result) return next(new HttpException(404, "Wehda Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Wehda
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeWehda(req: Request, res: Response, next: NextFunction) {
  deleteWehda(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Fea Not Found"));
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
  if (
    !validateKeys(req.body, [
      "name",
      "ehsa",
      "nesba",
      "mrtb_code",
      "code_tnz",
      "cod_tabaa",
      "level",
      "tmrkz_id",
      "b_code",
      "r_code",
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
    "name",
    "ehsa",
    "nesba",
    "mrtb_code",
    "code_tnz",
    "cod_tabaa",
    "level",
    "tmrkz_id",
    "b_code",
    "r_code",
  ]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Wehda");

export default {
  addWehda,
  addWehdaat,
  editWehda,
  removeWehda,
  getWehdaat,
  getById,
  validate,
  filterBody,
};
