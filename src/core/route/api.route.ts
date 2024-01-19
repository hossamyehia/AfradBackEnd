import { Router, Request, Response } from "express";


import { loginRequired } from "../../shared/middleware/user.middleware";
import routePermission from "../../shared/middleware/permission.middleware";


const apiRoutes = Router();

apiRoutes.route('/').get(async (req: Request, res: Response, next: any) => {
    res.json({author: "Hossam Yahia Abdelkader Adbelmoneam"})
});

//  Test Route
import testRoutes from "./test.route";
apiRoutes.use("/test", testRoutes);

//  USER Route
import userAPI from "../../modules/User/user.route";
apiRoutes.use('/user', userAPI);

//  Role Route
import roleAPI from "../../modules/Role/role.route";
apiRoutes.use('/role', loginRequired, routePermission, roleAPI);

//  Data Entry Route
import dataEntryAPIs from "../../modules/DataEntry/index.route";
apiRoutes.use('/dataentry', loginRequired, routePermission, dataEntryAPIs);

//  Dobat Saf Route
import dobatSafAPI from "../../modules/dobatSaf/dobatSaf.route";
apiRoutes.use('/dobatsaf', loginRequired, routePermission, dobatSafAPI);

//  Dabet Info Route
import dabetInfoAPIs from "../../modules/dobatSaf/submodules/index.route";
apiRoutes.use('/dabetinfo', loginRequired, routePermission, dabetInfoAPIs);

export default apiRoutes;