const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('[data-page]')];
const menu = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-button');
const petalLayer = document.querySelector('.petal-layer');
const compareSection = document.querySelector('#home .compare-section');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function playUIAnimation(element, keyframes, options) {
  if (!element || reduceMotion.matches || typeof element.animate !== 'function') return;
  element.getAnimations().forEach(animation => animation.cancel());
  element.animate(keyframes, options);
}

function updatePetalOpacity() {
  if (!petalLayer || !compareSection || document.querySelector('#home').hidden) {
    if (petalLayer) petalLayer.style.opacity = '0';
    return;
  }
  const fadeStart = compareSection.offsetTop - window.innerHeight * .7;
  const fadeEnd = compareSection.offsetTop + compareSection.offsetHeight * .55;
  const progress = Math.min(1, Math.max(0, (window.scrollY - fadeStart) / (fadeEnd - fadeStart)));
  petalLayer.style.opacity = String(1 - progress);
}

function showPage() {
  const requested = location.hash.slice(1);
  const caseTarget = requested === 'onestop-cases';
  const id = caseTarget ? 'onestop' : pages.some(page => page.id === requested) ? requested : 'home';
  pages.forEach(page => page.hidden = page.id !== id);
  const activePage = document.querySelector(`#${id}`);
  if (!reduceMotion.matches) {
    activePage.classList.remove('ui-entering');
    requestAnimationFrame(() => activePage.classList.add('ui-entering'));
  }
  links.forEach(link => link.classList.toggle('active', link.dataset.page === id));
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (caseTarget) {
    requestAnimationFrame(() => document.querySelector('#onestop-cases')?.scrollIntoView({block:'start'}));
  } else {
    window.scrollTo({top: 0});
  }
  requestAnimationFrame(updatePetalOpacity);
}

menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
window.addEventListener('hashchange', showPage);
window.addEventListener('scroll', updatePetalOpacity, {passive: true});
window.addEventListener('resize', updatePetalOpacity);
showPage();

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-expert-target]');
  if (!trigger) return;
  event.preventDefault();
  const targetId = trigger.dataset.expertTarget;
  if (location.hash !== '#onestop-cases') location.hash = 'onestop-cases';
  else showPage();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    document.querySelectorAll('#onestop-cases .profile-accordion details[open]').forEach(item => {
      if (item !== target) item.open = false;
    });
    target.open = true;
    target.scrollIntoView({behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center'});
  }));
});

const planData = {
  cremation: {
    title: '화장 전용 플랜', price: '290', original: '390만원', image: 'assets/plan.png',
    items: [
      ['item-1.png','장례지도사','장례지도사 1명 2~3일 파견 · 입관 시 1명 추가 지원'],
      ['item-2.png','빈소 용품','향, 초, 위패, 조의록 등 일체 제공'],
      ['item-3.png','관','고급 오동나무 화장용 관 제공'],
      ['item-4.png','수의','대마 100% 고급 수의 및 필요 용품 제공'],
      ['item-5.png','입관 용품','입관 용품 일체 제공'],
      ['item-6.png','상복','남성·여성 상복 각 5벌 · 와이셔츠와 넥타이 포함'],
      ['item-7.png','접객 도우미','총 4명 · 1일 2명 기준 8시간 지원'],
      ['item-8.png','차량','관내 이송 앰뷸런스 · 40인승 장례버스 왕복 200km 지원'],
      ['item-urn.png','봉안함','기본 봉안함 제공'],
      ['item-10.png','입관','입관 생화 장식 서비스']
    ]
  },
  burial: {
    title: '매장 전용 플랜', price: '320', original: '420만원', image: 'assets/plan-burial-mound.png',
    items: [
      ['item-1.png','장례지도사','장례지도사 1명 2~3일 파견 · 입관 시 1명 추가 지원'],
      ['item-2.png','빈소 용품','향, 초, 위패, 조의록 등 일체 제공'],
      ['item-3.png','관','고급 오동나무 매장용 관 제공'],
      ['item-4.png','수의','대마 100% 고급 수의 및 필요 용품 제공'],
      ['item-5.png','입관 용품','입관 용품 일체 제공'],
      ['item-6.png','상복','남성·여성 상복 각 5벌 · 와이셔츠와 넥타이 포함'],
      ['item-7.png','접객 도우미','총 4명 · 1일 2명 기준 8시간 지원'],
      ['item-8.png','차량','관내 이송 앰뷸런스 · 40인승 장례버스 왕복 200km 지원'],
      ['item-9.png','횡대','탈관 시 횡대 제공'],
      ['item-10.png','입관','대렴 입관식 진행']
    ]
  },
  simple: {
    title: '무빈소 플랜', price: '90', original: '190만원', image: 'assets/plan-simple-urn.png',
    items: [
      ['item-1.png','장례지도사','장례 절차 상담 및 발인 진행'],
      ['item-3.png','관','화장용 관 제공'],
      ['item-4.png','수의','기본 수의와 필요 용품 제공'],
      ['item-5.png','입관 용품','입관 용품 일체 제공'],
      ['item-8.png','차량','고인 이송 차량 지원'],
      ['item-10.png','입관','대렴 및 입관식 진행']
    ]
  }
};

