/* GLOBAL VARIABLES */
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var dictionary = [
    ["Zombie","Apocalypse"],
    ["Hockey","Sports"],
    ["Beer","Drink"],
    ["Ostracize","Critical"],
    ["Jazz","Sound"],
    ["Rogue","Apart"],
    ["Pajama","Sleep"],
    ["Yacht","Water"],
    ["Zigzag","Avoidance"],
    ["Gazebo","Cover"],
    ["Haphazard","Random"],
    ["Memento","Sentimental"]
];
var guessword;
var hint;
var wordLetters = 0;
var wordLength;
var wrong = 0;
var right = 0;
var tries = 6;

/* GAME */
$(document).ready(game);

function game()
{
    $('.alphabet').click(guess);
}

function guess()
{
    //attribute id of the letter pressed on page
    var soundWrong = new sound('./audio/tos_hullhit_1.mp3');
    var soundRight = new sound('./audio/tos_transporter4_clean.mp3');
    var letterGuessed = $(this).attr('id');

    //check for correct letters
    for (let x = 0; x < wordLength; x++)
    {
        if (guessword.charAt(x) === letterGuessed)
        {
            soundRight.play();
            $('#' + x).fadeOut(2000, function () {
                $(this).text(letterGuessed);
            }).fadeIn(6000);
            $(this).css('background', 'green');
            // for error checking:  alert("Right before: " + right);
            right++;
            // for error checking:  alert("Right after: " + right);

            var changeID = document.getElementById($(this).attr('id'));
            changeID.id = '~';

            if (right === wordLetters)
            {
                $('body').append('<div class="outcome" id="outcomeMsg">You win!</div>');
                $('body').append('<div class="outcome"><img id="outcomeImg" src="' + './img/spock-win-med.png" alt="spock"></div>');

            }
        }
    }

    //if guessed letter is not found
    if (guessword.indexOf(letterGuessed) === -1 && letterGuessed !== '~')
    {
        $(this).css('background', 'red');
        var changeID = document.getElementById($(this).attr('id'));
        changeID.id = '~';

        $('#gallows').attr('src', './img/_' + wrong + '0.png');

        //for error checking:
        // alert("Wrong before : " + wrong);
        wrong++;

        $('#gallows').fadeIn(300);
        soundWrong.play();
        setTimeout(function () {
            $('#gallows').attr('src', './img/_' + (wrong) + '.png');}, 3000);
        $('#gallows').fadeIn(300);

        $('#wrong').text("Attempts remaining: " + (tries - wrong));

        //for error checking:
        // alert('Wrong after: ' + wrong);
        if (wrong === tries)
        {
            $('body').append('<div class="outcome" id="outcomeMsg">You Lose!</div>');
            $('body').append('<div class="outcome"><img id="outcomeImg" src="' + './img/spock-lose-med.png" alt="spock"></div>');
        }
    }
}
/* FOR EFFECT */
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

/* GAME INITIALIZATION SETUP */

function showGuessArea()
{
    for(let x = 0; x < guessword.length; x++){
        //ALLOWS FOR MULTIPLE WORDS SEPARATED BY A SPACE
        if(guessword.charAt(x) === ' ')
        {
            document.write('<div class="guessword" id="' + x + '">&nbsp;&nbsp;</div>');
            wordLetters--;
        } else {
            document.write('<div class="guessword" id="' + x + '">_&nbsp;</div>');
            wordLetters++;
        }
    }
    document.write('<br style="clear: left;" />');
}

function showAlphabet()
{
    document.write('<div>');
    for(let x = 0; x < alphabet.length; x++){
        //splits the alphabet to be displayed on two rows
        if(x === 13){
            document.write('</div><br style="clear: left;" /><div>');
        }
        document.write('<div class="alphabet" id="' + alphabet.charAt(x) + '">' + alphabet[x] + '</div>');
    }
    document.write('</div>')
}

function randomWord ()
{
    var rand = Math.floor(Math.random() * 12) + 1;

    guessword = dictionary[rand][0];
    //to cheat
    // alert("guessword " + guessword);
    hint = dictionary[rand][1];
    //to cheat
    // alert("hint " + hint);
    wordLength = guessword.length;

}

function initializeGame()
{
    randomWord();
    guessword = guessword.toUpperCase();
    document.write('<div class="gallows"><img id="gallows" src="' + './img/_' + 0 + '.png"/></div>');
    document.write('<div id="wrong">' + 'Attempts remaining: ' + tries + '</div>');
    document.write('<div id="hint">Hint: ' + hint + '</div>');
    showGuessArea();
    showAlphabet();

}
