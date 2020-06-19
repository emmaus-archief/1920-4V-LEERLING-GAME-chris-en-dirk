/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";
/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = UITLEG;

var speler1;
var speler2;
const startPositieXSpeler1 = 100; // x-positie van speler
const startPositieYSpeler1 = 200; // y-positie van speler
const startPositieXSpeler2 = 1200;
const startPositieYSpeler2 = 600;
var spelerH = 40;
var spelerW = 40;
var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var stopwatchMilsec = 0;
var stopwatchSec = 0;
var stopwatchMin = 0;
var beginTekstKleur = 255;

var score = 0; // aantal behaalde punten

var speler1Image=0;
var speler2Image=0;
var backGroundImage=0;
var gameAchtergrond=0;
/* ********************************************* */
/*      classes die je gebruikt in je game      */
/* ********************************************* */
class Jet {
  constructor(image, x, y, snelheid, isWhite) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.angle = 0;
    this.speed = snelheid;

    this.rotateAmount = 0;
    this.bullets = [];
    this.isWhite = isWhite;
  }
// Laat de jets schieten
  shoot() {
    console.log("shoot");
    let bullet = new Bullet(this.x, this.y, this.angle, this.isWhite);
    this.bullets.push(bullet);
     console.log("bullet added, now",this.bullets.length,"bullets");
  }

  update() {
    this.goWereFacing();
    this.constrainToMap();
    this.angle += this.rotateAmount;
  }
// zorgt ervoor dat de jets op de map blijven
  constrainToMap() {
    if (this.x < -this.image.width) {
        this.x = width;
    } else if (this.x > width) {
        this.x = 0;
    } 
     
    if (this.y > height) {
        this.y = 0;
    } else if (this.y < -this.image.height) {
        this.y = height;
    }
  }
//zorgt ervoor dat de jets vooruit gaan waar de ount naartoe staat
  goWereFacing() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + 90);
    // @ts-ignore
    imageMode(CENTER);
    image(this.image, 0, 0);
    pop();
    this.drawBullets();
  }
drawBullets() {
    for (var i=0; i < this.bullets.length; i++) {
      this.bullets[i].update();
      this.bullets[i].draw();
      if (this.bullets[i].BulletGone() === true ) {
              console.log("bullet removed, now",this.bullets.length,"bullets");
              this.bullets.splice(i,1); // bullet verwijderen
        }
          //fill(255,255,255);
          //ellipse(this.bullets[i].bulletX,this.bullets[i].bulletY,10,10);
          //console.log("drawBullets on x: " + this.bullets[i].bulletX + " and y:" + this.bullets[i].bulletY);

    }
  }
  
 
}

class Bullet{
    constructor(bulletX, bulletY, angle, isWhite) {
    this.bulletX = bulletX;
    this.bulletY = bulletY;
    this.angle = angle;
    this.isWhite = isWhite;
    this.speed = 5;
    this.r = 1.5;
  }
   
   
  update() {
    this.bulletX += this.speed * cos(this.angle);
    this.bulletY += this.speed * sin(this.angle);
  }
   
//Zegt wanneer de kogels weg moeten   
  BulletGone() {
    if( this.bulletX > 1280 ){
        return true;
    }

    if( this.bulletY > 720 ){
        return true;
    }

    if( this.bulletX < 0 ){
        return true;
    }

    if( this.bulletY < 0 ){
        return true;
    }
    return false;
  }
//draw funcite van de kogels  
  draw() {
      push();
      noStroke();
      fill(255,255,255);
      ellipse(this.bulletX, this.bulletY, 10, 10);  
      pop();
    
  }
 
}

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  image(gameAchtergrond, 20, 20, width - 2 * 20, height - 2 * 20);
};
//Tekent de spelers
function tekenSpelers() {
  console
  speler1.draw();
  speler2.draw();
}
//beweegt de spelers
var beweegSpelers = function() {
  if (keyIsPressed) {
    if (key === "a") {
      speler1.angle -= 5;
    }
    if (key === "d") {
      speler1.angle += 5;
    }
    // @ts-ignore
    if (keyCode === LEFT_ARROW) {
      speler2.angle -= 5;
    }
    // @ts-ignore
    if (keyCode === RIGHT_ARROW) {
      speler2.angle += 5;
    }
  }
  speler1.update();
  speler2.update();

};

// Hebben we later nog nodig
var checkSpeler1Geraakt = function() {
    
  return false;
};

var checkSpeler2Geraakt = function() {
    
  return false;
};

var checkGameOver = function() {
    
  return false;
};
//timer
function tekenTimer() {
    var nulExtra = "";
    if(stopwatchSec < 10) {
        nulExtra = "0";
    }

    var timerString = stopwatchMin + " : " + nulExtra + stopwatchSec;

    fill("white");
    textSize(12);
    text(timerString, 60, 60, 60, 60);

}
function updateTimer() {
    if(spelStatus == SPELEN){

        stopwatchMilsec++;

        if(stopwatchMilsec == 10) {
            stopwatchSec++;
            stopwatchMilsec = 0;
        }

        if (stopwatchSec == 60) {
            stopwatchMin++;
            stopwatchSec = 0;
        }

    }
}
//Knoppen voor de kogel
function createBullet() {
    if (keyIsPressed){
        if(key === "w"){
            speler1.shoot();
        }
        if(key === "ArrowUp"){
            speler2.shoot();
        }
    }   
}
  
/**
 * preload
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, voordat het spel geladen is in de browser
 */
function preload() {
  // @ts-ignore
  backGroundImage = loadImage('images/sterrenAchtergrond.jpg');
  // @ts-ignore
  speler1Image = loadImage('images/black-jet.png');
  // @ts-ignore
  speler2Image = loadImage('images/white-jet.png');
  // @ts-ignore
  gameAchtergrond = loadImage('images/game-Achtergrond.jpg');
};

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // @ts-ignore
  angleMode(DEGREES);
  setInterval(updateTimer, 100);
  createCanvas(1280, 720);
  background("black");
  speler1 = new Jet(speler1Image, startPositieXSpeler1, startPositieYSpeler1, 3);
  speler2 = new Jet(speler2Image, startPositieXSpeler2, startPositieYSpeler2, 3);
}

//Algemene draw functie
function draw() {
  switch (spelStatus) {
    case UITLEG:
        background(backGroundImage);
        fill(beginTekstKleur);
        beginTekstKleur = beginTekstKleur - 1.5;
        if(beginTekstKleur == 0){
            beginTekstKleur = 255;
        }
        textSize(45);
        text("Druk linker muisknop in om te starten   (niet met capslock spelen) ", 262, 350, 756, 100);
        if (mouseIsPressed){
            spelStatus = SPELEN;
        }
    break;
    case SPELEN:
      background("red");   
      beweegSpelers();
      createBullet();
      
      if (checkSpeler1Geraakt()) {
      }
      if (checkSpeler2Geraakt()) {
      }
      tekenVeld();
      tekenSpelers();
      tekenTimer();
      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}

