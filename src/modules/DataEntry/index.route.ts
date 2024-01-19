import { Router, Request, Response } from "express";

const dataEntryAPIs = Router();

dataEntryAPIs.route('/').all(async (req: Request, res: Response, next: any) => {
    res.sendStatus(200)
});

//  Daraga Route
import daragaAPI from "./daraga/daraga.route";
dataEntryAPIs.use('/daraga', daragaAPI);

//  Fea Class Route
import feaClassAPI from "./feaClass/feaClass.route";
dataEntryAPIs.use("/feaClass", feaClassAPI);

//  Fea Route
import feaAPI from "./fea/fea.route";
dataEntryAPIs.use("/fea", feaAPI);

//  Selah Class Route
import selahClassAPI from "./selahClass/selahClass.route";
dataEntryAPIs.use("/selahClass", selahClassAPI);

//  Selah Route
import selahAPI from "./selah/selah.route";
dataEntryAPIs.use("/selah", selahAPI);

//  khedma Status Route
import khedmaStatusAPI from "./khedmaStatus/khedmaStatus.route";
dataEntryAPIs.use("/khedmaStatus", khedmaStatusAPI)

//  Wehda Level Route
import wehdaLevelAPI from "./wehdaLevel/wehdaLevel.route";
dataEntryAPIs.use("/wehdaLevel", wehdaLevelAPI)

// Mantekat Tmrkz Route
import mantekatTmrkzAPI from "./tmrkz/tmrkz.route";
dataEntryAPIs.use("/mantekatTmrkz", mantekatTmrkzAPI);

// Wehda Route
import WehdaAPI from "./wehda/wehda.route";
dataEntryAPIs.use("/wehda", WehdaAPI)

//  Job Title Route
import jobTitleAPI from "./jobTitle/jobTitle.route";
dataEntryAPIs.use("/jobTitle", jobTitleAPI);

//  Qualification Route
import qualificationAPI from "./qualification/qualification.route";
dataEntryAPIs.use("/qualification", qualificationAPI);

//  Mohafzat Route
import mohafzaAPI from "./mohafza/mohafza.route"; 
dataEntryAPIs.use("/mohafza", mohafzaAPI);

// Marakz Route
import markazAPI from "./markaz/markaz.route";
dataEntryAPIs.use("/markaz", markazAPI);

// Crime Type Route
import crimeTypeAPI from "./crime_type/crimeType.route";
dataEntryAPIs.use("/crimeType", crimeTypeAPI);

// Crime Sanction Route
import crimeSanctionAPI from "./crime_sanction/crimeSanction.route";
dataEntryAPIs.use("/crimeSanction", crimeSanctionAPI);

export default dataEntryAPIs;