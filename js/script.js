// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Handle Order Form File UI
    const orderForm = document.getElementById('orderForm');
    const artworkInput = document.getElementById('artworkInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    // Make the fake file upload box clickable
    const uploadBox = orderForm ? orderForm.querySelector('div.border-dashed') : null;
    if (uploadBox && artworkInput && fileNameDisplay) {
        uploadBox.addEventListener('click', () => artworkInput.click());
        artworkInput.addEventListener('change', () => {
            if (artworkInput.files.length > 0) {
                fileNameDisplay.innerText = "Selected File: " + artworkInput.files[0].name;
                fileNameDisplay.classList.remove('hidden');
            }
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
