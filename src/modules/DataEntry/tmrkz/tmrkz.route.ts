import { Router } from "express";
import mantekatTmrkzController from "./tmrkz.controller";

const mantekatTmrkzAPI = Router();

mantekatTmrkzAPI.route("/")
.get( mantekatTmrkzController.getManatekTmrkz)
.post( mantekatTmrkzController.addManatekTmrkz);

mantekatTmrkzAPI.route("/add")
.post( mantekatTmrkzController.validate, mantekatTmrkzController.addMantekatTmrkz);

mantekatTmrkzAPI.route("/:id")
.get( mantekatTmrkzController.getById )
.put( mantekatTmrkzController.filterBody, mantekatTmrkzController.editMantekatTmrkz )
.delete( mantekatTmrkzController.removeMantekatTmrkz );

export default mantekatTmrkzAPI;