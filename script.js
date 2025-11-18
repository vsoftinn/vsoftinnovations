// Centralized site scripts
// Mobile navigation toggle moved here from inline HTML
(function(){
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    // Accessibility attributes
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');

    function openMenu() {
        navMenu.classList.add('open');
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
        navMenu.focus();
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
    }

    hamburger.addEventListener('click', function(e){
        e.stopPropagation();
        const willOpen = !navMenu.classList.contains('open');
        if (willOpen) openMenu(); else closeMenu();
    });

    // keyboard support
    hamburger.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });

    // Close when clicking outside
    document.addEventListener('click', function(e){
        if (!navMenu.classList.contains('open')) return;
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function(){
        if (window.innerWidth >= 769 && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });

})();

// Placeholder for other site scripts
// Add additional JS below as needed
// Navigation and Logo Animation
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Tech Grid Items Modal Functionality
    const techItems = document.querySelectorAll('.grid-item');
    const techDescriptions = {
        'AI': {
            title: 'Artificial Intelligence',
            description: `Part of our Foundational & Infrastructure Solutions, our AI capabilities create a stable, secure, and efficient base for all operations. We implement cutting-edge machine learning solutions for process automation, predictive analytics, and intelligent decision support systems.`,
            features: ['Machine Learning', 'Neural Networks', 'Natural Language Processing']
        },
        'Cloud': {
            title: 'Cloud Solutions',
            description: `Essential infrastructure providing scalable, reliable, and cost-effective computing resources. We help businesses migrate to and optimize their cloud presence across major platforms including AWS, Azure, and Google Cloud.`,
            features: ['Cloud Migration', 'Infrastructure as Code', 'Cost Optimization']
        },
        'Security': {
            title: 'Cybersecurity',
            description: `Comprehensive security solutions protecting your digital assets. Features include advanced endpoint protection, multi-factor authentication, and continuous security awareness training.`,
            features: ['Endpoint Protection', 'MFA Implementation', 'Security Training']
        },
        'Data': {
            title: 'Data Management',
            description: `Enterprise-grade data solutions for storage, processing, and analytics. We implement robust data management systems that ensure data integrity, accessibility, and compliance.`,
            features: ['Data Warehousing', 'Analytics', 'Business Intelligence']
        },
        'IoT': {
            title: 'Internet of Things',
            description: `Connected device solutions that bridge the physical and digital worlds. We develop and implement IoT strategies that drive automation and provide real-time insights.`,
            features: ['Device Management', 'Edge Computing', 'Real-time Analytics']
        },
        'Blockchain': {
            title: 'Blockchain Technology',
            description: `Distributed ledger solutions for transparent, secure, and immutable record-keeping. We implement blockchain solutions for various use cases from supply chain to financial services.`,
            features: ['Smart Contracts', 'DLT Implementation', 'Network Security']
        }
    };

    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal-overlay">
            <div class="tech-modal">
                <h2 class="modal-title"></h2>
                <p class="modal-description"></p>
                <div class="modal-features"></div>
                <button class="modal-close">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalContainer);

    const modal = document.querySelector('.tech-modal');
    const overlay = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');

    // Add click event to tech items
    techItems.forEach(item => {
        item.addEventListener('click', () => {
            const tech = item.getAttribute('data-tech');
            const techInfo = techDescriptions[tech];
            
            if (techInfo) {
                document.querySelector('.modal-title').textContent = techInfo.title;
                document.querySelector('.modal-description').textContent = techInfo.description;
                document.querySelector('.modal-features').innerHTML = techInfo.features
                    .map(feature => `<span class="feature-badge">${feature}</span>`)
                    .join('');
                
                overlay.classList.add('active');
                modal.classList.add('active');
            }
        });
    });

    // Close modal functionality
    function closeModal() {
        overlay.classList.remove('active');
        modal.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Animate spotlight cards on scroll
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    spotlightCards.forEach(card => observer.observe(card));
});
