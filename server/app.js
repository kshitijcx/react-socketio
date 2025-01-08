import {Server} from "socket.io"
import express from "express"

const app = express()

const httpServer = app.listen(3001,()=>{
    console.log("server port 3001")
})

const io = new Server(httpServer,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>{
    console.log(`${socket.id} connected`)
})