document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.replace(/\/$/, "");

    const navLinks = document.querySelectorAll('.menu a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "");

        if (currentPath === linkPath) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
});