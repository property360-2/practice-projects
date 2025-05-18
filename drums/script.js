const display = document.getElementById("display");
const drumPad = document.querySelectorAll(".drum-pad");


const playDrum = key => {
    const audio = document.getElementById(key);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play(audio);
    display.innerText = key;
};

drumPad.forEach(pad => {
    pad.addEventListener("click", () => {
        const key = pad.textContent.trim();
        console.log(key);
        playDrum(key);
    });
});

document.addEventListener("keydown", event => {
    const key = event.key.toUpperCase();
    console.log(key);
    playDrum(key);
});