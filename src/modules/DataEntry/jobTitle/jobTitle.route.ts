import { Router } from "express";
import jobTitleController from "./jobTitle.controller";

const jobTitleAPI = Router();

//  Get All, Post Many
jobTitleAPI.route("/")
.get( jobTitleController.getJobTitles)
.post( jobTitleController.addJobTitles);

jobTitleAPI.route("/add")
.post( jobTitleController.validate, jobTitleController.addJobTitle);

//  Get, Update, Delete Specific Title
jobTitleAPI.route("/:id")
.get( jobTitleController.getById )
.put( jobTitleController.filterBody, jobTitleController.editJobTitle )
.delete( jobTitleController.removeJobTitle );

export default jobTitleAPI;