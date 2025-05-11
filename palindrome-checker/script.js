const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');
const errorMessage = document.getElementById('error-message');

const noValue = () => textInput.value.trim() === "";

const isPalindrome = () => {
    const cleanedInput = textInput.value.toLowerCase().match(/[a-z0-9]/gi);
    return cleanedInput.join('') === cleanedInput.reverse().join('');
};

const resultText = (string, boolean) => {
    result.textContent = `${string} is ${boolean ? "" : "not "}a palindrome.`;
    result.classList.add("fade-in");
};

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    result.textContent = '';
    result.classList.remove("fade-in");
};

checkBtn.addEventListener('click', () => {
    if (noValue()) {
        showError("Please input a value");
    } else if (isPalindrome()) {
        resultText(textInput.value, true);
        errorMessage.style.display = 'none';
    } else {
        resultText(textInput.value, false);
        errorMessage.style.display = 'none';
    }
});

// Allow Enter key to trigger palindrome check
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkBtn.click();
    }
});
