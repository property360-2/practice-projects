const votes = new Map([
    ['Apple', 0],
    ['Banana', 0],
    ['Orange', 0],
    ['Grape', 0]
]);
const voters = new Set();

const form = document.getElementById('pollForm');
const resultsContainer = document.getElementById('resultsContainer');

function renderResults() {
    const total = [...votes.values()].reduce((a, b) => a + b, 0);
    resultsContainer.innerHTML = ''; // clear old results

    votes.forEach((count, fruit) => {
        const percent = total ? (count / total) * 100 : 0;

        // Create container div
        const item = document.createElement('div');
        item.className = 'result-item';
        item.setAttribute('role', 'listitem');

        // Create and append text span
        const textSpan = document.createElement('span');
        textSpan.textContent = `${fruit}: ${count} (${percent.toFixed(1)}%)`;
        item.appendChild(textSpan);

        // Create bar container
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.setAttribute('aria-hidden', 'true');

        // Create inner bar
        const barInner = document.createElement('div');
        barInner.className = 'bar-inner';
        barInner.style.width = `${percent}%`;

        // Append inner bar to bar container
        bar.appendChild(barInner);

        // Append bar container to item
        item.appendChild(bar);

        // Append the item to results container
        resultsContainer.appendChild(item);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const voterId = form.voterId.value.trim();
    const choice = form.fruit.value;

    if (voters.has(voterId)) {
        alert('You already voted.');
        return;
    }

    voters.add(voterId);
    votes.set(choice, votes.get(choice) + 1);

    renderResults();

    form.reset();
    form.voterId.focus();
});

// Initial render
renderResults();
