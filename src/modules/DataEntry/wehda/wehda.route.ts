import { Router } from "express";
import WehdaController from "./wehda.controller";

const WehdaAPI = Router();

//  Get All Roles
WehdaAPI.route("/")
.get( WehdaController.getWehdaat)
.post( WehdaController.addWehdaat);

WehdaAPI.route("/add")
.post( WehdaController.validate, WehdaController.addWehda);

//  Get, Update, Delete Specific Role
WehdaAPI.route("/:id")
.get( WehdaController.getById )
.put( WehdaController.filterBody, WehdaController.editWehda )
.delete( WehdaController.removeWehda );

export default WehdaAPI;