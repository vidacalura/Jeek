let socket = io.connect("http://localhost:5000");

const mensagensField = document.querySelector(".msgs");
const textbox = document.querySelector(".chat-txtbox");
const enviarBtn = document.querySelector(".chat-btn ");
const board = document.getElementById("tabuleiro-canvas");
const context = board.getContext("2d");
/* Jogo */
const dados = {
    player: {
        'brancas': { playerId: null, pontos: 0, lances: 0 },
        'pretas': { playerId: null, pontos: 0, lances: 0 }
    },
    tabuleiro: {
        'casa0': { x: 0, y: 0, width: 112, height: 112 },
        'casa1': { x: 1, y: 0, width: 112, height: 112 },
        'casa2': { x: 2, y: 0, width: 112, height: 112 },
        'casa3': { x: 3, y: 0, width: 112, height: 112 },
        'casa4': { x: 0, y: 1, width: 112, height: 112 },
        'casa5': { x: 1, y: 1, width: 112, height: 112 },
        'casa6': { x: 2, y: 1, width: 112, height: 112 },
        'casa7': { x: 3, y: 1, width: 112, height: 112 },
        'casa8': { x: 0, y: 2, width: 112, height: 112 },
        'casa9': { x: 1, y: 2, width: 112, height: 112 },
        'casa10': { x: 2, y: 2, width: 112, height: 112 },
        'casa11': { x: 3, y: 2, width: 112, height: 112 },
        'casa12': { x: 0, y: 3, width: 112, height: 112 },
        'casa13': { x: 1, y: 3, width: 112, height: 112 },
        'casa14': { x: 2, y: 3, width: 112, height: 112 },
        'casa15': { x: 3, y: 3, width: 112, height: 112 }
    },
    pecas_brancas: {
        'peca_branca1': { x: null, y: null, design: "peca-branca" },
        'peca_branca2': { x: null, y: null, design: "peca-branca" },
        'peca_branca3': { x: null, y: null, design: "peca-branca" },
        'peca_branca4': { x: null, y: null, design: "peca-branca" },
        'peca_branca5': { x: null, y: null, design: "peca-branca" },
        'peca_branca6': { x: null, y: null, design: "peca-branca" },
        'peca_branca7': { x: null, y: null, design: "peca-branca" },
        'peca_branca8': { x: null, y: null, design: "peca-branca" }
    },
    pecas_pretas: {
        'peca_preta1': { x: null, y: null, design: "peca-preta" },
        'peca_preta2': { x: null, y: null, design: "peca-preta" },
        'peca_preta3': { x: null, y: null, design: "peca-preta" },
        'peca_preta4': { x: null, y: null, design: "peca-preta" },
        'peca_preta5': { x: null, y: null, design: "peca-preta" },
        'peca_preta6': { x: null, y: null, design: "peca-preta" },
        'peca_preta7': { x: null, y: null, design: "peca-preta" },
        'peca_preta8': { x: null, y: null, design: "peca-preta" }
    }
}

renderGrid();
board.addEventListener("click", (event) => {
    let mouseX = event.clientX - board.offsetLeft;
    let mouseY = event.clientY - board.offsetTop;

    addPeca(mouseX, mouseY);
});

function renderGrid(){
    
    for (const casas of Object.values(dados.pecas_brancas)){
        context.fillStyle = "white";
        
        if (casas.x != null && casas.y != null)
            context.fillRect(casas.x, casas.y, 1, 1);
    }

    for (const casas of Object.values(dados.pecas_pretas)){
        context.fillStyle = "#303030";

        if (casas.x != null && casas.y != null)
            context.fillRect(casas.x, casas.y, 1, 1);
    }

    requestAnimationFrame(renderGrid);
}

function addPeca(x, y){

    /* if () -> verificar qual jogador */
    /* if () -> isConnected */
    let lance = Object.values(dados.pecas_brancas); 


    if (x > 0 && x <= 112)
        lance[dados.player.brancas.lances].x = 0;
    else if (x > 112 && x <= 224)
        lance[dados.player.brancas.lances].x = 1;
    else if (x > 224 && x < 336)
        lance[dados.player.brancas.lances].x = 2;
    else 
        lance[dados.player.brancas.lances].x = 3;

    if (y > 0 && y <= 112)
        lance[dados.player.brancas.lances].y = 0;
    else if (y > 112 && y <= 224)
        lance[dados.player.brancas.lances].y = 1;
    else if (y > 224 && y < 336)
        lance[dados.player.brancas.lances].y = 2;
    else 
        lance[dados.player.brancas.lances].y = 3;


}

/* Chat */
enviarBtn.addEventListener("click", enviarMsg);

// Manda mensagem no chat via websocket.io
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


/* to do

- Canvas -> divs
- isConnected()
- Botões
- Tempo
- Desacoplamento
- Últimos 2 vídeos

*/