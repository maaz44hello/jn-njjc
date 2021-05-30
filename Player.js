/*

    ●  A new player object  should be created every time a new user logs in.
     It should contain all the information about the player - name, position in the game etc. 
    ●  For now it can just have the name property. It should also be able to read and write player
    information to the database - for example player count or player name.
    


    -> databaseReference.on() creates a listener which keeps listening to the
    gameState from the database. When the gameState is changed in
    the database, the function passed as an argument to it is executed.
    Note: Here the function is directly written inside the .on() listener.

    -> databaseReference.update() will update the database reference.
    Here "/" refers to the main database inside which gameState is created.

*/

class Player {
    /*
    writing code to create objects even though the blueprint/ CLASS isn't
    defined yet. This is called writing code using abstraction  
    */
    constructor() {
        this.index = null;
        this.name = null;
        this.distance = 0;
        this.rank = 0;
    }

    /*
     function definition to retrieve existing value of playerCount from database
   */
    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", function (data) {
            playerCount = data.val();
        });
    }

    /*
        function definition to change existing value of playerCount to a 
        new one based on the value of paramter passed in the database
    */
    updateCount(countInput) {
        database.ref('/').update({
            playerCount: countInput
        });
    }

    /*
       function defintiion to change existing value of NAME to a new one based based on the indes(number of the player)
       according value of paramter passed in the database.

       .set() is used to set the value in the database
   */
    updatePlayerRecord() {
        var playerIndex = "players/player" + this.index;
        console.log("this.rank : " + this.rank);
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            rank: this.rank
        });
    }

    static getPlayerInfo() {
        database.ref('players/').on("value",(data)=>{
            allPlayers = data.val();
            //console.log(allPlayers);
        });
    }

    /*
        Function definition to retrieve the value of CarsAtEnd in the database to find out how many cars have
        reached the finish line.
    */
    getCarsAtEnd() {
        database.ref('CarsAtEnd').on("value",(data)=>{
          this.rank = data.val();
          carsAtFinishLine = data.val();
          console.log("carsAtFinishLine : " + carsAtFinishLine);
        })
      }
    

    /*
        Function definition to update the value of CarsAtEnd in the database, to be called each time a car reaches the 
        finish line. 
    */
    static updateCarsAtEnd(rankInput) {
        console.log("rankInput : " + rankInput);
        database.ref('/').update({
            CarsAtEnd: rankInput
        });
    }
    static deletePlayersInfo(){
        database.ref('players').remove();
    }
}
