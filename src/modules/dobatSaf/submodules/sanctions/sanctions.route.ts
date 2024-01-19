import { Router } from "express";
import sanctionController from "./sanctions.controller";

const sanctionAPI = Router();

//  Get All
sanctionAPI.route("/")
.get( sanctionController.getSanctions)
.post( sanctionController.addSanctions);

sanctionAPI.route("/add")
.post( sanctionController.validate, sanctionController.addSanction);

//  Get, Update, Delete Specific ID
sanctionAPI.route("/:id")
.get( sanctionController.getById )
.put( sanctionController.filterBody, sanctionController.editSanction )
.delete( sanctionController.removeSanction );

//  Get, Update, Delete Specific Role
sanctionAPI.route("/dabet/:id")
.get( sanctionController.getByDabet )

export default sanctionAPI;