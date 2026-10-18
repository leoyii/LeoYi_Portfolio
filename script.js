'use strict';

const projects = [
  {
    "id": "claw",
    "number": "01",
    "title": "Deep Sea Recovery Claw",
    "category": "engineering",
    "categoryLabel": "Engineering design",
    "subtitle": "Sensors · Rapid prototyping",
    "image": "recovery-claw",
    "portrait": true,
    "alt": "An assembled recovery claw prototype with Arduino wiring and ultrasonic sensors",
    "tags": [
      "Arduino / C++",
      "Sensors",
      "Prototyping"
    ],
    "date": "JAN – MAR 2026",
    "summary": "An Arduino-controlled recovery claw with ultrasonic object detection.",
    "details": [
      "Programmed an Arduino microcontroller with ultrasonic sensors for real-time object detection.",
      "Conducted a formal risk assessment across subsystems, prioritizing failure modes by severity and likelihood.",
      "Rapidly prototyped the sensor and mechanical integration to deliver a functional device on a tight timeline."
    ]
  },
  {
    "id": "shutter",
    "number": "02",
    "title": "The Shutter",
    "category": "games",
    "categoryLabel": "Game development",
    "subtitle": "First-person horror · Unity",
    "image": "the-shutter",
    "alt": "The Shutter gameplay showing a camera view and an interactive in-game computer",
    "tags": [
      "Unity3D",
      "C#",
      "AI behaviour"
    ],
    "date": "",
    "summary": "A first-person horror game with sound-driven enemy AI, dynamic lighting, and an interactive computer interface.",
    "details": [
      "Developed an event-driven enemy system, using sound signals to drive behaviour and state transitions.",
      "Built modular dynamic lighting while balancing atmosphere with performance.",
      "Designed an interactive in-game computer interface connected to game-state logic.",
      "Integrated a rigged 3D character with animation state machines driven by AI behaviour."
    ]
  },
  {
    "id": "sumo",
    "number": "03",
    "title": "SumoBot",
    "category": "engineering",
    "categoryLabel": "Robotics",
    "subtitle": "Autonomous tracking · Arduino",
    "image": "sumobot",
    "portrait": true,
    "alt": "Hand-built wooden SumoBot chassis with ultrasonic sensors and a front ramp",
    "gallery": [
      "sumobot-wiring",
      "sumobot-cad"
    ],
    "galleryAlts": [
      "Top-down view of the soldered SumoBot wiring and control system",
      "Blender CAD model of the SumoBot chassis and front ramp"
    ],
    "tags": [
      "Blender",
      "Arduino / C++",
      "Soldering"
    ],
    "date": "FEB – APR 2025",
    "summary": "An autonomous robot with a custom chassis and sensor-based opponent tracking.",
    "details": [
      "Designed the robot chassis in Blender, with a front ramp intended to neutralize opponents’ traction.",
      "Fabricated the physical chassis with hand tools and soldered the electrical connections.",
      "Co-developed a sensor-based opponent detection system in Arduino/C++ for autonomous tracking."
    ]
  },
  {
    "id": "vex",
    "number": "04",
    "title": "VEX Robotics",
    "category": "engineering",
    "categoryLabel": "Competition robotics",
    "subtitle": "Mechanical design · Robot control",
    "image": "vex-side",
    "alt": "VEX robot with a metal drivetrain, lift assembly, and green wheels",
    "gallery": [
      "vex-front"
    ],
    "galleryAlts": [
      "Front view of the VEX robot lift and drivetrain"
    ],
    "tags": [
      "Mechanical design",
      "VEX",
      "Controls"
    ],
    "date": "APR – JUN 2025",
    "summary": "A competition robot with a custom drivetrain and lift.",
    "details": [
      "Designed and built the drivetrain and lift subsystems for mobility and scoring.",
      "Programmed and piloted the robot in competition matches.",
      "Worked with teammates to test, troubleshoot, and iterate under competition constraints."
    ]
  },
  {
    "id": "chrono",
    "number": "05",
    "title": "Chrono Crusader",
    "category": "games",
    "categoryLabel": "Game development",
    "subtitle": "Time manipulation · Unity",
    "image": "chrono-crusader",
    "alt": "Chrono Crusader screenshots showing a time portal and a platforming level",
    "tags": [
      "Unity2D",
      "C#",
      "2D physics"
    ],
    "date": "",
    "summary": "A 2D platformer with physics-based movement, time manipulation, and persistent achievements.",
    "details": [
      "Built a skill-based movement system where players move using delayed explosive forces.",
      "Designed a time-travel mechanic that lets players alter their environment.",
      "Implemented a persistent achievement system that tracks progress across multiple playthroughs."
    ]
  },
  {
    "id": "design",
    "number": "06",
    "title": "Design for Everyday Life",
    "category": "engineering",
    "categoryLabel": "Human-centred design",
    "subtitle": "Accessibility · Design thinking",
    "image": "cardboard-chair",
    "alt": "Cardboard chair prototype annotated with ergonomic design features",
    "gallery": [
      "pen-planter"
    ],
    "galleryAlts": [
      "Pen Planter assistive gardening concept poster with a conceptual product rendering"
    ],
    "tags": [
      "SOLIDWORKS",
      "Prototyping",
      "Accessibility"
    ],
    "date": "",
    "summary": "Two engineering design projects: a cardboard chair prototype and an assistive gardening concept.",
    "details": [
      "Cardboard Chair: translated target design specifications and stakeholder analysis into a physical prototype.",
      "Assistive Gardening: developed a Pen Planter concept using SOLIDWORKS and communicated it through an elevator pitch and Canva presentation."
    ],
    "note": "The Pen Planter poster includes an AI-generated concept rendering."
  }
];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const asset = name => `assets/${name}.webp`;
let selectedProject = projects[0].id;

