import { Router } from "express";
import promotionController from "./promotion.controller";

const promotionAPI = Router();

//  Get All Roles
promotionAPI.route("/")
.get( promotionController.getPromotions)
.post( promotionController.addPromotions);

promotionAPI.route("/add")
.post( promotionController.validate, promotionController.addPromotion);

//  Get, Update, Delete Specific ID
promotionAPI.route("/:id")
.get( promotionController.getById )
.put( promotionController.filterBody, promotionController.editPromotion )
.delete( promotionController.removePromotion );

//  Get, Update, Delete Specific Role
promotionAPI.route("/dabet/:id")
.get( promotionController.getByDabet )

export default promotionAPI;