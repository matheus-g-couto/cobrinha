var canvas, ctx, WIDTH, HEIGHT, FPS, tamanhoTile, jogando, corCanvas = "black";
var snake;
window.addEventListener("resize",definirTamanho);

function definirTamanho(){
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  tamanhoTile = Math.max(Math.floor(WIDTH / 60),Math.floor(HEIGHT / 60))
}

function init(){
  canvas= document.createElement("canvas");
  definirTamanho();
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  canvas.style.background = corCanvas;
  
  FPS = 15;

  newGame();
  run();
}
function newGame(){
  snake = new Snake();

  jogando = false;
}
function Snake(){
    this.body = [[10, 10],[10, 11],[10, 12]];
    this.color = "white";
    this.direction = [0, -1];

    this.update = function(){
      var nextPos = [this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]];
      this.body.pop();
      this.body.splice(0, 0, nextPos);
    }

    this.draw = function(){
      ctx.fillStyle = this.color

      for(var i=0;i < this.body.length; i++){
        ctx.fillRect(this.body[i][0] * tamanhoTile, this.body[i][1] * tamanhoTile, tamanhoTile, tamanhoTile);

      }
    }
}

function update(){
  snake.update();
}

function run (){
  update();
  draw();

  setTimeout(run, 1000 / FPS);
}

function draw(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  snake.draw();
}

init();
