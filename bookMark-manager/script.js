// Get bookmarks from localStorage
function getBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    return Array.isArray(bookmarks) ? bookmarks : [];
}

// Save bookmarks to localStorage
function saveBookmarks(bookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Toggle form and main sections
function displayOrCloseForm() {
    document.getElementById("main-section").classList.toggle("hidden");
    document.getElementById("form-section").classList.toggle("hidden");
}

// Toggle list and main sections
function displayOrHideCategory() {
    document.getElementById("main-section").classList.toggle("hidden");
    document.getElementById("bookmark-list-section").classList.toggle("hidden");
}

// Add event listeners
document.getElementById("add-bookmark-button").addEventListener("click", () => {
    const selectedCategory = document.getElementById("category-dropdown").value;
    document.querySelectorAll(".category-name").forEach(el => el.textContent = selectedCategory);
    displayOrCloseForm();
});

document.getElementById("close-form-button").addEventListener("click", displayOrCloseForm);

document.getElementById("add-bookmark-button-form").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const url = document.getElementById("url").value.trim();
    const category = document.getElementById("category-dropdown").value;

    if (!name || !url) return;

    const newBookmark = { name, category, url };
    const bookmarks = getBookmarks();
    bookmarks.push(newBookmark);
    saveBookmarks(bookmarks);

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";

    displayOrCloseForm();
});

document.getElementById("view-category-button").addEventListener("click", () => {
    const category = document.getElementById("category-dropdown").value;
    document.querySelectorAll(".category-name").forEach(el => el.textContent = category);

    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(b => b.category === category);

    const listDiv = document.getElementById("category-list");
    
    if (filtered.length === 0) {
        listDiv.innerHTML = "<p>No Bookmarks Found</p>";
    } else {
        listDiv.innerHTML = filtered.map((b, index) => `
            <div>
                <input type="radio" id="bookmark-${index}" name="bookmark" value="${b.name}">
                <label for="bookmark-${index}">
                    <a href="${b.url}" target="_blank">${b.name}</a>
                </label>
            </div>
        `).join("");
    }

    displayOrHideCategory();
});

document.getElementById("close-list-button").addEventListener("click", displayOrHideCategory);

document.getElementById("delete-bookmark-button").addEventListener("click", () => {
    const selectedRadio = document.querySelector('input[name="bookmark"]:checked');
    if (!selectedRadio) return;

    const selectedName = selectedRadio.value;
    const category = document.getElementById("category-dropdown").value;
    let bookmarks = getBookmarks();

    bookmarks = bookmarks.filter(b => !(b.name === selectedName && b.category === category));
    saveBookmarks(bookmarks);

    // Refresh the category list display
    document.getElementById("view-category-button").click();
});
