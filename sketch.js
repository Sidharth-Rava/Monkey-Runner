//Declaring variables
var monkey , monkey_running, monkeyCollide;

var ground, invisibleGround, groundImg;

var banana ,bananaImage, obstacle, obstacleImage;

var FoodGroup, obstacleGroup;

var score = 0;

var bananaScore = 0;

var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  
//loading Images and Animations
  monkey_running =     loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  
  
  groundImg = loadAnimation("ground.jpg") 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup(){
  //creating canvas
 createCanvas(600,300);
  
  //creating groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  //creating monkey
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
  //creating ground  
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  
  ground.addAnimation("ground", groundImg);
  
  //creating invisible ground
  invisibleGround = createSprite(300,278,600,7);
  invisibleGround.visible = false;
  
}

function draw(){
  //clearing screen
  background("skyblue");
  
  //displaying no.of bananas collected
  fill("black");
  text("SURVIVAL TIME : "+score, 470, 20);
  text("BANANAS COLLECTED : " + bananaScore,300,20);
  
  //giving conditions for gamestate(play)
  if (gameState === PLAY){
    
    obstacles();
    
    bananas();
  
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    //increasing speed of the ground
    ground.velocityX = -(4 + score * 1.5/100);
  
    //assinging keys for making monkey jump 
    if(keyDown("space") && monkey.y >= 235) {
      monkey.velocityY = -14; 
    }
  
    //increasing monkey's velocity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //making ground move
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore = bananaScore + 1;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  //giving gamestate(end) conditions
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    //displaying text
    fill("red")
    stroke("black")
    textSize(30);
    text("GAME OVER!!!", 220, 170);
    
    fill("black");
    textSize(15);
    text("Press 'R' to restart", 240, 200);
    
    //restart condition
    if (keyDown("R")) {
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  //drawing sprites
  drawSprites(); 
  
  //giving collide function to monkey and invisible ground
  monkey.collide(invisibleGround);
}

//creating function bananas
function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120,50,50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  
}

//creating function obstacles
function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4 + score * 1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
}