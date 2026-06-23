const header=document.querySelector('.site-header');
const toggle=document.querySelector('.nav-toggle');
const navLinks=document.querySelector('.nav-links');
const backTop=document.querySelector('.back-top');
const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-links a')];

function onScroll(){
  header.classList.toggle('scrolled',scrollY>24);
  backTop.classList.toggle('show',scrollY>600);
  let current='home';
  sections.forEach(section=>{if(scrollY>=section.offsetTop-150)current=section.id});
  links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
toggle.addEventListener('click',()=>{const open=toggle.classList.toggle('open');navLinks.classList.toggle('open',open);toggle.setAttribute('aria-expanded',open);toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
links.forEach(link=>link.addEventListener('click',()=>{toggle.classList.remove('open');navLinks.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

let counted=false;
const statsObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!counted){counted=true;document.querySelectorAll('[data-count]').forEach(el=>{const target=Number(el.dataset.count);const suffix=el.dataset.suffix||'';let start=0;const duration=1200;const tick=timestamp=>{if(!start)start=timestamp;const progress=Math.min((timestamp-start)/duration,1);el.textContent=Math.floor((1-Math.pow(1-progress,3))*target)+suffix;if(progress<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)})}},{threshold:.4});
statsObserver.observe(document.querySelector('.stats-panel'));

document.querySelector('#contact-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const subject=encodeURIComponent(data.get('subject'));const body=encodeURIComponent(`Hello Wave Loom,\n\n${data.get('message')}\n\nFrom: ${data.get('name')} (${data.get('email')})`);document.querySelector('.form-status').textContent='Opening your email app…';location.href=`mailto:waveloom@gmail.com?subject=${subject}&body=${body}`});
document.querySelector('#year').textContent=new Date().getFullYear();
