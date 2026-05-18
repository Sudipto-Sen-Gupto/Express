import { pool } from "../../dbNeon";
import type { user } from "../userType";

 
  const userPostService=async(payload:user)=>{
        const {name,email,password,age}=payload

       const result= await   pool.query(`
                    INSERT INTO userDB(name,email,password,age) VALUES($1,$2,$3,$4)  
                    RETURNING *        
              `,[name,email,password,age])        //* here asterisk means all value you use specific key for value like RETURNING name,email
         console.log(result);
         return result;
    // res.send(body)
    
  }

  const userGetService=async()=>{
      const result= await pool.query(`
                          SELECT * FROM userDB
                      `)
                      return result
  }

  const userSingleGetService=async(id:string)=>{
              
                        console.log(id);
                          
                           

                        const result= await pool.query(`
                              SELECT * FROM  userDB WHERE id=$1
                          `,[id])
                          
                 return result                  
  }

 const userUpdateService=async(payload:user,id:string)=>{
                 
                  const {name,password,age}=payload


           const result=await pool.query(`
                        UPDATE userDB  
                        SET name=COALESCE($1,name) ,    
                        password=COALESCE($2,password),
                        age=COALESCE($3,age)
                        WHERE id=COALESCE($4,id) 
                        RETURNING *
                  `,[name,password,age,id])

                  return result
 }
  
 const userDeleteService=async(id:string)=>{
           const result= await pool.query(`
                        DELETE FROM userDB
                        WHERE id=$1  
                      `,[id])

                      return result
 }

  export const postService=userPostService
  export const getService=userGetService
  export const singleData=userSingleGetService
  export const updateService=userUpdateService
  export const deleteService=userDeleteService