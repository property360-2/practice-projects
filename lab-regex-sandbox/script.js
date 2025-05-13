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

function testRegex() {
    const pattern = regexPattern.value;
    const testString = stringToTest.textContent.trim();
    const flags = getFlags();

    try {
        const regex = new RegExp(pattern, flags);
        const matches = [...testString.matchAll(regex)];

        // Clear previous result and highlight
        testResult.innerHTML = '';
        stringToTest.innerHTML = '';

        if (matches.length > 0) {
            let lastIndex = 0;

            matches.forEach(match => {
                const start = match.index;
                const end = start + match[0].length;

                // Add text before match
                stringToTest.append(document.createTextNode(testString.slice(lastIndex, start)));

                // Create and add highlighted match
                const span = document.createElement('span');
                span.classList.add('highlight');
                span.textContent = match[0];
                stringToTest.append(span);

                lastIndex = end;
            });

            // Add remaining text after last match
            stringToTest.append(document.createTextNode(testString.slice(lastIndex)));

            // Show matches in result
            testResult.textContent = matches.map(m => m[0]).join(', ');
        } else {
            testResult.textContent = 'No match';
            stringToTest.textContent = testString;
        }
    } catch (error) {
        testResult.textContent = 'Invalid regex pattern';
        stringToTest.textContent = testString;
    }
}


// Add event listener to the test button
testButton.addEventListener('click', testRegex);
