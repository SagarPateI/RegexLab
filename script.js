document.getElementById('test-button').addEventListener('click', function () {
    const regexInput = document.getElementById('regex-input').value;
    const testString = document.getElementById('test-string').value;
    const flags = Array.from(document.querySelectorAll('#flags-input input:checked'))
        .map(checkbox => checkbox.value)
        .join('');
    const matchResults = document.getElementById('match-results');

    // Clear previous results
    matchResults.innerHTML = '';

    try {
        // Always include the 'g' flag for matchAll
        const regex = new RegExp(regexInput, flags + 'g');
        const matches = [];
        let match;

        // Use exec to find all matches
        while ((match = regex.exec(testString)) !== null) {
            matches.push(match);
        }

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