import type { Request, Response } from "express"
import { authService } from "./auth.service"


  const userLogin=async(req:Request,res:Response)=>{
       
         

           try{
                      const result = await authService.userLoginService(req.body)
                      
                       const {refreshToken}=result;

                       res.cookie('refreshToken',refreshToken,{
                             secure:false,
                             httpOnly:true,
                             sameSite:'lax'
                       })

                      res.status(200).json({
                          success:true,
                          message:"Create jwt token",
                          data:{result}
                      })
           }

           catch(error:any){
                res.status(500).json({
                        success:false,
                        message:"Internal Server Error"
                })

           }
  }

  export const authentication={
          userLogin
  }