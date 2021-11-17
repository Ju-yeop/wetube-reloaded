import express from "express";
import {watch, getedit, postedit, getUpload, postUpload} from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getedit).post(postedit);
videoRouter.get("/upload", getUpload);
videoRouter.post("/upload", postUpload);

export default videoRouter;