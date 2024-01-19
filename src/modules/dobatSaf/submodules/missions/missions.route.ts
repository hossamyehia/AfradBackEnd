import { Router } from "express";
import nissionController from "./missions.controller";

const missionAPI = Router();

//  Get All Roles
missionAPI.route("/")
.get( nissionController.getMissions)
.post( nissionController.addMissions);

missionAPI.route("/add")
.post( nissionController.validate, nissionController.addMission);

//  Get, Update, Delete Specific ID
missionAPI.route("/:id")
.get( nissionController.getById )
.put( nissionController.filterBody, nissionController.editMission )
.delete( nissionController.removeMission );

//  Get, Update, Delete Specific Role
missionAPI.route("/dabet/:id")
.get( nissionController.getByDabet )

export default missionAPI;