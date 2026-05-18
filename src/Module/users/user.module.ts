import { Router, type Request, type Response } from "express";

import { userController } from "./user.controller";

const router=Router(); // router is one kind of mini server , add it to main server app

router.post('/',userController.userPost)

 router.get('/',userController.userGet)
 
router.get('/:id',userController.userSingleDataGet)

 router.put('/:id',userController.userUpdateService)
 
 router.delete('/:id',userController.userDeleteService)

export const userRouter=router;
