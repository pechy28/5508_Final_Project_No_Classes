////background variables

////game controls
var stage = 0; //which stage the game is currently on
  //0 = splash
  //1 = level 1
  //2 = win screen
  //3 = lose screen
  //4 = level 2
  //5 = level 3

////player variables
var p1X = 500;//p1 for player 1
var p1Y = 370;
var pWidth = 90;
var pHeight = 90;
var pSpeed = 5;
////walking code
var step = 0;
var lookingRight = false;
var lookingLeft = true;

////platform variables -------------FOR LEVEL 1
var b1X = 200;//b1 for box 1
var b1Y = 300;
var b2X = 500;
var b2Y = 300;
var b3X = 400;
var b3Y = 110;
var bWidth = 200;
var bHeight = 40;

////platform variables -------------FOR LEVEL 2
var b4X = 120;
var b4Y = 300;
var b5X = 650;
var b5Y = 350;
var b6X = 620;
var b6Y = 194;
var b7X = 370;
var b7Y = 170;


////platform variables -------------FOR LEVEL 3
var b8X = 680;
var b8Y = 160;
var b9X = 400;
var b9Y = 240;

////keys --------------FOR LEVEL 1
var k1X = 410;//k1 for key 1
var k1Y = 60;
var kWidth = 50;
var kHeight = 50;
var haveKey1 = false;

////keys --------------FOR LEVEL 2
var k2X = 100;//k1 for key 1
var k2Y = 200;
var haveKey2 = false;

////keys --------------FOR LEVEL 3
var k3X = 720;
var k3Y = 100;
var haveKey3 = false;

////guards ------------------ FOR LEVEL 1
var g1X = 300;//g1 for guard 1
var g1Y = 370;
var gWidth = 75;
var gHeight = 85;
////moving guards
var g1Position = 200;//center position of guard
var gSpeed = 2;
var g1Direction = 1;//1 is right, -1 is left
var g1Distance = 300;//how far guards can travel

////guards ------------------ FOR LEVEL 2
var g2X = 120;//g1 for guard 1
var g2Y = 240;
////moving guards
var g2Position = 120;//center position of guard
var g2Direction = 1;//1 is right, -1 is left
var g2Distance = 75;//how far guards can travel
var g3X = 380;//g1 for guard 1
var g3Y = 108;
////moving guards
var g3Position = 380;//center position of guard
var g3Direction = 1;//1 is right, -1 is left
var g3Distance = 90;//how far guards can travel

////guards ------------------ FOR LEVEL 3
var g4X = 400;
var g4Y = 178;
var g4Position = 400;
var g4Distance = 85;
var g4Direction = 1;

////door--------------------FOR LEVEL 1
var d1X = 700;
var d1Y= 335;
var dWidth = 150;
var dHeight = 150;

////door--------------------FOR LEVEL 2
var d2X = 590;
var d2Y= 100;

////door--------------------FOR LEVEL 3
var d3X = 80;
var d3Y= 335;

////counters ---------------FOR LEVEL 1
var score = 0;
var lives = 3;

////gravity stuff
var jump = false; 
var direction = 1; //gravity in the y-direction
var velocity = 2; //speed of player
var jumpPower = 15; //strength of the jump
var fallingSpeed = 2; //same as velocity var
var minHeight = 375; //level with the ground
var maxHeight = 50; //max height of top of screen
var jumpCounter = 0; //keeps track of how many times the player jumps

////multi-media
var player;
var playerLeft1;
var playerLeft2;
var playerRight1;
var playerRight2;
var playerJump
var guardLeft1;
var guardLeft2;
var guardRight1;
var guardRight2;
var platform;
var landscape;//this is for the background image
var jumpSound;
var keyItem;
var keySound;
var guard;
var hitSound;
var door;
var winSound;
var loseSound;
var themeSong;
var doorSound;

