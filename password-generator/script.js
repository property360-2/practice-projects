const lengthInput = document.getElementById("length");
const confirmBtn = document.getElementById("confirm");
const result = document.getElementById("result");

function passwordGenerator(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    return password;
}

function displayPassword(password) {
    result.classList.remove("success-result", "failed-result");

    if (password.length >= 8 && password.length <= 25) {
        result.classList.add("success-result");
        result.textContent = "Generated Password: " + password;
    } else {
        result.classList.add("failed-result");
        result.textContent = "The password should be between 8 and 25 characters.";
    }
}

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // in case you're using a form

    const passwordLength = parseInt(lengthInput.value, 10);

    if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 25) {
        result.classList.remove("success-result");
        result.classList.add("failed-result");
        result.textContent = "Please enter a valid number between 8 and 25.";
        return;
    }

    const generated = passwordGenerator(passwordLength);
    displayPassword(generated);
});
