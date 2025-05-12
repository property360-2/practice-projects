// Accessing elements
const regexPattern = document.getElementById('pattern');
const stringToTest = document.getElementById('test-string');
const testButton = document.getElementById('test-btn');
const testResult = document.getElementById('result');
const caseInsensitiveFlag = document.getElementById('i');
const globalFlag = document.getElementById('g');

// Function to get the flags as a string
function getFlags() {
    let flags = '';
    if (caseInsensitiveFlag.checked) {
        flags += 'i';
    }
    if (globalFlag.checked) {
        flags += 'g';
    }
    return flags;
}

// Function to handle the testing of the regex
function testRegex() {
    const pattern = regexPattern.value;
    const testString = stringToTest.textContent.trim();
    const flags = getFlags();

    try {
        const regex = new RegExp(pattern, flags); // Create the regex with the selected flags
        const matches = testString.match(regex); // Find matches

        // Clear previous result and highlight
        testResult.innerHTML = '';
        stringToTest.innerHTML = testString;

        if (matches) {
            // Highlight each match
            let highlightedText = testString.replace(regex, (match) => {
                return `<span class="highlight">${match}</span>`;
            });
            stringToTest.innerHTML = highlightedText;

            // Display the result in the #result element
            testResult.textContent = matches.join(', ');
        } else {
            // No match found
            testResult.textContent = 'No match';
        }
    } catch (error) {
        // If there's an invalid regex
        testResult.textContent = 'Invalid regex pattern';
    }
}

// Add event listener to the test button
testButton.addEventListener('click', testRegex);
