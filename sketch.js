var mob;
var border;
var mobsGroup;
var skeImg,zombImg;
var player, playerImg;
var backImg;
var lifeImage;
var life = 185;
var mlife = 8;
var Play, End;
var gameState = "Play";
var bunker1, bunker2, bunker3;
var main;
var bullet1;
var bunker1Life = 10;
var bunker2Life = 10;
var bunker3Life = 10;



function preload(){
  game = new Game();
  
  

  mainImage = loadImage("main.png");
  bunker1Image = loadImage("bunker.png");
  bunker2Image = loadImage("bunker.png");
  bunker3Image = loadImage("bunker.png");
  bulletImage = loadImage("bullet.png");

  lifeImage = loadImage("./assets/life.png");

  skeImg = loadImage("ske.png");
  zombImg = loadImage("zomb.png");  
  playerImg = loadImage("player.png"); 
  backImg = loadImage("back.jpg");
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight-1);

  bunker1 = createSprite(400, 610, 50 ,50);
  bunker1.addImage("bunker1Img", bunker1Image);
  bunker1.scale = 0.5;

  bunker2 = createSprite(390, 130, 50 ,50);
  bunker2.addImage("bunker2Img", bunker2Image);
  bunker2.scale = 0.5;

  bunker3 = createSprite(550, 355, 50 ,50);
  bunker3.addImage("bunker3Img", bunker2Image);
  bunker3.scale = 0.5;

  main = createSprite(190, 355, 50 ,50);
  main.addImage("mainImg", mainImage);
  main.scale = 0.6;

  
  bulletGroup = new Group();
  bunkerGroup = new Group();



  mobsGroup = new Group();  
  player = createSprite(250,250,50,50);
  player.scale = 0.6;
  player.addImage(playerImg);

  border = createSprite(10,250,50, 5000);
  border.visible = false;
  
  console.log(windowHeight);
  console.log(windowWidth);
}

function draw(){
  background(backImg);
  
  stroke("yellow");
  fill("yellow");
  textSize(30);
  //text(score, 230,250);
  text(life, player.x - 10,player.y - 120);
  
  
 if (gameState === "Play") {

    

    
      //shoot1();
    
  
   spawnMobs();
   
   game.play();
   for (var i = 0; i < mobsGroup.length; i++){
    if(player.isTouching(mobsGroup[i])){
      mobsGroup[i].destroy();
      life = life + 10;
    }
   } 
   
  //  for (var i = 0; i < mobsGroup.length; i++){
  //   if(bulletGroup.isTouching(mobsGroup[i])){
  //     mobsGroup[i].destroy();
  //     life = life + 10;
  //   }
  //  } 

   for (var i = 0; i < mobsGroup.length; i++){
    if (mobsGroup[i].isTouching(bunker1) || mobsGroup[i].isTouching(bunker2) || mobsGroup[i].isTouching(bunker1) ){
      gameState= "End";
    }
  }
 }

 if(gameState === "End"){
  gameOver();
 }
 
 
 

 
 drawSprites();

 shoot1();
}


function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl: main.png,
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}




function spawnMobs() {
 
  
  //write code here to spawn the doors in the tower
  if (frameCount % 40 === 0) {
    
    
    mob = createSprite(random(1000,1500),random(100,1500),50,50);
    mob.debug = true;

    

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: mob.addImage(skeImg);
              mob.scale = random(0.2,0.5);
              mob.setCollider('circle',0 , 0, mob.width / 2 - 50);
              break;
      case 2: mob.addImage(zombImg);
              mob.scale = random(0.5,0.8);
              mob.setCollider('circle',0 , 0, mob.width / 2 - 50);
              break;
      // case 3: obstacle.addImage(obstacle3);
      //         break;
      // case 4: obstacle.addImage(obstacle4);
      //         break;
      // case 5: obstacle.addImage(obstacle5);
      //         break;
      // case 6: obstacle.addImage(obstacle6);
      //         break;
      default: break;
    }
    
    if (frameCount % 10 === 0) {
      if (life > 0) {
        life = life - 5;
      }

      if (life <= 0) {
        gameState = "End";
      }      
      

      
    }
      
    
   
    
    mob.velocityX = -3;    
    
    
    // ghost.depth = door.depth;
    // ghost.depth +=1;
   
    //assign lifetime to the variable
    mob.lifetime = 1500;

    
    //add each door to the group
    mobsGroup.add(mob);
    
    
  }
  
}

function shoot1() {
  if (gameState == "Play"){
  stroke("yellow");
   fill("yellow");
   textSize(30);
   text(bunker1Life, bunker1.x - 30,bunker1.y - 80);

   stroke("yellow");
   fill("yellow");
   textSize(30);
   text(bunker2Life, bunker2.x - 30,bunker2.y - 80);

   stroke("yellow");
   fill("yellow");
   textSize(30);
   text(bunker3Life, bunker3.x - 30,bunker3.y - 80);
  }

   // code to shoot
   if (keyWentDown("1")){
     bunker1Life = bunker1Life-1;
    bullet1 = createSprite(bunker1.x + 130, bunker1.y + 33, 50, 50);
    bullet1.addImage("bulletImg", bulletImage);
    bullet1.scale = 0.2;
    bullet1.velocityX = 3;
    bulletGroup.add(bullet1);
   
   }

   if (keyWentDown("2")){
    bunker2Life = bunker2Life-1;
    bullet2 = createSprite(bunker2.x + 100, bunker2.y + 33, 50, 50);
    bullet2.addImage("bulletImg", bulletImage);
    bullet2.scale = 0.2;
    bullet2.velocityX = 3;
  bulletGroup.add(bullet2);

   }
   if (keyWentDown("3")){
     bunker3Life = bunker3Life-1;
   bullet3 = createSprite(bunker3.x + 100, bunker3.y + 33, 50, 50);
    bullet3.addImage("bulletImg", bulletImage);
    bullet3.scale = 0.2;
    bullet3.velocityX = 3;
  bulletGroup.add(bullet3);

  }
  
  
}





