import { Router } from "express";
import feaController from "./fea.controller";

const feaAPI = Router();

//  Get All Roles
feaAPI.route("/")
.get( feaController.getFeaat)
.post( feaController.addFeaat);

feaAPI.route("/add")
.post( feaController.validate, feaController.addFea);

//  Get, Update, Delete Specific Role
feaAPI.route("/:id")
.get( feaController.getById )
.put( feaController.filterBody, feaController.editFea )
.delete( feaController.removeFea );

export default feaAPI;