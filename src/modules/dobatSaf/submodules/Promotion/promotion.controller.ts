import { NextFunction, Request, Response } from "express";
import {
  find,
  findById,
  insertOne,
  insertMany,
  deletePromotion,
  updatePromotion,
  findByDabet,
} from "./promotion.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../../shared/utils";
import HttpException from "../../../../shared/models/HttpException.model";
import SQLError from "../../../../shared/models/SQLError.model";

/**
 * Add New Promotion
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addPromotion(req: Request, res: Response, next: NextFunction) {
  insertOne(req.body.daraga_id, req.body.dabet_id, req.body.promotion_date)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Add Promotions
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addPromotions(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Promotions
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getPromotions(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Promotion By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Promotion Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Promotion By Dabet Id
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
 * Edit Promotion
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editPromotion(req: Request, res: Response, next: NextFunction) {
  updatePromotion(parseInt(req.params.id), req.body)
    .then((result) => {
      if (!result) return next(new HttpException(404, "Promotion Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Promotion
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removePromotion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  deletePromotion(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Promotion Not Found"));
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
  if (!validateKeys(req.body, ["daraga_id", "promotion_date", "dabet_id"]))
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
  filterObject(req.body, ["daraga_id", "promotion_date", "dabet_id"]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Promotion");

export default {
  addPromotion,
  addPromotions,
  editPromotion,
  removePromotion,
  getPromotions,
  getByDabet,
  getById,
  validate,
  filterBody,
};
