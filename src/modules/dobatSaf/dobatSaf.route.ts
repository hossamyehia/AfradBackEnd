import { Router } from "express";
import dobatSafController from "./dobatSaf.controller";
import promotionAPI from "./submodules/Promotion/promotion.route";

const dobatSafAPI = Router();

dobatSafAPI.route("/")
.get( dobatSafController.getDobatSaf);

dobatSafAPI.route("/add")
.post( dobatSafController.validate, dobatSafController.addDabetSaf);

//  Get, Update, Delete Specific dabet Saf
dobatSafAPI.route("/:id")
.get( dobatSafController.getById )
.put( dobatSafController.filterBody, dobatSafController.editDabetSaf )
.delete( dobatSafController.removeDabetSaf );

dobatSafAPI.route("rkmaskry/:Rkmaskry")
.get( dobatSafController.getByRkmAskry )

dobatSafAPI.route("selah/:id")
.get( dobatSafController.getBySelah )

dobatSafAPI.route("wehda/:id")
.get( dobatSafController.getByWehda )

dobatSafAPI.route("daraga/:id")
.get( dobatSafController.getByDaraga )

dobatSafAPI.route("fea/:id")
.get( dobatSafController.getByFea )

export default dobatSafAPI;