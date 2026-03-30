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

    // GitHub API dynamic gallery loading
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        const githubUser = "AdithyaVimukthi";
        const githubRepo = "Custom-T-Works-web";
        const targetFolder = "images/prev_work";

        fetch(`https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${targetFolder}`)
            .then(response => {
                if (!response.ok) throw new Error("Could not fetch gallery");
                return response.json();
            })
            .then(data => {
                // Filter only image files
                const images = data.filter(file => file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i));
                
                galleryContainer.innerHTML = ''; // Clear loading text

                if (images.length === 0) {
                    galleryContainer.innerHTML = '<div class="col-span-full text-center text-slate-400 py-10">No recent work available yet.</div>';
                    return;
                }

                images.forEach((file, index) => {
                    const delay = (index % 5) * 100;
                    // We use the raw download_url or build local fallback url.
                    // Local fallback allows it to work offline if tested locally. GitHub Pages handles path mapping correctly.
                    const imgSrc = `${targetFolder}/${encodeURIComponent(file.name)}`;
                    
                    const html = `
                        <div class="group relative overflow-hidden rounded-2xl glass aspect-[4/5] object-cover border border-slate-700/50 fade-in opacity-0 translate-y-10 transition-all duration-700" style="transition-delay: ${delay}ms">
                            <img src="${imgSrc}" alt="Recent Work" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            </div>
                        </div>
                    `;
                    galleryContainer.insertAdjacentHTML('beforeend', html);
                });

                // Re-trigger the intersection observer for dynamically added items
                const newFadeElements = galleryContainer.querySelectorAll('.fade-in');
                newFadeElements.forEach(el => observer.observe(el));
            })
            .catch(error => {
                console.error('Error loading gallery from GitHub:', error);
                galleryContainer.innerHTML = '<div class="col-span-full text-center text-red-400 py-10">Failed to load recent works. Please check your connection.</div>';
            });
    }

});
