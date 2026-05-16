import express, { type Application, type Request, type Response } from "express"

import  { Pool } from "pg"
import dotenv from "dotenv"
dotenv.config()
const app :Application = express()
const port = 3000
app.use(express.json()) //middleware for json data
app.use(express.urlencoded({extended:true}))
app.use(express.text())
app.get('/', (req : Request, res:Response) => {
  res.status(200).json({
    "Message":"Api worked properly"
    ,
    "Author":"Express"
  })
})

  const pool=new Pool({
    connectionString:process.env.DATABASE_URL
  })


   const initDB=async()=>{
         try{
                await pool.query(`
                     CREATE TABLE IF NOT EXISTS userDB(
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(30) NOT NULL,
                       email VARCHAR(30) UNIQUE NOT NULL,
                       password VARCHAR(20) NOT NULL,
                       age INT,
                       created_at TIMESTAMP DEFAULT NOW(),
                       updated_at TIMESTAMP DEFAULT NOW()
                     )
                `)
                console.log("Database connect successfully");
         }
         catch(error){
             console.log("Error:",error);
         }
   }
   initDB()


app.post('/users',async(req:Request,res:Response)=>{
    const {name,email,password,age} =req.body;

          
       try{
                       const result= await   pool.query(`
                    INSERT INTO userDB(name,email,password,age) VALUES($1,$2,$3,$4)  
                    RETURNING *        
              `,[name,email,password,age])        //* here asterisk means all value you use specific key for value like RETURNING name,email
         console.log(result);
    // res.send(body)
    res.status(201).json({
        message:"Created post",
         data:{
           data:result.rows[0]
         }
    })
       }
        catch(error:any){
                 res.status(500).json({
        message:"Internal error",
         data:{
           error:error.message
         }
    })
        }
        
})

     
        app.get('/users',async(req:Request,res:Response)=>{
                     const result= await pool.query(`
                          SELECT * FROM userDB
                      `)

                     try{
                            res.status(200).json({
                               message:"Data retrieve successfully",
                               success:true,
                               data:result.rows
                            })
                     }
                     catch(error:any){
                                  res.status(500).json({
                                        message:error.message
                                  })
                     }
        })


        app.get('/users/:id',async(req:Request,res:Response)=>{
                        const {id}=req.params;
                        console.log(id);
                          
                           

                        const result= await pool.query(`
                              SELECT * FROM  userDB WHERE id=$1
                          `,[id])
                          
                  // if(result.rows.length===0)       
                     if(result.rowCount===0){
                               res.status(404).json({
                                    message:"Not found",
                                    success:false,
                                    data:{}
                               })
                            }

                          try{
                                 res.status(200).json({
                                        message:"Get single data",
                                        success:true,
                                        data:result.rows[0]
                                 })
                          }

                          catch(error:any){
                                    res.status(500).json({
                                       message:error.message
                                    })
                          }
        })

        app.put('/users/:id',async(req:Request,res:Response)=>{
                const {id}=req.params;
                const {name,password,age}=req.body;

                //COALESCE is used for prevent null value which section we don't update
                const result=await pool.query(`
                        UPDATE userDB  
                        SET name=COALESCE($1,name) ,    
                        password=COALESCE($2,password),
                        age=COALESCE($3,age)
                        WHERE id=COALESCE($4,id) 
                        RETURNING *
                  `,[name,password,age,id])

                  if(result.rows.length===0){
                          res.status(404).json({
                             message:"Data does not exist, failed to update",
                             success:false,
                             data:{}
                          })
                  }

                  // console.log(id);
                  // console.log(result);

               try{
                     res.status(200).json({
                      message:"Data updated successfully",
                      success:true,
                      data:result.rows[0]
                     })
               }
               catch(error:any){
                      res.status(500).json({
                        message:error.message
                      })
               }
        })
       

        app.delete('/users/:id',async(req:Request,res:Response)=>{
                    const {id}=req.params;
                    const result= await pool.query(`
                        DELETE FROM userDB
                        WHERE id=$1  
                      `,[id])
                    
                        if(result.rowCount===0){
                               res.status(404).json({
                                     message:"Data does not exist,failed to delete",
                                     success:false,
                                     data:{}
                               })
                        }

                      try{
                            res.status(200).json({
                               message:'Delete successfully',
                               success:true,
                               data:result.rows[0]
                            })  
                      }
                      catch(error:any){
                                 res.status(404).json({
                                     error:error.message
                                 })
                      }
        })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
