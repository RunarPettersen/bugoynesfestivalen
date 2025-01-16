export function setupCountdown(eventDateString) {
    const countdownElement = document.getElementById('countdown');
    const eventDate = new Date(eventDateString);

    const isEnglish = window.location.pathname.includes('/en/');

    function updateCountdown() {
        const today = new Date();
        const timeRemaining = eventDate - today;
        const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

        if (daysRemaining > 0) {
            countdownElement.textContent = isEnglish
                ? `${daysRemaining} days remaining`
                : `${daysRemaining} dager igjen`;
        } else {
            countdownElement.textContent = isEnglish
                ? 'The festival has started!'
                : 'Festivalen er i gang!';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60 * 24);
}