import { Router } from "express";
import { createPost, updetePost, deletePost, getPost, allPosts, myPosts} from "../controllers/posts";

const postsRoutes: Router = Router();

postsRoutes.post("/create", createPost)
postsRoutes.put("/updete", updetePost)
postsRoutes.delete("/delete", deletePost)
postsRoutes.get("/get", getPost)
postsRoutes.get("/", allPosts)
postsRoutes.get("/my-post", myPosts)


export default postsRoutes;