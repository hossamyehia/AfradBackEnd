import { Router } from "express";
import feaClassController from "./feaClass.controller";

const feaClassAPI = Router();

//  Get All Roles
feaClassAPI.route("/")
.get( feaClassController.getFeaClasses)
.post( feaClassController.addFeaClasses);

feaClassAPI.route("/add")
.post( feaClassController.validate, feaClassController.addFeaClass);

//  Get, Update, Delete Specific Role
feaClassAPI.route("/:id")
.get( feaClassController.getById )
.put( feaClassController.filterBody, feaClassController.editFeaClass )
.delete( feaClassController.removeFeaClass );

export default feaClassAPI;