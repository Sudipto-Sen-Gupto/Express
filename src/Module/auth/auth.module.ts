import { Router } from "express";
import { authentication } from "./auth.controller";


  const router=Router()

   router.post('/login',authentication.userLogin);
   router.post('/refreshToken',authentication.refreshToken)

 export const authRouter=router