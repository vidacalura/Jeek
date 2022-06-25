let express = require("express");
let socket = require("socket.io");

let app = express();
let server = app.listen(5000);


app.use(express.static("Public"));

let io = socket(server);
io.on("connection", (socket) => {
    console.log("Conexão do socket realizada com sucesso");

    const playerId = socket.id;

    /* Chat */
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    /* Jogo */
    socket.on("addPecaBackend", (data) => {
        io.sockets.emit("addPecaBackend", data);
    });

});

/* To do

- Jogar variáveis e ações no servidor

*/