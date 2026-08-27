const certs = [
  [
    "21673ae0 8367 4066 a1e3 85b128f880b6",
    "21673ae0-8367-4066-a1e3-85b128f880b6.pdf",
    ""
  ],
  [
    "782ff36f 6785 4a71 9028 b5cfa182f7e5",
    "782ff36f-6785-4a71-9028-b5cfa182f7e5.pdf",
    ""
  ],
  [
    "Adobe Scan Adobe Scan 17 Apr 2026",
    "Adobe Scan Adobe Scan 17 Apr 2026.pdf",
    ""
  ],
  [
    "IEEE — Brain Tumor Segmentation",
    "Brain Tumor IEEE.pdf",
    "brain-tumor-ieee.jpg"
  ],
  [
    "BCBUZZ — Cybersecurity FDP",
    "Bubucizz Certificate FDP.pdf",
    ""
  ],
  [
    "Certificate of Gokulraj G",
    "Certificate of Gokulraj G.pdf",
    "certificate-of-gokulraj-g.jpg"
  ],
  [
    "IBM — Introduction to Artificial Intelligence",
    "Coursera IBM.pdf",
    "coursera-ibm.jpg"
  ],
  [
    "OWASP — Malware Analysis & Reverse Engineering",
    "G_Gokulraj_OW_Participation_Certificate_SEP_2025 (1).pdf",
    "g-gokulraj-ow-participation-certificate-sep-2025-1.jpg"
  ],
  [
    "Gokul G",
    "Gokul G.pdf",
    ""
  ],
  [
    "MUJ HackX 3.0 — Mentorship",
    "Gokul-Mentor-Certificate jaipur .pdf-1.pdf",
    "gokul-mentor-certificate-jaipur-pdf-1.jpg"
  ],
  [
    "GokulrajBuddha",
    "GokulrajBuddha.pdf",
    ""
  ],
  [
    "International Conference — Hindustan Institute",
    "Hindustan Conference Certificate.pdf",
    ""
  ],
  [
    "Innovation Ambassador — Online Training",
    "IA Online Training Certificate.pdf",
    "ia-online-training-certificate.jpg"
  ],
  [
    "Innovation Ambassador — Participation",
    "IA Participation Certificate.pdf",
    ""
  ],
  [
    "IEEE Certificate ME (1)",
    "IEEE Certificate ME (1).pdf",
    ""
  ],
  [
    "IMG 20250821 WA0108",
    "IMG-20250821-WA0108.jpg",
    ""
  ],
  [
    "Internship Certificate",
    "ISL-Internship Certificate .pdf",
    ""
  ],
  [
    "Infosys Certificate (4)",
    "Infosys Certificate (4).pdf",
    ""
  ],
  [
    "Infosys Certificate",
    "Infosys Certificate .pdf",
    ""
  ],
  [
    "Infosys Certificate",
    "Infosys Certificate.pdf",
    ""
  ],
  [
    "KPI 2025 2026",
    "KPI _2025 - 2026.pdf",
    ""
  ],
  [
    "Learnmall — Java Fundamentals",
    "Learnmall Certificate.pdf",
    ""
  ],
  [
    "MATLAB EXPO 2025",
    "MATLAB-EXPO-2025-certificate.pdf",
    "matlab-expo-2025-certificate.jpg"
  ],
  [
    "Mr. Gokul Raj G",
    "Mr. Gokul Raj  G.pdf",
    ""
  ],
  [
    "Mr.G.Gokul Raj Certificate",
    "Mr.G.Gokul_Raj_Certificate.pdf",
    ""
  ],
  [
    "NIT Warangal — Faculty Development Programme",
    "NIT FDP .pdf",
    "nit-fdp.jpg"
  ],
  [
    "NIT Warangal — Faculty Development Programme",
    "NIT FDP.pdf",
    "nit-fdp.jpg"
  ],
  [
    "Spoken Tutorial — Invigilator Appreciation",
    "Share ST Edu Invigilator Certificate_Mr. G.Gokulraj_Sri Ramakrishna Institute of Technolog_T.N_24-25.pdf",
    "share-st-edu-invigilator-certificate-mr-g-gokulraj-sri-ramakrishna-institute-of-technolog-t-n-24-25.jpg"
  ],
  [
    "Skill Safari — Technical Training",
    "Skill safari.pdf",
    ""
  ],
  [
    "WhatsApp Image 2025 08 01 at 9.31.58 PM",
    "WhatsApp Image 2025-08-01 at 9.31.58 PM.jpeg",
    ""
  ],
  [
    "certificate",
    "certificate.pdf",
    "matlab-expo-2025-certificate.jpg"
  ],
  [
    "Microsoft — Machine Learning Concepts",
    "gokul microsoft  1.pdf",
    ""
  ],
  [
    "gokul microsoft",
    "gokul microsoft.pdf",
    ""
  ],
  [
    "FDP — AI Tools for Teaching",
    "kathir college certificates.pdf",
    "kathir-college-certificates.jpg"
  ],
  [
    "MATLAB Workshop Certificate",
    "matlab certificate.pdf",
    ""
  ],
  [
    "International Journal Reviewer Recognition",
    "reviewer-journal-certificate-2026-05-01-17-38-44.pdf",
    "reviewer-journal-certificate-2026-05-01-17-38-44.jpg"
  ],
  [
    "Reviewer Level Recognition — I",
    "reviewer-level-certificate-2026-04-20-09-23-51.pdf",
    ""
  ],
  [
    "Reviewer Level Recognition — II",
    "reviewer-level-certificate-2026-04-21-07-27-41.pdf",
    ""
  ],
  [
    "IEEE — YOLO Person Detection",
    "yolo person detection IEEE Certificate (1).pdf",
    "yolo-person-detection-ieee-certificate-1.jpg"
  ]
];

