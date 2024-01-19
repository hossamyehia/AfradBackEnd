import { Router } from "express";
import selahController from "./selah.controller";

const selahAPI = Router();

//  Get All Roles
selahAPI.route("/")
.get( selahController.getAsleha)
.post( selahController.addAsleha);

selahAPI.route("/add")
.post( selahController.validate, selahController.addSelah);

//  Get, Update, Delete Specific Role
selahAPI.route("/:id")
.get( selahController.getById )
.put( selahController.filterBody, selahController.editSelah )
.delete( selahController.removeSelah );

export default selahAPI;