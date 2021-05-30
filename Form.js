/*
    ● Form should contain the input box and a button to log in.

    ● When the button is pressed, the player's name should be registered in the database and a new 
    player should be created.

*/

/*

    The body of an HTML page can contain several different types of elements-
    - h1, h2, h3, h4, h5, h6: display headings of different scales.

    - input: to collect input from the user. INPUT BOX
    - button: to display a button. and perform update on click

    This model of an HTML page is called Document object Model (or DOM).
    We will be using the p5 Dom library to create the form.

*/

class Form {
  /*   
    writing code to create objects even though the blueprint/CONSTRUCTOR isn't
    defined yet. This is called writing code using abstraction 
  */
  constructor() {
    this.title = createElement("h2");
   
    this.inputbox = createInput("Name");
    this.playButton = createButton("Play");
    this.greeting = createElement("h1");
    this.resetButton = createButton("Reset");
  }

  hide() {
    this.title.hide();
    this.inputbox.hide();
    this.playButton.hide();
    this.greeting.hide();
  }
  /*
function call to receive all the input to all parameters on FORM

---For 'this' to continue to refer to the form object, we use arrow functions
Arrow functions bind the function to the original object which calls it.

---Here mousePressed is called inside the display function which is called by
the form object. ()=> Arrow function ensures that 'this' remains bound to
the form object.
*/
  display() {
    this.title.html("Car Racing Game");
    this.title.position(130, 0);

    this.inputbox.position(130, 160);

    this.playButton.position(250, 200);

    this.playButton.mousePressed(() => {

      this.inputbox.hide();
      this.playButton.hide();


      playerCount += 1;
      playerObj.index = playerCount;
      playerObj.name = this.inputbox.value();
      /*
        function call to change existing value of NAME to a new one based based on the index(number of the player)
        according value of parameter passed in the database
      */
      playerObj.updatePlayerRecord();

      /*
       function call to change existing value of playerCount to a new one based on the value of paramter passed in the database
     */
      playerObj.updateCount(playerCount);
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      this.greeting.html("Welcome " + playerObj.name);
      this.greeting.position(200, 250);
    });

    //defining the behaviour when reset button is pressed
    this.resetButton.mousePressed(() => {
      /*Function definition for the behaviour of reset button. On clicking the button, playerCount and gameState data fields will be updated
      to zero in the program and in the database. */
      gameObj.updateState(0);
      playerObj.updateCount(0);
        Player.deletePlayersInfo();
        Player.updateCarsAtEnd(0);
    });
  }
}
