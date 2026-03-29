document.addEventListener("DOMContentLoaded", () => {

    // ─── CUSTOM CURSOR ───
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let hidden = false;

    document.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
        if (hidden) {
            document.body.classList.remove("cursor-hidden");
            hidden = false;
        }
    });

    // Smooth-follow ring
    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Expand ring on interactive elements
    const hoverTargets = "a, button, .card, .tab, .skill-pill";
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });

    // Hide when leaving window
    document.addEventListener("mouseleave", () => {
        document.body.classList.add("cursor-hidden");
        hidden = true;
    });

    // ─── MOBILE MENU ───
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open");
        mobileMenu.classList.toggle("open");
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuBtn.classList.remove("open");
            mobileMenu.classList.remove("open");
        });
    });

    // ─── NAV SCROLL BORDER ───
    const nav = document.querySelector("nav");
    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 30);
    });

    // ─── EXPERIENCE TABS ───
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".panel");

    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            tabs.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });

    // ─── SCROLL REVEAL ───
    const reveals = document.querySelectorAll(".reveal");

    function checkReveal() {
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 80) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", checkReveal, { passive: true });
    checkReveal();

    // ─── PROGRESS BAR ───
    window.addEventListener("scroll", () => {
        const h = document.body.scrollHeight - window.innerHeight;
        const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        document.getElementById("progress").style.width = pct + "%";
    }, { passive: true });

    // ─── MAGNETIC CARDS ───
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) * 0.04;
            const y = (e.clientY - r.top - r.height / 2) * 0.04;
            card.style.transform = `translate(${x}px, ${y}px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // ─── ANIMATED NEURAL NETWORK ───
    const svg = document.getElementById("nn");
    const NODE_COUNT = 26;
    const CONNECTION_DIST = 110;
    const nodes = [];

    // Gold color for nodes (same as graph nodes in original), teal for edges
    const NODE_COLOR = "#c8a96e";
    const EDGE_COLOR = "#7eb8c9";

    function initNodes() {
        const W = svg.clientWidth || 440;
        const H = svg.clientHeight || 340;
        nodes.length = 0;
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4
            });
        }
    }

    initNodes();

    let frameId;

    function draw() {
        const W = svg.clientWidth || 440;
        const H = svg.clientHeight || 340;

        svg.innerHTML = "";

        // Update positions
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });

        // Draw edges
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d < CONNECTION_DIST) {
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", nodes[i].x);
                    line.setAttribute("y1", nodes[i].y);
                    line.setAttribute("x2", nodes[j].x);
                    line.setAttribute("y2", nodes[j].y);
                    line.setAttribute("stroke", EDGE_COLOR);
                    line.setAttribute("stroke-opacity", (1 - d / CONNECTION_DIST) * 0.7);
                    line.setAttribute("stroke-width", "0.8");
                    svg.appendChild(line);
                }
            }
        }

        // Draw nodes
        nodes.forEach(n => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", n.x);
            circle.setAttribute("cy", n.y);
            circle.setAttribute("r", 3);
            circle.setAttribute("fill", NODE_COLOR);
            svg.appendChild(circle);
        });

        frameId = requestAnimationFrame(draw);
    }

    // Pause animation when tab is hidden (performance)
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(frameId);
        } else {
            draw();
        }
    });

    draw();
});
