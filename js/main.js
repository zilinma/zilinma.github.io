// JavaScript for the website

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Create scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle functionality can be added here if needed

// Animation for elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Different animation styles based on element type
const fadeUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-up');
            }, entry.target.dataset.delay || 0);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, entry.target.dataset.delay || 0);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const slideInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('slide-in');
            }, entry.target.dataset.delay || 0);
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
});

// Parallax effect for hero section
function parallaxScroll() {
    const scrolled = window.scrollY;
    const heroElements = document.querySelectorAll('.profile-section, .project-image-large');
    
    heroElements.forEach(element => {
        if (element) {
            // Apply a subtle parallax effect
            const yPos = -(scrolled * 0.15);
            element.style.transform = `translateY(${yPos}px)`;
        }
    });
}

// Simple fade-in animation for headings
function setupNameAnimation() {
    const headings = document.querySelectorAll('h1.name');
    
    headings.forEach(heading => {
        heading.classList.add('name-fade');
    });
}

// Button hover effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('btn-pulse');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('btn-pulse');
        });
    });
}

// Setup publication link tooltips
function setupPublicationTooltips() {
    const arxivLinks = document.querySelectorAll('.publication-links a[href*="arxiv"]');
    const doiLinks = document.querySelectorAll('.publication-links a[href*="doi"]');
    const openReviewLinks = document.querySelectorAll('.publication-links a[href*="openreview"]');
    
    arxivLinks.forEach(link => {
        link.setAttribute('data-tooltip', 'View paper on arXiv');
    });
    
    doiLinks.forEach(link => {
        link.setAttribute('data-tooltip', 'Access via DOI');
    });
    
    openReviewLinks.forEach(link => {
        link.setAttribute('data-tooltip', 'Read on OpenReview');
    });
    
    // Add icons to links if not present
    document.querySelectorAll('.publication-links a').forEach(link => {
        if (!link.querySelector('i')) {
            const text = link.textContent.trim();
            let icon = 'fas fa-external-link-alt';
            
            if (text.toLowerCase().includes('pdf')) {
                icon = 'fas fa-file-pdf';
                link.setAttribute('data-tooltip', 'Download PDF');
            } else if (text.toLowerCase().includes('code')) {
                icon = 'fas fa-code';
                link.setAttribute('data-tooltip', 'View source code');
            } else if (text.toLowerCase().includes('demo')) {
                icon = 'fas fa-laptop-code';
                link.setAttribute('data-tooltip', 'Try live demo');
            } else if (text.toLowerCase().includes('video')) {
                icon = 'fas fa-video';
                link.setAttribute('data-tooltip', 'Watch video');
            }
            
            // Create icon element
            const iconElement = document.createElement('i');
            iconElement.className = icon;
            link.insertBefore(iconElement, link.firstChild);
            
            // Add space after icon
            const space = document.createTextNode(' ');
            link.insertBefore(space, iconElement.nextSibling);
        }
    });
}

// Add observers to elements when the page loads
window.addEventListener('load', () => {
    // Original animations
    const animatedElements = document.querySelectorAll('.project-tile, .publication-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // New animations
    const fadeUpElements = document.querySelectorAll('h2, h3.section-title, .cv-section h3');
    fadeUpElements.forEach((el, index) => {
        el.dataset.delay = index * 100;
        fadeUpObserver.observe(el);
    });
    
    const fadeInElements = document.querySelectorAll('.profile-info p, .portfolio-intro p, .project-content p, .cv-item');
    fadeInElements.forEach((el, index) => {
        el.dataset.delay = 100 + (index * 50);
        fadeInObserver.observe(el);
    });
    
    const slideInElements = document.querySelectorAll('.social-links a, .contact-info p, .publication-year');
    slideInElements.forEach((el, index) => {
        el.dataset.delay = index * 100;
        slideInObserver.observe(el);
    });
    
    // Setup other animation effects
    window.addEventListener('scroll', parallaxScroll);
    setupNameAnimation();
    setupButtonEffects();
    setupPublicationTooltips();
}); 