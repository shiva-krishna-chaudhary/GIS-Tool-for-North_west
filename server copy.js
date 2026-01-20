const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

let users = {};

io.on("connection", socket => {

    socket.on("sendLocation", data => {
        users[socket.id] = data;
        io.emit("receiveLocations", users);
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit("receiveLocations", users);
    });

});

server.listen(3000, () => {
    console.log("✅ Live Location Server running on port 3000");
});
