// DOM Elements
const categoryDropdown = document.getElementById('category-dropdown');
const viewCategoryButton = document.getElementById('view-category-button');
const addBookmarkButton = document.getElementById('add-bookmark-button');
const formSection = document.getElementById('form-section');
const bookmarkListSection = document.getElementById('bookmark-list-section');
const mainSection = document.getElementById('main-section');

const categoryNameHeaders = document.querySelectorAll('.category-name');
const nameInput = document.getElementById('name');
const urlInput = document.getElementById('url');
const closeFormButton = document.getElementById('close-form-button');
const addBookmarkButtonForm = document.getElementById('add-bookmark-button-form');
const closeListButton = document.getElementById('close-list-button');
const deleteBookmarkButton = document.getElementById('delete-bookmark-button');
const categoryList = document.getElementById('category-list');

// Bookmark storage using Map and Set
let bookmarksMap = new Map();

// Load bookmarks from localStorage
function loadBookmarks() {
    const data = localStorage.getItem('bookmarks');
    if (data) {
        const parsed = JSON.parse(data);
        for (const category in parsed) {
            bookmarksMap.set(category, new Set(parsed[category]));
        }
    }
}

// Save bookmarks to localStorage
function saveBookmarks() {
    const obj = {};
    bookmarksMap.forEach((value, key) => {
        obj[key] = Array.from(value);
    });
    localStorage.setItem('bookmarks', JSON.stringify(obj));
}

// Show and hide sections
function showSection(section) {
    mainSection.classList.add('hidden');
    formSection.classList.add('hidden');
    bookmarkListSection.classList.add('hidden');
    section.classList.remove('hidden');
}

// Update header with current category
function updateCategoryName(category) {
    categoryNameHeaders.forEach(header => header.textContent = category);
}

// View Category Button
viewCategoryButton.addEventListener('click', () => {
    const category = categoryDropdown.value;
    updateCategoryName(category);
    showBookmarks(category);
    showSection(bookmarkListSection);
});

// Add Bookmark Button (open form)
addBookmarkButton.addEventListener('click', () => {
    const category = categoryDropdown.value;
    updateCategoryName(category);
    nameInput.value = '';
    urlInput.value = '';
    showSection(formSection);
});

// Add Bookmark from form
addBookmarkButtonForm.addEventListener('click', () => {
    const category = categoryDropdown.value;
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (name && url) {
        const formattedBookmark = `${name} - ${url}`;
        if (!bookmarksMap.has(category)) {
            bookmarksMap.set(category, new Set());
        }
        bookmarksMap.get(category).add(formattedBookmark);
        saveBookmarks();
        alert('Bookmark added!');
        showSection(mainSection);
    } else {
        alert('Please fill out both fields.');
    }
});

// Show bookmarks in the list
function showBookmarks(category) {
    categoryList.innerHTML = '';
    const bookmarks = bookmarksMap.get(category);
    if (bookmarks && bookmarks.size > 0) {
        bookmarks.forEach(bookmark => {
            const div = document.createElement('div');
            div.textContent = bookmark;
            div.classList.add('bookmark-item');
            div.addEventListener('click', () => {
                div.classList.toggle('selected');
            });
            categoryList.appendChild(div);
        });
    } else {
        categoryList.innerHTML = '<p>No bookmarks yet.</p>';
    }
}

// Delete selected bookmarks
deleteBookmarkButton.addEventListener('click', () => {
    const category = categoryDropdown.value;
    const selected = document.querySelectorAll('.bookmark-item.selected');
    if (selected.length === 0) {
        alert('Please select bookmarks to delete.');
        return;
    }

    selected.forEach(item => {
        bookmarksMap.get(category).delete(item.textContent);
    });

    saveBookmarks();
    showBookmarks(category);
    alert('Selected bookmarks deleted.');
});

// Close buttons
closeFormButton.addEventListener('click', () => {
    showSection(mainSection);
});

closeListButton.addEventListener('click', () => {
    showSection(mainSection);
});

// Initial load
loadBookmarks();
