// Minified version of colour changing background from CodeZag. (http://bit.ly/ccbackground)
$(document).ready(function() {
    function getRandomColor() {
        for (var o = "0123456789ABCDEF".split(""), n = "#", r = 0; 6 > r; r++) n += o[Math.floor(16 * Math.random())];
        return n
    }

    function change_random_bgcolor(o) {
        setInterval(function() {
            $("body").animate({
                backgroundColor: getRandomColor()
            }, 1000)
        }, o)
    }
    change_random_bgcolor(0);
});
// End of colour changing background

function checkBrowser() {
    var canUPlay = ""
    if (screen.width > 1400 && screen.height > 650) {
        canUPlay = "\n\nTry playing in full-screen mode and reload the page.\n\nYour full-screen size is large enough to play this game."
    } else {
        canUPlay = "\n\nYour full-screen size is not large enough to play this game.\n\n You may experience some glitches while playing."
    }
    if (window.innerWidth > 1350 && window.innerHeight > 650) {
        //Insert cool actions!
    } else {
        alert('Your current screen size is too small for this game!' + canUPlay);
    }
}

// Javascript sleep function, allowing us to 'pasue time' in js
function sleep(e) {
    for (var t = (new Date).getTime(), n = 0; 1e7 > n && !((new Date).getTime() - t > e); n++);
}
// A special title changing code that makes the title look like it is scrolling. Made by Ben Carroll.

// Currently not being used as because it uses the sleep function to delay
// in between each change, it also pauses the changing background
var titlez = function() {
    sleep(200), document.title = "Colour Craze", sleep(200), document.title = "olour Craze - C", sleep(200), document.title = "lour Craze - Co", sleep(200), document.title = "our Craze - Col", sleep(200), document.title = "ur Craze - Colo", sleep(200), document.title = "r Craze - Colou", sleep(200), document.title = " Craze - Colour", sleep(200), document.title = "Craze - Colour ", sleep(200), document.title = "raze - Colour C", sleep(200), document.title = "aze - Colour Cr", sleep(200), document.title = "ze - Colour Cra", sleep(200), document.title = "e - Colour Craz", sleep(200), document.title = " - Colour Craze", sleep(200), document.title = "- Colour Craze", sleep(200), document.title = " Colour Craze", sleep(200), document.title = "Colour Craze"
};


// User tracking code

function checkUser() {
    if (localStorage.getItem("seenBefore") === null) {
        var userName = prompt("Welcome to Colour Craze!\nIt doesn't look like we've met before!\nPlease pick a username:");
        localStorage.setItem("seenBefore", true);
        localStorage.setItem("userName", userName)
        document.getElementById('userName').innerHTML = "Welcome back " + localStorage.getItem("userName") + "!"
        document.getElementById('highScore').innerHTML = "Highscore: " + localStorage.getItem("highScore")
    } else if (localStorage.getItem("seenBefore")) {
        document.getElementById('userName').innerHTML = "Welcome back " + localStorage.getItem("userName") + "!"
        document.getElementById('highScore').innerHTML = "Highscore: " + localStorage.getItem("highScore")
    }
}






// function hideWelcome(e) {
//Start hiding elements
// hide1 = document.getElementById('herotext');
// hide2 = document.getElementById('tutLarge');
// hide1.style.display='none';
// hide2.style.display='none';
//Start showing elements
// if (e="true") {
// show1 = document.querySelectorAll(".tut");

// for (var i = 0; i < show1.length; i++) {
// show1[i].style.display = 'inline';
// }
// }
// }
