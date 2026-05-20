import type { NextFunction, Request, Response } from "express";
 import fs from "fs"
 
  
  const logger=(req:Request, res:Response, next:NextFunction) => {
    console.log('Time:',req.method,req.url, Date.now());
    console.log(`Time->${Date.now()},Method->${req.method},URL->${req.url}`);
    const logger=`Time->${Date.now()},Method->${req.method},URL->${req.url}\n`
    fs.appendFile('logger.txt',logger,(error)=>{
          //  console.log(error);
    })
    next();
  }

  export default logger;