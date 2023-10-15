//Você está acessando os elementos HTML do jogo usando document.getElementById e document.querySelectorAll
const GameConteiner = document.getElementById('Game-conteiner');
const barra = document.getElementById('barra');
const bola = document.getElementById('bola');
const blocos = document.querySelectorAll('.bloco'); //deve ser '.bloco' para selecionar as classes corretamente.
//Você está definindo variáveis para acompanhar a posição da barra, a posição da bola, as velocidades da bola e o estado do jogo.
let barraX = 700;
let bolaX = 700; //x horizontal 
let bolaY = 600; //y vertical

var bolaVLx = 6; 
var bolaVLy = -6; 
var JogoRodando = true;


document.addEventListener("keydown", moverBarra);//está adicionando um ouvinte de evento ao documento(página da web)para capturar os eventos de teclado. Quando uma tecla é pressionada, a função moverBarra será chamada.

function moverBarra(event){ //event é o objeto de evento passado para a função quando uma tecla é pressionada.
    if(event.key === "ArrowLeft" && barraX > 0){//verifica se a tecla pressionada foi a seta esquerda, e se a posição da barra é maior que 0
        barraX -= 20 //pixel -= incrementando pouco a pouco
    }
    else if(event.key === "ArrowRight" && barraX < GameConteiner.offsetWidth - barra.offsetWidth){
        barraX += 20 //pixel -= incrementando pouco a pouco
    }
    barra.style.left = barraX + "px"; //Nesta linha de código, você está atualizando a propriedade left do estilo CSS da barra (barra.style) com a nova posição horizontal (barraX) da barra. Isso afeta a posição visual da barra na tela.
}


function todosBlocosAtingidos() {
    for (const bloco of blocos) {
        if (bloco.style.display !== "none") {
            return false; // Se um bloco ainda estiver visível, não todos foram atingidos.
        }
    }
    return true; // Todos os blocos foram atingidos.
}


function reiniciarJogo() {
    // Restaure as posições iniciais da barra e da bola, e torne todos os blocos visíveis.
    barraX = 700;
    bolaX = 700;
    bolaY = 600;
    barra.style.left = barraX + "px";
    bola.style.left = bolaX + "px";
    bola.style.top = bolaY + "px";
    for (const bloco of blocos) {
        bloco.style.display = "block";
    }
     // Inverttendo a direção vertical da bola fazendo ir para cima.
    bolaVLy = -5;
    // Redefina o estado do jogo.
    JogoRodando = true;

    // Inicie o jogo novamente.
    Lbola();
}


function Lbola(){
    //verifica se a bola atingiu a parte superior da tela. 
    if(bolaY <= 0 ){
        bolaVLy = -bolaVLy 
    }
    //verifica se a bola atingiu as paredes laterais do jogo. A primeira ie left e segunda right
    if (bolaX <= 0 || bolaX > GameConteiner.offsetWidth - bola.offsetWidth) {
        bolaVLx = -bolaVLx
    }
    //verifica se a bola atingiu a parte inferior do contêiner do jogo. Se isso acontecer, o jogo é encerrado. 
    if(bolaY + bola.offsetHeight >= GameConteiner.offsetHeight ){
        JogoRodando = false
        alert("Game Over Gay💀")
        return
    }
    //erifica se a bola colidiu com a barra controlada pelo jogador. Se isso acontecer, a direção vertical da bola é invertida, fazendo com que a bola rebata na barra.
    if(
        bolaY + bola.offsetHeight >= barra.offsetTop && //verificando se a parte inferior da bola tocou ou ultrapassou a parte superior da barra. 
        bolaX + bola.offsetWidth >= barraX && //Estamos verificando se a bola atingiu a barra pela direita.
        bolaX <= barraX + barra.offsetWidth //Estamos verificando se a bola atingiu a barra pela esquerda.
        ){
        bolaVLy = -bolaVLy
    }
    

    //Nesse trecho, estamos iterando por todos os blocos no jogo e verificando se a bola colidiu com algum deles
    blocos.forEach((bloco) => {
        if(bolaY <= bloco.offsetTop + bloco.offsetHeight &&// Estamos verificando se a bola atingiu o bloco por cima.
            bolaX + bola.offsetWidth >= bloco.offsetLeft &&// Estamos verificando se a bola atingiu o bloco pela direita.
            bolaX <= bloco.offsetLeft + bloco.offsetWidth //Estamos verificando se a bola atingiu o bloco pela esquerda.
        ){
            bolaVLy = -bolaVLy //multiplicando por -1, fazendo com que a bola rebata no bloco
            bloco.style.display = "none"; // Remova o bloco atingido
        }
    })


    if (todosBlocosAtingidos()) {
        JogoRodando = false;
        alert("Você ganhou o jogo!😱Agora dificuldade aumenta👹");
        bolaVLx += 8; // Aumente a velocidade horizontal da bola.
        bolaVLy -= 8; // Aumente a velocidade vertical da bola.
        reiniciarJogo(); // Inicie um novo jogo com a bola mais rápida.
        return;
    }


//Essas linhas atualizam a posição horizontal (bolaX) e vertical (bolaY) da bola somando as velocidades horizontal (bolaVelX) e vertical (bolaVelY). Isso move a bola na direção e velocidade
    bolaX += bolaVLx
    bolaY += bolaVLy
//Essas linhas atualizam as propriedades CSS left e top do elemento de bola para as novas posições bolaX e bolaY.
    bola.style.left = bolaX + "px";
    bola.style.top = bolaY + "px";

    //requestAnimationFrame é chamada, passando °lBola° como argumento. Isso cria um loop de animação no navegador, chamando a função atualizarBola novamente no próximo quadro de animação.
    if(JogoRodando){
        requestAnimationFrame(Lbola)
    }
};
Lbola();// Inicie o jogo

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

///
function setNeonShadows() {
    const bola = document.getElementById('bola');
    const textShadow = `0 0 10px ${getRandomColor()}, 0 0 20px ${getRandomColor()}, 0 0 30px ${getRandomColor()}`;
    const boxShadow = `0 0 10px ${getRandomColor()}, 0 0 20px ${getRandomColor()}, 0 0 30px ${getRandomColor()}`;
    
    bola.style.textShadow = textShadow;
    bola.style.boxShadow = boxShadow;
}
////

const bolinha = document.getElementById('bola');

///
setInterval(setNeonShadows, 1500); // Altera sombras a cada 1.5 segundos (tempo da animação neon)
setNeonShadows();
///

setInterval(() => {
    bolinha.style.backgroundImage = `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`;
}, 1500); // Altera a cor a cada 1.5 segundos (tempo da animação neon)