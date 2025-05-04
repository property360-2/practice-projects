const dialogElement = document.getElementById('image-preview');
const fullImage = document.getElementById('full-image-src');
const imageSelectors = document.querySelectorAll('.image-selector');
const closeButton = document.getElementById('close-button');

// Open the dialog with the full image when an image is clicked
imageSelectors.forEach((selector) => {
    selector.addEventListener('click', () => {
        const imageSrc = selector.src.replace('-thumbnail', '');
        fullImage.src = imageSrc;
        dialogElement.showModal();
    });
});

// Close the dialog when the close button is clicked
closeButton.addEventListener('click', () => {
    dialogElement.close();
});

// Close the dialog when clicking outside the image
dialogElement.addEventListener('click', (event) => {
    if (event.target === dialogElement) {
        dialogElement.close();
    }
});
