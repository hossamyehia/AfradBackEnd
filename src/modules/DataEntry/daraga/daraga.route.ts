import { Router } from "express";
import daragaController from "./daraga.controller";

const daragaAPI = Router();

//  Get All Roles
daragaAPI.route("/")
.get( daragaController.getDaragat)
.post( daragaController.addDaragat);

daragaAPI.route("/add")
.post( daragaController.validate, daragaController.addDaraga);

//  Get, Update, Delete Specific Role
daragaAPI.route("/:id")
.get( daragaController.getById )
.put( daragaController.filterBody, daragaController.editDaraga )
.delete( daragaController.removeDaraga );

export default daragaAPI;