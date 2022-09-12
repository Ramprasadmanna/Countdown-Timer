var incrementHrs = document.querySelector(".in-Hrs")
var incrementMin = document.querySelector(".in-Min")
var incrementSec = document.querySelector(".in-Sec")
var decreamentHrs = document.querySelector(".dec-Hrs")
var decreamentMin = document.querySelector(".dec-Min")
var decreamentSec = document.querySelector(".dec-Sec")
var Hours = document.querySelector("#hrs")
var Minutes = document.querySelector("#min")
var Seconds = document.querySelector("#sec")
var Start = document.querySelector(".start")
var Stop = document.querySelector(".stop")
var Restart = document.querySelector(".restart")
var Hrs = document.querySelector("#hrs").innerHTML
var Min = document.querySelector("#min").innerHTML
var Sec = document.querySelector("#sec").innerHTML
var toggleBtnLen = document.querySelectorAll(".toggle").length
var clockStart = false;
var timerInterval = null;
var sucessSound = new Audio("Audio/Sucess.mp3");
var audioChecked = document.querySelector("input[type=checkbox]").checked = true;
var checkbox = document.querySelector("input[type=checkbox]");

// Increments Buttons
incrementHrs.addEventListener("click", function () {
    Hrs++;
    if (Hrs == 100) {
        Hrs = 0;
    }
    Hours.innerHTML = Hrs < 10 ? "0" + Hrs : Hrs;
});

incrementMin.addEventListener("click", function () {
    Min++
    if (Min == 60) {
        Min = 0;
    }
    Minutes.innerHTML = Min < 10 ? "0" + Min : Min;
});

incrementSec.addEventListener("click", function () {
    Sec++
    if (Sec == 60) {
        Sec = 0;
    }
    Seconds.innerHTML = Sec < 10 ? "0" + Sec : Sec;
});

//Decrement Buttons
decreamentHrs.addEventListener("click", function () {
    Hrs--;
    if (Hrs < 0) {
        Hrs = 99;
    }
    Hours.innerHTML = Hrs < 10 ? "0" + Hrs : Hrs;
})

decreamentMin.addEventListener("click", function () {
    Min--;
    if (Min < 0) {
        Min = 59;
    }
    Minutes.innerHTML = Min < 10 ? "0" + Min : Min;
})

decreamentSec.addEventListener("click", function () {
    Sec--;
    if (Sec < 0) {
        Sec = 59;
    }
    Seconds.innerHTML = Sec < 10 ? "0" + Sec : Sec;
})

//Checkbox Value
checkbox.addEventListener('change', function () {
    if (this.checked) {
        audioChecked = true;
    }
    else {
        audioChecked = false;
    }
});


// Timer Start
Start.addEventListener("click", function () {
    if (!clockStart) {
        animateButton(this.id)
        timerInterval = setInterval(function () {
            if (Hrs == 0 && Min == 0 && Sec == 0) {
                if (audioChecked) {
                    sucessSound.play();
                }
                clearInterval(timerInterval);
                clockStart = false;
                Start.classList.remove("pressed");
                Stop.classList.remove("pressed");
                Start.style.display = "none"
                Stop.style.display = "none"
            }

            else {
                if (Sec == 0) {
                    if (Min > 0) {
                        Min--;
                        Minutes.innerHTML = Min < 10 ? "0" + Min : Min;
                        Sec = 59;
                        Seconds.innerHTML = "59";
                    }

                    else {
                        Sec = 0;
                    }
                }

                else if (Sec > 0) {
                    Sec--;
                    Seconds.innerHTML = Sec < 10 ? "0" + Sec : Sec;
                }

                if (Min == 0) {
                    if (Hrs > 0) {
                        Hrs--;
                        Hours.innerHTML = Hrs < 10 ? "0" + Hrs : Hrs;
                        Min = 59;
                        Minutes.innerHTML = "59";
                    }
                    else {
                        Min = 0;
                    }
                }
            }

        }, 1000)
        clockStart = true;
    }
})

//Timer Stop
Stop.addEventListener("click", function () {
    if (clockStart) {
        animateButton(this.id)
        clearInterval(timerInterval);
        clockStart = false;
    }
})

//Timer Restart
Restart.addEventListener("click", function () {
    animateButton(this.id)
    clearInterval(timerInterval);
    clockStart = false;
    Hrs = 0;
    Min = 0;
    Sec = 0;
    Hours.innerHTML = "00";
    Minutes.innerHTML = "00";
    Seconds.innerHTML = "00";
})

//Hide Buttons When Value Are 0
var updwonLen = document.querySelectorAll(".disp").length
for (var i = 0; i < updwonLen; i++) {
    document.querySelectorAll(".disp")[i].addEventListener("click", function () {
        if (Hrs == 0 && Min == 0 && Sec == 0) {
            Start.style.display = "none"
            Stop.style.display = "none"
        }
        else {
            Start.style.display = "inline-block"
            Stop.style.display = "inline-block"
        }
    })
}

// Buttons Animation
function animateButton(btn) {
    var activeButton = document.querySelector("#" + btn);

    if (activeButton == Start) {
        Stop.classList.remove("pressed");
        activeButton.classList.add("pressed");
    }

    else if (activeButton == Stop) {
        Start.classList.remove("pressed");
        activeButton.classList.add("pressed");
    }

    else {
        for (var i = 0; i < toggleBtnLen; i++) {
            document.querySelectorAll(".toggle")[i].classList.remove("pressed");
        }
        activeButton.classList.add("pressed");
        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 100)
    }
}
