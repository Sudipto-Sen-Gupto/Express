import express, { type Application, type Request, type Response } from "express"
import  { Pool } from "pg"
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
    connectionString:"postgresql://neondb_owner:npg_hnOyUv9a4REq@ep-long-firefly-aqzfrzdf-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  })

app.post('/',async(req:Request,res:Response)=>{
    const {name,email,password} =req.body;
    // res.send(body)
    res.status(201).json({
        message:"Created post",
         data:{
            name,email
         }
    })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
