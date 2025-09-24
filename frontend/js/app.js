/* app.js - simple client-side behaviors for the EduCareer Hub prototype */

// --- Utility & demo data ---
const careers = [
  { id:1, title:"Data Science", level:"Intermediate", desc:"Learn Python, statistics, ML, and projects like Kaggle datasets." },
  { id:2, title:"Frontend Web Developer", level:"Beginner", desc:"HTML, CSS, JS, React and portfolio projects." },
  { id:3, title:"UX / UI Designer", level:"Beginner", desc:"Design thinking, Figma, prototypes and case studies." },
  { id:4, title:"Embedded Systems", level:"Advanced", desc:"C/C++, microcontrollers, hardware interfacing." },
  { id:5, title:"Product Management", level:"Intermediate", desc:"Business, roadmaps, stakeholder communication." },
];

const mentors = [
  {id:1,name:"Asha Patel",title:"Senior Data Scientist",field:"Software / Data",bio:"5+ years in ML and analytics. Loves mentoring students.",img:"assets/mentor1.jpg"},
  {id:2,name:"Rohit Mehra",title:"Frontend Engineer",field:"Software / Data",bio:"React and performance specialist."},
  {id:3,name:"Neha Singh",title:"Product Designer",field:"Design / UX",bio:"Focus on user research & visual design."}
];

const resources = [
  {id:1,title:"Intro to Python (Course)",type:"Course",link:"#",desc:"Beginner friendly Python course."},
  {id:2,title:"Build a Portfolio (Article)",type:"Article",link:"#",desc:"How to present projects to employers."},
  {id:3,title:"10 Project Ideas for CS Students",type:"Project",link:"#",desc:"Hands-on project list with learning outcomes."}
];

const opportunities = [
  {id:1,role:"Frontend Intern - Startup",type:"Internship",company:"FreshTech",location:"Remote",apply:"#"},
  {id:2,role:"Data Analyst (Intern)",type:"Internship",company:"Retaillytics",location:"Bengaluru",apply:"#"},
  {id:3,role:"Junior QA Engineer",type:"Full-time",company:"SoftEdge",location:"Hyderabad",apply:"#"}
];

