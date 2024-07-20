import { Router } from "express";
import authRoutes from "./auth";
import postsRoutes from "./posts";
import commentsRoutes from "./comments";
import likesRoutes from "./likes";


const rootRoutes : Router= Router();
rootRoutes.use("/auth",authRoutes);
rootRoutes.use("/posts",postsRoutes);
rootRoutes.use("/comments",commentsRoutes);
rootRoutes.use("/likes",likesRoutes);


export default rootRoutes;