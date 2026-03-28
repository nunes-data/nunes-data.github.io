// Tabs (SAFE VERSION)
function openTab(evt, tabName) {
    const panes = document.querySelectorAll(".tab-pane");
    panes.forEach(p => p.classList.remove("active"));

    const btns = document.querySelectorAll(".tab-btn");
    btns.forEach(b => b.classList.remove("active"));

    const target = document.getElementById(tabName);
    if (target) target.classList.add("active");

    evt.currentTarget.classList.add("active");
}

// Mobile Menu
document.querySelector(".mobile-menu-btn")
?.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("open");
});

// Neural Network
(function () {
    const layers = [
        {x: 80, nodes: [150, 250, 350, 450]},
        {x: 300, nodes: [100, 200, 300, 400, 500]},
        {x: 520, nodes: [150, 250, 350, 450]}
    ];

    const svg = document.querySelector('.neural-network');
    if (!svg) return;

    const conn = svg.querySelector('.connections');
    const nodes = svg.querySelector('.nodes-container');

    layers.forEach((layer, i) => {

        if (i < layers.length - 1) {
            const next = layers[i+1];

            layer.nodes.forEach(fy => {
                next.nodes.forEach(ty => {

                    // random sparsity
                    if (Math.random() > 0.5) return;

                    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
                    line.setAttribute('x1', layer.x);
                    line.setAttribute('y1', fy);
                    line.setAttribute('x2', next.x);
                    line.setAttribute('y2', ty);
                    line.setAttribute('stroke', 'url(#nnGrad)');
                    line.setAttribute('opacity', '0.15');
                    conn.appendChild(line);
                });
            });
        }

        layer.nodes.forEach(ny => {
            const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
            c.setAttribute('cx', layer.x);
            c.setAttribute('cy', ny);
            c.setAttribute('r', 6);
            c.setAttribute('fill', '#7eb8c9');
            nodes.appendChild(c);
        });
    });

})();

// Coffee Pixel Art (responsive scale)
(function () {
    const canvas = document.getElementById('coffeeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const art = [
        '...KKKK...',
        '..KWWWWK..',
        '..KccccK..',
        '..KrrrrK..',
        '..KccccK..',
        '...KKKK...'
    ];

    const PS = canvas.width / art[0].length;

    const colors = {
        K: '#000',
        W: '#fff',
        c: '#2d1606',
        r: '#b45309'
    };

    art.forEach((row, y) => {
        [...row].forEach((ch, x) => {
            if (!colors[ch]) return;
            ctx.fillStyle = colors[ch];
            ctx.fillRect(x*PS, y*PS, PS, PS);
        });
    });
})();
