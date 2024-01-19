import { Router } from "express";
import markazController from "./markaz.controller";

const markazAPI = Router();

//  Get All Roles
markazAPI.route("/")
.get( markazController.getMarakz)
.post( markazController.addMarakz);

markazAPI.route("/add")
.post( markazController.validate, markazController.addMarkaz);

markazAPI.route("/mohafza/:id")
.get( markazController.getByMohafza );

//  Get, Update, Delete Specific Role
markazAPI.route("/:id")
.get( markazController.getById )
.put( markazController.filterBody, markazController.editMarkaz )
.delete( markazController.removeMarkaz );

export default markazAPI;