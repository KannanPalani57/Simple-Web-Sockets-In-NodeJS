const express = require("express");
const http = require("http");
const socketio = require("socket.io")
const path = require("path");

const app = express();
const server = http.createServer(app); //using express inside the server
const io = socketio(server);  //running on the socket server 


//setting the Static folder
app.use(express.static(path.join(__dirname, "public")));

//Run when the client connects
io.on("connection", socket => {
    console.log("The user has connected")
    socket.emit("message", "Welcome to My Chat application")

    //Broadcast when user connects
    socket.broadcast.emit("message", "The new user has joined")

    socket.on("disconnect", () => {
        io.emit("message", "the new user has disconnected")
    })

    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", msg)
    })

})


const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server has started on ${PORT}` ))