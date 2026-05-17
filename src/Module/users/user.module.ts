import { Router, type Request, type Response } from "express";
import { pool } from "../../dbNeon";
import { userController } from "./user.controller";

const router=Router(); // router is one kind of mini server , add it to main server app

router.post('/',userController.userPost)


export const userRouter=router;
