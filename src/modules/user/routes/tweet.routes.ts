import { Router } from "express";
import { Routes } from "../../../common/routes.interface";

export class TweetsRoutes implements Routes{


    path =  "/tweets"
    router  = Router();
    controller = new Tweet
}