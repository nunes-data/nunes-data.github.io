document.addEventListener("DOMContentLoaded", () => {

    // MOBILE MENU
    menuBtn.onclick = () => navLinks.classList.toggle("open");

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

    // SCROLL REVEAL
    const reveals = document.querySelectorAll(".reveal");

    function reveal() {
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", reveal);
    reveal();

    // PROGRESS BAR
    window.addEventListener("scroll", () => {
        const h = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / h) * 100;
        document.getElementById("progress").style.width = progress + "%";
    });

    // MAGNETIC CARDS
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left - r.width/2;
            const y = e.clientY - r.top - r.height/2;

            card.style.transform = `translate(${x*0.05}px, ${y*0.05}px) scale(1.03)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translate(0,0)";
        });
    });

    // ANIMATED NN
    const svg = document.getElementById("nn");
    const nodes = [];

    for (let i = 0; i < 25; i++) {
        nodes.push({
            x: Math.random()*400,
            y: Math.random()*300,
            vx: (Math.random()-0.5)*0.3,
            vy: (Math.random()-0.5)*0.3
        });
    }

    function draw() {
        svg.innerHTML = "";

        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;

            if (n.x<0||n.x>400) n.vx*=-1;
            if (n.y<0||n.y>300) n.vy*=-1;
        });

        nodes.forEach(n1=>{
            nodes.forEach(n2=>{
                const dx=n1.x-n2.x;
                const dy=n1.y-n2.y;
                const d=Math.sqrt(dx*dx+dy*dy);

                if(d<100){
                    const l=document.createElementNS("http://www.w3.org/2000/svg","line");
                    l.setAttribute("x1",n1.x);
                    l.setAttribute("y1",n1.y);
                    l.setAttribute("x2",n2.x);
                    l.setAttribute("y2",n2.y);
                    l.setAttribute("stroke","#7eb8c9");
                    l.setAttribute("opacity",1-d/100);
                    svg.appendChild(l);
                }
            });
        });

        nodes.forEach(n=>{
            const c=document.createElementNS("http://www.w3.org/2000/svg","circle");
            c.setAttribute("cx",n.x);
            c.setAttribute("cy",n.y);
            c.setAttribute("r",3);
            c.setAttribute("fill","#c8a96e");
            svg.appendChild(c);
        });

        requestAnimationFrame(draw);
    }

    draw();
});
