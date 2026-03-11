(function(){
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if(saved === 'light') document.documentElement.classList.add('light');
  if(toggle){
    toggle.textContent = document.documentElement.classList.contains('light') ? '🌞' : '🌙';
    toggle.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('light');
      localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
      toggle.textContent = document.documentElement.classList.contains('light') ? '🌞' : '🌙';
    });
  }

  // Reveal on scroll (IntersectionObserver)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  }

  // Tilt on hover for project cards (no external libs)
  const tiltCards = document.querySelectorAll('.hover-tilt');
  tiltCards.forEach(card=>{
    let bounds;
    function enter(){ bounds = card.getBoundingClientRect(); card.style.transition = 'transform .08s linear'; }
    function move(e){
      const x = e.clientX - bounds.left; const y = e.clientY - bounds.top;
      const rx = ((y/bounds.height)-0.5)*8;  // rotateX
      const ry = ((x/bounds.width)-0.5)*-8;  // rotateY
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function leave(){ card.style.transform = 'rotateX(0) rotateY(0)'; card.style.transition = 'transform .2s ease'; }
    card.addEventListener('mouseenter', enter);
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseleave', leave);
  });
})();
