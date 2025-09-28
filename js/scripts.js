// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll behavior
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.classList.add('navbar-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollTop = scrollTop;
});

// Animate elements on scroll
gsap.utils.toArray('.animate-element').forEach((element) => {
    gsap.fromTo(element, 
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Counter animation for statistics
gsap.utils.toArray('.stat-card h2').forEach((counter) => {
    const text = counter.textContent;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    const suffix = text.replace(/[\d.]/g, '');
    
    ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
            gsap.fromTo(counter, 
                { textContent: 0 },
                {
                    textContent: number,
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 0.1 },
                    onUpdate: function() {
                        counter.textContent = Math.round(this.targets()[0].textContent * 10) / 10 + suffix;
                    }
                }
            );
        }
    });
});

// Floating cards animation
gsap.set('.floating-card', { transformOrigin: 'center center' });

gsap.to('.floating-card-1', {
    y: -20,
    rotation: 2,
    duration: 3,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
});

gsap.to('.floating-card-2', {
    y: -15,
    rotation: -1,
    duration: 2.5,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
