const display = document.getElementById('display');

const playSound = (key) => {
    const audio = document.getElementById(key);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    display.innerText = `Playing: ${key}`;
};

// Click event for buttons
document.querySelectorAll('.drum-pad').forEach(pad => {
    pad.addEventListener('click', () => {
        const key = pad.textContent.trim();
        playSound(key);
    });
});

// Keydown event on document
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    playSound(key);
});