const grid = document.getElementById('certGrid');
certs.forEach((c,i)=>{
  const a=document.createElement('a');
  a.className='cert-card reveal'+(i>7?' hidden':'');
  a.href='assets/certificates/'+encodeURIComponent(c[1]);
  a.target='_blank'; a.rel='noopener';
  a.innerHTML=`${c[2]?`<img loading="lazy" src="assets/thumbs/${c[2]}" alt="${c[0]} certificate">`:`<div class="cert-placeholder"><span>GG</span><small>VERIFIED CREDENTIAL</small></div>`}<div><b>${c[0]}</b><small>View credential ↗</small></div>`;
  grid.appendChild(a);
});

document.getElementById('showAll').addEventListener('click',e=>{
  document.querySelectorAll('.cert-card.hidden').forEach(x=>x.classList.remove('hidden'));
  e.currentTarget.style.display='none'; observeReveals();
});
document.getElementById('year').textContent=new Date().getFullYear();

const nav=document.querySelector('.nav-shell');
const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

function updateScroll(){
  nav.classList.toggle('scrolled',scrollY>20);
  const h=document.documentElement.scrollHeight-innerHeight;
  document.getElementById('scrollProgress').style.width=(h?scrollY/h*100:0)+'%';
}
addEventListener('scroll',updateScroll,{passive:true}); updateScroll();

function observeReveals(){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}
  }),{threshold:.1,rootMargin:'0px 0px -35px'});
  document.querySelectorAll('.reveal:not(.visible)').forEach(e=>io.observe(e));
}
observeReveals();

const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,end=+el.dataset.count,suffix=el.dataset.suffix||'';
  const start=performance.now(),duration=1300;
  const tick=now=>{const p=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-p,3);el.textContent=Math.round(end*eased)+suffix;if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);counterObserver.unobserve(el);
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(e=>counterObserver.observe(e));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.links a[href^="#"]')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}
}),{rootMargin:'-35% 0px -55%'});sections.forEach(s=>sectionObserver.observe(s));

if(matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches){
  const glow=document.querySelector('.cursor-glow');
  addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`});
    btn.addEventListener('pointerleave',()=>btn.style.transform='');
  });
}

// Lightweight AI neural-network canvas, no external dependency.
const canvas=document.getElementById('neuralCanvas'),ctx=canvas.getContext('2d');
let nodes=[],mouse={x:-9999,y:-9999};
function resize(){const d=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*d;canvas.height=innerHeight*d;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);const count=Math.min(80,Math.max(35,Math.floor(innerWidth/22)));nodes=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+.5}))}
addEventListener('resize',resize);addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});resize();
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>innerWidth)n.vx*=-1;if(n.y<0||n.y>innerHeight)n.vy*=-1;const dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.hypot(dx,dy);if(d<150){n.x+=dx/d*.18;n.y+=dy/d*.18}}
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<125){ctx.strokeStyle=`rgba(82,245,208,${(1-d/125)*.10})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
  for(const n of nodes){ctx.fillStyle='rgba(98,190,255,.38)';ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fill()}
  requestAnimationFrame(draw)
}
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)draw();
