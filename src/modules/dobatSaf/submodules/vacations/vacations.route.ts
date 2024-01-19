import { Router } from "express";
import vacationController from "./vacations.controller";

const vacationAPI = Router();

//  Get All Roles
vacationAPI.route("/")
.get( vacationController.getVacations)
.post( vacationController.addVacations);

vacationAPI.route("/add")
.post( vacationController.validate, vacationController.addVacation);

//  Get, Update, Delete Specific ID
vacationAPI.route("/:id")
.get( vacationController.getById )
.put( vacationController.filterBody, vacationController.editVacation )
.delete( vacationController.removeVacation );

//  Get, Update, Delete Specific Role
vacationAPI.route("/dabet/:id")
.get( vacationController.getByDabet )

export default vacationAPI;