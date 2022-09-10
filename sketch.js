var trex ,trex_running;
var ground, ground_image;
var ground2;
var cloud, cloud_image;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var score1 = 0;
var obstacleGroup, cloudGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexEnd;
var gameOver, gameOverImg;
var restart, restartImg;
var jump, die, checkpoint;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexEnd = loadAnimation("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
trex = createSprite(70, 150, 50, 50); 
trex.addAnimation("trex",trex_running);
trex.addAnimation("collided",trexEnd);
trex.scale = 0.5

ground = createSprite(120, 185, 600, 10)
ground.addImage("ground", ground_image);
ground2 = createSprite(130, 198, 600, 10);
ground2.visible = false;

obstacleGroup = new Group();
cloudGroup = new Group();

gameOver = createSprite(318, 90, 10, 100);
gameOver.addImage("gameOver", gameOverImg);
gameOver.scale = 0.75
gameOver.visible = false;

restart = createSprite(330, 124, 10, 100);
restart.addImage("restart", restartImg);
restart.scale = 0.5;
restart.visible = false;

//trex.debug = true;
trex.setCollider("circle",0, 0,40);
}


function draw(){
  background("white");
  //console.log(trex.y);
  //text (mouseX+","+mouseY,mouseX,mouseY);
  if (gameState === PLAY) {
    ground.velocityX = -(8+4*score/100); 
    score+= Math.round(frameRate()/60);

    if (score%100 === 0 && score>0) {
     checkpoint.play();
    }

    if ((keyDown(UP_ARROW) || keyDown("space")) && trex.y>=162) {
      trex.velocityY = -9.5;
      jump.play();
    }
    trex.velocityY+=0.5;
    if (ground.x<0) {
      ground.x = ground.width/2;
    }
    spawnClouds();
    spawnObstacles();
    
    if(obstacleGroup.isTouching(trex)) {
      gameState = END;
      die.play();
    }
   
  fill("black");
  //score1 = score;
  //text("High Score: "+score, 400, 30);


  if (score1>=score)  {
    text("High Score: "+score1, 400, 30); 
  }
  else if (score>score1) {
    score1 = score;
    text("High Score: "+score1, 400, 30);
}

  else {
    
    text("High Score: "+score, 400, 30);

}



  }
else if (gameState === END) {
  ground.velocityX = 0;
  trex.velocityY = 0;
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trexEnd);
  cloudGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  gameOver.visible = true;
  restart.visible = true;
  fill("black");
 // score1 = score;
  //text("High Score: "+score, 400, 30);


  if (score1>=score)  {
    text("High Score: "+score1, 400, 30); 
  }
  else if (score>score1) {
    score1 = score;
    text("High Score: "+score1, 400, 30);
}

  else {
    
    text("High Score: "+score, 400, 30);

}


  if (mousePressedOver(restart)) {
   reset()
  }
}



  fill("black");
  text ("Score: "+score,500, 30);


  trex.collide(ground2);

  drawSprites();

}


function spawnClouds() {
  if(frameCount%80 === 0) {
  cloud = createSprite(600, 50, 50, 20);
  cloud.addImage("cloud",cloud_image);
  cloud.velocityX = -4;
  cloud.scale = Math.round(random(0.5, 2));
  cloud.y = Math.round(random(50, 130));
  //console.log(trex.depth);
  console.log(cloud.depth);
  cloud.depth = trex.depth;
  trex.depth +=1;
  cloud.lifetime = 170;
  cloudGroup.add(cloud);
  cloud.depth = gameOver.depth;
  gameOver.depth+=1;
  console.log(gameOver.depth)
}
}

function spawnObstacles() {
if(frameCount%80 === 0) {
obstacle = createSprite(600, 167, 50, 20);
obstacle.velocityX = -(8+4*score/100);
obstacle.scale = 0.62;
var rand = Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  case 3: obstacle.addImage(obstacle3);
  break;
  case 4: obstacle.addImage(obstacle4);
  break;
  case 5: obstacle.addImage(obstacle5);
  break;
  case 6: obstacle.addImage(obstacle6);
  break;
  default: break;
}
  obstacle.lifetime = 80;
  obstacleGroup.add(obstacle);
}
}

function reset () {
  gameState = PLAY
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("trex",trex_running);
  
  //fill("black");
  //score1 = score;
  //text("High Score: "+score, 400, 30);

  if (score1>score)  {
    text("High Score: "+score1, 400, 30); 
}
     else {
    score1 = score1;
    text("High Score: "+score1, 400, 30);
}

  }