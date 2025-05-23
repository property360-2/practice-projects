
const dropdown = document.getElementById("category-dropdown");
const ViewButton = document.getElementById("view-category-button");
const AddButton = document.getElementById("add-bookmark-button");
const formSection = document.getElementById("form-section");
const mainSection = document.getElementById("main-section");
const closeFormButton = document.getElementById("close-form-button");
const closeListButton = document.getElementById("close-list-button");


const bookmarkCategory = new Map();
const bookmark = new Set();

AddButton.addEventListener("click", () => {addBookmark()});
closeFormButton.addEventListener("click", () => {goBack()});
closeListButton.addEventListener("click", () => {goBack()});



const ViewCategory = () => {

};

const addBookmark = () => {
    const title = dropdown.value[0].toUpperCase() + dropdown.value.slice(1);
    const h1 = document.createElement("h1");
    h1.textContent = title;
    mainSection.classList.add("hidden");
    formSection.classList.remove("hidden");
    formSection.prepend(h1);
};

const goBack = () => {
    formSection.classList.add("hidden");
    mainSection.classList.remove("hidden");
};