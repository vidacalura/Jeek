let socket = io.connect("http://localhost:5000");

const mensagensField = document.querySelector(".msgs");
const textbox = document.querySelector(".chat-txtbox");
const enviarBtn = document.querySelector(".chat-btn ");
enviarBtn.addEventListener("click", enviarMsg);
const desistirBtn = document.querySelector(".botao-desistir");
desistirBtn.addEventListener("click", desistir);
const passarBtn = document.querySelector(".botao-passar");
passarBtn.addEventListener("click", passarVez);
const board = document.querySelector(".tabuleiro");
let tabuleiro = [];

let jogadas = 3;
let lances_brancas = 0;
let lances_pretas = 0;
let placar_brancas = 0;
let placar_pretas = 0;

/* Jogo */
const dados = {
    player: {
        'brancas': { playerId: null, pontos: 0, lances: 0 },
        'pretas': { playerId: null, pontos: 0, lances: 0 }
    },
    pecas_brancas: {
        'peca_branca1': { x: null, y: null },
        'peca_branca2': { x: null, y: null },
        'peca_branca3': { x: null, y: null },
        'peca_branca4': { x: null, y: null },
        'peca_branca5': { x: null, y: null },
        'peca_branca6': { x: null, y: null },
        'peca_branca7': { x: null, y: null },
        'peca_branca8': { x: null, y: null },
        'peca_branca9': { x: null, y: null },
        'peca_branca10': { x: null, y: null },
        'peca_branca11': { x: null, y: null },
        'peca_branca12': { x: null, y: null }
    },
    pecas_pretas: {
        'peca_preta1': { x: null, y: null },
        'peca_preta2': { x: null, y: null },
        'peca_preta3': { x: null, y: null },
        'peca_preta4': { x: null, y: null },
        'peca_preta5': { x: null, y: null },
        'peca_preta6': { x: null, y: null },
        'peca_preta7': { x: null, y: null },
        'peca_preta8': { x: null, y: null },
        'peca_preta9': { x: null, y: null },
        'peca_preta10': { x: null, y: null },
        'peca_preta11': { x: null, y: null },
        'peca_preta12': { x: null, y: null }
    }
}

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
                if (lances_brancas + lances_pretas == 15){
                    endgame();
                }
                /* if () -> verificar qual jogador */
                if (isConnected(y, x)){
                    socket.emit("addPecaBackend", { y: y, x: x });
                }
            });
        }
    }

}

function addPeca(y, x){

    // Registro do lance - JS
    let lance = Object.values(dados.pecas_brancas); 

    lance[lances_brancas].x = x;
    lance[lances_brancas].y = y;

    // Regustro do lance - Visual
    const peca = document.createElement("div");
                    
    // if () -> cor
        peca.classList.add("peca-branca");

    tabuleiro[y][x].appendChild(peca);


}

function isConnected(y, x){

    // verifica se já tem peças nessa casa
    if (tabuleiro[y][x].hasChildNodes())
        return false;

    if (jogadas == 3)
        return true;

    // if movesBack != 0 -> false

    if ((x < 0 || x > 3) || (y < 0 || y > 3))
        return false;

    /*if (lances_brancas + lances_pretas >= 15)
        return false;*/

    // Verifica se o lance é legal

    // Permite apenas lances horizontais caso os primeiros 2 lances tenham sido horizontais

    // Permite apenas lances verticais caso os primeiros 2 lances tenham sido verticais

    // Verfica se os lances são simétricos


    return true;

}

function desistir(){



}

function passarVez(){



}

async function relogio(){



}

function endgame(){

    

}

function restart(){



}


function enviarMsg(){

    socket.emit("chat", textbox.value);
    clearTextbox();

}

function clearTextbox(){

    textbox.value = "";

}


/* Listeners do server */

// Adiciona a mensagem vinda do socket.io
socket.on("chat", (data) => {
    mensagensField.innerHTML += "<p>" + "[" /*+ player */ + "] " + data + "</p>";
});

socket.on("addPecaBackend", (data) => {
    addPeca(data.y, data.x);
    // lances_brancas++;
});


/* to do

- isConnected()
- autoPass()
- Voltar lances
- Botões
- Tempo
- Últimos 2 vídeos

*/