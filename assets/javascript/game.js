// Creating a giant game object that will house all of our logic and variables.
var game = {

    // Object of all words that can be chosen, along with info such as their picture and a song clip.
    wordBank: {
      brie:{
          pic: "brie.jpg"
      },
    cheddar:{
        pic: "cheddar.jpg"
    },
    feta:{
        pic: "feta.jpg"
    },
    havarti:{
        pic: "havarti.jpg"
    }
},
  
    currentW: null,
    letters: [],
    matchedL: [],
    guessedL: [],
    remainingL: 0,
    totalG: 0,
    letterGuessed: null,
    wins: 0,
  
    start: function() {
      var randomW = Object.keys(this.wordBank);
      this.currentW = randomW[Math.floor(Math.random() * randomW.length)];
        this.letters = this.currentW.split("");
      this.updateWordViewAs();
      this.total();
    },
  
    // This function is run whenever the user guesses a letter..
    updateP: function(letter) {
      // If the user has no guesses left, restart the game.
      if (this.remainingL === 0) {
        this.restart();
      }
      // Otherwise...
      else {
        // Check for and handle incorrect guesses.
        this.updateG(letter);
  
        // Check for and handle correct guesses.
        this.updateM(letter);
  
        // Rebuild the view of the word. guessedL letters are revealed, non-guessedL letters have a "_".
        this.updateWordViewAs();
  
        // If the user wins, restart the game.
        if (this.updateWins() === true) {
          this.restart();
        }
      }
  
    },
  
    updateG: function(letter) {
      if ((this.guessedL.indexOf(letter) === -1) && (this.letters.indexOf(letter) === -1)) {
          this.guessedL.push(letter);
          this.remainingL--;
          document.querySelector("#remaining").innerHTML = this.remainingL;
        document.querySelector("#guessed").innerHTML =
        this.guessedL.join(", ");
      }
    },
  
    // This function sets the initial guesses the user gets.
    total: function() {
      // The user will get more guesses the longer the word is.
      this.totalG = this.letters.length + 4;
      this.remainingL = this.totalG;
  
      // Render the guesses left to the page.
      document.querySelector("#remaining").innerHTML = this.remainingL;
    },
  
    // This function governs what happens if the user makes a successful guess.
    updateM: function(letter) {
      // Loop through the letters of the "solution".
      for (var i = 0; i < this.letters.length; i++) {
        // If the guessedL letter is in the solution, and we haven't guessedL it already..
        if ((letter === this.letters[i]) && (this.matchedL.indexOf(letter) === -1)) {
          // Push the newly guessedL letter into the matched array.
          this.matchedL.push(letter);
        }
      }
    },
  
    // This function builds the display of the word that is currently being guessedL.
    // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
    updateWordViewAs: function() {
      // We start with an empty string.
      var wordViewAs = "";
  
      // Loop through the letters of the word we are trying to guess..
      for (var i = 0; i < this.letters.length; i++) {
        // If the current letter has been guessedL, display that letter.
        if (this.matchedL.indexOf(this.letters[i]) !== -1) {
          wordViewAs += this.letters[i];
        }
        // If it hasn't been guessedL, display a "_" instead.
        else {
          wordViewAs += "&nbsp;_&nbsp;"
        }
      }
  
      // Update the page with the new string we built.
      document.querySelector("#current").innerHTML = wordViewAs;
    },
  
    // Function that "restarts" the game by resetting all of the variables.
    restart: function() {
      document.querySelector("#guessed").innerHTML = "";
      this.currentW = null;
      this.letters = [];
      this.matchedL = [];
      this.guessedL = [];
      this.remainingL = 0;
      this.totalG = 0;
      this.letterGuessed = null;
      this.start();
      this.updateWordViewAs();
    },
  
    // Function that checks to see if the user has won.
    updateWins: function() {
      var win;
  
      // this won't work for words with double or triple letters
      // var lettersClone = this.letters.slice(); //clones the array
      // this.matched.sort().join('') == lettersClone.sort().join('')
  
      // If you haven't correctly guessedL a letter in the word yet, we set win to false.
      if (this.matchedL.length === 0) {
        win = false;
      }
      // Otherwise, we set win to true.
      else {
        win = true;
      }
  
      // If a letter appears in the letters array, but not in the matched array, set win to false.
      // In English, if you haven't yet guessedL all the letters in the word, you don't win yet.
      for (var i = 0; i < this.letters.length; i++) {
        if (this.matchedL.indexOf(this.letters[i]) === -1) {
          win = false;
        }
      }
  
      // If win is true...
      if (win) {
  
        // Increment wins.
        this.wins = this.wins + 1;
  
        // Update wins on the page.
        document.querySelector("#wins").innerHTML = this.wins;
  
        // Update the song title and band on the page.
        document.querySelector("#cheese").innerHTML = this.currentW;
  
        // Update the image of the band on the page.
        document.querySelector("#cheesePic").innerHTML =
          "<img class='cheesePicture' src = 'assets/images/" + this.wordBank[this.currentW].pic +
           "'>";
  
          return true;
         
      }
      return false;
      
    }
  };
  
  // Initialize the game when the page loads.
  game.start();
  
  // When a key is pressed..
  document.onkeyup = function(event) {
    // Capture pressed key and make it lowercase.
    game.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    // Pass the guessedL letter into our updateP function to run the game logic.
    game.updateP(game.letterGuessed);
  };
  