var rLetters = [];
var wLetters = [];
var possibleWords = ["alex", "stephen", "foyer", "rachel"];
var currentWord;
var guessCount;
var numWins = 0;
var currentWordDisplay = document.querySelector('#hiddenWord');
var previousWordDisplay = document.querySelector('#previousWord');
var numWinsDisplay = document.querySelector('#winsText');
var guessCountDisplay = document.querySelector('#guessCount');
var guessLettersDisplay = document.querySelector('#guessedLetters');

function newWord(){
    currentWord = possibleWords[ Math.floor(Math.random() * possibleWords.length) ];    //selects a random new word from the array
    rLetters = [];  //resets the arrays of previously guessed letters
    wLetters = [];

    guessCount = 10;
    guessCountDisplay.innerText = guessCount;
    updateVisibleLetters();
    updateVisibleGuesses();
}

function updateVisibleLetters(){
    var letterArray = Array.from(currentWord);
    let tempWord = "";
    let i;
    for(i of letterArray){
        if(rLetters.includes(i)){
            tempWord += (i+" ");
        } else{
            tempWord += ("_ ");
        }
    }
    currentWordDisplay.innerText = tempWord;

}

function updateVisibleGuesses(){
    let tempWord = "";
    let i;
    for(i of wLetters){
        tempWord += (i+" ");
    }
    guessLettersDisplay.innerText = tempWord;
}

function countUniqueChars(iterable) {   //this function determines the number of unique characters by converting it
    return new Set(iterable).size;      // into a set and returning the size
}

function checkLetter(event){
    const key = event.key.toLowerCase();
    if(!Number(key)){   //this weeds out numbers from the inputs
        console.log("key input: "+key);

        let i;
        let alreadyPressed = false;
        for(i of wLetters){                 //checks whether or not the guessed letter has been guessed before
            if(key === i){
                alreadyPressed = true;
            }
        }
        for(i of rLetters){
            if(key === i){
                alreadyPressed = true;
            }
        }

        if(!alreadyPressed){
            let correctGuess = currentWord.includes(key);       //checks to see if the current word includes the guessed letter
            if(correctGuess){   //these lines push the guessed letter into the correct array
                rLetters.push(key);
                updateVisibleLetters();
                console.log("correct guess");
            } else{
                wLetters.push(key);
                updateVisibleGuesses();
                console.log("incorrect guess");
                guessCount--;
                guessCountDisplay.innerText = guessCount;
                if(guessCount === 0){
                    newWord();
                }
            }

            if(countUniqueChars(currentWord) === rLetters.length){    //this checks if the word is fully guessed
                numWins++;
                numWinsDisplay.innerText = numWins;
                previousWordDisplay.innerText = currentWord;
                newWord();
            }
        } 
    }  
}

newWord();

document.addEventListener('keypress', checkLetter);