const planButtons = [...document.querySelectorAll('[data-plan]')];
const planItems = document.querySelector('#plan-items');

function selectPlan(key) {
  const plan = planData[key];
  document.querySelector('#plan-title').textContent = plan.title;
  document.querySelector('#plan-price').textContent = plan.price;
  document.querySelector('#plan-original-price').textContent = plan.original;
  const image = document.querySelector('#plan-image');
  image.src = plan.image;
  image.alt = plan.title;
  planItems.innerHTML = plan.items.map(([icon, title, description]) =>
    `<div><img src="assets/${icon}" alt=""><b>${title}</b><span>${description}</span></div>`
  ).join('');
  planButtons.forEach(button => {
    const selected = button.dataset.plan === key;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected) document.querySelector('#plan-panel').setAttribute('aria-labelledby', button.id);
  });
  playUIAnimation(document.querySelector('#plan-panel'), [
    {opacity:.58, transform:'translateY(5px)'},
    {opacity:1, transform:'translateY(0)'}
  ], {duration:220, easing:'cubic-bezier(.2,.8,.2,1)'});
}

planButtons.forEach(button => button.addEventListener('click', () => selectPlan(button.dataset.plan)));
document.querySelector('.plan-tabs').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const current = planButtons.indexOf(document.activeElement);
  let next = current;
  if (event.key === 'ArrowRight') next = (current + 1) % planButtons.length;
  if (event.key === 'ArrowLeft') next = (current - 1 + planButtons.length) % planButtons.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = planButtons.length - 1;
  planButtons[next].focus();
  selectPlan(planButtons[next].dataset.plan);
});

const expertCarousel = document.querySelector('#expert-carousel');
const carouselButtons = [...document.querySelectorAll('[data-carousel]')];

function updateCarouselButtons() {
  const atStart = expertCarousel.scrollLeft <= 1;
  const atEnd = expertCarousel.scrollLeft + expertCarousel.clientWidth >= expertCarousel.scrollWidth - 1;
  carouselButtons.forEach(button => {
    button.disabled = button.dataset.carousel === 'prev' ? atStart : atEnd;
    button.setAttribute('aria-disabled', String(button.disabled));
  });
}

if (expertCarousel) {
  carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
      const direction = button.dataset.carousel === 'next' ? 1 : -1;
      const card = expertCarousel.querySelector('.expert');
      const gap = parseFloat(getComputedStyle(expertCarousel).gap) || 0;
      expertCarousel.scrollBy({left: direction * (card.offsetWidth + gap), behavior: 'smooth'});
    });
  });
  expertCarousel.addEventListener('scroll', updateCarouselButtons, {passive: true});
  window.addEventListener('resize', updateCarouselButtons);
  updateCarouselButtons();
}

const serviceDetails = [...document.querySelectorAll('.services details')];
serviceDetails.forEach(detail => { detail.open = false; });
serviceDetails.forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    playUIAnimation(detail.querySelector('.service-expert'), [
      {opacity:0, transform:'translateY(-6px)'},
      {opacity:1, transform:'translateY(0)'}
    ], {duration:200, easing:'cubic-bezier(.2,.8,.2,1)'});
  });
});

document.querySelectorAll('.after-accordions details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    playUIAnimation(detail.querySelector('.after-detail'), [
      {opacity:0, transform:'translateY(-6px)'},
      {opacity:1, transform:'translateY(0)'}
    ], {duration:220, easing:'cubic-bezier(.2,.8,.2,1)'});
  });
});

// Emergency call button: on the home page only, stay hidden until the hero has fully scrolled out of view.
const emergencyButton = document.querySelector('.emergency-corner');
const homeHero = document.querySelector('#home .hero');
if (emergencyButton && homeHero && typeof IntersectionObserver === 'function') {
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const onHome = !document.querySelector('#home').hidden;
      emergencyButton.classList.toggle('is-hidden', onHome && entry.isIntersecting);
    });
  }, {threshold: 0});
  heroObserver.observe(homeHero);
  window.addEventListener('hashchange', () => {
    if (document.querySelector('#home').hidden) emergencyButton.classList.remove('is-hidden');
  });
}
