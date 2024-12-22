const spotlight = document.getElementById('spotlight');
const hiddenText = document.getElementById('hidden-text');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    spotlight.style.left = `${clientX}px`;
    spotlight.style.top = `${clientY}px`;

    const rect = hiddenText.getBoundingClientRect();
    const textCenterX = rect.left + rect.width / 2;
    const textCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(clientX - textCenterX, 2) + Math.pow(clientY - textCenterY, 2)
    );

    if (distance < 100) {
        hiddenText.style.color = 'white'; // Illuminated by spotlight
    } else {
        hiddenText.style.color = 'black'; // Hidden in darkness
    }
});
