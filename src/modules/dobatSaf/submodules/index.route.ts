import { Router, Request, Response } from "express";


const dabetInfoAPIs = Router();

dabetInfoAPIs.route('/').all(async (req: Request, res: Response, next: any) => {
    res.sendStatus(200)
});

//  Promotion Route
import promotionAPI from "./Promotion/promotion.route";
dabetInfoAPIs.use('/promotion', promotionAPI);

//  Renewal Route
import renewalAPI from "./renewals/renewals.route";
dabetInfoAPIs.use('/renewal', renewalAPI);

//  Efficiency Report
import efficiencyReportAPI from "./efficiencyReports/efficiencyReports.route";
dabetInfoAPIs.use('/efficiency', efficiencyReportAPI);

//  Sanction Route
import sanctionAPI from "./sanctions/sanctions.route";
dabetInfoAPIs.use('/sanction', sanctionAPI);

//  Vacation Route
import vacationAPI from "./vacations/vacations.route";
dabetInfoAPIs.use('/vacation', vacationAPI);

//  Mission Route
import missionAPI from "./missions/missions.route";
dabetInfoAPIs.use('/mission', missionAPI);

//  transportation Route
import transportationAPI from "./transportations/transportations.route";
dabetInfoAPIs.use('/transportation', transportationAPI);

export default dabetInfoAPIs;