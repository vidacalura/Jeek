let express = require("express");
let socket = require("socket.io");

let app = express();
let server = app.listen(5000);

app.use(express.static("Public"));

let io = socket(server);
io.on("connection", (socket) => {
    console.log("Conexão do socket realizada com sucesso");

    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    socket.on("addPiece", (data) => {
        io.sockets.emit("addPiece", data);
    })

    socket.on("desistir", (data) => {
        io.sockets.emit("desistir", data);
    })
});