document.addEventListener("DOMContentLoaded", () => {

    // MOBILE MENU
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    menuBtn.onclick = () => {
        navLinks.classList.toggle("open");
    };

    // TABS
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".panel");

    tabs.forEach(btn => {
        btn.onclick = () => {
            tabs.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        };
    });

    // NAV SCROLL EFFECT
    window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
    });

    // SCROLL REVEAL
    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;

            if (top < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // NEURAL NETWORK
    const svg = document.getElementById("nn");

    if (svg) {
        const width = 400;
        const height = 300;
        const nodes = [];

        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;

            nodes.push({ x, y });

            const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
            c.setAttribute("cx", x);
            c.setAttribute("cy", y);
            c.setAttribute("r", 4);
            c.setAttribute("fill", "#7eb8c9");

            svg.appendChild(c);
        }

        nodes.forEach(n1 => {
            nodes.forEach(n2 => {
                if (Math.random() > 0.9) return;

                const line = document.createElementNS("http://www.w3.org/2000/svg","line");
                line.setAttribute("x1", n1.x);
                line.setAttribute("y1", n1.y);
                line.setAttribute("x2", n2.x);
                line.setAttribute("y2", n2.y);
                line.setAttribute("stroke", "#c8a96e");
                line.setAttribute("opacity", "0.2");

                svg.appendChild(line);
            });
        });
    }

});
