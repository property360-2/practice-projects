const lengthInput = document.getElementById("length");
const confirmBtn = document.getElementById("confirm");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copy-btn");
const historyList = document.getElementById("history-list");

let history = JSON.parse(localStorage.getItem("passwordHistory")) || []; // Retrieve history from localStorage

function passwordGenerator(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let password = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += characters[array[i] % characters.length];
    }

    return password;
}

function setResult(message, isSuccess) {
    result.classList.remove("success-result", "failed-result");
    result.classList.add(isSuccess ? "success-result" : "failed-result");
    result.textContent = message;
}

function showCopyButton(password) {
    copyBtn.style.display = "inline-block";
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(password);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy Password"), 2000);
    };
}

function displayPassword(password) {
    if (password.length >= 8 && password.length <= 25) {
        setResult("Generated Password: " + password, true);
        showCopyButton(password);
        addToHistory(password);  // Save to history
    } else {
        setResult("The password should be between 8 and 25 characters.", false);
        copyBtn.style.display = "none";
    }
}

function addToHistory(password) {
    history.unshift(password); // Add to beginning of history
    if (history.length > 10) history.pop(); // Keep only 10 items in history

    localStorage.setItem("passwordHistory", JSON.stringify(history)); // Store updated history in localStorage
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = ""; // Clear current history
    history.forEach(pwd => {
        const li = document.createElement("li");
        li.textContent = pwd;
        historyList.appendChild(li);
    });
}

// Initialize history on page load
window.addEventListener("DOMContentLoaded", () => {
    renderHistory();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    const passwordLength = parseInt(lengthInput.value, 10);

    if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 25) {
        setResult("Please enter a valid number between 8 and 25.", false);
        copyBtn.style.display = "none";
        return;
    }

    const generated = passwordGenerator(passwordLength);
    displayPassword(generated);
});
