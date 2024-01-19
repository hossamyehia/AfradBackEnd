import { Router } from "express";
import qualificationController from "./qualification.controller";

const qualificationAPI = Router();

//  Get All, Post Many
qualificationAPI.route("/")
.get( qualificationController.getQualifications)
.post( qualificationController.addQualifications);

qualificationAPI.route("/add")
.post( qualificationController.validate, qualificationController.addQualification);

//  Get, Update, Delete Specific Title
qualificationAPI.route("/:id")
.get( qualificationController.getById )
.put( qualificationController.filterBody, qualificationController.editQualification )
.delete( qualificationController.removeQualification );

export default qualificationAPI;