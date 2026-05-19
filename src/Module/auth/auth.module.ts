import { Router } from "express";
import { authentication } from "./auth.controller";


  const router=Router()

   router.post('/',authentication.userLogin)

 export const authRouter=router