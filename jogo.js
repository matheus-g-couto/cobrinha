//variaveis globais
var canvas, ctx, WIDTH, HEIGHT, FPS, tamanhoTile, jogando, corCanvas = "black",div;
var snake, playlabel;

//objeto com os valores das setas, obtido manualmente no console do Chrome com função nativa do JS keyCode
var setas = {
  esquerda: 37,
  cima: 38,
  direita: 39,
  baixo: 40
};

//função principal que roda o jogo, criando o canvas e inicializando tudo
function init(){
  canvas= document.createElement("canvas");
  definirTamanho();
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");

  canvas.style.background = corCanvas;
  div = document.getElementById("pontuacao");
  if(corCanvas=="white" || corCanvas=="yellow")
	div.style.color = "black";
  else
	div.style.color = "white";

  FPS = 15;

  newGame();
  run();
}

//define a proxia posição da cobra
function update(){
  snake.update();
}

//roda o jogo
function run (){
  update();
  draw();

  setTimeout(run, 1000 / FPS);
}

function draw(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  snake.draw();

  if(!jogando)
    playlabel.draw();
}

//define o tamanho do canvas
function definirTamanho(){
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  tamanhoTile = Math.max(Math.floor(WIDTH / 60),Math.floor(HEIGHT / 60))
}

function morte(){
  if (!jogando){
    if(this.direction[1] == -1 && nextPos[1] <= 0)
        newGame();
    else if(this.direction[0] == 1 && nextPos[0] >= (WIDTH / tamanhoTile))
        newGame();
    else if(this.direction[1] == 1 && nextPos[1] >= (HEIGHT / tamanhoTile))
        newGame();
    else if(this.direction[0] == -1 && nextPos[0] <= 0)
        newGame();
    setTimeout(morte, 1000 / FPS);
  }
}

//sempre que tiver uma tecla pressionada chama a função keyDown
window.addEventListener("keydown", keyDown);

//define o tamanho da tela de acordo com o canvas
window.addEventListener("resize",definirTamanho);

//define pra que direção a cobrinha vai de acordo com a tecla apertada
function keyDown(e){
  if(!jogando && (e.keyCode == setas.cima || e.keyCode == setas.baixo || e.keyCode == setas.esquerda || e.keyCode == setas.direita))
    jogando = true;
  switch (e.keyCode) {
      case setas.esquerda:
        if(snake.direction[0] != 1)
          snake.direction = [-1, 0];
        break;

      case setas.cima:
        if(snake.direction[1] != 1)
          snake.direction = [0, -1];
        break;

      case setas.direita:
        if(snake.direction[0] != -1)
          snake.direction = [1, 0];
        break;

      case setas.baixo:
        if(snake.direction[1] != -1)
          snake.direction = [0, 1];
        break;
  }
}

function dispositivoMovel(){
  return /Android|Ipod|Ipad|Iphone|Windoes Phone/i.test(navigator.userAgent)
}

function newGame(){
  //sempre que o jogo começar chama a função Snake, e poem que this =  snake
  snake = new Snake();

  playlabel = new Playlabel();

 //sempre que o jogo começar define que o usuario não está jogando
  jogando = false;
}

function Playlabel(){
  this.text;
  this.color = "rgb(84, 84, 84)";

  this.messages = {
    portrait:"Rotacione o dispositivo para poder jogar",
    landscape:"Arraste a tela para jogar",
    pc:"Pressione as setas para jogar"
  };
  if(dispositivoMovel()){


  }
  else{
    this.text = this.messages["pc"];
  }
  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.font = tamanhoTile*1.5 + "px Arial";
    ctx.fillText(this.text, WIDTH / 2 - ctx.measureText(this.text).width / 2, HEIGHT / 2 )
  }
}

function Snake(){
    //posição inicial da cobra
    this.body = [[10, 10],[10, 11],[10, 12]];
    //cor da cobra
    this.color = "rgba(245,98,98, 1)";
    //direção inicial da cobra
    this.direction = [0, -1];

    this.update = function(){
      //define a proxima posição da cobra, ou seja, define seu movimento
      var nextPos = [this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]];
      //enquanto não estiver jogando a cobra vai ficar rodando a tela
      if (!jogando){
        if(this.direction[1] == -1 && nextPos[1] <= (HEIGHT * 0.1 / tamanhoTile))
            this.direction = [1, 0];
        else if(this.direction[0] == 1 && nextPos[0] >= (WIDTH * 0.9 / tamanhoTile))
            this.direction = [0, 1];
        else if(this.direction[1] == 1 && nextPos[1] >= (HEIGHT * 0.9 / tamanhoTile))
            this.direction = [-1, 0];
        else if(this.direction[0] == -1 && nextPos[0] <= (HEIGHT * 0.1 / tamanhoTile))
            this.direction = [0, -1];
      }

      //tira a ultima posição da cobra definindo assim o movimento dela
      this.body.pop();

      //poem um quadrado na proxima direção da cobra
      this.body.splice(0, 0, nextPos);
    }

    this.draw = function(){
      ctx.fillStyle = this.color

      for(var i=0;i < this.body.length; i++){
        ctx.fillRect(this.body[i][0] * tamanhoTile, this.body[i][1] * tamanhoTile, tamanhoTile, tamanhoTile);

      }
    }
}

//inciializa o jogo
init();
