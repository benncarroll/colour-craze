// Minified version of colour changing background from CodeZag. (http://bit.ly/ccbackground)
function spectrum() {
    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    $('#div').animate({
        backgroundColor: hue
    }, 1000);
    spectrum();
}
// End of colour changing background

// Sleep function, allowing us to 'pause time' in js
function sleep(e) {
    for (var t = (new Date).getTime(), n = 0; 1e7 > n && !((new Date).getTime() - t > e); n++);
}

function playSound(soundfile) {
    var inputElem = "<audio src=\"" + soundfile + "\" autoplay volume=\"0.8\" />";
    document.getElementById("dummy").innerHTML = inputElem;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

// Define game vars
var userScore = 0,
    losses = -1,
    correctZone = "",
    gameStarted = false,
    currentColour = "",
    currentZones, cc, lastClicked = 0,
    lossSpeed = 3000,
    gameEnded = false,
    highScore = "";
    previousHighScore = localStorage.getItem("highScore");
    beatenHighScore = false;

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

// Game code

function crazyMode(mode) {
    if (mode) {
        for (var e = document.querySelectorAll('.colourzone'), n = 0; n < e.length; n++) {
            e[n].style.transition = "";
        }
        superfunc = setInterval(function() {
            setColours();
        }, 50);
    } else {
        clearInterval(superfunc);
        for (var e = document.querySelectorAll('.colourzone'), n = 0; n < e.length; n++) {
            e[n].style.transition = "background-color 0.5s\nborder-color 0.5s";
        }
    }
}

function keypressCheck(stuff) {
    if (gameStarted && gameEnded === false) {
        code = stuff.keyCode;
        if (code === 59) {
            colourClicked(1)
        } else if (code === 39) {
            colourClicked(2)
        } else if (code === 46) {
            colourClicked(3)
        } else if (code === 47) {
            colourClicked(4)
        } else if (code === 53) {
            crazyMode(true)
        } else if (code === 54) {
            crazyMode(false)
        }
    }
}

function startGame() {
    if (gameStarted === false) {
        gameStarted = true;
    }
}

function getRandomColour() {
    for (var o = "0123456789ABCDEF".split(""), n = "#", r = 0; 6 > r; r++) n += o[Math.floor(16 * Math.random())];
    return n
}

function checkGameOver() {
    if (losses >= 5) {
        gameElements = document.querySelectorAll(".gameElements")
        for (var i = 0; i < gameElements.length; i++) {
            gameElements[i].style.display = 'none';
        }
        document.getElementById('loseTitle').style.display = "block";
        document.getElementById('finalScore').innerHTML = userScore;
        setHighScore();
        document.getElementById('highScore').innerHTML = highScore;
        stopTimer();
        gameEnded = true;
    }
}

function setSpeed() {
    if (gameStarted && gameEnded === false) {
        if (userScore === 5) {
            lossSpeed -= 500;
        } else if (userScore === 10) {
            lossSpeed -= 500;
        } else if (userScore === 15) {
            lossSpeed -= 500;
        } else if (userScore === 20) {
            lossSpeed -= 500;
        }
    }
}

function checkScore() {
    if (previousHighScore < userScore && beatenHighScore === false && previousHighScore > 4) {
        stopTimer();
        document.getElementById('superTitle').innerHTML = "NEW HIGHSCORE!";
        crazyMode(true);
        beatenHighScore = true;
        setTimeout(function() {
            document.getElementById('superTitle').innerHTML = "";
            crazyMode(false);
        }, 500)
        startTimer();
    }
}

function setColours() {
    randomArrayNumber = Math.floor(Math.random() * 4);
    currentZones = [getRandomColour(), getRandomColour(), getRandomColour(), getRandomColour()]
    currentColour = currentZones[randomArrayNumber];
    currentZones2 = [currentZones[0], currentZones[1], currentZones[2], currentZones[3]]


    // document.querySelectorAll('#middle').style.backgroundColor = currentColour;
    for (var e = document.querySelectorAll('#middle'), n = 0; n < e.length; n++) {
        e[n].style.backgroundColor = currentColour
    }
    document.getElementById('colour1').style.backgroundColor = currentZones2[0];
    document.getElementById('colour2').style.backgroundColor = currentZones2[1];
    document.getElementById('colour3').style.backgroundColor = currentZones2[2];
    document.getElementById('colour4').style.backgroundColor = currentZones2[3];
}

function setHighScore() {
    if (userScore > Number(localStorage.getItem("highScore"))) {
        localStorage.setItem("highScore", userScore);
    } else {
        localStorage.setItem("lastScore", userScore);
    }
    highScore = localStorage.getItem("highScore");
}

function colourClicked(zone) {
    if (gameStarted && gameEnded === false) {
        resetTimer();
        startTimer();
        var timeNow = (new Date()).getTime();
        if (timeNow > (lastClicked + lossSpeed)) {
            losses = Number(losses + 1);
            if (losses >= 5) {
                document.getElementById('loseTitle2').innerHTML = "Too Slow!"
            }
            document.getElementById('losses').innerHTML = losses;
            checkGameOver();
        }
        lastClicked = timeNow;
    }
    if (gameStarted && gameEnded === false) {
        cc = document.getElementById('middle').style.backgroundColor;
        if (document.getElementById('colour' + zone).style.backgroundColor == cc) {
            userScore = Number(userScore + 1);
            document.getElementById('score').innerHTML = userScore;
            setColours();
            setSpeed();
            checkScore();
        } else {
            losses = Number(losses + 1);
            document.getElementById('losses').innerHTML = losses;
            checkGameOver();
            setSpeed();
            setColours();
        }
    }
}
//Timer code
var millisec = 3000,
    timer;

function timerDisplay() {
    document.getElementById("timerDisplayField").innerHTML = "Time left:   " + (lossSpeed - millisec) + "ms";
    timer = setTimeout("timerDisplay()", 100);
    millisec += 100;
    if (millisec >= lossSpeed) {
        playSound("Audio/deduct.mp3");
        document.getElementById("timerDisplayField").innerHTML = "OUT OF TIME!";
        clearTimeout(timer);
    }
}

function startTimer() {
    timer > 0 || timerDisplay()
}

function stopTimer() {
    clearTimeout(timer), timer = 0
}

function startstoptimer() {
    timer > 0 ? (clearTimeout(timer), timer = 0) : timerDisplay()
}

function resetTimer() {
    stopTimer(), millisec = 0, seconds = 0
}
