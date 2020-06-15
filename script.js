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

var score = 0; // aantal behaalde punten

var speler1Image;
var speler2Image;
var backGroundImage;
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

function preload() {
  // @ts-ignore
  backGroundImage = loadImage('images/retroAchtergrond.jpg');
  // @ts-ignore
  speler1Image = loadImage('images/black-jet.png');
  // @ts-ignore
  speler2Image = loadImage('images/white-jet.png');
};



/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  image(backGroundImage, 20, 20, width - 2 * 20, height - 2 * 20);
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
 * Kijkt wat de toetsen/muis etc zijn.
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
    
  return true;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpeler2Geraakt = function() {
    
  return true;
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

function updateTimer() {
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


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  angleMode(DEGREES);

  setInterval(updateTimer, 100);

  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background("black");
  speler1 = new Jet(speler1Image, startPositieXSpeler1, startPositieYSpeler1, 0.7);
  speler2 = new Jet(speler2Image, startPositieXSpeler2, startPositieYSpeler2, 0.7);
}

/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case UITLEG:
        background("black");
        fill("white");
        textSize(30);
        text("Druk linker muisknop in om te starten", 200, 200, 300, 300);
        if (mouseIsPressed){
            spelStatus = SPELEN;
        }
      // teken hier je startscherm
      // roep hier een functie aan om te zien welke toets indrukt is / kies modus

    break;
    case SPELEN:
      beweegKogel();
      background(backGroundImage);   
      beweegSpelers();
      
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

class Jet {
  constructor(image, x, y, snelheid) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.angle = 0;
    this.speed = snelheid;
  }

  update() {
    this.goWereFacing();
    this.constrainToMap();
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
    console.log("draw on x: " + this.x + " and y:" + this.y);

    push();
    translate(this.x, this.y);
    rotate(this.angle + 90);
    imageMode(CENTER);
    image(this.image, 0, 0);
    pop();
  }
}