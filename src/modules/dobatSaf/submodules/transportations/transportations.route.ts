import { Router } from "express";
import transportationController from "./transportations.controller";

const transportationAPI = Router();

//  Get All Roles
transportationAPI.route("/")
.get( transportationController.getTransportations)
.post( transportationController.addTransportations);

transportationAPI.route("/add")
.post( transportationController.validate, transportationController.addTransportation);

//  Get, Update, Delete Specific ID
transportationAPI.route("/:id")
.get( transportationController.getById )
.put( transportationController.filterBody, transportationController.editTransportation )
.delete( transportationController.removeTransportation );

//  Get, Update, Delete Specific Role
transportationAPI.route("/dabet/:id")
.get( transportationController.getByDabet )

export default transportationAPI;