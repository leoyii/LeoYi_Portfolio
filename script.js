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
function renderProject() {
  const p = projects.find(project => project.id === selectedProject);
  $('#project-detail').innerHTML = `<header class="project-detail-header"><div><h3>${p.title}</h3><p class="project-category">${p.categoryLabel}</p></div>${p.date ? `<span class="project-date">${p.date}</span>` : ''}</header><img class="project-image ${p.portrait ? 'portrait' : ''}" src="${asset(p.image)}" alt="${p.alt}" width="650" height="330"><p class="project-description">${p.summary}</p><ul>${p.details.map(detail => `<li>${detail}</li>`).join('')}</ul>${p.gallery ? `<div class="project-gallery">${p.gallery.map((image,i) => `<img src="${asset(image)}" alt="${p.galleryAlts[i]}" loading="lazy">`).join('')}</div>` : ''}${p.note ? `<p class="project-note">${p.note}</p>` : ''}<div class="project-tech">${p.tags.map(tag => `<span>${tag}</span>`).join('')}</div>`;
  $$('.project-item').forEach(button => {
    const active = button.dataset.project === selectedProject;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}
$('#project-list').innerHTML = projects.map(p => `<button type="button" class="project-item" data-project="${p.id}" aria-pressed="false"><span class="project-number">${p.number}</span><span><span class="project-name">${p.title}</span><span class="project-type">${p.categoryLabel}</span></span></button>`).join('');
$('#project-list').addEventListener('click',event => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
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

// Original SVG illustration based on the supplied keyboard photograph.
// The board responds silently to key presses without adding controls or a typing game.
function key(x,y,label,code,width=29) {
  const safe = label.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<g data-code="${code}" transform="translate(${x} ${y})"><rect x="0" y="3" width="${width}" height="29" rx="3" fill="#080a0b"/><rect class="key-face" x="0" y="0" width="${width}" height="28" rx="3" fill="url(#keycap)" stroke="#454648" stroke-width=".7"/><path d="M4 5h${width-8}" stroke="#ffffff0c"/><text class="key-label" x="${width/2}" y="17" text-anchor="middle" fill="#d5d5d0" font-family="Arial,sans-serif" font-size="${label.length>3?5.5:7}">${safe}</text></g>`;
}
function keysRow(chars,x,y) {
  return [...chars].map((char,i) => key(x+i*33,y,char,/^[a-z]$/i.test(char)?`Key${char.toUpperCase()}`:/^[0-9]$/.test(char)?`Digit${char}`:({'-':'Minus','=':'Equal','[':'BracketLeft',']':'BracketRight',';':'Semicolon',"'":'Quote',',':'Comma','.':'Period','/':'Slash'}[char]||char))).join('');
}
const left = `<g transform="rotate(10 202 125)">${keysRow('12345',92,28)}${keysRow('QWERT',92,64)}${keysRow('ASDFG',99,100)}${keysRow('ZXCVB',109,136)}${key(110,172,'Alt','AltLeft',35)}${key(151,172,'','Space',104)}${key(261,172,'Fn','Fn',29)}</g>`;
const right = `<g transform="rotate(-10 470 125)">${keysRow('67890-=',355,28)}${keysRow('YUIOP[]',347,64)}${keysRow("HJKL;'",353,100)}${key(555,100,'Enter','Enter',41)}${keysRow('BNM,./',348,136)}${key(550,136,'Shift','ShiftRight',45)}${key(353,172,'','Space',102)}${key(462,172,'Alt','AltRight',32)}${key(500,172,'Fn','FnRight',29)}</g>`;
const fixed = `${key(23,29,'Esc','Escape',31)}${key(23,65,'Tab','Tab',43)}${key(23,101,'Caps','CapsLock',50)}${key(23,137,'Shift','ShiftLeft',58)}${key(23,173,'Ctrl','ControlLeft',51)}${key(625,29,'⌫','Backspace',44)}${key(637,65,'Del','Delete',31)}${key(637,101,'PgUp','PageUp',31)}${key(637,137,'PgDn','PageDown',31)}${key(599,173,'↑','ArrowUp',29)}${key(566,207,'←','ArrowLeft',29)}${key(599,207,'↓','ArrowDown',29)}${key(632,207,'→','ArrowRight',29)}`;
$('#keyboard-illustration').innerHTML = `<svg viewBox="0 0 700 266" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="case" x2="0" y2="1"><stop stop-color="#e6e1d4"/><stop offset="1" stop-color="#beb8a9"/></linearGradient><linearGradient id="keycap" x2=".2" y2="1"><stop stop-color="#272a2b"/><stop offset="1" stop-color="#15191b"/></linearGradient></defs><path d="M70 13C70 -7 42 -8 35 -14" stroke="#679754" stroke-width="6" fill="none"/><rect x="7" y="18" width="683" height="238" rx="7" fill="#817c72"/><rect x="6" y="12" width="684" height="239" rx="7" fill="url(#case)" stroke="#f3ead6" stroke-width="1"/><path d="M15 242H680" stroke="#fff7e4" stroke-width="1"/>${left}${right}${fixed}<g transform="translate(69 26)"><rect width="29" height="28" rx="4" fill="#e1c6c1" stroke="#f4e2db" stroke-width=".7"/><ellipse cx="14.5" cy="17.5" rx="7" ry="5.5" fill="#cb9295"/><ellipse cx="5.8" cy="9.2" rx="3.3" ry="4" transform="rotate(-25 5.8 9.2)" fill="#cb9295"/><ellipse cx="13.2" cy="6.2" rx="3.2" ry="4" fill="#cb9295"/><ellipse cx="21.6" cy="8.5" rx="3.3" ry="4" transform="rotate(25 21.6 8.5)" fill="#cb9295"/></g></svg>`;
const keyTimers = new Map();
document.addEventListener('keydown',event => {
  if (event.repeat || event.ctrlKey || event.metaKey || dialog.open || !/^[A-Za-z0-9]+$/.test(event.code)) return;
  const keys = $$(`[data-code="${event.code}"]`,$('#keyboard-illustration'));
  clearTimeout(keyTimers.get(event.code));
  keys.forEach(k => k.classList.add('key-pressed'));
  keyTimers.set(event.code,setTimeout(() => keys.forEach(k => k.classList.remove('key-pressed')),160));
});
const navLinks = $$('.index-rail nav a');
function updateNavigation() {
  const nearBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 25;
  let current = 'about';
  for (const id of ['about','projects','awards','contact']) if (document.getElementById(id).getBoundingClientRect().top <= Math.max(140,innerHeight*.25)) current = id;
  if (nearBottom) current = 'contact';
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#'+current;
    link.classList.toggle('active',active);
    if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
  });
}
let scrollScheduled = false;
addEventListener('scroll',() => { if (!scrollScheduled) {scrollScheduled = true;requestAnimationFrame(() => {updateNavigation();scrollScheduled=false;});} },{passive:true});
addEventListener('resize',updateNavigation);
updateNavigation();
$('#year').textContent = String(new Date().getFullYear());
