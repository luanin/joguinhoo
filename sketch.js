let imagemDoDeserto;
let imagemDoCamelinho;
let imagemDoDinosalrinho;
let imagemDoTrex;
let musicaDeFundo;

// Posições dos camelos
let camelos = [];

// Posições dos trex
let trexs = [];

// Posição inicial do dinossauro
let yDino = 366;
let xDino = 100;
let dinoVelocidade = 3; // Velocidade do dinossauro

// Posição inicial do dinossauro quando ele chegar ao topo
let yDinoInicial = 366;

// Pontuação
let pontuacao = 0;

function preload() {
  imagemDoDeserto = loadImage("imagens/deserto.jpeg");
  imagemDoCamelinho = loadImage("imagens/camelo.png");
  imagemDoDinosalrinho = loadImage("imagens/dino.png");
  imagemDoTrex = loadImage("imagens/trex.png");
  
  // Carregue a música de fundo
  musicaDeFundo = loadSound("sons/semPai.mp3");
}

function setup() {
  createCanvas(800, 500);
  
  // Inicialize a música de fundo
  musicaDeFundo.loop(); // Reproduza a música de fundo em um loop
  
  // Inicializa as posições dos camelos (aqui, estamos criando apenas 3 camelos)
  for (let i = 0; i < 3; i++) {
    camelos.push({ x: width + i * 200, y: 40 });
  }
  // Inicializa as posições dos trex (aqui, estamos criando apenas 2 trex)
  for (let i = 0; i < 2; i++) {
    trexs.push({ x: width + i * 300, y: 300 });
  }
}

function draw() {
  background(imagemDoDeserto);
  mostraDino();
  movimentaDino();
  exibePontuacao(); // Exibe a pontuação

  // Desenha e verifica colisões com todos os camelos
  for (let i = 0; i < camelos.length; i++) {
    mostraCamelo(camelos[i].x, camelos[i].y);
    movimentaCamelo(i);
    verificarColisao(i);
  }

  // Desenha e verifica colisões com todos os trex
  for (let i = 0; i < trexs.length; i++) {
    mostraTrex(trexs[i].x, trexs[i].y);
    movimentaTrex(i);
    verificarColisaoTrex(i);
  }

  // Verifica se o dinossauro chegou ao topo da tela
  if (yDino <= 0) {
    // Reposiciona o dinossauro na posição inicial
    yDino = yDinoInicial;
    // Incrementa a pontuação quando o dinossauro atravessa um camelo
    pontuacao++;
  }
}

function mostraDino() {
  image(imagemDoDinosalrinho, xDino, yDino, 60, 60);
}

function mostraCamelo(x, y) {
  image(imagemDoCamelinho, x, y, 50, 40);
}

function mostraTrex(x, y) {
  image(imagemDoTrex, x, y, 50, 40); // Desenha o trex com as mesmas dimensões dos camelos
}

function movimentaCamelo(index) {
  // Move o camelo da direita para a esquerda
  camelos[index].x -= 4;

  // Verifica se o camelo atingiu o final da tela
  if (camelos[index].x < -50) {
    // Reposiciona o camelo no início
    camelos[index].x = width + 50;
  }
}

function movimentaTrex(index) {
  // Move o trex da direita para a esquerda
  trexs[index].x -= 2;

  // Verifica se o trex atingiu o final da tela
  if (trexs[index].x < -50) {
    // Reposiciona o trex no início
    trexs[index].x = width + 50;
  }
}

function movimentaDino() {
  if (keyIsDown(UP_ARROW)) {
    yDino -= dinoVelocidade;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yDino += dinoVelocidade;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xDino += dinoVelocidade;
  }
  if (keyIsDown(LEFT_ARROW)) {
    xDino -= dinoVelocidade;
  }
}

function verificarColisao(index) {
  // Verifica se o dinossauro e o camelo se colidem
  if (
    xDino + 60 > camelos[index].x && // Dinossauro à direita do camelo
    xDino < camelos[index].x + 50 && // Dinossauro à esquerda do camelo
    yDino + 60 > camelos[index].y && // Dinossauro abaixo do topo do camelo
    yDino < camelos[index].y + 40 // Dinossauro acima do fundo do camelo
  ) {
    // Se houver colisão, reposiciona o dinossauro
    yDino = yDinoInicial;
    // Reduz a pontuação quando o dinossauro colide com um camelo
    if (pontuacao > 0) {
      pontuacao--;
    }
  }
}

function verificarColisaoTrex(index) {
  // Verifica se o dinossauro e o trex se colidem
  if (
    xDino + 60 > trexs[index].x && // Dinossauro à direita do trex
    xDino < trexs[index].x + 50 && // Dinossauro à esquerda do trex
    yDino + 60 > trexs[index].y && // Dinossauro abaixo do topo do trex
    yDino < trexs[index].y + 40 // Dinossauro acima do fundo do trex
  ) {
    // Se houver colisão, reposiciona o dinossauro
    yDino = yDinoInicial;
    // Reduz a pontuação quando o dinossauro colide com um trex
    if (pontuacao > 0) {
      pontuacao--;
    }
  }
}

function exibePontuacao() {
  fill(255);
  textSize(24);
  textAlign(LEFT);
  text(`Pontuação: ${pontuacao}`, 20, 30);
}
