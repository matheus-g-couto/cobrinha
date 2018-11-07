//variaveis globais
var canvas, ctx, WIDTH, HEIGHT, FPS, tamanhoTile, jogando, corCanvas = "black",div;
var snake, playlabel ,apple1;
var pts, recorde;
var loja,botoesminhoca , botoesfundo , escolhacobra , escolhefundo;

loja = document.getElementById("loja");
escolhecobra = document.getElementById("escolhecobra");
escolhefundo = document.getElementById("escolhefundo");
botoesminhoca= document.querySelectorAll(".cor-minhoca");
botoesfundo= document.querySelectorAll(".cor-fundo");
div = document.getElementById("pontuacao");

recorde = localStorage.getItem('recorde');
if(recorde==undefined) recorde=0;

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
  if(corCanvas=="white" || corCanvas=="yellow")
	div.style.color = "black";
  else
	div.style.color = "white";

  FPS = 20;

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

  if(jogando)
  apple1.draw();

  snake.draw();

  if(!jogando)
    playlabel.draw();
}

//define o tamanho do canvas
function definirTamanho(){
  WIDTH = window.innerWidth * 0.75;
  HEIGHT = window.innerHeight;

  loja.style.width=WIDTH/3 - 29 + "px";

  loja.style.height=HEIGHT - 30 + "px";

  canvas.width = WIDTH ;
  canvas.height = HEIGHT;

  tamanhoTile = Math.max(Math.floor(WIDTH / 60),Math.floor(HEIGHT / 60))
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

  apple1 = new Apple1();

  pts = 0;

  div.innerHTML="Pontuação : 0  Recorde : 0";

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

function Apple1(){
  //posição inicial da maçã
  this.body = [Math.floor(Math.random() * (WIDTH / tamanhoTile) + 1), Math.floor(Math.random() * (HEIGHT / tamanhoTile) + 1)];
  //cor da maçã
  this.color = "red";

  this.draw = function(){
    ctx.fillStyle = this.color;

    ctx.fillRect(this.body[0] * tamanhoTile, this.body[1] * tamanhoTile, tamanhoTile, tamanhoTile);

    }
}

function Snake(){
    //posição inicial da cobra
    this.body = [[10,10]];
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

      //quando pega a maçã,a minhoca cresce e a maçã vai para outro lugar
      if(Math.floor(this.body[0][0]) == Math.floor(apple1.body[0]) && Math.floor(this.body[0][1]) == Math.floor(apple1.body[1])){
        this.body.splice(this.body.length , 0, nextPos);

        //armazena o recorde do jogador toda vez que a pontuação atual for maior que o recorde anterior
        if(pts>recorde){
          recorde = pts;
          localStorage.setItem('recorde', recorde);
        }
        div.innerHTML="Pontuação : " + pts + " Recorde : " + recorde;

        var x , y;
        x = Math.floor(Math.random() * (WIDTH / tamanhoTile));
        y = Math.floor(Math.random() * (HEIGHT / tamanhoTile));

        for(var i=1 ; i < this.body.length ; i++)
            while(x==this.body[i][0] && y==this.body[i][1]){
              x = Math.floor(Math.random() * (WIDTH / tamanhoTile));
              y = Math.floor(Math.random() * (HEIGHT / tamanhoTile));
            }

        apple1.body[0] = x;
        apple1.body[1] = y;
      }

      //se passar da tela a minhoca aparece do outro lado.
      if (jogando){
        if(snake.direction[1] == -1 && nextPos[1] <= -1)
            //newGame();
            nextPos[1] = (HEIGHT / tamanhoTile);
        else if(snake.direction[0] == 1 && nextPos[0] >= 1 + (WIDTH / tamanhoTile))
            //newGame();
            nextPos[0] = 0;
        else if(snake.direction[1] == 1 && nextPos[1] >= 1 + (HEIGHT / tamanhoTile))
            //newGame();
            nextPos[1] = 0;
        else if(snake.direction[0] == -1 && nextPos[0] <= -1)
            //newGame();
            nextPos[0] = (WIDTH / tamanhoTile);

        //se encostar em sí mesma, o jogo é reiniciado
        for(var i=1 ; i < this.body.length ; i++)
            if(this.body[0][0]==this.body[i][0] && this.body[0][1]==this.body[i][1])
                    newGame();
      }

      //tira a ultima posição da cobra definindo assim o movimento dela
      this.body.pop();

      //poem um quadrado na proxima direção da cobra
      this.body.splice(0, 0, nextPos);
    }

    this.draw = function(){
      ctx.fillStyle = this.color;

      for(var i=0;i < this.body.length; i++){
        ctx.fillRect(this.body[i][0] * tamanhoTile, this.body[i][1] * tamanhoTile, tamanhoTile, tamanhoTile);
      }
    }
}

$("#hackvelo").click(function(){
  FPS+=20;
})

$("#escolhecobra").change(function(){
  snake.color = escolhecobra.value;
})

$("#escolhefundo").change(function(){
  canvas.style.background = escolhefundo.value;
})

for(let i = 0 ; i < botoesminhoca.length ; i++){
  botoesminhoca[i].addEventListener('click',function(){
    snake.color = botoesminhoca[i].name;
  })
}
for(let i = 0 ; i < botoesfundo.length ; i++){
  botoesfundo[i].addEventListener('click',function(){
    canvas.style.background = botoesfundo[i].name;
  })
}

//inciializa o jogo
init();
