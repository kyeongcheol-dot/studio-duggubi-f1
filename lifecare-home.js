(() => {
  const hero=document.querySelector('.lifecare-hero');
  if(!hero)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const narrow=matchMedia('(max-width:899px)');
  let frame=0, visible=true;
  function draw(){
    frame=0;
    if(motion.matches||document.querySelector('#home').hidden){
      hero.style.setProperty('--space-y','0px');hero.style.setProperty('--people-y','0px');return;
    }
    const rect=hero.getBoundingClientRect();
    const travel=Math.max(0,Math.min(-rect.top,rect.height));
    hero.style.setProperty('--space-y',Math.min(130,travel*(narrow.matches?.14:.24)).toFixed(2)+'px');
    hero.style.setProperty('--people-y',Math.min(52,travel*(narrow.matches?.045:.085)).toFixed(2)+'px');
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(draw);}
  window.addEventListener('scroll',()=>{if(visible&&!motion.matches)schedule();},{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('hashchange',schedule);
  motion.addEventListener('change',schedule);
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();}).observe(hero);
  schedule();
})();
