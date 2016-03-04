//Function to set height of game pieces. Written by Ben Carroll.
function setZoneHeight() {
    for (var e = document.querySelectorAll(".colourzone"), n = 0; n < e.length; n++) {
        e[n].style.height = window.innerHeight / 4 + "px"
    }
}

// Sleep function, allowing us to 'pasue time' in js
function sleep(e) {
    for (var t = (new Date).getTime(), n = 0; 1e7 > n && !((new Date).getTime() - t > e); n++);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define game vars
var userScore = 0;
var losses = -1;
var correctZone = "";
var gameStarted = false;
var currentColour = "";
var currentZones = "";
var cc = "";
var lastClicked = 0;
var lossSpeed = 3000;
var gameEnded = false;
var highScore = "";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Game code

function keypressCheck(stuff) {
    if (gameStarted && gameEnded === false) {
        code = stuff.keyCode;
        if (code === 49) {
            colourClicked(1)
        } else if (code === 50) {
            colourClicked(2)
        } else if (code === 51) {
            colourClicked(3)
        } else if (code === 52) {
            colourClicked(4)
        }
        onClickCheck();
    }
}

function startGame() {
    if (gameStarted === false) {
        gameStarted = true;
        setColours();
        document.getElementById('footerL').innerHTML = "Current Colour";
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
        gameEnded = true;
    }
}

function checkSpeed() {
    if (gameStarted && gameEnded === false) {
        if (userScore === 5) {
            lossSpeed = 2500;
        } else if (userScore === 10) {
            lossSpeed = 2000;
        } else if (userScore === 15) {
            lossSpeed = 1500;
        } else if (userScore === 20) {
            lossSpeed = 1000;
        } else if (userScore === 30) {
            lossSpeed = 500;
        }
        document.getElementById('speed').innerHTML = lossSpeed / 1000;
    }
}

function setColours() {
    randomArrayNumber = Math.floor(Math.random() * 4);
    currentZones = [getRandomColour(), getRandomColour(), getRandomColour(), getRandomColour()]
    currentColour = currentZones[randomArrayNumber];
    currentZones2 = [currentZones[0], currentZones[1], currentZones[2], currentZones[3]]
    document.getElementById('middle').style.backgroundColor = currentColour;
    document.getElementById('colour1').style.backgroundColor = currentZones2[0];
    document.getElementById('colour2').style.backgroundColor = currentZones2[1];
    document.getElementById('colour3').style.backgroundColor = currentZones2[2];
    document.getElementById('colour4').style.backgroundColor = currentZones2[3];
}

function onClickCheck() {
    if (gameStarted && gameEnded === false) {
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
        cc = document.getElementById('middle').style.backgroundColor;
        if (document.getElementById('colour' + zone).style.backgroundColor == cc) {
            userScore = Number(userScore + 1);
            document.getElementById('score').innerHTML = userScore;
            setColours();
            checkSpeed();
        }
        // else if (zone == 5) {
        // losses = Number(losses + 1);
        // document.getElementById('losses').innerHTML = losses;
        // checkGameOver();
        // setColours();
        // }
        else {
            losses = Number(losses + 1);
            document.getElementById('losses').innerHTML = losses;
            checkGameOver();
            checkSpeed();
            setColours();
        }
    } else {
        startGame()
    }
}
