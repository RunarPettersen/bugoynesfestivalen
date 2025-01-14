document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const noFlag = document.getElementById('no-flag');
    const enFlag = document.getElementById('en-flag');

    // Highlight the active language flag
    if (currentPath.includes('/en/')) {
        enFlag.classList.add('active');
        noFlag.classList.remove('active');
    } else {
        noFlag.classList.add('active');
        enFlag.classList.remove('active');
    }
});