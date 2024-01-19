import { Router } from "express";
import mohafzaController from "./mohafza.controller";

const mohafzaAPI = Router();

//  Get All, Post Many
mohafzaAPI.route("/")
.get( mohafzaController.getMohafzat)
.post( mohafzaController.addMohafzat);

mohafzaAPI.route("/add")
.post( mohafzaController.validate, mohafzaController.addMohafza);

//  Get, Update, Delete Specific Title
mohafzaAPI.route("/:id")
.get( mohafzaController.getById )
.put( mohafzaController.filterBody, mohafzaController.editMohafza )
.delete( mohafzaController.removeMohafza );

export default mohafzaAPI;