document.addEventListener('DOMContentLoaded', () => {
    // --- Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;

    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'light-theme') {
            themeToggle.checked = true;
        }
    } else {
        // Default to dark theme if no preference is found
        body.classList.add('dark-theme');
        themeToggle.checked = false; // Ensure toggle reflects dark theme
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // --- Hero Section Placeholder Animation ---
    const animatedTextElement = document.querySelector('.animated-text');
    const phrases = [
        "AI Enthusiast",
        "Machine Learning Practitioner",
        "Data Science Aspirant",
        "Full-Stack Learner",
        "Problem Solver"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // milliseconds per character

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            animatedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            animatedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 100; // Reset typing speed
        } else {
            typingSpeed = isDeleting ? 70 : 100;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect(); // Start the animation

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Dynamic Year in Footer ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Contact Form Submission (using Formspree as an example) ---
    // You'll need to replace "YOUR_FORMSPREE_ENDPOINT" with your actual Formspree endpoint.
    // Go to formspree.io to get one.
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = 'Sending...';
            formStatus.style.color = 'var(--link-color)'; // Or a neutral color

            const response = await fetch("https://formspree.io/f/xwprrayd", {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'green';
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    formStatus.textContent = data.errors.map(error => error.message).join(", ");
                } else {
                    formStatus.textContent = 'Oops! There was a problem sending your message.';
                }
                formStatus.style.color = 'red';
            }
        });
    }


    window.scrollCarousel = function(button, direction) {
        // Find the parent .carousel-wrapper
        const wrapper = button.closest('.carousel-wrapper');
        if (!wrapper) return; // Safety check

        // Find the carousel-container within this specific wrapper
        const carousel = wrapper.querySelector('.carousel-container');
        if (!carousel) return; // Safety check

        // Get the width of one card (assuming all cards are similar width + gap)
        const firstCard = carousel.querySelector('.carousel-item, .certificate-item, .project-item, .blog-post-item, .youtube-video-item');
        if (!firstCard) return; // Safety check

        // Calculate scroll amount: card width + gap
        const cardWidth = firstCard.offsetWidth; // Includes padding/border
        const gap = parseInt(window.getComputedStyle(carousel).gap); // Get gap value
        const scrollAmount = cardWidth + gap;

        carousel.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    };


    // Uncomment the line below to enable fetching Medium posts (after setting up the URL/proxy)
    // fetchMediumPosts();
});