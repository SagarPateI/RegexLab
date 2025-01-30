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
        const regex = new RegExp(regexInput, flags);
        const matches = testString.matchAll(regex);

        let hasMatches = false;
        for (const match of matches) {
            hasMatches = true;
            const matchText = match[0];
            const startIndex = match.index;
            const endIndex = startIndex + matchText.length;

            // Highlight the match in the test string
            const highlightedText = testString.substring(0, startIndex) +
                `<span class="highlight">${matchText}</span>` +
                testString.substring(endIndex);

            // Display match details
            const matchDetails = document.createElement('div');
            matchDetails.className = 'match-detail';
            matchDetails.innerHTML = `
        <strong>Match:</strong> "${matchText}" (positions ${startIndex}-${endIndex})
      `;
            matchResults.appendChild(matchDetails);
        }

        if (!hasMatches) {
            matchResults.innerHTML = '<div class="no-matches">No matches found.</div>';
        }
    } catch (error) {
        matchResults.innerHTML = `<div class="error">Invalid regex: ${error.message}</div>`;
    }
});