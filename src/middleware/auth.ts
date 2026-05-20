import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { pool } from "../dbNeon";
import { UserRole, type Role } from "../Module/userType";
 const auth=(...roles:Role[])=>{
     return async(req:Request,res:Response,next:NextFunction)=>{
             try{

               console.log(roles);
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

                // if(user.age<28){
                //      res.status(403).json({
                //           message:"Forbidden for this user"
                //      })
                // }
               
                req.user=decodedToken

               //  console.log(req.user);

                console.log("role:",user.role);
                       
                       const userRole=user.role;

                       if(userRole.length && !roles.includes(userRole)){
                              res.status(404).json({
                           message:"not found"
                        })
                       }


              next()
             }
             catch(error){
                        res.status(404).json({
                           message:"not found"
                        })
                        // next(error)
             }
     }
 }

 export default auth;