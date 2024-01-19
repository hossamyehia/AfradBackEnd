import { Router } from "express";
import selahClassController from "./selahClass.controller";

const selahClassAPI = Router();

//  Get All Roles
selahClassAPI.route("/")
.get( selahClassController.getSelahClasses)
.post( selahClassController.addSelahClasses);

selahClassAPI.route("/add")
.post( selahClassController.validate, selahClassController.addSelahClass);

//  Get, Update, Delete Specific Role
selahClassAPI.route("/:id")
.get( selahClassController.getById )
.put( selahClassController.filterBody, selahClassController.editSelahClass )
.delete( selahClassController.removeSelahClass );

export default selahClassAPI;