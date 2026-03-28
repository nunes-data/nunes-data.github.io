document.addEventListener("DOMContentLoaded", function () {

    console.log("JS LOADED");

    // =====================
    // MOBILE MENU
    // =====================
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });
    }

    // =====================
    // TABS
    // =====================
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".panel");

    tabs.forEach(function (btn) {
        btn.addEventListener("click", function () {

            tabs.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");

            const targetId = btn.getAttribute("data-tab");
            const target = document.getElementById(targetId);

            if (target) {
                target.classList.add("active");
            }
        });
    });

    // =====================
    // NEURAL NETWORK
    // =====================
    const svg = document.getElementById("nn");

    if (svg) {
        const width = svg.clientWidth || 400;
        const height = svg.clientHeight || 300;

        const nodes = [];

        // create nodes
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;

            nodes.push({ x, y });

            const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            c.setAttribute("cx", x);
            c.setAttribute("cy", y);
            c.setAttribute("r", 4);
            c.setAttribute("fill", "#7eb8c9");

            svg.appendChild(c);
        }

        // connect nodes
        nodes.forEach(n1 => {
            nodes.forEach(n2 => {

                if (Math.random() > 0.9) return;

                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
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
