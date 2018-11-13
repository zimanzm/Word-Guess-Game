var wins = 0;
var left = 3;
var already;
var word = ["cheese", "fries", "pizza"];
var context = ["a type of fermented dairy which goes on pizza!",
"a type of stick-shaped fried potatos!",
"a yummy italian flatbread!"];
var winsText= document.getElementById("wins");
var leftText=document.getElementById("left");
var alreadyText=document.getElementById("already");
var wordText=document.getElementById("word");
var alreadyText=document.getElementById("already");
var contextText=document.textContent("context");
document.onkeyup = function(event) {
var already = event.key;
var word = word[Math.floor(math.random().word*length)];

var answerArray = [];
for (var i = 0; i < word.length; i++) 
{
  answerArray[i] = "_";

};

var contextArray = [];
for (var i = 0; i < context.length; i++) 
{
};

if (alreay=word){
    wins++;
    left--;
}
else {
left--
};

if (left=0){
    return
};
winsText.textContent = wins + "  WINS!";
leftText.textContent = left + "  ROUNDS LEFT!"
alreadyText.textContent = "Letters Already Guessed:  " + already;
wordText.textContent = word;
contextText.textContent = context;
}


 
    







