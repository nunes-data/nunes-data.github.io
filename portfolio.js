// EXPERIENCE TAB SYSTEM
function openExp(evt, name) {
    const content = document.getElementsByClassName("tab-content");
    for (let i = 0; i < content.length; i++) content[i].classList.remove("active");
    const links = document.getElementsByClassName("tab-link");
    for (let i = 0; i < links.length; i++) links[i].classList.remove("active");
    document.getElementById(name).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// PIXEL COFFEE - REDUCED PROPORTION
(function() {
    const canvas = document.getElementById('coffeeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const PS = 6; // Smaller pixel size for better proportion

    const colors = { 'K': '#0d0d0d', 'W': '#ffffff', 'c': '#2d1606', 'r': '#b45309', 'g': '#d1d5db' };
    const art = [
        '.....KKKKKKKKKKKKKKKKKKKK.....',
        '..KKKWWWWWWWWWWWWWWWWWWWWKKK..',
        '..KWWKKKKKKKKKKKKKKKKKKKKWWK..',
        '..KWKccccccccccccccccccccKWK..',
        '..KWKccrrrrrreeeeeerrrrrccKWK..',
        '..KWKccccccccccccccccccccKWK..',
        '..KWWWWWWWWWWWWWWWWWWwwwwgKKKK',
        '..KWWWWWWWWWWWWWWWWWWwwwwgKWWK',
        '..KWWWWWWWWWWWWWWWWWWwwwwgKKKK',
        '....KKKKKKKKKKKKKKKKKKKKKK....'
    ];

    art.forEach((row, ry) => {
        for (let c = 0; c < row.length; c++) {
            if (colors[row[c]]) {
                ctx.fillStyle = colors[row[c]];
                ctx.fillRect(c * PS, ry * PS, PS, PS);
            }
        }
    });
})();

// DYNAMIC NEURAL NETWORK (In Hero)
(function() {
    const layers = [
        {x: 50,  nodes: [150, 250, 350, 450], color: '#c8a96e'}, 
        {x: 250, nodes: [100, 200, 300, 400, 500], color: '#64ffda'}, 
        {x: 450, nodes: [150, 250, 350, 450], color: '#c8a96e'}
    ];
    const svg = document.querySelector('.neural-network');
    if(!svg) return;
    const connGroup = svg.querySelector('.connections');
    const nodeGroup = svg.querySelector('.nodes-container');

    layers.forEach((layer, i) => {
        if (i < layers.length - 1) {
            const next = layers[i+1];
            layer.nodes.forEach((fy, fi) => {
                next.nodes.forEach((ty, ti) => {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', layer.x); line.setAttribute('y1', fy);
                    line.setAttribute('x2', next.x); line.setAttribute('y2', ty);
                    line.setAttribute('stroke', 'url(#nnGrad)'); line.setAttribute('opacity', '0.1');
                    connGroup.appendChild(line);
                });
            });
        }
        layer.nodes.forEach(ny => {
            const circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circ.setAttribute('cx', layer.x); circ.setAttribute('cy', ny); circ.setAttribute('r', '6');
            circ.setAttribute('fill', layer.color); circ.setAttribute('filter', 'url(#glow)');
            nodeGroup.appendChild(circ);
        });
    });
})();
