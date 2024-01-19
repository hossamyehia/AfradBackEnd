import { NextFunction, Request, Response } from "express";
import {
  find,
  findById,
  insertOne,
  insertMany,
  deleteMission,
  updateMission,
  findByDabet,
} from "./missions.service";
import {
  centralizedErrMsgs,
  filterObject,
  handleResponse,
  validateKeys,
} from "../../../../shared/utils";
import HttpException from "../../../../shared/models/HttpException.model";
import SQLError from "../../../../shared/models/SQLError.model";

/**
 * Add New Mission
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addMission(req: Request, res: Response, next: NextFunction) {
  insertOne(
    req.body.destination,
    req.body.approval_date,
    req.body.approval_number,
    req.body.from,
    req.body.to,
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
 * Add Mission
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function addMissions(req: Request, res: Response, next: NextFunction) {
  insertMany(req.body)
    .then((done: any) => {
      handleResponse(res, 201, true, "Added Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get All Missionss
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getMissions(req: Request, res: Response, next: NextFunction) {
  find()
    .then((results: any) => {
      handleResponse(res, 200, true, "Retrieved Successfully", results);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Missions By Id
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function getById(req: Request, res: Response, next: NextFunction) {
  findById(parseInt(req.params.id))
    .then((result: any) => {
      if (!result) return next(new HttpException(404, "Mission Not Found"));
      handleResponse(res, 200, true, "Retrieved Successfully", [result]);
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Get Mission By Dabet Id
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
 * Edit Mission
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function editMission(req: Request, res: Response, next: NextFunction) {
  updateMission(parseInt(req.params.id), req.body)
    .then((result) => {
      if (!result) return next(new HttpException(404, "Mission Not Found"));
      handleResponse(res, 200, true, "Updated Successfully");
    })
    .catch((err: SQLError) => {
      next(new HttpException(...errMessage(err)));
    });
}

/**
 * Remove Missions
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function removeMission(req: Request, res: Response, next: NextFunction) {
  deleteMission(parseInt(req.params.id))
    .then((result) => {
      if (!result) return next(new HttpException(404, "Mission Not Found"));
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
      "destination",
      "approval_date",
      "approval_number",
      "from",
      "to",
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
    "destination",
    "approval_date",
    "approval_number",
    "from",
    "to",
  ]).then((body: any) => {
    if (!Object.keys(body).length)
      return next(new HttpException(400, "There is no Data To Update"));
    req.body = body;
    next();
  });
}

const errMessage = centralizedErrMsgs("Mission");

export default {
  addMission,
  addMissions,
  editMission,
  removeMission,
  getMissions,
  getByDabet,
  getById,
  validate,
  filterBody,
};
