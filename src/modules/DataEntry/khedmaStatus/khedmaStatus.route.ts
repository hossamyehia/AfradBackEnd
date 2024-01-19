import { Router } from "express";
import khedmaStatusController from "./khedmaStatus.controller";

const khedmaStatusAPI = Router();

//  Get All Roles
khedmaStatusAPI.route("/")
.get( khedmaStatusController.getKhedmaStatuses)
.post( khedmaStatusController.addKhedmaStatuses);

khedmaStatusAPI.route("/add")
.post( khedmaStatusController.validate, khedmaStatusController.addKhedmaStatus);

//  Get, Update, Delete Specific Role
khedmaStatusAPI.route("/:id")
.get( khedmaStatusController.getById )
.put( khedmaStatusController.filterBody, khedmaStatusController.editKhedmaStatus )
.delete( khedmaStatusController.removeKhedmaStatus );

export default khedmaStatusAPI;