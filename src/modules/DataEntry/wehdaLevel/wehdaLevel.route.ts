import { Router } from "express";
import wehdaLevelController from "./wehdaLevel.controller";

const wehdaLevelAPI = Router();

//  Get All Roles
wehdaLevelAPI.route("/")
.get( wehdaLevelController.getWehdaLevels)
.post( wehdaLevelController.addWehdaLevels);

wehdaLevelAPI.route("/add")
.post( wehdaLevelController.validate, wehdaLevelController.addWehdaLevel);

//  Get, Update, Delete Specific Role
wehdaLevelAPI.route("/:id")
.get( wehdaLevelController.getById )
.put( wehdaLevelController.filterBody, wehdaLevelController.editWehdaLevel )
.delete( wehdaLevelController.removeWehdaLevel );

export default wehdaLevelAPI;