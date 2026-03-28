// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Interactive form sumbission for contact and orders
    const orderForm = document.getElementById('orderForm');
    if(orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order Details Submitted Successfully! Start Customizing Your Design!');
        });
    }
    
    // Intersection Observer for fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
});
