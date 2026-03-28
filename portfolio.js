/**
 * 1. PERFECT PIXEL ART COFFEE CUP
 */
(function() {
    const canvas = document.getElementById('coffeeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const PS = 16; 

    const P = {
        '.': null, 'K': '#0d0d0d', 'W': '#ffffff', 'w': '#f0ede8',
        'g': '#d1d5db', 'G': '#9ca3af', 'D': '#4b5563', 's': '#e5e7eb',
        'S': '#94a3b8', 'c': '#2d1606', 'm': '#5e2f11', 'r': '#b45309',
        'e': '#f59e0b', 'H': '#f8fafc', 'h': '#64748b'
    };

    const art = [
        '........................................',
        '........................................',
        '........................................',
        '..........KKKKKKKKKKKKKKKKKKKKKK........',
        '......KKKKWWWWWWWWWWWWWWWWWWWWWWKKKK....',
        '....KKWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKK..',
        '..KKWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKK',
        '..KWWKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKWWK',
        '..KWKccccccccccccccccccccccccccccccccKWK',
        '..KWKccmmmmmmmrrrrrrreeeeeerrrrrmmmccKWK',
        '..KWKccmmmmrrrrreeeeeeeeeeeeerrrrmmccKWK',
        '..KWKccmmrrrreeeeerrrrrreeeeeerrrmmccKWK',
        '..KWKccmmmmrrrrreeeeeeeeeeeerrrrmmmccKWK',
        '..KWKccccccccccccccccccccccccccccccccKWK',
        '..KWWKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKWWK',
        '..KWWWWWWWWWWWWWWWWWWWWwwwwwwggggGGDDDKK',
        '..KWWWWWWWWWWWWWWWWWWWWwwwwwwggggGGDDDKHKK',
        '..KWWWWWWWWWWWWWWWWWWWWwwwwwwggggGGDDD KHHK',
        '..KWWWWWWWWWWWWWWWWWWWWwwwwwwggggGGDDD  KHK',
        '..KWWWWWWWWWWWWWWWWWWWWwwwwwwggggGGDDD KHHK',
        '..KwwwwwwwwwwwwwwwwwwwwwwwwwwggggGGDDDKHKK',
        '..KggggggggggggggggggggggggggGGGGDDDDDKK',
        '..KGGGGGGGGGGGGGGGGGGGGGGGGGGDDDDDDDDDK',
        '..KDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDK',
        '....KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK..',
        '........................................',
        '..KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK..',
        'KKssssssssssssssssssssssssssssssssssssKK',
        'KWWWWWWWWWWsssssssssssssssssssssSSSSSSSK',
        'KKWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKK',
        '.KKKSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSKKK.',
        '...KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK...',
    ];

    const offX = Math.floor((W / PS - 40) / 2);
    const offY = Math.floor((H / PS - art.length) / 2);

    function draw() {
        ctx.clearRect(0,0,W,H);
        art.forEach((row, ry) => {
            for (let c = 0; c < row.length; c++) {
                const col = P[row[c]];
                if (col) {
                    ctx.fillStyle = col;
                    ctx.fillRect((offX + c) * PS, (offY + ry) * PS, PS, PS);
                }
            }
        });
    }
    draw();
})();

/**
 * 2. DYNAMIC NEURAL NETWORK GENERATOR
 */
(function() {
    const layers = [
        {x: 60,  nodes: [60, 110, 160, 210, 260, 310, 360, 410], color: '#c8a96e'}, 
        {x: 210, nodes: [35, 80, 125, 170, 215, 260, 305, 350, 395, 440, 485, 530], color: '#a3c4bc'}, 
        {x: 380, nodes: [50, 105, 160, 215, 270, 325, 380, 435, 490, 545], color: '#7eb8c9'}, 
        {x: 530, nodes: [90, 170, 250, 330, 410, 490, 570, 650], color: '#a3c4bc'}, 
        {x: 660, nodes: [130, 220, 310, 400], color: '#c8a96e'} 
    ];

    const svg = document.querySelector('.neural-network');
    if(!svg) return;
    const connGroup = svg.querySelector('.connections');
    const nodeGroup = svg.querySelector('.nodes-container');

    function initNetwork() {
        connGroup.innerHTML = '';
        nodeGroup.innerHTML = '';

        layers.forEach((layer, i) => {
            if (i < layers.length - 1) {
                const toLayer = layers[i + 1];
                layer.nodes.forEach((fy, fi) => {
                    toLayer.nodes.forEach((ty, ti) => {
                        if ((fi + ti) % 2 !== 0 && i < 2) return; 
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', layer.x); line.setAttribute('y1', fy);
                        line.setAttribute('x2', toLayer.x); line.setAttribute('y2', ty);
                        line.setAttribute('stroke', 'url(#nnGrad)'); line.setAttribute('stroke-width', '0.5');
                        line.setAttribute('opacity', '0.15');
                        
                        const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                        anim.setAttribute('attributeName', 'opacity');
                        anim.setAttribute('values', '0.1;0.4;0.1');
                        anim.setAttribute('dur', '3s');
                        anim.setAttribute('begin', `${(i * 0.5 + fi * 0.05 + ti * 0.02).toFixed(2)}s`);
                        anim.setAttribute('repeatCount', 'indefinite');
                        line.appendChild(anim);
                        connGroup.appendChild(line);
                    });
                });
            }

            layer.nodes.forEach((ny, nIdx) => {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', layer.x); circle.setAttribute('cy', ny);
                circle.setAttribute('r', (i === 0 || i === 4) ? '7' : '5');
                circle.setAttribute('fill', layer.color); circle.setAttribute('filter', 'url(#glow)');
                
                const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                pulse.setAttribute('attributeName', 'opacity'); pulse.setAttribute('values', '0.6;1;0.6');
                pulse.setAttribute('dur', '2s'); pulse.setAttribute('begin', `${(i * 0.2 + nIdx * 0.1).toFixed(2)}s`);
                pulse.setAttribute('repeatCount', 'indefinite');
                circle.appendChild(pulse);
                nodeGroup.appendChild(circle);
            });
        });
    }
    initNetwork();
})();

/**
 * 3. UI HELPERS (Scroll, Mobile Menu)
 */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
});

const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileBtn) mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
