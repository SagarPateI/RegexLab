// Get references to DOM elements
const regexInput = document.getElementById('regex-input');
const testStringInput = document.getElementById('test-string');
const flagsInput = document.getElementById('flags-input');
const flagsDisplayInput = document.getElementById('flags-display-input');
const testButton = document.getElementById('test-button');
const matchResults = document.getElementById('match-results');

// Default flags
let currentFlags = 'gm';

// Update flags display and checkboxes when flags are manually entered
flagsDisplayInput.addEventListener('input', function () {
    const newFlags = flagsDisplayInput.value;
    currentFlags = newFlags;

    // Update checkboxes based on the new flags
    Array.from(flagsInput.querySelectorAll('input')).forEach(checkbox => {
        checkbox.checked = newFlags.includes(checkbox.value);
    });
});

// Update flags display when checkboxes are toggled
flagsInput.addEventListener('change', function () {
    const selectedFlags = Array.from(flagsInput.querySelectorAll('input:checked'))
        .map(checkbox => checkbox.value)
        .join('');
    currentFlags = selectedFlags;
    flagsDisplayInput.value = selectedFlags;
});

// Test regex when the button is clicked
testButton.addEventListener('click', function () {
    const regexPattern = regexInput.value;
    const testString = testStringInput.value;

    // Clear previous results
    matchResults.innerHTML = '';

    try {
        const regex = new RegExp(regexPattern, currentFlags);
        const matches = [...testString.matchAll(regex)];

        if (matches.length > 0) {
            // Highlight matches in the test string
            let highlightedText = testString;
            let offset = 0;

            matches.forEach(match => {
                const startIndex = match.index + offset;
                const endIndex = startIndex + match[0].length;
                highlightedText =
                    highlightedText.substring(0, startIndex) +
                    `<span class="highlight">${match[0]}</span>` +
                    highlightedText.substring(endIndex);
                offset += '<span class="highlight"></span>'.length - match[0].length;
            });

            // Display highlighted text
            const highlightedTextElement = document.createElement('div');
            highlightedTextElement.innerHTML = `<strong>Highlighted Matches:</strong><br>${highlightedText}`;
            matchResults.appendChild(highlightedTextElement);

            // Display match details
            matches.forEach((match, index) => {
                const matchDetails = document.createElement('div');
                matchDetails.className = 'match-detail';
                matchDetails.innerHTML = `
          <strong>Match ${index + 1}:</strong> "${match[0]}" (positions ${match.index}-${match.index + match[0].length})
        `;
                matchResults.appendChild(matchDetails);
            });
        } else {
            matchResults.innerHTML = '<div class="no-matches">No matches found.</div>';
        }
    } catch (error) {
        matchResults.innerHTML = `<div class="error">Invalid regex: ${error.message}</div>`;
    }
});