function setup() {
  createCanvas(800, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  
  ////background music
  themeSong.loop();
}

function draw() {
  
  ////call functions
  
  if(stage == 0){
    splash();
  }
  
  if(stage == 1){
    level1();
  }
  
  if(stage == 2){
    winScreen();
  }
  
  if(stage == 3){
    loseScreen();
  }
  
  if(stage == 4){
    level2();
  }
  
  if(stage == 5){
    level3();
  }
  
  if(mouseIsPressed == true){
    stage = 1;
  }
  
  keyPressed();
  gravity();
  level1Door();
  level2Door();
  level3Door();
}
  
function splash(){
  background('grey');
  image(splashImage, width/2, height/2, width, height)
  
  
  
  ////title
  fill('white');
  stroke(0);
  strokeWeight(10);
  textSize(100);
  text('Collecting Keys', width/2, 120);
  textSize(20);
  strokeWeight(5);
  text('By: Mikaeyla Gensler', width/2, 200);
  
  ////instructions
  textSize(35);
  text('How To Play:', width/2, 300 );
  textSize(20)
  text('Use The Left and Right Arrow Keys To Move', width/2, 345 );
  text('Use The Up Arrow Key To Jump', width/2, 370 );
  text('Unlock The Doors With A Key', width/2, 397);
  text('Collect 3 Keys To Win!', width/2, 425);
  
  textSize(35)
  text('CLICK THE SCREEN TO START!', width/2, 470);
}


/////////////////////////////////////////////////////////////////////LEVEL 1
function level1(){
    ////appearance stuff
    background('grey');
  image(landscape, width/2, height/2, width, height)
  
    
    ////frame
    noFill();
    stroke(0);
    strokeWeight(10);
    rect(width/2, height/2, width, height);
    
    ////draw the platforms
    stroke(0);
    strokeWeight(5);
    fill('gray');
    //rect(b1X, b1Y, bWidth, bHeight);
    image(platform, b1X, b1Y, bWidth, bHeight)
    image(platform, b2X, b2Y, bWidth, bHeight)
    image(platform, b3X, b3Y, bWidth, bHeight)
  
   ////draw door
    image(door, d1X, d1Y, dWidth, dHeight);
    
    ////draw player
    player1();
  
    ////draw guards
    image(guard,g1X,g1Y, gWidth,gHeight); //guard 1
    if(p1X >= g1X-gWidth/2 && p1X <= g1X+gWidth/2 && p1Y >= g1Y-gHeight/2 && p1Y <= g1Y+gHeight/2){
      lives = lives-1;
      p1X = 500;
      p1Y = 375;
      hitSound.play();
    }//lose a life if you hit the guard
  
    ////moving guards
    g1X = g1X + (gSpeed*g1Direction);
  if(g1X >= g1Position + g1Distance || g1X <= g1Position-g1Distance){
    g1Direction = g1Direction * -1;
  }
  
    ////scoreboard
    fill('white');
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text('Keys Collected:', 120, 40);
    text(score,250,40);
  
    ////lives
    fill('white');
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text('Lives:', 700, 40);
    text(lives,760,40);
 
    ////triggers lose screen
    if(lives <= 0){
      loseSound.play();
      stage = 3;
    }
  
   ////collisions
	if(p1X >= b1X-bWidth/2 && p1X <= b1X+bWidth/2 && p1Y+pHeight/2 >= b1Y-bHeight/2 && p1Y-pHeight/2 <= b1Y+bHeight/2 && jump == false){
		p1Y = b1Y-55;//dont fall and rest on top of platform
		velocity = 0; //
		jumpCounter = 0;//allows us to jump again from platform
	}//for platform 1
  
  if(p1X >= b2X-bWidth/2 && p1X <= b2X+bWidth/2 && p1Y+pHeight/2 >= b2Y-bHeight/2 && p1Y-pHeight/2 <= b2Y+bHeight/2 && jump == false){
		p1Y = b1Y-55;//dont fall and rest on top of platform
		velocity = 0; //
		jumpCounter = 0;//allows us to jump again from platform
	}//for platform 2
  
   if(p1X >= b3X-bWidth/2 && p1X <= b3X+bWidth/2 && p1Y+pHeight/2 >= b3Y-bHeight/2 && p1Y-pHeight/2 <= b3Y+bHeight/2 && jump == false){
		p1Y = b3Y-55;//dont fall and rest on top of platform
		velocity = 0; //
		jumpCounter = 0;//allows us to jump again from platform
	}//for platform 3
  
  
  ////keys
  image(keyItem, k1X, k1Y, kWidth, kHeight);
  
  if( p1X >= k1X - kWidth/2 && p1X <= k1X+kWidth/2 && p1Y >= k1Y-kHeight/2 && p1Y <=       k1Y+kHeight/2){
    //player grabs the key
    score = score+1;
    k1X = -1000;//removes key from the screen
    keySound.play();
    haveKey1 = true;
    console.log("you have a key!")
  }
    
}//end of level1

//////////////////////////////////////////////////////////////////////LEVEL 2
function level2(){
  image(landscape, width/2, height/2, width, height);
  haveKey1 = false;
  
////level 2 frame
  noFill();
    stroke(0);
    strokeWeight(10);
    rect(width/2, height/2, width, height);
  
  ////scoreboard
    fill('white');
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text('Keys Collected:', 120, 40);
    text(score,250,40);
  
    ////lives
    fill('white');
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text('Lives:', 700, 40);
    text(lives,760,40);
  
   ////keys
  image(keyItem, k2X, k2Y, kWidth, kHeight);
  
  if( p1X >= k2X - kWidth/2 && p1X <= k2X+kWidth/2 && p1Y >= k2Y-kHeight/2 && p1Y <=       k2Y+kHeight/2){
    //player grabs the key
    score = score+1;
    k2X = -1000;//removes key from the screen
    keySound.play();
    haveKey2 = true;
    console.log("you have a key!")
  }
  
  ////platforms and collissions
  //box4
  image(platform, b4X, b4Y, bWidth, bHeight)
	if(p1X >= b4X-bWidth/2 && p1X <= b4X+bWidth/2 && p1Y+pHeight/2 >= b4Y-bHeight/2 && p1Y-pHeight/2 <= b4Y+bHeight/2 && jump == false){
		p1Y = b4Y-55;
		velocity = 0; 
		jumpCounter = 0;
	}
  //box 5
   image(platform, b5X, b5Y, bWidth, bHeight)
	if(p1X >= b5X-bWidth/2 && p1X <= b5X+bWidth/2 && p1Y+pHeight/2 >= b5Y-bHeight/2 && p1Y-pHeight/2 <= b5Y+bHeight/2 && jump == false){
		p1Y = b5Y-55;
		velocity = 0; 
		jumpCounter = 0;
	}
  
   //box 6
   image(platform, b6X, b6Y, bWidth, bHeight)
	if(p1X >= b6X-bWidth/2 && p1X <= b6X+bWidth/2 && p1Y+pHeight/2 >= b6Y-bHeight/2 && p1Y-pHeight/2 <= b6Y+bHeight/2 && jump == false){
		p1Y = b6Y-55;
		velocity = 0; 
		jumpCounter = 0;
	}
  
   //box 7
   image(platform, b7X, b7Y, bWidth, bHeight)
	if(p1X >= b7X-bWidth/2 && p1X <= b7X+bWidth/2 && p1Y+pHeight/2 >= b7Y-bHeight/2 && p1Y-pHeight/2 <= b7Y+bHeight/2 && jump == false){
		p1Y = b7Y-55;
		velocity = 0; 
		jumpCounter = 0;
	}
  
   image(guard,g2X,g2Y, gWidth,gHeight); //guard 1
    if(p1X >= g2X-gWidth/2 && p1X <= g2X+gWidth/2 && p1Y >= g2Y-gHeight/2 && p1Y <= g2Y+gHeight/2){
      lives = lives-1;
      p1X = 410;
      p1Y = 375;
      hitSound.play();
    }
    g2X = g2X + (gSpeed*g2Direction);
  if(g2X >= g2Position + g2Distance || g2X <= g2Position-g2Distance){
    g2Direction = g2Direction * -1;
  }
  
  image(guard,g3X,g3Y, gWidth,gHeight); //guard 1
    if(p1X >= g3X-gWidth/2 && p1X <= g3X+gWidth/2 && p1Y >= g3Y-gHeight/2 && p1Y <= g3Y+gHeight/2){
      lives = lives-1;
      p1X = 410;
      p1Y = 375;
      hitSound.play();
    }
    g3X = g3X + (gSpeed*g3Direction);
  if(g3X >= g3Position + g3Distance || g3X <= g3Position-g3Distance){
    g3Direction = g3Direction * -1;
  }
  
  ////draw door2
  image(door, d2X, d2Y, dWidth, dHeight);
  
  ////draw Player
  player1();
  
  //lose screen
  if(lives <= 0){
      loseSound.play();
      stage = 3;
    }
  
}//end of level2

//////////////////////////////////////////////////////////LEVEL 3
function level3()
{
    image(landscape, width/2, height/2, width, height);
  haveKey1 = false;
  haveKey2 = false;
  
  ////Draws guard4
  image(guard,g4X,g4Y, gWidth,gHeight); //guard 1
    if(p1X >= g4X-gWidth/2 && p1X <= g4X+gWidth/2 && p1Y >= g4Y-gHeight/2 && p1Y <= g4Y+gHeight/2){
      lives = lives-1;
      p1X = 410;
      p1Y = 375;
      hitSound.play();
    }
    g4X = g4X + (gSpeed*g4Direction);
  if(g4X >= g4Position + g4Distance || g4X <= g4Position-g4Distance){
    g4Direction = g4Direction * -1;
  }
 
  ////draw door
  image(door, d3X, d3Y, dWidth, dHeight);
  
  
  ////frame
  noFill();
    stroke(0);
    strokeWeight(10);
    rect(width/2, height/2, width, height);
  
  ////scoreboard
    fill('white');
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text('Keys Collected:', 120, 40);
    text(score,250,40);
  
    ////lives
    fill('white');
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text('Lives:', 700, 40);
    text(lives,760,40);
  
   ////keys
  image(keyItem, k3X, k3Y, kWidth, kHeight);
  
  if( p1X >= k3X - kWidth/2 && p1X <= k3X+kWidth/2 && p1Y >= k3Y-kHeight/2 && p1Y <=       k3Y+kHeight/2){
    //player grabs the key
    score = score+1;
    k3X = -1000;//removes key from the screen
    keySound.play();
    haveKey3 = true;
    console.log("you have a key!")
  }
  
  //box 8
   image(platform, b8X, b8Y, bWidth, bHeight)
	if(p1X >= b8X-bWidth/2 && p1X <= b8X+bWidth/2 && p1Y+pHeight/2 >= b8Y-bHeight/2 && p1Y-pHeight/2 <= b8Y+bHeight/2 && jump == false){
		p1Y = b8Y-55;
		velocity = 0; 
		jumpCounter = 0;
	}
  
  //box 9
   image(platform, b9X, b9Y, bWidth, bHeight)
	if(p1X >= b9X-bWidth/2 && p1X <= b9X+bWidth/2 && p1Y+pHeight/2 >= b9Y-bHeight/2 && p1Y-pHeight/2 <= b9Y+bHeight/2 && jump == false){
		p1Y = b9Y-55;
		velocity = 0; 
		jumpCounter = 0;
	}
  
    player1();
  
  //lose screen
  if(lives <= 0){
      loseSound.play();
      stage = 3;
    }
}/////////////////////////////////////////////////////////////END OF LEVEL 3

//////////////////////////////////////////////////////////////DOOR TRANSFER CODE
function level1Door(){
  if(haveKey1 == true && p1X == 700){
    console.log("you made it to the door with a key")
    doorSound.play();
      stage = 4;
    p1X = 400;
  }
}

function level2Door(){
  if(haveKey2 == true && p1X == 590){
    console.log("you made it to the door with a key")
    doorSound.play();
      stage = 5;
    p1X = 400;
    p1Y = 375;
  }
}

function level3Door(){
  if(haveKey3 == true && p1X == 80){
    console.log("you made it to the door with a key")
    doorSound.play();
    winSound.play();
      stage = 2;
  }
}

////win screen
function winScreen(){
    image(splashImage, width/2, height/2, width, height)
  fill('white');
  stroke(0);
  strokeWeight(10);
  textSize(100);
  text('You Win!', width/2, 120);
  themeSong.stop();

}

////lose screen
function loseScreen(){
    image(splashImage, width/2, height/2, width, height)
  fill('white');
  stroke(0);
  strokeWeight(10);
  textSize(100);
  text('You Lose!', width/2, 120);
  themeSong.stop();

}

function gravity(){
  
  if(p1Y >= minHeight && jump == false){
    p1Y = p1Y;
    jumpCounter = 0;//resets the jump counter once landed on the ground
  }
  else{
    p1Y = p1Y + (direction*velocity);//makes the gravity work
  }
  
    if(jump == true){
      if(p1Y <= maxHeight || jumpCounter >= jumpPower){
        
        if(p1Y >= minHeight){
          p1Y = minHeight;
        }
      else{  
        velocity = fallingSpeed; //falling
      }
    }
      else{
        jumpSound.play();
      velocity = -jumpPower;//jumping
      jumpCounter = jumpCounter + 1; //adds to the jump counter
      }
  }
  else{
  velocity = fallingSpeed;
    }
  
  //vertical wall barriers
  if(p1X+pWidth/2 >= width){
    p1X = p1X-5;
  }//if hit right wall, stop walking
  
  if(p1X-pWidth/2 <= 0){
    p1X = p1X+5;
  }//if hit left wall, stop walking
}

function player1(){
  //image(player, p1X, p1Y, pWidth, pHeight);//og still image
  
  if(lookingRight == true)
  {
    lookingLeft = false;
    step = step + 1;//walking
    if(step == 0){
      image(playerRight1,p1X,p1Y,pWidth,pHeight);
    }
    else if(step == 1){
      image(playerRight1,p1X,p1Y,pWidth,pHeight);
    } 
    else if(step == 2){
      image(playerRight1,p1X,p1Y,pWidth,pHeight);
    }
     else if(step == 3){
      image(playerRight2,p1X,p1Y,pWidth,pHeight);
    }
     else if(step == 4){
      image(playerRight2,p1X,p1Y,pWidth,pHeight);
    }
     else if(step == 5){
      image(playerRight2,p1X,p1Y,pWidth,pHeight);
       step = 0;
    }
  }
  
  if(lookingLeft == true)
  {
    lookingRight = false;
    step = step + 1;//walking
    if(step == 0){
      image(playerLeft1,p1X,p1Y,pWidth,pHeight);
    }
    else if(step == 1){
      image(playerLeft1,p1X,p1Y,pWidth,pHeight);
    } 
    else if(step == 2){
      image(playerLeft1,p1X,p1Y,pWidth,pHeight);
    }
     else if(step == 3){
      image(playerLeft2,p1X,p1Y,pWidth,pHeight);
    }
     else if(step == 4){
      image(playerLeft2,p1X,p1Y,pWidth,pHeight);
    }
     else if(step == 5){
      image(playerLeft2,p1X,p1Y,pWidth,pHeight);
       step = 0;
    }
  }
  
  if(lookingRight == false && lookingLeft == false && jump == false){
    image(playerIdle,p1X,p1Y,pWidth,pHeight);
  }
  else if(lookingRight == false && lookingLeft == false && jump == true){
    image(playerJump, p1X, p1Y, pWidth, pHeight);
  }
  
}

function keyPressed(){
  if(keyIsDown(LEFT_ARROW)){
      p1X = p1X-pSpeed; 
      lookingLeft = true;
    }
  else
    {
      lookingLeft = false;
    }
    
  if(keyIsDown(RIGHT_ARROW)){
      p1X = p1X+pSpeed;
    lookingRight = true;
    }
  else
  {
    lookingRight = false;
  }
  
  if(keyIsDown(UP_ARROW)){
    //console.log("jumped");
    jump = true;
  }
  else{
    jump = false;
  }
}

function preload(){
  
  player = loadImage('assets/player_idle.png')
  playerLeft1 = loadImage('assets/player_left1.png');
  playerLeft2 = loadImage('assets/player_left2.png');
  playerRight1 = loadImage('assets/player_right1.png');
  playerRight2 = loadImage('assets/player_right2.png');
  playerJump = loadImage('assets/player_jump.png');
  playerIdle = loadImage('assets/player_idle.png')
  
  platform = loadImage('assets/RockTile.png')
  landscape = loadImage('assets/dungeon_wall.png')
  walkway = loadImage('assets/dungeon_floor.jpg')
  jumpSound = loadSound('assets/Jump_03.mp3')
  
  splashImage = loadImage('assets/splash_background.png')
  
  keyItem = loadImage('assets/key.png');
  keySound = loadSound('assets/Pickup_04.mp3');
  hitSound = loadSound('assets/Hit_03.mp3');
  
  guard = loadImage('assets/idle_1.png');
  guardLeft1 = loadImage('assets/left1.png');
  guardLeft2 = loadImage('assets/left2.png');
  guardRight1 = loadImage('assets/right1.png');
  guardRight2 = loadImage('assets/right2.png');
  
  door = loadImage('assets/door.png');
  doorSound = loadSound('assets/door-01.mp3');
  
  winSound = loadSound('assets/Jingle_Win_00.mp3');
  loseSound = loadSound('assets/Jingle_Lose_00.mp3');
  themeSong = loadSound('assets/Dungeon_Theme.mp3');
  
}








