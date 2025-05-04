const emailInput = document.getElementById("email-input");
const maskButton = document.getElementById("mask-button");
const dialog = document.getElementById("masked-email-dialog");
const result = document.getElementById("masked-email");
const closeDialog = document.getElementById("close-dialog-button");

maskButton.addEventListener("click", () => console.log(emailMasker(emailInput.value)));

function emailMasker(email) {
    const atIndex = email.indexOf("@");
    const username = email.slice(0, atIndex);
    const domain = email.slice(atIndex);
    const maskedEmail = username[0] + "*".repeat(username.length - 2) + username[username.length - 1] + "@" + domain;
    showDialog(maskedEmail);
    return maskedEmail;
}

function showDialog(maskedEmail) {
    result.textContent = maskedEmail;
    dialog.showModal();
}

dialog.addEventListener("click", (event) => {
    if(event.target === dialog) {
        dialog.close();
    }
});

closeDialog.addEventListener("click", () => { 
    dialog.close();
    emailInput.value = "";
    result.textContent = "";
});


