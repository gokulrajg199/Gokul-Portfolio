'use strict';
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const domainData={
 AI:{title:'Artificial Intelligence',text:'Machine learning, deep learning and intelligent decision systems for practical applications.',tags:['Machine Learning','Deep Learning','AI Systems']},
 'Computer Vision':{title:'Computer Vision',text:'Image understanding and YOLO-oriented detection workflows for monitoring, automation and intelligent systems.',tags:['YOLO','YOLOv8','Image Processing']},
 IoT:{title:'Internet of Things',text:'Connected sensing and intelligent monitoring for real-world systems, including smart agriculture and water-quality applications.',tags:['Sensors','ESP32','MQTT']},
 Robotics:{title:'Robotics & ROS',text:'Practical robotics learning and ROS/ROS2-oriented project development through student innovation.',tags:['ROS','ROS2','Robotics']},
 'Smart Agriculture':{title:'Smart Agriculture',text:'Applying IoT, analytics and predictive intelligence to hydroponics and sustainable farming.',tags:['Hydroponics','IoT','Predictive Analytics']},
 'Agentic AI':{title:'Agentic AI',text:'Exploring intelligent agents and AI-driven systems for problem solving, curation and human potential.',tags:['Agents','AI','Innovation']}
};
const projectData={
 hydro:{meta:'SMART AGRICULTURE · IoT + AI',title:'Hydroponic Nutrition Alert System',text:'A sensor-driven architecture for monitoring pH, EC, TDS, temperature and humidity, with alerting, automation and a proposed predictive-analysis layer.',list:['Arduino / ESP32','pH, EC and TDS sensing','Temperature and humidity','GSM, relay and motor pump','Federated-learning / predictive-analysis direction','Dashboard visualization']},
 vision:{meta:'COMPUTER VISION · YOLO',title:'AI-Based Detection Systems',text:'Computer-vision workflows using YOLO/YOLOv8 for real-world detection, monitoring and automation applications.',list:['Python','Ultralytics / YOLO','Object detection','Image processing','Model training and evaluation']},
 attendance:{meta:'AI AUTOMATION · FACULTY ATTENDANCE',title:'Faculty Attendance System',text:'A project direction using person detection and computer vision for attendance-oriented automation.',list:['Python','Computer Vision','YOLO','Detection pipeline','Automation']},
 aura:{meta:'AGENTIC AI · HACKATHON',title:'Project AURA — Agentic AI Curator',text:'An agentic AI concept for intelligent curation, reasoning and human-potential-oriented problem solving.',list:['Agentic AI','Reasoning workflow','Intelligent curation','Human-in-the-loop design','Innovation challenge']},
 ros:{meta:'ROBOTICS · ROS / ROS2',title:'ROS Robotics Projects',text:'A practical robotics track supporting ROS/ROS2 learning, project development and student innovation.',list:['ROS / ROS2','Robotics','Node-based architecture','Sensor integration','Student project mentoring']},
 timetable:{meta:'ACADEMIC SOFTWARE · SCHEDULING',title:'SRIT Timetable ERP',text:'Academic scheduling software direction covering faculty clash handling, room/lab optimization, continuous-period scheduling and Excel export.',list:['Python / Streamlit','Faculty Clash Engine','Room / Lab Optimizer','Continuous Period Scheduler','Excel Export']}
};
const certFiles=[
'21673ae0-8367-4066-a1e3-85b128f880b6.pdf','782ff36f-6785-4a71-9028-b5cfa182f7e5.pdf','Adobe Scan Adobe Scan 17 Apr 2026.pdf','Brain Tumor IEEE.pdf','Bubucizz Certificate FDP.pdf','Certificate of Gokulraj G.pdf','Coursera IBM.pdf','G_Gokulraj_OW_Participation_Certificate_SEP_2025 (1).pdf','Gokul G.pdf','Gokul-Mentor-Certificate jaipur .pdf-1.pdf','GokulrajBuddha.pdf','Hindustan Conference Certificate.pdf','IA Online Training Certificate.pdf','IA Participation Certificate.pdf','IEEE Certificate ME (1).pdf','ISL-Internship Certificate .pdf','Infosys Certificate (4).pdf','Infosys Certificate .pdf','Infosys Certificate.pdf','Learnmall Certificate.pdf','MATLAB-EXPO-2025-certificate.pdf','Mr. Gokul Raj  G.pdf','Mr.G.Gokul_Raj_Certificate.pdf','NIT FDP .pdf','NIT FDP.pdf','Share ST Edu Invigilator Certificate_Mr. G.Gokulraj_Sri Ramakrishna Institute of Technolog_T.N_24-25.pdf','Skill safari.pdf','certificate.pdf','gokul microsoft  1.pdf','gokul microsoft.pdf','matlab certificate.pdf','reviewer-journal-certificate-2026-05-01-17-38-44.pdf','reviewer-level-certificate-2026-04-20-09-23-51.pdf','reviewer-level-certificate-2026-04-21-07-27-41.pdf','yolo person detection IEEE Certificate (1).pdf','IMG-20250821-WA0108.jpg','WhatsApp Image 2025-08-01 at 9.31.58 PM.jpeg'
];
/* Titles below are normalized from the certificate content where machine-readable
   text is available; filenames are used only as a fallback for scanned assets. */
