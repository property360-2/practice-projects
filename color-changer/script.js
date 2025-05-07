const darkColorsArr = [
    "#2C3E50",
    "#34495E",
    "#2C2C2C",
    "#616A6B",
    "#4A235A",
    "#2F4F4F",
    "#0E4B5A",
    "#36454F",
    "#2C3E50",
    "#800020",
];


const body = document.querySelector("body");
const btn = document.getElementById("btn");
const bgHexCodeSpanElement = document.getElementById("bg-hex-code");



function getRandomIndex() {
    const randomIndex = Math.floor(Math.random() * darkColorsArr.length);
    return randomIndex;
}

function changeBackgroundColor() {
    const color = darkColorsArr[getRandomIndex()];

    bgHexCodeSpanElement.textContent = color;
    body.style.backgroundColor = color;
}
btn.addEventListener("click", () => changeBackgroundColor());


