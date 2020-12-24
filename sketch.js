//DECLARING GLOBAL VARIABLES
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover = "Good try"
var jump = "monkey"


function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
 //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating banana & obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGround = createSprite(400,360,900,10);
  invisibleGround.visible = false;

//creating ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
    console.log(ground.x);
   

  
}


function draw() {
   background("lightblue");
  
 //IF SPACE IS PRESSED THE MONKEY WILL JUMP
  if(keyDown("space")&& monkey.y >= 200)
     {
     monkey.velocityY=-10;
       
     }
   
   //ADDING GRAVITY TO THAT MONKEY SO THAT IT WILL COME DOWN AFTER ITS JUMP
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground)
  
  //RESETTING THE GROUND TO ITS HALF OF IS WIDTH
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
  
  //Food and spawnRock functions
  food();
  spawnRocks();
  
  
  
   if(gamestate===PLAY){
   
  if(bananaGroup.isTouching(monkey)){
      
    bananaGroup.destroyEach();
    survivalTime = survivalTime+2;
  }
}
  
   if (obstacleGroup.isTouching(monkey)) {
     gamestate=END
     obstacleGroup.destroyEach();
  
  } if(gamestate===END){
    
    monkey.destroy();
    ground.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    stroke("black");
    textSize(20);
    fill("black");
    text("Gameover: " + gameover,100,200);
    
    }
  
 
  //TO DISPLAY SURVIVAL TIME
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime,200,50);
    
 drawSprites();

}

function food(){
  
  //displaying the banana
   if(World.frameCount%80==0){
   banana = createSprite(300,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;
  bananaGroup.add(banana);  
      
  }
}

function spawnRocks(){
  
  //displaying the obstacles
  if(World.frameCount%60==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
}
