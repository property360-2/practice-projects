function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escapes = { 
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return escapes[match];
    });
}

function convertMarkdown() {
    const markdownText = document.getElementById('markdown-input').value;
    return marked(markdownText);
}

function updateMarkdown() {
    try {
        const htmlText = convertMarkdown();
        document.getElementById('html-output').textContent = escapeHtml(htmlText);
        document.getElementById('preview').innerHTML = htmlText;
    } catch (e) {
        console.error(e);
        alert('An error occurred while converting Markdown.');
    }
}

document.getElementById('markdown-input').addEventListener('input', updateMarkdown);
updateMarkdown();