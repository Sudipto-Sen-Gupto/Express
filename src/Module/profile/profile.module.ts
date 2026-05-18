import { Router } from "express";
import { profileController } from "./profile.controller";

 

 const router=Router();
  
  router.post('/',profileController.profilePost)
  

 export const profileRouter=router;