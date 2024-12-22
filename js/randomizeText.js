window.addEventListener('load', () => {
    const hiddenText = document.getElementById('hidden-text');

    function randomizeTextPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const randomTop = Math.random() * (viewportHeight - 50); // Adjust for text height
        const randomLeft = Math.random() * (viewportWidth - 200); // Adjust for text width

        hiddenText.style.top = `${randomTop}px`;
        hiddenText.style.left = `${randomLeft}px`;
    }

    randomizeTextPosition();
});
