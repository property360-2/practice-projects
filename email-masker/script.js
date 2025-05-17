const emailInput = document.getElementById("email-input");
const maskButton = document.getElementById("mask-button");
const dialog = document.getElementById("masked-email-dialog");
const result = document.getElementById("masked-email");
const closeDialog = document.getElementById("close-dialog-button");

// Validate email format with a simple regex
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enable/disable button based on input validity
emailInput.addEventListener("input", () => {
    const valid = isValidEmail(emailInput.value.trim());
    maskButton.disabled = !valid;
});

// Mask the email considering edge cases
function emailMasker(email) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return ""; // invalid email

    const username = email.slice(0, atIndex);
    const domain = email.slice(atIndex);

    if (username.length <= 2) {
        // If username is very short, just mask the last char
        return username[0] + "*".repeat(username.length - 1) + domain;
    }

    // Mask middle characters for longer usernames
    const maskedEmail = username[0] + "*".repeat(username.length - 2) + username[username.length - 1] + domain;
    return maskedEmail;
}

maskButton.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const masked = emailMasker(email);
    showDialog(masked);
});

function showDialog(maskedEmail) {
    result.textContent = maskedEmail;
    dialog.showModal();
    closeDialog.focus();  // Focus close button for accessibility
}

// Close dialog on clicking outside or close button
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        closeModal();
    }
});

closeDialog.addEventListener("click", () => {
    closeModal();
});

function closeModal() {
    dialog.close();
    emailInput.value = "";
    result.textContent = "";
    maskButton.disabled = true;  // Disable button until input again
    emailInput.focus(); // Return focus to input
}

// Initially disable the mask button
maskButton.disabled = true;
