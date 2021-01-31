var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var invisibleGround,ground;
var score=0;
var BananasEaten=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  MonkeyCollided=loadImage("sprite_0.png")
  bananaImage = loadImage("banana.png"); 
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500)
  monkey= createSprite(60,440,10,10)
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("Collided",MonkeyCollided)
  monkey.scale=0.1;
  invisibleGround = createSprite(20,450,400,10);
  invisibleGround.visible = false;
  
  ground=createSprite(300,470,600,15);
  console.log(ground.x)
  bananasGroup=createGroup();
  obstacleGroup=createGroup();
    monkey.setCollider("circle",0,0,100);
    monkey.debug = true

}


function draw() {
  background("lightblue");
  textSize(15);
  text("SurvivalTime: "+ score, 450,50);
  text("Bananas Eaten:"+BananasEaten,50,50)
  if(gameState==PLAY){
     score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
      ground.x=ground.width/2

    
    if(keyDown("space")&& monkey.y > 392) {
        monkey.velocityY = -12;
      if(ground.x<0){
        ground.x=300
        
      }
      console.log(monkey.y)
    }
    
    
     if(obstacleGroup.isTouching(monkey)){
       monkey.changeAnimation('Collided')
       gameState=END;
     }
    if(bananasGroup.isTouching(monkey)){
    bananasGroup[0].destroy();
      BananasEaten=BananasEaten+1
    }
      
       //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(invisibleGround);
    
    spawnobstacles();
    spawnbanana();
    
    
    
  }
   else if(gameState==END){
     textSize(25);
       text("PRESS R TO RESTART",170,300);
     ground.velocityX = 0;
      monkey.velocityY = 0
     monkey.y=434
     bananasGroup.setVelocityXEach(0);
     bananasGroup.destroyEach();
     if(keyDown("R") && gameState==END){
      gameState=PLAY;
       score=0
       BananasEaten=0;
       
       
     }  
     
     
     
    

   }
 
  drawSprites();
}

function spawnbanana(){
   if (frameCount % 60 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(300,330));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -(3 + BananasEaten/5);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananasGroup.add(banana);
  }

  
}

function spawnobstacles(){
  if (frameCount % 150 === 0) {
    var obstacle  = createSprite(600,450,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
   obstacle.velocityX = -(6 + score/100);
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
  
}


