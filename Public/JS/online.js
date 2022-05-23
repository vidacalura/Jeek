let socket = io.connect("http://localhost:5000");

const mensagensField = document.querySelector(".msgs");
const textbox = document.querySelector(".chat-txtbox");
const enviarBtn = document.querySelector(".chat-btn ");

let turn = "white";
let jogadas = 3;
let tempo_w_p = document.querySelector(".tempo-white");
let tempo_b_p = document.querySelector(".tempo-black");
let tempo = 120;
let tempo_w = tempo;
let tempo_b = tempo;
const board = document.querySelector(".tabuleiro");
let casas = [];
let casas_ativas = [];
let lances = -1;
const passarBtn = document.querySelector(".botao-passar");
const desistirBtn = document.querySelector(".botao-desistir");
const p_turn = document.querySelector(".p-turn");
tempo_w_p.textContent = Math.floor(tempo / 60) + ":" + Math.floor(tempo % 60) + "0";
tempo_b_p.textContent = Math.floor(tempo / 60) + ":" + Math.floor(tempo % 60) + "0";


createGrid();
gridEventListener();
enviarBtn.addEventListener("click", enviarMsg);

// Manda mensagem no chat via websocket.io
function enviarMsg(){

    socket.emit("chat", textbox.value);

}

// Relógio 

function createGrid(){

    let count = 0;

    for (let i = 0; i < 4; i++){

        const col = document.createElement("div");
        col.classList.add("coluna");
        board.appendChild(col);

        for (let j = 0; j < 4; j++){
            const casa = document.createElement("div");
            casa.dataset.id = count;
            casa.classList.add("casa");
            col.appendChild(casa);

            casas.push(casa);

            count++;
        }
    }

}

function verifTurn(){

    if (turn == "white"){
        p_turn.textContent = "Vez das brancas";
    }
    else{
        p_turn.textContent = "Vez das pretas";
    }    

}

function endgame(){

    if (turn == "white"){
        alert("Brancas ganham!");
    }
    else{
        alert("Pretas ganham!");
    }

    restart();

}

function restart(){

    window.location.reload();

}

function gridEventListener(){

    for (const casa_ataque of casas){
        casa_ataque.addEventListener("click", () => {
            socket.emit("addPiece", Number(casa_ataque.dataset.id));
        });
    }

}


socket.on("chat", (data) => {
    mensagensField.innerHTML += "<p>" + "[" + turn + "] " + data + "</p>";
});

socket.on("addPiece", (data) => {
    console.log(data);
    const peca = document.createElement("div");

    if (turn == "white")
        peca.classList.add("peca-branca");
    else
        peca.classList.add("peca-preta");

    casas[data].appendChild(peca);

});

socket.on("changeTurn", (data) => {

});

socket.on("passarJogada", (data) => {

});

socket.on("passarVez", (data) => {

});

socket.on("desistir", (data) => {

});