const certMeta={
'21673ae0-8367-4066-a1e3-85b128f880b6.pdf':{title:'AI for Beginners',issuer:'HP LIFE',cat:'technology',label:'Technology'},
'782ff36f-6785-4a71-9028-b5cfa182f7e5.pdf':{title:'Agile Project Management',issuer:'HP LIFE',cat:'technology',label:'Technology'},
'Adobe Scan Adobe Scan 17 Apr 2026.pdf':{title:'Academic / Professional Certificate',issuer:'Certificate Document',cat:'academic',label:'Academic'},
'Brain Tumor IEEE.pdf':{title:'Brain Tumor Segmentation Using Proposed YOLO Algorithm',issuer:'IEEE / ICEPE 2025',cat:'research',label:'Research'},
'Bubucizz Certificate FDP.pdf':{title:'Faculty Development Programme Certificate',issuer:'Bubucizz',cat:'academic',label:'Academic'},
'Certificate of Gokulraj G.pdf':{title:'National Entrepreneurship Challenge – Participation / Completion',issuer:'E-Cell IIT Bombay',cat:'mentoring',label:'Mentoring'},
'Coursera IBM.pdf':{title:'Introduction to Artificial Intelligence (AI)',issuer:'IBM via Coursera',cat:'technology',label:'Technology'},
'G_Gokulraj_OW_Participation_Certificate_SEP_2025 (1).pdf':{title:'OWASP Coimbatore Chapter Workshop',issuer:'OWASP Coimbatore Chapter',cat:'technology',label:'Technology'},
'Gokul G.pdf':{title:'Geospatial Intelligence: Applications & Challenges in the Big Data Era',issuer:'IIIT Sri City',cat:'research',label:'Research'},
'Gokul-Mentor-Certificate jaipur .pdf-1.pdf':{title:'Mentorship Certificate – MUJ HackX 3.0',issuer:'Manipal University Jaipur',cat:'mentoring',label:'Mentoring'},
'GokulrajBuddha.pdf':{title:'Meditation for Confidence & Manifestation',issuer:'Breath-Mindfulness Meditation Course',cat:'academic',label:'Academic'},
'Hindustan Conference Certificate.pdf':{title:'Performance Prediction of Modified Solar Still Using Artificial Neural Network',issuer:'Hindusthan Institute of Technology',cat:'research',label:'Research'},
'IA Online Training Certificate.pdf':{title:'Innovation & Entrepreneurship Foundation – Online Training',issuer:'IIC',cat:'academic',label:'Academic'},
'IA Participation Certificate.pdf':{title:'Innovation & Entrepreneurship Foundation – Participation',issuer:'IIC',cat:'academic',label:'Academic'},
'IEEE Certificate ME (1).pdf':{title:'Research Conference / IEEE Certificate',issuer:'IEEE',cat:'research',label:'Research'},
'ISL-Internship Certificate .pdf':{title:'45-Day Internship – Drone Technology',issuer:'Indian Space Lab',cat:'internship',label:'Internship'},
'Infosys Certificate (4).pdf':{title:'HTML5 and CSS3 Advanced Training',issuer:'Infosys',cat:'technology',label:'Technology'},
'Infosys Certificate .pdf':{title:'Internet of Things Foundation Certification',issuer:'Infosys',cat:'technology',label:'Technology'},
'Infosys Certificate.pdf':{title:'TechA Testing Fundamentals Certification',issuer:'Infosys',cat:'technology',label:'Technology'},
'Learnmall Certificate.pdf':{title:'Basics of Java – Introductory Course',issuer:'Learnmall',cat:'technology',label:'Technology'},
'MATLAB-EXPO-2025-certificate.pdf':{title:'MATLAB EXPO 2025',issuer:'MathWorks',cat:'technology',label:'Technology'},
'Mr. Gokul Raj  G.pdf':{title:'Capacity Building Programme on Cybersecurity – Basic Course',issuer:'IIT Madras / IITM Pravartak',cat:'technology',label:'Technology'},
'Mr.G.Gokul_Raj_Certificate.pdf':{title:'Professional Development Certificate',issuer:'Academic Training',cat:'academic',label:'Academic'},
'NIT FDP .pdf':{title:'Emerging Tools & Techniques for Environmental Risk Assessment',issuer:'NIT Warangal – E&ICT Academy',cat:'academic',label:'Academic'},
'NIT FDP.pdf':{title:'Emerging Tools & Techniques for Environmental Risk Assessment',issuer:'NIT Warangal – E&ICT Academy',cat:'academic',label:'Academic'},
'Share ST Edu Invigilator Certificate_Mr. G.Gokulraj_Sri Ramakrishna Institute of Technolog_T.N_24-25.pdf':{title:'IT Skills Course Test Invigilator – Certificate of Appreciation',issuer:'Spoken Tutorial / IIT Bombay',cat:'academic',label:'Academic'},
'Skill safari.pdf':{title:'Start Your Web Development Journey in 2022 Workshop',issuer:'Skill Safari',cat:'technology',label:'Technology'},
'certificate.pdf':{title:'Generative AI Literacy',issuer:'SkillQuest',cat:'technology',label:'Technology'},
'gokul microsoft  1.pdf':{title:'Microsoft AI / Machine Learning Learning Certificate',issuer:'Microsoft',cat:'technology',label:'Technology'},
'gokul microsoft.pdf':{title:'Microsoft AI / Machine Learning Learning Certificate',issuer:'Microsoft',cat:'technology',label:'Technology'},
'matlab certificate.pdf':{title:'MATLAB EXPO 2025 Workshop',issuer:'MathWorks',cat:'technology',label:'Technology'},
'reviewer-journal-certificate-2026-05-01-17-38-44.pdf':{title:'Journal Reviewer Recognition',issuer:'UK Scientific Publication / Journal Review',cat:'review',label:'Reviewer'},
'reviewer-level-certificate-2026-04-20-09-23-51.pdf':{title:'Reviewer Level Recognition',issuer:'Academic Peer Review',cat:'review',label:'Reviewer'},
'reviewer-level-certificate-2026-04-21-07-27-41.pdf':{title:'Reviewer Level Recognition',issuer:'Academic Peer Review',cat:'review',label:'Reviewer'},
'yolo person detection IEEE Certificate (1).pdf':{title:'Person Detection Using Proposed YOLOv8 in Crime Hotspot Cities',issuer:'IEEE / VIT Bhopal University',cat:'research',label:'Research'},
'IMG-20250821-WA0108.jpg':{title:'Academic / Innovation Certificate',issuer:'Certificate Image',cat:'achievement',label:'Achievement'},
'WhatsApp Image 2025-08-01 at 9.31.58 PM.jpeg':{title:'Academic / Professional Certificate',issuer:'Certificate Image',cat:'achievement',label:'Achievement'}
};
function slugTitle(f){return (certMeta[f]?.title||f.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').replace(/\s+/g,' ').replace(/\bpdf\b/gi,'').trim().replace(/\b\w/g,c=>c.toUpperCase()))}
function category(f){const m=certMeta[f]; if(m)return [m.cat,m.label]; const x=f.toLowerCase(); if(x.includes('isl'))return ['internship','Internship']; if(x.includes('mentor'))return ['mentoring','Mentoring']; if(x.includes('reviewer'))return ['review','Reviewer']; if(x.includes('ieee')||x.includes('yolo'))return ['research','Research']; return ['achievement','Achievement']}
function initBoot(){setTimeout(()=>$('#boot')?.classList.add('done'),700)}
function initNav(){const btn=$('#menuButton'),links=$('#navLinks'); if(!btn)return; btn.addEventListener('click',()=>{const open=links.classList.toggle('open');btn.setAttribute('aria-expanded',open)}); $$('#navLinks a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');btn.setAttribute('aria-expanded','false')}))}
function initScroll(){const bar=$('#scrollProgress'),nav=$('#navbar'); addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(scrollY/Math.max(h,1)*100)+'%';nav.classList.toggle('scrolled',scrollY>20)},{passive:true})}
function initReveal(){const els=$$('.reveal'); if(reduced){els.forEach(e=>e.classList.add('visible'));return} const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}
function initCursor(){if(reduced||innerWidth<800)return;const g=$('.cursor-glow');let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});(function loop(){x+=(tx-x)*.12;y+=(ty-y)*.12;g.style.left=x+'px';g.style.top=y+'px';requestAnimationFrame(loop)})();document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,.panel,.project-card,.research-card'))g.style.transform='translate(-50%,-50%) scale(1.25)';});document.addEventListener('pointerout',e=>{if(e.target.closest('a,button,.panel,.project-card,.research-card'))g.style.transform='translate(-50%,-50%) scale(1)';})}
function initTilt(){if(reduced||innerWidth<800)return;$$('.tilt').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1000px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg) translateY(-3px)`}));$$('.tilt').forEach(el=>el.addEventListener('pointerleave',()=>el.style.transform=''))}
function initGlowCards(){ $$('.panel,.research-card,.project-card,.impact-card,.venture-panel').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',`${e.clientX-r.left}px`);el.style.setProperty('--my',`${e.clientY-r.top}px`)})) }
function initClock(){const el=$('#clock');if(!el)return;const tick=()=>el.textContent=new Intl.DateTimeFormat('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());tick();setInterval(tick,1000)}
function initFocus(){const el=$('#focusText'),items=['COMPUTER VISION','SMART AGRICULTURE','ROBOTICS / ROS','AGENTIC AI','INTELLIGENT SYSTEMS'];let i=0;if(el)setInterval(()=>{i=(i+1)%items.length;el.animate?.([{opacity:.25},{opacity:1}],{duration:400});el.textContent=items[i]},2600)}
function initBackground(){const c=$('#neuralCanvas');if(!c||reduced)return;const ctx=c.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2);let w,h,pts=[];function resize(){w=innerWidth;h=innerHeight;c.width=w*dpr;c.height=h*dpr;c.style.width=w+'px';c.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);pts=Array.from({length:Math.min(90,Math.floor(w*h/18000))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.4+.4}))}function draw(){ctx.clearRect(0,0,w,h);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.fillStyle='rgba(104,229,255,.55)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);if(dist<125){ctx.strokeStyle=`rgba(104,229,255,${(1-dist/125)*.09})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(draw)}resize();addEventListener('resize',resize);draw()}
function initResearchGraph(){const c=$('#researchCanvas'),wrap=c?.parentElement;if(!c||!wrap)return;const ctx=c.getContext('2d');function resize(){c.width=wrap.clientWidth*devicePixelRatio;c.height=wrap.clientHeight*devicePixelRatio;c.style.width=wrap.clientWidth+'px';c.style.height=wrap.clientHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}resize();addEventListener('resize',resize);let t=0;function draw(){const w=wrap.clientWidth,h=wrap.clientHeight;ctx.clearRect(0,0,w,h);const cx=w/2,cy=h/2;const nodes=[...$$('.graph-node')].map(n=>{const r=n.getBoundingClientRect(),p=wrap.getBoundingClientRect();return{x:r.left-p.left+r.width/2,y:r.top-p.top+r.height/2}});nodes.forEach((p,i)=>{const pulse=Math.sin(t*.0015+i)*.5+.5;ctx.strokeStyle=`rgba(104,229,255,${.08+pulse*.05})`;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(p.x,p.y);ctx.stroke()});t+=16;if(!reduced)requestAnimationFrame(draw)}draw()}
function initResearch(){ $$('.graph-node').forEach(btn=>btn.addEventListener('click',()=>{const d=domainData[btn.dataset.domain];if(!d)return;$$('.graph-node').forEach(n=>n.classList.remove('selected'));btn.classList.add('selected');$('#domainTitle').textContent=d.title;$('#domainText').textContent=d.text;$('#domainTags').innerHTML=d.tags.map(t=>`<span>${t}</span>`).join('')}))}
function initProjects(){ $$('.project-open').forEach(btn=>btn.addEventListener('click',()=>openProject(btn.dataset.project))) }
function openProject(id){const d=projectData[id];if(!d)return;$('#modalContent').innerHTML=`<span class="label">${d.meta}</span><h2>${d.title}</h2><p>${d.text}</p><ul class="modal-list">${d.list.map(x=>`<li>${x}</li>`).join('')}</ul>`;openModal()}
function openModal(){const m=$('#modal');m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('.modal-close')?.focus()}
function closeModal(){const m=$('#modal');m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function initModal(){$$('#modal [data-close],.modal-close').forEach(x=>x.addEventListener('click',closeModal));addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()})}
function initCertificates(){
 const grid=$('#certGrid'),search=$('#certSearch'),more=$('#certMore');
 if(!grid)return;
 let filter='all',showAll=false;
 function render(){
   const q=(search?.value||'').toLowerCase().trim();
   grid.innerHTML='';
   let matches=[];
   certFiles.forEach(file=>{
     const [cat,label]=category(file),meta=certMeta[file]||{},title=slugTitle(file),issuer=meta.issuer||'Certificate document';
     const hay=`${title} ${issuer} ${label} ${file}`.toLowerCase();
     if(filter!=='all'&&cat!==filter)return;
     if(q&&!hay.includes(q))return;
     matches.push({file,cat,label,title,issuer});
   });
   const visible=showAll?matches:matches.slice(0,8);
   visible.forEach(({file,cat,label,title,issuer})=>{
     const href=`assets/certificates/${encodeURIComponent(file)}`;
     const card=document.createElement('article');
     card.className='cert-card reveal visible';
     card.innerHTML=`
       <div class="cert-ai"><span>✦</span> AI ANALYZED</div>
       <small>${label.toUpperCase()}</small>
       <h3>${title}</h3>
       <p class="cert-issuer">${issuer}</p>
       <p class="cert-type">${file.toLowerCase().endsWith('.pdf')?'PDF credential / document':'Image credential'}</p>
       <div class="cert-actions">
         <a class="cert-view" href="${href}" target="_blank" rel="noopener">View Certificate ↗</a>
         <a href="${href}" download>Save ↓</a>
       </div>`;
     grid.appendChild(card);
   });
   $('#certEmpty').hidden=matches.length>0;
   if(more){
     more.hidden=matches.length<=8;
     more.textContent=showAll?`Show Less ↑`:`View More (${matches.length-8}) ↓`;
   }
 }
 $$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;showAll=false;render()}));
 search?.addEventListener('input',()=>{showAll=false;render()});
 more?.addEventListener('click',()=>{showAll=!showAll;render(); if(!showAll)document.querySelector('#credentials')?.scrollIntoView({behavior:'smooth',block:'start'})});
 render();
}
function initActiveNav(){const sections=$$('main section[id]'),links=$$('#navLinks a[href^="#"]');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55%'});sections.forEach(s=>io.observe(s))}
function init(){initBoot();initNav();initScroll();initReveal();initCursor();initTilt();initGlowCards();initClock();initFocus();initBackground();initResearchGraph();initResearch();initProjects();initModal();initCertificates();initActiveNav();$('#year').textContent=new Date().getFullYear()}
addEventListener('DOMContentLoaded',init);
