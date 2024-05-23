const el = document.querySelector(".clock");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
        mins = +localStorage.getItem("focusTime") || 25;
    } else {
        mins = +localStorage.getItem("breakTime") || 10;
    }

    seconds = mins * 60;
    totalsecs = mins * 60;
    setTimeout(decremenT(), 60);
    startBtn.style.transform = "scale(0)";
    paused = false;
});

function decremenT() {
    mindiv.textContent = Math.floor(seconds / 60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

    if (seconds > 0) {
        perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
        setProgress(perc);
        seconds--;
        initial = window.setTimeout("decremenT()", 1000);
    } else {
        mins = 0;
        seconds = 0;
        window.alert("Time's up!")
        let btn = localStorage.getItem("btn");

        if (btn === "focus") {
            startBtn.textContent = "START BREAK";
            startBtn.classList.add("break");
            localStorage.setItem("btn", "break");
        } else {
            startBtn.classList.remove("break");
            startBtn.textContent = "START FOCUS";
            localStorage.setItem("btn", "focus");
        }
        startBtn.style.transform = "scale(1)";
    }
}
