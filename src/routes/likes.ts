import { Router } from "express";
import { getLikes, isLiked, ToggleLike } from "../controllers/likes";

const likesRoutes: Router = Router();

likesRoutes.post("/toggle-like", ToggleLike)
likesRoutes.post("/is-liked", isLiked)  
likesRoutes.get("/", getLikes)  


export default likesRoutes;