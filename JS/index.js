let turn = "white";
let jogadas = 3;
let tempo_w_p = document.querySelector(".tempo-white");
let tempo_b_p = document.querySelector(".tempo-black");
let tempo_w = 120;
let tempo_b = 120;
const board = document.querySelector(".tabuleiro");
let casas = [];
let casas_ativas = [];
const passarBtn = document.querySelector(".botao-passar");
const desistirBtn = document.querySelector(".botao-desistir");
const p_turn = document.querySelector(".p-turn");

verifTurn();
createGrid();
gridEventListener();
passarBtn.addEventListener("click", passarVez);
desistirBtn.addEventListener("click", desistir);

// async func para tempo

function passarVez(){

    if (turn == "white"){
        turn = "black";
    }
    else{
        turn = "white";
    }

    if (turn == "white"){
        p_turn.textContent = "Vez das brancas";
    }
    else{
        p_turn.textContent = "Vez das pretas";
    }
    

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
            // Captar e registrar movimento
            const peca = document.createElement("div");
            
            if (turn == "white")
                peca.classList.add("peca-branca");
            else
                peca.classList.add("peca-preta");

            casa_ataque.appendChild(peca);
            casas_ativas.push(casa_ataque.dataset.id);

            if(casas_ativas.length == 15){
                if (turn == "white"){
                    alert("Brncas ganham!");
                }
                else{
                    alert("Pretas ganham!");
                }
                restart();
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

            verifTurn();
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

function restart(){

    window.location.reload();

}

// Tornar código mais legível
// Permitir apenas lances horizontais e verticais