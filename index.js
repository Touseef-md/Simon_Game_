// $(document).on("keypress",function(Event){
//     console.log("THis is the Keypress event");
//     Event.stopPropagation();
// })

// document.addEventListener("keypress",function(Event){
//     console.log("This is the native implementation...");
// })

var level = 0;
gamePattern = [];
userPattern = [];
var userState = 0;
const colors = ["green", "red", "yellow", "blue"];
function randNumber() {
    return Math.floor(Math.random() * 4);
}
function playSound(id) {
    switch (id) {
        case 0: {
            const greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
            break;
        }
        case 1: {
            const redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
            break;
        }
        case 2: {
            const yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
            break;
        }
        case 3: {
            const blueAudio = new Audio("./sounds/blue.mp3");
            blueAudio.play();
            break;
        }
        case 4: {
            const wrongAudio = new Audio("./sounds/wrong.mp3");
            wrongAudio.play();
            break;
        }
    }
}
function colorToIndex(color) {
    switch (color) {
        case "green":
            return 0;
        case "red":
            return 1;
        case "yellow":
            return 2;
        case "blue":
            return 3;
        default:
        // console.log("Uhh hoo!! WRONG COLOR... ");
    }
}
// document.addEventListener("keypress", function (Event) {
//     console.log("THSI is the keypress event...");
//     userState = 0;
//     gameStart();
// });
$("*").on("keypress", function (Event) {
    // console.log("THSI is the keypress event...");
    // console.log(Event);
    // level++;
    userState = 0;
    setTimeout(gameStart, 500);
    // gameStart();
    Event.stopPropagation();
    // $("*").unbind("keypress");
});
$(".btn").on("click", function (Event) {
    // console.log("This is working", Event.target.id);
    if (level === 0) {
        wrong();
    }
    if (level !== 0) {
        playSound(colorToIndex(Event.target.id));
        userPattern.push(colorToIndex(Event.target.id));
        // console.log("userpatterh length", userPattern);
        $("." + Event.target.id).addClass("pressed");
        setTimeout(function () {
            $("." + Event.target.id).removeClass("pressed");
        }, 200);
        var flag = 0;
        if (userPattern[userState] == gamePattern[userState]) {
            // console.log("COrrect..");
        }
        else {
            flag = 1;
            wrong();
            userPattern = [];
            gamePattern = [];
        }
        // console.log("CHECKING THE MIDDLE");
        if (flag === 0) {
            // console.log("ALL correct");
            if (userState === gamePattern.length - 1) {
                userPattern = [];
                userState = 0;
                setTimeout(gameStart, 2000);
            }
            else {
                userState++;
            }
            // gameStart();
        }
    }
});
function wrong() {
    level = 0;
    // $("h1").html = "Game Over, Press Any Key to Restart";
    document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
    playSound(4);
    $("body").addClass("game-over");
    // $("#level-title").html = "Game Over, Press Any Key to Restart";
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    // console.log("CHECK*ign");
}
function gameStart() {
    var randomNumber = randNumber();
    gamePattern.push(randomNumber);
    // console.log("GAme start");
    // console.log("GAME length",gamePattern.length);
    playSound(randomNumber);
    $("#" + colors[randomNumber])
        .fadeOut()
        .fadeIn();
    level++;
    $("h1").html("Level " + level);
    // console.log(level);
}