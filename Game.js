/*
    ● Game object  should be able to hold the state of the game. It should be able to display form when the game state is 0(WAIT) 
    or the game when the game state is 1(PLAY) or leaderboard when the game state is 2(END).

    ● GAMESTATES: 0 WAIT
                  1 START
                  2 END

*/

class Game {
    /*   
       writing code to create objects even though the blueprint/CONSTRUCTOR isn't
       defined yet. This is called writing code using abstraction 
   */
    constructor() {

    }

    /*
       -> databaseReference.on() creates a listener which keeps listening to the field
       gameState from the database. When the gameState is changed in
       the database, the function passed as an argument to it is executed.

       Note: Here the function is directly written inside the .on() listener.
   */
    /*
        function definition to get/read/retrieve existing value of gameState from database
    */
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }

    /*
        -> databaseReference.update() will update the database reference.
        Here "/" refers to the main database inside which gameState is created.
    */
    /*
       function definition to change existing value of gameState to a 
       new one based on the value of paramter passed in the database
    */
    updateState(stateInput) {
        database.ref('/').update({
            gameState: stateInput
        });
    }


    /*
     function defintion to start the GAME i.e. gameState will remain in WAIT(0)
     state displaying the FORM until all 4 players are registered 
     */
    async start() {
        image(WIMG, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
        if (gameState === 0) { //as long as gameState is on WAIT
            image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
            playerObj = new Player(); //generate a new player
            var playerCountRef = await database.ref('playerCount').once("value");

            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                playerObj.getCount(); //get the number of players registered 
            }
            
            formObj = new Form(); //create new form for registration
            formObj.display(); //display the generated form 
           
        }
        car1 = createSprite(100, 200);
        car1.addImage("car1_img", car1_img);
        car2 = createSprite(300, 200);
        car2.addImage("car2_img", car2_img);
        car3 = createSprite(500, 200);
        car3.addImage("car3_img", car3_img);
        car4 = createSprite(700, 200);
        car4.addImage("car4_img", car4_img);
        cars = [car1, car2, car3, car4];
    }


    /*
        function defintion to activate the game to START 1 mode and 
        aligned all players to starting positions at the start line
    */
    play() {

        formObj.hide();
        textSize(30);
        text("Game Start", displayWidth / 2, 0);

        image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

        /*
            static function call to retrieve existing player records: name and distance 
            value for all registered players according to the index in the database  
        */
        Player.getPlayerInfo();
        /* Function call to retrieve existing value of CarsAtEnd from the database. */
        playerObj.getCarsAtEnd();


        if (allPlayers !== undefined) {
            background(rgb(198, 135, 100));
            image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
            //index of the array
            var index = 0;

            //x and y position of the cars
            var x = 275;
            var y;


            //for every player object inside allPlayers
            for (var plr in allPlayers) {

                //add 1 to the index for every loop
                index = index + 1;

                //position the cars a little away from each other in x direction
                x = x + 200;

                //use data from the database to display the cars in y direction
                y = displayHeight - allPlayers[plr].distance;

                cars[index - 1].x = x;
                cars[index - 1].y = y;

                if (index == playerObj.index) {
                    cars[index - 1].shapeColor = "red";
                    //add to camera position to move with respective player
                    camera.position.x = displayWidth / 2;
                    camera.position.y = cars[index - 1].y;

                    //create an indicator to indentify respective player
                    fill("lightgreen");
                    ellipse(cars[index - 1].x, cars[index - 1].y - 100, 40, 40);

                }
                else {
                    cars[index - 1].shapeColor = "black";

                }

            }
        }
        if (keyIsDown(UP_ARROW) && playerObj.index !== null && playerObj.distance < 4300) {
            playerObj.distance += 50;
            /*
                function call to change existing value in the data base of distance and name to a 
                new one based on the value of captured 
            */
            playerObj.updatePlayerRecord();
        }
        if (playerObj.distance == 4000) {
            playerObj.rank += 1;
            Player.updateCarsAtEnd(playerObj.rank);
            playerObj.updatePlayerRecord();
           
        }
        drawSprites();
    }

    /*
        Function definition to indicate the behaviour of the game when game state is 2 
        and leaderboard is displayed.
     */
    end() {
        textSize(100);
        text("Game Over", displayWidth / 2, displayHeight / 2);
        //image(gameoverImg, displayWidth / 2, displayHeight / 2);
        image(gameover, 0, -displayHeight * 0, displayWidth, displayHeight * 1);
        Player.getPlayerInfo();
        var ranks = [];
        var display_position = 120;
        for (var player in allPlayers) {
            ranks.push(playerObj.rank);
        }
        ranks.sort(function (a, b) { return a - b });
             
        for (var plr in allPlayers) {
          //var  i = 0;
            console.log(plr);
            display_position = 30 + display_position;
            textSize(15);
            text(allPlayers[plr].name + ": " + allPlayers[plr].distance + ": " + allPlayers[plr].rank, 120, display_position);
         // text(ranks[i] + ". " + playerObj.name);
        }

    }
}