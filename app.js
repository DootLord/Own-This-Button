// Setup Requires
const socketIO = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const io = socketIO(server)
const port = process.env.PORT || 3000;
// App setup
app.set("port", 1337);
app.use(express.static(__dirname + "/static"));

// Config Vars
let buttonAmount = 50;

// Button Storage
let buttons = [];

// Initalize our buttons
for (let i = 0; buttonAmount > i; i++) {
    buttons.push({ colour: "red", owner: "N/A", time: 0 });
}

io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("claim", (claim) => {
        console.log(claim);
        let index = claim.index;
        let owner = claim.owner;
        let colour = claim.colour;

        buttons[index].owner = owner;
        buttons[index].colour = colour;
        buttons[index].time = 0;
    });

    // Every 0.1 seconds, update the status of the buttons to all connected users
    setInterval(() => {emitStatus(socket)}, 500);

});

// Increment ownership time


server.listen(port, () => {
    console.log("Server running on " + port);
    setInterval(incrementButtonTime, 1000)
})

function emitStatus(socket) {
    socket.emit("state", buttons);
}

function incrementButtonTime() {
    for (let i = 0; buttons.length > i; i++) {
        buttons[i].time = parseInt(buttons[i].time) + 1;
    }

    console.log(buttons)
}

