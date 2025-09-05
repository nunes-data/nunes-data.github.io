        // Generate connections between layers
        function generateConnections() {
            const connectionsContainer = document.querySelector('.connections');
            connectionsContainer.innerHTML = '';
            
            // Layer node coordinates
            const layers = [
                {x: 50, nodes: [50, 100, 150, 200, 250, 300, 350, 400]}, // Input
                {x: 200, nodes: [40, 90, 140, 190, 240, 290, 340, 390, 440, 490, 540, 590]}, // Hidden 1
                {x: 350, nodes: [60, 120, 180, 240, 300, 360, 420, 480, 540, 600]}, // Hidden 2
                {x: 500, nodes: [80, 160, 240, 320, 400, 480, 560, 640]}, // Hidden 3
                {x: 650, nodes: [150, 250, 350, 450]} // Output
            ];
            
            // Create connections between each layer
            for (let i = 0; i < layers.length - 1; i++) {
                const fromLayer = layers[i];
                const toLayer = layers[i+1];
                
                fromLayer.nodes.forEach((fromY, fromIndex) => {
                    toLayer.nodes.forEach((toY, toIndex) => {
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', fromLayer.x + 8);
                        line.setAttribute('y1', fromY);
                        line.setAttribute('x2', toLayer.x - 8);
                        line.setAttribute('y2', toY);
                        line.setAttribute('stroke', 'url(#gradient)');
                        line.setAttribute('stroke-width', '0.8');
                        line.setAttribute('opacity', '0.4');
                        line.setAttribute('class', 'connection');
                        
                        // Animate the connection
                        const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                        anim.setAttribute('attributeName', 'opacity');
                        anim.setAttribute('values', '0.4;0.8;0.4');
                        anim.setAttribute('dur', '3s');
                        anim.setAttribute('begin', `${(i * 0.5 + fromIndex * 0.05 + toIndex * 0.02)}s`);
                        anim.setAttribute('repeatCount', 'indefinite');
                        
                        line.appendChild(anim);
                        connectionsContainer.appendChild(line);
                    });
                });
            }
        }
        
        // Toggle animation play state
        function toggleAnimation() {
            const animations = document.querySelectorAll('animate');
            const button = document.querySelector('.control-btn');
            
            if (animations[0].hasAttribute('paused')) {
                animations.forEach(anim => {
                    anim.unpauseAnimations();
                });
                button.textContent = 'Pause Animations';
            } else {
                animations.forEach(anim => {
                    anim.pauseAnimations();
                });
                button.textContent = 'Play Animations';
            }
        }
        
        // Change animation speed
        function changeSpeed(speed) {
            const animations = document.querySelectorAll('animate');
            animations.forEach(anim => {
                const currentDur = anim.getAttribute('dur');
                const baseDur = parseFloat(currentDur) * (anim.getAttribute('data-base-dur') || 1);
                anim.setAttribute('data-base-dur', baseDur / (anim.getAttribute('data-base-dur') || 1));
                anim.setAttribute('dur', `${baseDur / speed}s`);
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Update equations periodically
        setInterval(() => {
            const eqs = document.querySelectorAll('.floating-equation');
            const randomEq = eqs[Math.floor(Math.random() * eqs.length)];
            const randomText = equations[Math.floor(Math.random() * equations.length)];
            
            // Fade out
            randomEq.style.opacity = '0';
            
            // Change text and fade in
            setTimeout(() => {
                randomEq.innerHTML = randomText;
                randomEq.style.opacity = '1';
            }, 300);
        }, 8000);

        // Navigation active state
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Add smooth entrance animations on load
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Animate hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    heroContent.style.transition = 'all 1s ease';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 300);
            }
        });

        // Mobile menu toggle
        const createMobileMenu = () => {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.mobile-menu-btn');
            
            // Toggle mobile menu
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
            
            // Show/hide hamburger based on screen size
            const checkScreenSize = () => {
                if (window.innerWidth <= 768) {
                    hamburger.style.display = 'block';
                } else {
                    hamburger.style.display = 'none';
                    navLinks.classList.remove('active');
                }
            };
            
            window.addEventListener('resize', checkScreenSize);
            checkScreenSize();
        };

        // Performance optimization: Throttle scroll events
        let ticking = false;

        const updateOnScroll = () => {
            // Parallax effect
            const scrolled = window.pageYOffset;
            const mathViz = document.querySelector('.math-viz');
            if (mathViz) {
                mathViz.style.transform = `translateY(${scrolled * 0.1}px) translateX(${scrolled * -0.05}px)`;
            }
            
            // Nav background on scroll
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            generateConnections();
            createMobileMenu();
        });