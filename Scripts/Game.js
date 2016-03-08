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
function superFunc() {
  setTimeout("setColours()",100)
}

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
        } else if (code === 53) {
            superFunc();
        }
        onClickCheck();
    }
}

function startGame() {
    if (gameStarted === false) {
        gameStarted = true;
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
        } else if (userScore === 30) {
            lossSpeed -= 500;
        }
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
var millisec = 3000;
var timer;

function timerDisplay(){
     document.getElementById('timerDisplayField').innerHTML = "Time left:   " + (lossSpeed - millisec) + "ms";
     timer = setTimeout("timerDisplay()",100);
     millisec+=100
     if (millisec >= lossSpeed) {
       document.getElementById('timerDisplayField').innerHTML = "OUT OF TIME!"
      clearTimeout(timer)
     }
}
function startTimer() {
  if (timer > 0) {
	return;
  }
  timerDisplay();
}
function stopTimer() {
  clearTimeout(timer);
  timer = 0;
}
function startstoptimer() {
  if (timer > 0) {
     clearTimeout(timer);
     timer = 0;
  } else {
     timerDisplay();
  }
}
function resetTimer() {
	stopTimer();
	millisec = 0;
	seconds = 0;
}
