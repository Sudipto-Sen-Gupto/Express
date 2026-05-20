import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { pool } from "../dbNeon";
 const auth=()=>{
     return async(req:Request,res:Response,next:NextFunction)=>{
              console.log(req.headers);

              const token = req.headers.authorization;

              if(!token){
                    res.status(401).json({
                         message:"Unauthorized access"
                    })
              }
            
              const decodedToken=await jwt.verify(token as string ,process.env.SECTRET_KEY as string) as JwtPayload;
              console.log(decodedToken);  //decoded token from encoded token

              const validUser=await pool.query(`
                  SELECT * FROM userDB WHERE email=$1  
                `,[decodedToken.email]) //decodedToken send as payload then we get email
               
                

                const user=validUser.rows[0]

                if(user.length===0){
                     res.status(403).json({
                        message:"Forbidden user, no user available"
                     })
                }

                if(user.age<28){
                     res.status(403).json({
                          message:"Forbidden for this user"
                     })
                }

              next()
     }
 }

 export default auth;