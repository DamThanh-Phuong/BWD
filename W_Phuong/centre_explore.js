document.addEventListener('DOMContentLoaded', (event) => {
    // Get elements
    const sections = document.querySelectorAll('section');
    const prevButton = document.querySelectorAll('.control #prev');
    const nextButton = document.querySelectorAll('.control #next');

    let currentIndex = 0;

    // Function to show the section based on the index
    const showSection = (index) => {
        sections.forEach((section, idx) => {
            section.style.display = (idx === index) ? 'block' : 'none';
        });
    };

    // Initial display setup
    showSection(currentIndex);

    // Event listeners for next and previous buttons
    nextButton.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % sections.length;
            showSection(currentIndex);
        });
    });

    prevButton.forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + sections.length) % sections.length;
            showSection(currentIndex);
        });
    });
});