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
var spelStatus = SPELEN;

var speler1;
var speler2;
var spelerX = 100; // x-positie van speler
var spelerY = 200; // y-positie van speler
var spelerX2 = 1200;
var spelerY2 = 600;
var spelerH = 40;
var spelerW = 40;
var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten
var speler1Image;
var speler2Image;
var backGroundImage;
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */
/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  image(backGroundImage, 20, 20, width - 2 * 20, height - 2 * 20);
};

function preload() {
  // @ts-ignore
  backGroundImage = loadImage('images/retroAchtergrond.jpg');
  // @ts-ignore
  speler1Image = loadImage('images/black-jet.png');
  // @ts-ignore
  speler2Image = loadImage('images/white-jet.png');
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x,y) {
    

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};
//speler
var speler1F = function(x,y) {
        image(speler1Image, spelerX, spelerY, spelerW, spelerH);
 }
var speler2F = function() {
    image(speler2Image, spelerX2, spelerY2, spelerW, spelerH);
}
/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    
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
var beweegSpeler = function() {

};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('black');
   speler1 = new Jet(speler1Image);
   speler2 = new Jet(speler2Image);
}
class Jet {
  constructor(image) {
    this.x = spelerX,spelerX2;
    this.y = spelerY, spelerY2;
    this.image = image;
    this.angle = 0;
    this.speed = 0.7;
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
    this.x += this.speed * sin(this.angle);
    this.y += this.speed * cos(this.angle);
   }
    draw() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    rotate(this.angle + HALF_PI);
    image(this.image, 0, 0);
    pop();
  }
}
/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegKogel();
      background(backGroundImage);   
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      speler1F();
      speler2F();
      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