// --- Navbar toggle for small screens ---
document.addEventListener('click', (e)=>{
  if(e.target.matches('.nav-toggle')){
    const nav = document.querySelector('.main-nav');
    if(nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  }
});

// --- Quick career suggest on homepage ---
(function quickCareer(){
  const input = document.getElementById('quick-input');
  const btn = document.getElementById('quick-btn');
  const out = document.getElementById('quick-result');
  if(!btn || !input) return;
  btn.addEventListener('click', ()=>{
    const q = input.value.trim().toLowerCase();
    if(!q){ out.innerText = "Try typing 'data', 'design' or 'web'."; return; }
    const found = careers.filter(c=> c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
    if(found.length===0) out.innerText = "No exact matches — try 'web', 'data', 'design'.";
    else{
      out.innerHTML = found.map(f=>`<div class="card"><strong>${f.title}</strong><div>${f.desc}</div><small>Level: ${f.level}</small></div>`).join('');
    }
  });
})();

// --- Career page render & filter ---
(function renderCareers(){
  const list = document.getElementById('career-list');
  const search = document.getElementById('career-search');
  const level = document.getElementById('career-level');
  const btn = document.getElementById('filter-btn');
  if(!list) return;
  function draw(filterText='', levelVal=''){
    const q = filterText.trim().toLowerCase();
    const filtered = careers.filter(c=>{
      const matchText = !q || (c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
      const matchLevel = !levelVal || c.level === levelVal;
      return matchText && matchLevel;
    });
    list.innerHTML = filtered.map(c=>`<div class="card"><h3>${c.title}</h3><p>${c.desc}</p><p><strong>Level:</strong> ${c.level}</p><a class="btn-ghost" href="career.html#${c.id}">View Roadmap</a></div>`).join('');
  }
  draw();
  if(btn) btn.addEventListener('click', ()=> draw(search.value, level.value));
})();

// --- Mentors page render & form ---
(function renderMentors(){
  const grid = document.getElementById('mentor-grid');
  if(grid){
    grid.innerHTML = mentors.map(m=>`
      <div class="card mentor-card">
        <img src="${m.img || 'assets/mentor1.jpg'}" alt="${m.name}" />
        <div>
          <h4>${m.name}</h4>
          <small>${m.title} — ${m.field}</small>
          <p style="margin-top:8px">${m.bio}</p>
          <div style="margin-top:8px">
            <a class="btn-primary" href="mailto:mentor@example.com?subject=Mentorship%20Request">Request</a>
            <a class="btn-ghost" href="#">Profile</a>
          </div>
        </div>
      </div>
    `).join('');
  }
  const mform = document.getElementById('mentor-form');
  if(mform){
    mform.addEventListener('submit', function(e){
      e.preventDefault();
      // demo behaviour: show message then reset
      document.getElementById('m-success').hidden = false;
      mform.reset();
      setTimeout(()=> document.getElementById('m-success').hidden = true, 3000);
    });
  }
})();

// --- Resources page ---
(function renderResources(){
  const list = document.getElementById('resource-list');
  const search = document.getElementById('resource-search');
  const type = document.getElementById('resource-type');
  const btn = document.getElementById('resource-filter');
  if(!list) return;
  function draw(q='', t=''){
    const filtered = resources.filter(r=>{
      const matchText = !q || r.title.toLowerCase().includes(q.toLowerCase()) || r.desc.toLowerCase().includes(q.toLowerCase());
      const matchType = !t || r.type === t;
      return matchText && matchType;
    });
    list.innerHTML = filtered.map(r=>`<div class="card"><h3>${r.title}</h3><p>${r.desc}</p><p><strong>Type:</strong> ${r.type}</p><a class="btn-primary" href="${r.link}">Open</a></div>`).join('');
  }
  draw();
  if(btn) btn.addEventListener('click', ()=> draw(search.value, type.value));
})();

// --- Opportunities page ---
(function renderOps(){
  const list = document.getElementById('op-list');
  const search = document.getElementById('op-search');
  const type = document.getElementById('op-type');
  const btn = document.getElementById('op-filter');
  if(!list) return;
  function draw(q='', t=''){
    const filtered = opportunities.filter(o=>{
      const matchText = !q || o.role.toLowerCase().includes(q.toLowerCase()) || o.company.toLowerCase().includes(q.toLowerCase());
      const matchType = !t || o.type === t;
      return matchText && matchType;
    });
    list.innerHTML = filtered.map(o=>`<div class="card"><h3>${o.role}</h3><p>${o.company} — ${o.location}</p><p><strong>Type:</strong> ${o.type}</p><a class="btn-primary" href="${o.apply}">Apply</a><button class="btn-ghost" onclick="saveJob(${o.id})">Save</button></div>`).join('');
  }
  draw();
  if(btn) btn.addEventListener('click', ()=> draw(search.value, type.value));
  window.saveJob = function(id){
    const job = opportunities.find(j=>j.id===id);
    if(!job) return alert('Job not found');
    const saved = JSON.parse(localStorage.getItem('savedJobs')||'[]');
    saved.push(job);
    localStorage.setItem('savedJobs', JSON.stringify(saved));
    alert('Saved to your local list (demo)');
  }
})();

// --- Contact form behavior ---
(function contactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // store demo data in localStorage
    const messages = JSON.parse(localStorage.getItem('messages')||'[]');
    messages.push({
      name: document.getElementById('c-name').value,
      email: document.getElementById('c-email').value,
      purpose: document.getElementById('c-purpose').value,
      message: document.getElementById('c-message').value,
      at: new Date().toISOString()
    });
    localStorage.setItem('messages', JSON.stringify(messages));
    document.getElementById('c-success').hidden = false;
    form.reset();
    setTimeout(()=> document.getElementById('c-success').hidden = true, 3000);
  });
})();
