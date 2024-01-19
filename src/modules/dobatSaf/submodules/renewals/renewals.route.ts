import { Router } from "express";
import renewalController from "./renewals.controller";

const renewalAPI = Router();

//  Get All Roles
renewalAPI.route("/")
.get( renewalController.getRenewals)
.post( renewalController.addRenewals);

renewalAPI.route("/add")
.post( renewalController.validate, renewalController.addRenewal);

//  Get, Update, Delete Specific ID
renewalAPI.route("/:id")
.get( renewalController.getById )
.put( renewalController.filterBody, renewalController.editRenewal )
.delete( renewalController.removeRenewal );

//  Get, Update, Delete Specific Role
renewalAPI.route("/dabet/:id")
.get( renewalController.getByDabet )

export default renewalAPI;