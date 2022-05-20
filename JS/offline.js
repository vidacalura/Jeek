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

clock();
verifTurn();
createGrid();
gridEventListener();
passarBtn.addEventListener("click", passarVez);
desistirBtn.addEventListener("click", desistir);


// async func para tempo
async function clock(){

    setInterval(() => {
        (turn == "white" ? tempo_w-- : tempo_b--);
        (turn == "white" ? tempo_w_p.textContent = Math.floor(tempo_w / 60) + ":" + Math.floor(tempo_w % 60) 
        : tempo_b_p.textContent = Math.floor(tempo_b / 60) + ":" + Math.floor(tempo_b % 60));

        if (tempo_w == 0){
            alert("Tempo esgotado! Brancas perdem!");
            restart();
        }
        else if (tempo_b == 0){
            alert("Tempo esgotado! Pretas perdem!");
            restart();
        }

    }, 1000);


}

function passarVez(){

    if (turn == "white"){
        turn = "black";
    }
    else{
        turn = "white";
    }

    verifTurn();    

    jogadas = 3;

}

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

function gridEventListener(){

    for (const casa_ataque of casas){
        casa_ataque.addEventListener("click", (e) => {
            if (!casas_ativas.includes(casa_ataque.dataset.id)){
                if (1){
                    // Captar e registrar movimento
                    const peca = document.createElement("div");
                    
                    if (turn == "white")
                        peca.classList.add("peca-branca");
                    else
                        peca.classList.add("peca-preta");

                    casa_ataque.appendChild(peca);
                    casas_ativas.push(casa_ataque.dataset.id);

                    if(casas_ativas.length == 15){
                        endgame();
                    }

                    jogadas--;

                    if (jogadas == 0){
                        if (turn == "white"){
                            turn = "black";
                            jogadas = 3;
                        }
                        else{
                            turn = "white";
                            jogadas = 3;
                        }
                    }

                    lances++;
                    verifTurn();
                }
            }
        });
    }

}

function desistir(){

    if (turn == "white"){
        alert("Brancas desistem. Pretas ganham!");
    }
    else {
        alert("Pretas desistem. Brancas ganham!");
    }

    restart();

}

function isConnected(){

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

// Permitir apenas lances horizontais e verticais
// Não permitir jogadas simétricas no primeiro lance
// Não permitir duas jogadas no mesmo quadrado

/*
                if (jogadas == 3) || 
                ((casa_ataque.dataset.id == Number(casas_ativas[lances]) - 4) || (casa_ataque.dataset.id == Number(casas_ativas[lances]) + 4)) ||
                ((Number(casas_ativas[lances]) % 4 == 0) && (casa_ataque.dataset.id == Number(casas_ativas[lances]) + 1)) ||
                ((Number(casas_ativas[lances]) != 3) && (Number(casas_ativas[lances]) != 7) && (Number(casas_ativas[lances]) != 11) && (casa_ataque.dataset.id == Number(casas_ativas[lances]) + 1)) ||
                ((!Number(casas_ativas[lances]) % 4 == 0) && (casa_ataque.dataset.id == Number(casas_ativas[lances]) - 1)) ||
                (jogadas == 1) && ((casa_ataque.dataset.id == Number(casas_ativas[lances - 1]) - 4) || (casa_ataque.dataset.id == Number(casas_ativas[lances - 1]) + 4))
*/