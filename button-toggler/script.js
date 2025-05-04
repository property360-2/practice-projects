const favoriteIcons = document.querySelectorAll(".favorite-icon");

favoriteIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        icon.classList.toggle("filled");

        // Toggle aria-pressed for screen readers
        const isPressed = icon.getAttribute("aria-pressed") === "true";
        icon.setAttribute("aria-pressed", !isPressed);
    });
});
