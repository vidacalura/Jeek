let socket = io.connect("http://localhost:5000");

const mensagensField = document.querySelector(".msgs");
const textbox = document.querySelector(".chat-txtbox");
const enviarBtn = document.querySelector(".chat-btn ");
enviarBtn.addEventListener("click", enviarMsg);
const desistirBtn = document.querySelector(".botao-desistir");
desistirBtn.addEventListener("click", desistir);
const passarBtn = document.querySelector(".botao-passar");
passarBtn.addEventListener("click", passarVez);
const revancheBtn = document.querySelector(".botao-restart");
revancheBtn.addEventListener("click", pedirRevanche);
const board = document.querySelector(".tabuleiro");
let tabuleiro = [];

createGrid();
gridEventListener();


function createGrid(){

    let count = 0;
    let col_list = [];

    for (let i = 0; i < 4; i++){

        let col_list = [];
        const col = document.createElement("div");
        col.classList.add("coluna");
        board.appendChild(col);

        for (let j = 0; j < 4; j++){
            const casa = document.createElement("div");
            casa.dataset.id = count;
            casa.classList.add("casa");

            if (count == 0){
                casa.classList.add("casa1");
            }
            else if(count == 3){
                casa.classList.add("casa2");
            }
            else if(count == 12){
                casa.classList.add("casa3");
            }
            else if(count == 15){
                casa.classList.add("casa4");
            }

            col_list.push(casa);

            col.appendChild(casa);

            count++;
        }

        tabuleiro.push(col_list);
    }

}

function gridEventListener(){

    for (i = 0; i < tabuleiro.length; i++){
        for (j = 0; j < tabuleiro[i].length; j++){
            const y = i;
            const x = j;

            tabuleiro[y][x].addEventListener("click", () => {
                if (!tabuleiro[y][x].hasChildNodes()){
                    socket.emit("addPecaBackend", { y: y, x: x });
                }
            });
        }
    }

}

function addPeca(y, x, vezBrancas){

    // Registro do lance - Visual
    const peca = document.createElement("div");
                    
    if (vezBrancas == true)
        peca.classList.add("peca-branca");
    else
        peca.classList.add("peca-preta");


    tabuleiro[y][x].appendChild(peca);


}

function desistir(){



}

function passarVez(){

    socket.emit("passarVez", null);

}

function pedirRevanche(){



}

async function relogio(){



}

function endGame(){

    desistirBtn.classList.add("hidden");
    passarBtn.classList.add("hidden");
    revancheBtn.classList.remove("hidden");

}

function restart(){



}

/* Chat */
function enviarMsg(){

    socket.emit("chat", textbox.value);
    clearTextbox();

}

function clearTextbox(){

    textbox.value = "";

}


/* Listeners do server */
socket.on("chat", (data) => {
    mensagensField.innerHTML += "<p>" + "[" /*+ player */ + "] " + data + "</p>";
});

socket.on("addPecaBackend", (data) => {
    addPeca(data.y, data.x, data.vezBrancas);
});

socket.on("endGame", (data) => {
    endGame();
});