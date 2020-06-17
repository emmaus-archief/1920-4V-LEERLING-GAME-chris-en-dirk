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
var Kogel1X = [];
var Kogel1Y = [];
var Kogel2X = [];
var Kogel2Y = [];
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
  shoot() {
    console.log("shoot");
    let bullet = new Bullet(this.x, this.y, this.angle, this.isWhite);
    this.bullets.push(bullet);
  }

  update() {
    this.goWereFacing();
    this.constrainToMap();
    this.angle += this.rotateAmount;
  }

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

  goWereFacing() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }

  draw() {
    //console.log("draw on x: " + this.x + " and y:" + this.y);

    push();
    translate(this.x, this.y);
    rotate(this.angle + 90);
    imageMode(CENTER);
    image(this.image, 0, 0);
    pop();
    this.drawBullets();
  }
    drawBullets() {
    for (let bullet of this.bullets) {
        console.log("drawBullets");
      bullet.update();
      bullet.draw();
    }
  }
}

class Bullet {
  constructor(x, y, angle, isWhite) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.isWhite = isWhite;
    this.speed = 5;
    this.r = 1.5;
  }
   
   
  update() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    this.constrainToMap();
  }
   
   
  constrainToMap() {
    if (this.x < -this.r) {
        this.x = width;
    } else if (this.x > width) {
        this.x = 0;
    } 
     
    if (this.y > height) {
        this.y = 0;
    } else if (this.y < -this.r) {
        this.y = height;
    }
  }
   
   
  draw() {
    if (this.isWhite) {
      push();
      noStroke();
      fill(255);
      ellipse(this.x, this.y, this.r*2, this.r*2);  
      pop();
    } else  {
      push();
      fill(0);
      ellipse(this.x, this.y, 3, 3);    
      pop();
    }
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

function tekenSpelers() {
  console
  speler1.draw();
  speler2.draw();
}



/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};

/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {
};



/**
 * Kijkt wat de toetsen/muis etc zijn. (keyIsDown)
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpelers = function() {
  if (keyIsPressed) {
    if (key === "a") {
      speler1.angle -= 5;
    }
    if (key === "d") {
      speler1.angle += 5;
    }
    if (keyCode === LEFT_ARROW) {
      speler2.angle -= 5;
    }
    if (keyCode === RIGHT_ARROW) {
      speler2.angle += 5;
    }
  }
  speler1.update();
  speler2.update();

};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkSpeler1Geraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpeler2Geraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};

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

function createTimedBullet() {
    if ((stopwatchSec % 2) === 0) { // rest van seconde gedeeld door 2 === 0
     speler1.shoot();
     speler2.shoot();
    }
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

/**
 * peroload
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

  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background("black");
  speler1 = new Jet(speler1Image, startPositieXSpeler1, startPositieYSpeler1, 3);
  speler2 = new Jet(speler2Image, startPositieXSpeler2, startPositieYSpeler2, 3);
}

/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
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
        text("Druk linker muisknop in om te starten", 262, 350, 756, 100);
        if (mouseIsPressed){
            spelStatus = SPELEN;
        }
      // teken hier je startscherm
      // roep hier een functie aan om te zien welke toets indrukt is / kies modus

    break;
    case SPELEN:
      beweegKogel();
      background("red");   
      beweegSpelers();
      createTimedBullet();
      
      if (checkSpeler1Geraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpeler2Geraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenSpelers();
      tekenTimer();
      tekenKogel(kogelX, kogelY);
      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}

