import express from "express";
import {watch, getedit, postedit, getUpload, postUpload, deleteVideo} from "../controllers/videoController";

const videoRouter = express.Router();


videoRouter.get("/upload", getUpload);
videoRouter.post("/upload", postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getedit).post(postedit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

export default videoRouter;