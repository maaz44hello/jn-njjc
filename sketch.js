/*
C-41 Multiplayer Car Racing Game

Developer: Priyesha

Topics: REALTIME DATABASE, CRUD, PLANNING, ANALYSIS AND STRUCTURE OF THE PROJECT

GOALS: ● Store rank of individual players in the game as player property. 
       ● Display rank of the player when the game ends.

*/

//Declare variables for game objects and behaviour indicators(FLAGS)
var canvas, backgroundImage;
var database;

var formObj;
var gameObj, gameState;
var playerObj, playerCount, allPlayers, carsAtFinishLine;

var car1, car2, car3, car4, cars; 
var car1_img, car2_img, car3_img, car4_img, trackImg, groundImg, gameover, WIMG;
//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
    car1_img = loadImage("images/car1.png");
    car2_img = loadImage("images/car2.png");
    car3_img = loadImage("images/car3.png");
    car4_img = loadImage("images/car4.png");
    trackImg = loadImage("images/track.jpg");
  //  groundImg = loadImage("images/ground.png");
   // gameoverImg = loadImage("images/gameoverImg.png");
   gameover = loadImage("images/GameOver.jpg");
   WIMG = loadImage("Waiting.jpg");
}

//define the initial environment of the software(before it is used)
//by defining the declared variables with default values
function setup() {
    createCanvas(displayWidth - 20, displayHeight - 30);

    //initialize the database
    database = firebase.database();

    allPlayers = null;
    playerCount = 0;
    carsAtFinishLine = 0;
    gameState = 0; //0=WAIT, 1=PLAY, 2=END

    gameObj = new Game();

    //function call to retrieve existing value of gameState from database
    gameObj.getState();

    //function call to start the GAME i.e. gameState will activate  0 WAIT state
    gameObj.start();

}

//All modifications, changes, conditions, manipulations, actionscommands to be executed and checked, continuously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
    background("white");

    //conditions for GAMESTATE to change from 0 to 1 to 2
    if (playerCount === 4 && carsAtFinishLine < 4) {
        /*
             function call to change existing value of gameState to a 
             new one based on the value of paramter passed in the database
        */
        gameObj.updateState(1);
    }
    if (carsAtFinishLine == 4) {
        /*
             function call to change existing value of gameState to a 
             new one based on the value of paramter passed in the database
        */
        gameObj.updateState(2);
    }
    if (gameState === 0) {
        image(WIMG, 0, -displayHeight * 0, displayWidth, displayHeight * 1);
    }
    if (gameState === 1) {
        clear();
        /*
            function call to activate the game to START 1 mode and 
            aligned all players to starting positions at the start line
        */
        gameObj.play();
    }
    if (gameState == 2) {
        clear();
        gameObj.end();
    }

}

/* READ READ READ READ

CRUD - creating READING UPDATING DELETING

.ref() is used to refer to the location of the
database value(field) we care about.

.on() creates a listener which keeps
listening to the changes in the database.

.set() is used to set the value in the
database

READ READ READ READ */