document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-btn');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        const menu = document.querySelector('nav');
        menu.classList.toggle('show');
        
        const barsIcon = document.querySelector('.fa-bars');
        barsIcon.classList.toggle('hide');
        
        const closeIcon = document.querySelector('.fa-xmark');
        closeIcon.classList.toggle('show');
    });
});
