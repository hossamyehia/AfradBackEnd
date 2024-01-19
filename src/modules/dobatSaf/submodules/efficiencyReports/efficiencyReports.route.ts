import { Router } from "express";
import efficiencyReportController from "./efficiencyReports.controller";

const efficiencyReportAPI = Router();

//  Get All Roles
efficiencyReportAPI.route("/")
.get( efficiencyReportController.getEfficiencyReports)
.post( efficiencyReportController.addEfficiencyReports);

efficiencyReportAPI.route("/add")
.post( efficiencyReportController.validate, efficiencyReportController.addEfficiencyReport);

//  Get, Update, Delete Specific ID
efficiencyReportAPI.route("/:id")
.get( efficiencyReportController.getById )
.put( efficiencyReportController.filterBody, efficiencyReportController.editEfficiencyReport )
.delete( efficiencyReportController.removeEfficiencyReport );

//  Get, Update, Delete Specific Role
efficiencyReportAPI.route("/dabet/:id")
.get( efficiencyReportController.getByDabet )

export default efficiencyReportAPI;