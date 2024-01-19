import { Router } from "express";
import crimeTypeController from "./crimeType.controller";

const crimeTypeAPI = Router();

//  Get All Roles
crimeTypeAPI.route("/")
.get( crimeTypeController.getCrimeTypes)
.post( crimeTypeController.addCrimeTypes);

crimeTypeAPI.route("/add")
.post( crimeTypeController.validate, crimeTypeController.addCrimeType);

//  Get, Update, Delete Specific Role
crimeTypeAPI.route("/:id")
.get( crimeTypeController.getById )
.put( crimeTypeController.filterBody, crimeTypeController.editCrimeType )
.delete( crimeTypeController.removeCrimeType );

export default crimeTypeAPI;