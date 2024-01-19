import { Router } from "express";
import crimeSanctionController from "./crimeSanction.controller";

const crimeSanctionAPI = Router();

//  Get All Roles
crimeSanctionAPI.route("/")
.get( crimeSanctionController.getCrimeSanctions)
.post( crimeSanctionController.addCrimeSanctions);

crimeSanctionAPI.route("/add")
.post( crimeSanctionController.validate, crimeSanctionController.addCrimeSanction);

//  Get, Update, Delete Specific Role
crimeSanctionAPI.route("/:id")
.get( crimeSanctionController.getById )
.put( crimeSanctionController.filterBody, crimeSanctionController.editCrimeSanction )
.delete( crimeSanctionController.removeCrimeSanction );

export default crimeSanctionAPI;