const reducedPageMotion = matchMedia('(prefers-reduced-motion: reduce)');
const tabPapers = new Map();
let paperId = 0;
const currentTab = tab => tab.disabled || tab.getAttribute('aria-disabled') === 'true';

// Clip a rectangular page along its moving diagonal crease.
function clipPaper(points, crease, keepTop) {
  const result = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    const da = a.x + a.y - crease, db = b.x + b.y - crease;
    const aInside = keepTop ? da <= 0 : da >= 0;
    const bInside = keepTop ? db <= 0 : db >= 0;
    if (aInside) result.push(a);
    if (aInside !== bInside) {
      const t = da / (da - db);
      result.push({x:a.x + t * (b.x - a.x), y:a.y + t * (b.y - a.y)});
    }
  }
  return result;
}
function drawPaper(state, crease) {
  const {width:w,height:h} = state.paper.getBoundingClientRect();
  const rectangle = [{x:0,y:0},{x:w,y:0},{x:w,y:h},{x:0,y:h}];
  const front = clipPaper(rectangle,crease,true);
  const back = clipPaper(rectangle,crease,false).map(p => ({x:crease-p.y,y:crease-p.x}));
  state.face.style.clipPath = front.length >= 3 ? `polygon(${front.map(p => `${p.x}px ${p.y}px`).join(',')})` : 'polygon(0 0,0 0,0 0)';
  state.fold.setAttribute('points',back.map(p => `${p.x},${p.y}`).join(' '));
  state.svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
  state.gradient.setAttribute('x1',crease-h);
  state.gradient.setAttribute('y1',crease-w);
  state.gradient.setAttribute('x2',(crease+w-h)/2);
  state.gradient.setAttribute('y2',(crease-w+h)/2);
}
function hidePaper(state) {
  cancelAnimationFrame(state.frame);
  state.running = false;
  state.paper.hidden = true;
  state.tab.classList.remove('is-curled','is-peeling');
}
function syncTabPaper(tab) {
  const state = tabPapers.get(tab);
  if (!state || state.running) return;
  if (currentTab(tab) || !(state.hover || tab.matches(':focus-visible'))) {
    hidePaper(state);
    return;
  }
  state.paper.hidden = false;
  tab.classList.add('is-curled');
  const {width,height} = state.paper.getBoundingClientRect();
  drawPaper(state,width+height-(innerWidth<=560 ? 20 : 24));
}
function addPageCorner(tab) {
  const label = document.createElement('span');
  label.className = 'tab-label';
  if (tab.matches('.index-rail nav a')) tab.querySelector('span')?.classList.add('nav-number');
  label.append(...tab.childNodes);
  const paper = document.createElement('span');
  const id = `paper-shade-${++paperId}`;
  paper.className = 'tab-paper';
  paper.hidden = true;
  paper.setAttribute('aria-hidden','true');
  paper.innerHTML = `<span class="tab-old-face"></span><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse"><stop stop-color="#d4bb90"/><stop offset=".55" stop-color="#bd9e6c"/><stop offset=".84" stop-color="#ecdbb5"/><stop offset=".96" stop-color="#9d8058"/><stop offset="1" stop-color="#594431"/></linearGradient></defs><polygon fill="url(#${id})"/></svg>`;
  tab.append(label,paper);
  const state = {tab,paper,face:paper.querySelector('.tab-old-face'),svg:paper.querySelector('svg'),fold:paper.querySelector('polygon'),gradient:paper.querySelector('linearGradient'),hover:false,running:false,frame:0};
  tabPapers.set(tab,state);
  tab.addEventListener('pointerenter',event => {if(event.pointerType==='mouse'){state.hover=true;syncTabPaper(tab);}});
  tab.addEventListener('pointerleave',() => {state.hover=false;syncTabPaper(tab);});
  tab.addEventListener('focus',() => syncTabPaper(tab));
  tab.addEventListener('blur',() => syncTabPaper(tab));
}
function peelTab(tab) {
  if (currentTab(tab)) return;
  const state = tabPapers.get(tab);
  for (const other of tabPapers.values()) if (other.running) hidePaper(other);
  if (reducedPageMotion.matches) {hidePaper(state);return;}
  state.running = true;
  state.paper.hidden = false;
  tab.classList.add('is-curled','is-peeling');
  const {width,height} = state.paper.getBoundingClientRect();
  const startCrease = width+height-(innerWidth<=560 ? 20 : 24);
  const start = performance.now();
  function frame(now) {
    const t = Math.min(1,(now-start)/640);
    const eased = t*t*(3-2*t);
    drawPaper(state,startCrease*(1-eased));
    if (t<1) state.frame=requestAnimationFrame(frame);
    else {hidePaper(state);syncTabPaper(tab);}
  }
  drawPaper(state,startCrease);
  state.frame=requestAnimationFrame(frame);
}
reducedPageMotion.addEventListener('change',() => {
  for (const state of tabPapers.values()) {hidePaper(state);syncTabPaper(state.tab);}
});
addEventListener('resize',() => {
  for (const state of tabPapers.values()) {hidePaper(state);syncTabPaper(state.tab);}
});
addEventListener('pagehide',() => {for (const state of tabPapers.values()) hidePaper(state);});


