var game = {

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
  
    updateP: function(letter) {
      if (this.remainingL === 0) {
        this.restart();
      }
      else {
        this.updateG(letter);
  
        this.updateM(letter);
  
        this.updateWordViewAs();
  
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
  

    total: function() {

      this.totalG = this.letters.length + 4;
      this.remainingL = this.totalG;
  

      document.querySelector("#remaining").innerHTML = this.remainingL;
    },
  

    updateM: function(letter) {
      for (var i = 0; i < this.letters.length; i++) {
        if ((letter === this.letters[i]) && (this.matchedL.indexOf(letter) === -1)) {
          this.matchedL.push(letter);
        }
      }
    },
  
    updateWordViewAs: function() {
      var wordViewAs = "";
  
      for (var i = 0; i < this.letters.length; i++) {
        if (this.matchedL.indexOf(this.letters[i]) !== -1) {
          wordViewAs += this.letters[i];
        }
        else {
          wordViewAs += "&nbsp;_&nbsp;"
        }
      }
  
      document.querySelector("#current").innerHTML = wordViewAs;
    },
  
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
  
    updateWins: function() {
      var win;
  
     
      if (this.matchedL.length === 0) {
        win = false;
      }
      else {
        win = true;
      }
  

      for (var i = 0; i < this.letters.length; i++) {
        if (this.matchedL.indexOf(this.letters[i]) === -1) {
          win = false;
        }
      }
  
      if (win) {
  
        this.wins = this.wins + 1;
  
        document.querySelector("#wins").innerHTML = this.wins;
  
        document.querySelector("#cheese").innerHTML = this.currentW;
  
        document.querySelector("#cheesePic").innerHTML =
          "<img class='cheesePicture' src = 'assets/images/" + this.wordBank[this.currentW].pic +
           "'>";
  
          return true;
         
      }
      return false;
      
    }
  };
  
  game.start();
  
  document.onkeyup = function(event) {
    game.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    game.updateP(game.letterGuessed);
  };
  