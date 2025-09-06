/* eslint-disable no-console */

import mongoose from "mongoose";
import {Server} from "http";
import app from "./app";
import { envVars } from "./app/config/env";


let server:Server;


const startServer =async()=>{
    try{
        await mongoose.connect(envVars.DB_URL)

        console.log("Connect to DB!!")
        server =app.listen(envVars.PORT,()=>{
            console.log(`Server is listening on port ${envVars.PORT}`)
        });

    }
    catch(error){
        console.log(error);
    }
}
startServer()

process.on("unhandledRejection",(err)=>{
    console.log("Unhandled Rejection detected... Server shutting down",err);
    if (server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("unCaughtException",(err)=>{
    console.log("Uncaught Exception detected... Server shutting down",err);
    if (server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("SIGTERM",(err)=>{
    console.log("Sigterm received from deployment server... Server shutting down",err);
    if (server){
        server.close(()=>{
            process.exit(1)
        });
    }
    process.exit(1)
})



/**
 * unhandled rejection error (promise er sathe connected)
 * uncaught rejection error ()
 * signal termination sigterm( )
 */