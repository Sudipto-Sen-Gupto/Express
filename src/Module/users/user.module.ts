import { Router, type Request, type Response } from "express";

import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../userType";

const router=Router(); // router is one kind of mini server , add it to main server app

router.post('/',userController.userPost)

 router.get('/',auth(UserRole.admin,UserRole.moderator),userController.userGet)
 
router.get('/:id',userController.userSingleDataGet)

 router.put('/:id',userController.userUpdateService)
 
 router.delete('/:id',userController.userDeleteService)

export const userRouter=router;