const mediaSizes = {'recovery-claw':[424,573],'the-shutter':[1049,292],'sumobot':[1051,1400],'sumobot-wiring':[1051,1400],'sumobot-cad':[686,381],'vex-side':[1400,1050],'vex-front':[1050,1400],'chrono-crusader':[942,354],'cardboard-chair':[1358,1011],'pen-planter':[1183,665]};
const splitAlts = {shutter:['The Shutter camera gameplay','The Shutter in-game computer puzzle'],chrono:['Chrono Crusader time portal','Chrono Crusader platforming level']};
function projectMedia(p) {
 if (p.id === 'vex') return `<figure class="vex-photo vex-photo-side"><img src="${asset(p.image)}" alt="${p.alt}" width="1400" height="1050"></figure>`;

 if (p.id === 'sumo') return `<div class="sumobot-photos"><figure><img src="${asset(p.image)}" alt="${p.alt}" width="1051" height="1400"></figure><figure><img class="sumobot-wiring-photo" src="${asset('sumobot-wiring')}" alt="${p.galleryAlts[0]}" width="1051" height="1400"></figure></div>`;

 const [width,height] = mediaSizes[p.image];
 if (splitAlts[p.id]) return `<div class="project-screenshots">${splitAlts[p.id].map((alt,i) => `<div class="project-shot ${i ? 'project-shot-right' : ''}" style="--shot-ratio:${width/2}/${height}"><img src="${asset(p.image)}" alt="${alt}" width="${width}" height="${height}"></div>`).join('')}</div>`;
 return `<figure class="project-image-frame ${p.portrait ? 'project-image-frame-portrait' : ''}"><img class="project-image" src="${asset(p.image)}" alt="${p.alt}" width="${width}" height="${height}"></figure>`;
}
function projectGallery(p) {
 if (p.id === 'vex') return `<figure class="vex-photo vex-photo-front"><img src="${asset('vex-front')}" alt="${p.galleryAlts[0]}" width="1050" height="1400" loading="lazy"></figure>`;

 if (p.id === 'sumo') return `<figure class="sumobot-model"><img src="${asset('sumobot-cad')}" alt="${p.galleryAlts[1]}" width="686" height="381" loading="lazy"></figure>`;

 if (!p.gallery) return '';
 return `<div class="project-gallery ${p.gallery.length===1 ? 'project-gallery-single' : ''}">${p.gallery.map((image,i) => {const [width,height] = mediaSizes[image];return `<figure><img src="${asset(image)}" alt="${p.galleryAlts[i]}" width="${width}" height="${height}" loading="lazy"></figure>`;}).join('')}</div>`;
}
function renderProject() {
  const p = projects.find(project => project.id === selectedProject);
  $('#project-detail').innerHTML = `<header class="project-detail-header"><div><h3>${p.title}</h3><p class="project-category">${p.categoryLabel}</p></div>${p.date ? `<span class="project-date">${p.date}</span>` : ''}</header>${projectMedia(p)}<p class="project-description">${p.summary}</p><ul>${p.details.map(detail => `<li>${detail}</li>`).join('')}</ul>${projectGallery(p)}${p.note ? `<p class="project-note">${p.note}</p>` : ''}<div class="project-tech">${p.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
  $$('.project-item').forEach(button => {
    const active = button.dataset.project === selectedProject;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
    button.disabled = active;
    syncTabPaper(button);
  });
}
$('#project-list').innerHTML = projects.map(p => `<button type="button" class="project-item" data-project="${p.id}" aria-pressed="false"><span class="project-number">${p.number}</span><span><span class="project-name">${p.title}</span><span class="project-type">${p.categoryLabel}</span></span></button>`).join('');
$$('.project-item').forEach(addPageCorner);
$('#project-list').addEventListener('click',event => {
  const button = event.target.closest('[data-project]');
  if (!button || currentTab(button)) return;
  peelTab(button);
  selectedProject = button.dataset.project;
  renderProject();
});
renderProject();

const certificates = {
  ibm: {title:'1st Place — IBM Quantum Coding Challenge',image:'award-ibm'},
  overall: {title:'2nd Place — Overall Coding Challenge',image:'award-overall'},
  ionq: {title:'3rd Place — IonQ Coding Challenge',image:'award-ionq'}
};
const dialog = $('#certificate-dialog');
let certificateOpener;
$$('[data-award]').forEach(button => button.addEventListener('click',() => {
  const certificate = certificates[button.dataset.award];
  certificateOpener = button;
  $('#certificate-title').textContent = certificate.title;
  $('#certificate-image').src = asset(certificate.image);
  $('#certificate-image').alt = `${certificate.title}, presented to Leo Yi of Team aoeuhtns at Q-SITE Hacks 2026`;
  dialog.showModal();
  $('.dialog-close').focus();
}));
$('.dialog-close').addEventListener('click',() => dialog.close());
dialog.addEventListener('click',event => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
});
dialog.addEventListener('close',() => certificateOpener?.focus());

// Key positions follow Owlab's published Spring layout (Qwertykeys spring.json).
const springGeometry = [{"matrix":"0,0","x":0.0,"y":-0.1,"w":1.0,"h":1.0,"r":0.0},{"matrix":"0,1","x":1.25,"y":0.0,"w":1.0,"h":1.0,"r":0.0},{"matrix":"0,2","x":2.25,"y":0.0,"w":1.0,"h":1.0,"r":0.0},{"matrix":"0,3","x":3.25,"y":-0.1,"w":1.0,"h":1.0,"r":0.0},{"matrix":"0,4","x":4.35,"y":-0.9,"w":1.0,"h":1.0,"r":12},{"matrix":"0,5","x":5.35,"y":-0.9,"w":1.0,"h":1.0,"r":12},{"matrix":"0,6","x":6.35,"y":-0.9,"w":1.0,"h":1.0,"r":12},{"matrix":"0,7","x":7.35,"y":-0.9,"w":1.0,"h":1.0,"r":12},{"matrix":"0,8","x":8.4,"y":2.4,"w":1.0,"h":1.0,"r":-12},{"matrix":"0,9","x":9.4,"y":2.4,"w":1.0,"h":1.0,"r":-12},{"matrix":"0,10","x":10.4,"y":2.4,"w":1.0,"h":1.0,"r":-12},{"matrix":"0,11","x":11.4,"y":2.4,"w":1.0,"h":1.0,"r":-12},{"matrix":"0,12","x":12.85,"y":-0.2,"w":1.0,"h":1.0,"r":0},{"matrix":"0,13","x":13.85,"y":-0.1,"w":1.0,"h":1.0,"r":0},{"matrix":"0,14","x":14.85,"y":-0.1,"w":2,"h":1.0,"r":0},{"matrix":"1,0","x":-0.25,"y":0.9,"w":1.0,"h":1.0,"r":0},{"matrix":"1,1","x":1.0,"y":1.0,"w":1.5,"h":1.0,"r":0},{"matrix":"1,2","x":2.5,"y":1.0,"w":1.0,"h":1.0,"r":0},{"matrix":"1,3","x":3.8,"y":0.1,"w":1.0,"h":1.0,"r":12},{"matrix":"1,4","x":4.8,"y":0.1,"w":1.0,"h":1.0,"r":12},{"matrix":"1,5","x":5.8,"y":0.1,"w":1.0,"h":1.0,"r":12},{"matrix":"1,6","x":6.8,"y":0.1,"w":1.0,"h":1.0,"r":12},{"matrix":"1,7","x":7.95,"y":3.4,"w":1.0,"h":1.0,"r":-12},{"matrix":"1,8","x":8.95,"y":3.4,"w":1.0,"h":1.0,"r":-12},{"matrix":"1,9","x":9.95,"y":3.4,"w":1.0,"h":1.0,"r":-12},{"matrix":"1,10","x":10.95,"y":3.4,"w":1.0,"h":1.0,"r":-12},{"matrix":"1,11","x":12.6,"y":0.85,"w":1.0,"h":1.0,"r":0},{"matrix":"1,12","x":13.6,"y":0.85,"w":1.0,"h":1.0,"r":0},{"matrix":"1,13","x":14.6,"y":0.85,"w":1.0,"h":1.0,"r":0},{"matrix":"1,14","x":15.6,"y":0.85,"w":1.5,"h":1.0,"r":0},{"matrix":"2,0","x":-0.5,"y":1.85,"w":1.0,"h":1.0,"r":0},{"matrix":"2,1","x":0.8,"y":1.95,"w":1.75,"h":1.0,"r":0},{"matrix":"2,2","x":2.55,"y":1.95,"w":1.0,"h":1.0,"r":0},{"matrix":"2,3","x":4.1,"y":1.05,"w":1.0,"h":1.0,"r":12},{"matrix":"2,4","x":5.1,"y":1.05,"w":1.0,"h":1.0,"r":12},{"matrix":"2,5","x":6.1,"y":1.05,"w":1.0,"h":1.0,"r":12},{"matrix":"2,6","x":7.1,"y":1.05,"w":1.0,"h":1.0,"r":12},{"matrix":"2,7","x":8.2,"y":4.35,"w":1.0,"h":1.0,"r":-12},{"matrix":"2,8","x":9.2,"y":4.35,"w":1.0,"h":1.0,"r":-12},{"matrix":"2,9","x":10.2,"y":4.35,"w":1.0,"h":1.0,"r":-12},{"matrix":"2,10","x":11.2,"y":4.35,"w":1.0,"h":1.0,"r":-12},{"matrix":"2,11","x":13.1,"y":1.85,"w":1.0,"h":1.0,"r":0},{"matrix":"2,12","x":14.1,"y":1.85,"w":1.0,"h":1.0,"r":0},{"matrix":"2,13","x":15.1,"y":1.85,"w":2.25,"h":1.0,"r":0},{"matrix":"3,0","x":0.6,"y":2.95,"w":2.25,"h":1.0,"r":0},{"matrix":"3,1","x":2.85,"y":2.95,"w":1.0,"h":1.0,"r":0},{"matrix":"3,2","x":4.65,"y":2.05,"w":1.0,"h":1.0,"r":12},{"matrix":"3,3","x":5.65,"y":2.05,"w":1.0,"h":1.0,"r":12},{"matrix":"3,4","x":6.65,"y":2.05,"w":1.0,"h":1.0,"r":12},{"matrix":"3,5","x":7.65,"y":2.05,"w":1.0,"h":1.0,"r":12},{"matrix":"3,6","x":7.7,"y":5.35,"w":1.0,"h":1.0,"r":-12},{"matrix":"3,7","x":8.7,"y":5.35,"w":1.0,"h":1.0,"r":-12},{"matrix":"3,8","x":9.7,"y":5.35,"w":1.0,"h":1.0,"r":-12},{"matrix":"3,9","x":10.7,"y":5.35,"w":1.0,"h":1.0,"r":-12},{"matrix":"3,10","x":12.8,"y":2.85,"w":1.0,"h":1.0,"r":0},{"matrix":"3,11","x":13.8,"y":2.85,"w":1.0,"h":1.0,"r":0},{"matrix":"3,12","x":14.8,"y":2.85,"w":1.0,"h":1.0,"r":0},{"matrix":"3,13","x":15.8,"y":2.85,"w":1.75,"h":1.0,"r":0},{"matrix":"4,0","x":0.6,"y":3.95,"w":1.25,"h":1.0,"r":0},{"matrix":"4,1","x":1.85,"y":3.95,"w":1.25,"h":1.0,"r":0},{"matrix":"4,2","x":5.2,"y":3.05,"w":1.25,"h":1.0,"r":12},{"matrix":"4,4","x":6.45,"y":3.05,"w":2.25,"h":1.0,"r":12},{"matrix":"4,5","x":7.7,"y":6.35,"w":2.75,"h":1.0,"r":-12},{"matrix":"4,9","x":10.45,"y":6.35,"w":1.25,"h":1.0,"r":-12},{"matrix":"4,11","x":13.8,"y":3.85,"w":1.0,"h":1.0,"r":0},{"matrix":"4,12","x":14.8,"y":3.85,"w":1.0,"h":1.0,"r":0},{"matrix":"4,13","x":15.8,"y":3.85,"w":1.0,"h":1.0,"r":0}];
const springLabels = [
 ['Esc','`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
 ['PgUp','Tab','Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
 ['PgDn','Caps','A','S','D','F','G','H','J','K','L',';',"'",'Enter'],
 ['Shift','Z','X','C','V','B','B','N','M',',','.','/','↑','Shift'],
 ['Ctrl','Win','Alt',null,'Space','Space',null,null,null,'Alt',null,'←','↓','→']
];
const specialCodes = {Esc:'Escape',Backspace:'Backspace',Tab:'Tab',Caps:'CapsLock',Enter:'Enter',Shift:'ShiftLeft',Ctrl:'ControlLeft',Win:'MetaLeft',Alt:'AltLeft',Space:'Space',PgUp:'PageUp',PgDn:'PageDown','↑':'ArrowUp','←':'ArrowLeft','↓':'ArrowDown','→':'ArrowRight','`':'Backquote','-':'Minus','=':'Equal','[':'BracketLeft',']':'BracketRight','\\':'Backslash',';':'Semicolon',"'":'Quote',',':'Comma','.':'Period','/':'Slash'};
const escapeLabel = text => text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function springKey(k) {
 const [row,col] = k.matrix.split(',').map(Number), label = springLabels[row][col] || '';
 const code = specialCodes[label] || (/^[0-9]$/.test(label) ? 'Digit'+label : /^[A-Z]$/.test(label) ? 'Key'+label : '');
 const u = 36, gap = 3.2, width = k.w*u-gap, height = 32.8;
 const paw = k.matrix === '0,1';
 const face = paw ? '#dbc4c7' : 'url(#spring-keycap)';
 const mark = paw ? `<g transform="translate(${width/2-11} 5)"><ellipse cx="11" cy="17" rx="6.6" ry="4.7" fill="#c88394"/><ellipse cx="3" cy="9" rx="3" ry="3.7" transform="rotate(-25 3 9)" fill="#c88394"/><ellipse cx="10.4" cy="5" rx="3" ry="3.8" fill="#c88394"/><ellipse cx="18.2" cy="8" rx="3" ry="3.8" transform="rotate(25 18.2 8)" fill="#c88394"/></g>` : `<text class="key-label" x="${width/2}" y="20" text-anchor="middle" fill="#f1f1ee" font-family="Arial,sans-serif" font-size="${label.length>4?6:label.length>1?7:9}">${label === 'Space' ? '' : escapeLabel(label)}</text>`;
 return `<g data-code="${code}" transform="rotate(${k.r}) translate(${k.x*u} ${k.y*u})"><rect x="0" y="3" width="${width}" height="${height}" rx="3.2" fill="#080a0c"/><rect class="key-face" width="${width}" height="${height-2}" rx="3" fill="${face}" stroke="#4a4d50" stroke-width=".65"/><path d="M4 5h${width-8}" stroke="#ffffff16" stroke-width=".6"/>${mark}</g>`;
}
const springOutline = 'M35 13H158C172 13 179 16 191 19L313 46Q330 50 347 46L466 17Q480 13 498 13H651C665 13 672 21 674 35L688 166Q692 183 677 195L652 216Q644 223 629 223H510Q497 223 482 230L399 265Q383 272 366 266L261 233Q245 228 229 228H66Q47 228 40 211L13 128Q9 116 13 103L23 77Q25 71 25 63V29Q25 13 35 13Z';
const springCable = "M332 51V25C332 7 303 7 303 -9C303 -26 321 -29 321 -13C321 4 309 4 309 -13C309 -30 334 -30 334 -13C334 4 322 4 322 -13C322 -30 347 -30 347 -13C347 4 335 4 335 -13C335 -30 360 -30 360 -13C360 4 348 4 348 -13C348 -30 373 -30 373 -13C373 4 361 4 361 -13C361 -30 386 -30 386 -13C386 4 374 4 374 -13C374 -30 399 -30 399 -13C399 4 387 4 387 -13C387 -30 412 -30 412 -13C412 4 400 4 400 -13C400 -29 421 -28 429 -28C464 -28 482 -41 503 -56";
$('#keyboard-illustration').innerHTML = `<svg viewBox="0 -68 708 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="spring-silver" x1="0" y1="0" x2=".5" y2="1"><stop stop-color="#eef0f2"/><stop offset=".32" stop-color="#c7ccd1"/><stop offset=".65" stop-color="#a4abb2"/><stop offset="1" stop-color="#dde1e5"/></linearGradient><linearGradient id="spring-keycap" x2=".2" y2="1"><stop stop-color="#292c30"/><stop offset="1" stop-color="#111418"/></linearGradient></defs><g class="spring-cable" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${springCable}" transform="translate(0 2)" stroke="#0007" stroke-width="8"/><path d="${springCable}" stroke="#d5d9dc" stroke-width="6"/><path d="${springCable}" stroke="#202429" stroke-width="4.4" stroke-dasharray="1.4 3"/><path d="${springCable}" stroke="#f6f7f8" stroke-width="1.3" stroke-dasharray="1 3.4"/></g><rect x="327" y="41" width="10" height="13" rx="2" fill="#30353b" stroke="#b9c0c6" stroke-width="1"/><path d="${springOutline}" transform="translate(0 7)" fill="#6b737c" stroke="#454d56" stroke-width="1.4" stroke-linejoin="round"/><path d="${springOutline}" fill="url(#spring-silver)" stroke="#f5f6f7" stroke-width="1.1" stroke-linejoin="round"/><path d="${springOutline}" fill="none" stroke="#ffffff45" stroke-width="2.4" stroke-linejoin="round"/><g transform="translate(33 31)">${springGeometry.map(springKey).join('')}</g></svg>`;
const keyboardWrap = $('.keyboard-interactive'), keyboardToggle = $('#keyboard-toggle'), keyboardSpecs = $('#keyboard-specs');
let specsPinned = false;
function showKeyboardSpecs(open) {
 keyboardSpecs.hidden = !open;
 keyboardToggle.setAttribute('aria-expanded',String(open));
}
keyboardWrap.addEventListener('pointerenter',event => { if (event.pointerType === 'mouse') showKeyboardSpecs(true); });
keyboardWrap.addEventListener('pointerleave',event => { if (event.pointerType === 'mouse' && !specsPinned && !keyboardWrap.contains(document.activeElement)) showKeyboardSpecs(false); });
keyboardWrap.addEventListener('focusin',() => showKeyboardSpecs(true));
keyboardWrap.addEventListener('focusout',event => { if (!specsPinned && !keyboardWrap.contains(event.relatedTarget)) showKeyboardSpecs(false); });
keyboardToggle.addEventListener('click',() => { specsPinned = !specsPinned;showKeyboardSpecs(specsPinned); });
$('.keyboard-specs-close').addEventListener('click',() => { specsPinned=false;keyboardToggle.focus();showKeyboardSpecs(false); });
document.addEventListener('click',event => { if (!keyboardWrap.contains(event.target)) {specsPinned=false;showKeyboardSpecs(false);} });
document.addEventListener('keydown',event => { if (event.key === 'Escape' && !keyboardSpecs.hidden) {specsPinned=false;keyboardToggle.focus();showKeyboardSpecs(false);} });

const keyTimers = new Map();
document.addEventListener('keydown',event => {
  if (event.repeat || event.ctrlKey || event.metaKey || dialog.open || !/^[A-Za-z0-9]+$/.test(event.code)) return;
  const keys = $$(`[data-code="${event.code}"]`,$('#keyboard-illustration'));
  clearTimeout(keyTimers.get(event.code));
  keys.forEach(k => k.classList.add('key-pressed'));
  keyTimers.set(event.code,setTimeout(() => keys.forEach(k => k.classList.remove('key-pressed')),160));
});
const navLinks = $$('.index-rail nav a');
navLinks.forEach(link => {
  addPageCorner(link);
  link.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (currentTab(link)) {event.preventDefault();return;}
    peelTab(link);
  });
});
function updateNavigation() {
  const nearBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 25;
  let current = 'about';
  for (const id of ['about','projects','awards','contact']) if (document.getElementById(id).getBoundingClientRect().top <= Math.max(140,innerHeight*.4)) current = id;
  if (nearBottom) current = 'contact';
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#'+current;
    link.classList.toggle('active',active);
    if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    link.setAttribute('aria-disabled',String(active));
    syncTabPaper(link);
  });
}
let scrollScheduled = false;
addEventListener('scroll',() => { if (!scrollScheduled) {scrollScheduled = true;requestAnimationFrame(() => {updateNavigation();scrollScheduled=false;});} },{passive:true});
addEventListener('resize',updateNavigation);
updateNavigation();
addEventListener('load',() => {
  const id = location.hash.slice(1);
  if (['about','projects','awards','contact'].includes(id)) document.getElementById(id).scrollIntoView({behavior:'instant',block:'start'});
  updateNavigation();
},{once:true});
$('#year').textContent = String(new Date().getFullYear());
