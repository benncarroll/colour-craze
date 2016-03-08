
// Minified version of colour changing background from CodeZag. (http://bit.ly/ccbackground)
$(document).ready(function()
{
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

function clickFunction() {
  localStorage.setItem('userName', signUp.input.value);
  userNameFilled = true;
  checkUser();
  checkUser();
  checkUser();
  checkUser();
  checkUser();
}

var userNameFilled = false;

// User tracking code
function checkUser() {
    if (localStorage.getItem("seenBefore") === null && userNameFilled === true) {
        localStorage.setItem("seenBefore", true);
        localStorage.setItem("userName", userName)
        document.getElementById('userName').innerHTML = "Welcome back " + localStorage.getItem("userName") + "!"
        document.getElementById('highScore').innerHTML = "Highscore: " + localStorage.getItem("highScore")
    } else if (localStorage.getItem("seenBefore")) {
        document.getElementById('userName').innerHTML = "Welcome back " + localStorage.getItem("userName") + "!"
        document.getElementById('highScore').innerHTML = "Highscore: " + localStorage.getItem("highScore")
    }
}
