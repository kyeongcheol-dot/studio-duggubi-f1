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
  // Keep previously shared expert links on the approved consultation screen.
  if (['onestop', 'onestop-cases', 'consultation'].includes(requested)) {
    location.replace('experts-preview.html?v=13#care-directory');
    return;
  }
  const caseTarget = ['onestop-cases', 'consultation'].includes(requested);
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
    requestAnimationFrame(() => document.getElementById(requested)?.scrollIntoView({block:'start'}));
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


const planData = {
  cremation: {
    title: '화장 전용 플랜', price: '290', negotiable: false, image: 'assets/plan.png',
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
    title: '매장 전용 플랜', price: '350', negotiable: true, image: 'assets/plan-burial-mound.png',
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
    title: '무빈소 플랜', price: '130', negotiable: true, image: 'assets/plan-simple-urn.png',
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
  document.querySelector('.plan-summary small').textContent = '안내 금액';
  document.querySelector('#plan-negotiable').hidden = !plan.negotiable;
  const comparison = document.querySelector('#plan-comparison');
  if (comparison) comparison.hidden = key !== 'burial';
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
// Keep the first profile open to introduce the expert directory.
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


// Frontend only. No storage, analytics payload, or submission endpoint is configured.
// The site owner will connect the receiving channel and approved privacy notice separately.
const consultationForm = document.querySelector('#consultation-form');
const serviceInputs = [...consultationForm.querySelectorAll('[name="services"]')];
const serviceNames = Object.fromEntries(serviceInputs.map(input => [input.value, input.closest('label').querySelector('b').textContent]));
const review = document.querySelector('#consultation-review');
function syncConsultation() {
  const chosen = serviceInputs.filter(input => input.checked).map(input => input.value);
  document.querySelector('#directory-count').textContent = `${chosen.length}개`;
  document.querySelector('#selection-status').textContent = chosen.length ? `${chosen.length}개 분야 선택 · ${chosen.map(key => serviceNames[key]).join(', ')}` : '필요한 분야를 선택해 주세요.';
  serviceInputs[0].setCustomValidity(chosen.length ? '' : '상담 분야를 하나 이상 선택해 주세요.');
  document.querySelectorAll('[data-select-service]').forEach(button => {
    const selected = chosen.includes(button.dataset.selectService);
    button.setAttribute('aria-pressed', String(selected));
    button.textContent = selected ? '선택됨 · 다시 누르면 해제 ✓' : '이 상담 선택하기 ＋';
  });
  review.hidden = true;
}
syncConsultation();
consultationForm.addEventListener('input', syncConsultation);
document.addEventListener('click', event => {
  const button = event.target.closest('[data-select-service]');
  const guideLink = event.target.closest('[data-expert-target]');
  if (!button && !guideLink) return;
  event.preventDefault();
  const key = button ? button.dataset.selectService : guideLink.dataset.expertTarget.replace('expert-', '');
  const input = serviceInputs.find(input => input.value === key);
  if (!input) return;
  input.checked = button ? !input.checked : true;
  syncConsultation();
  if (guideLink) {
    if (location.hash !== '#consultation') location.hash = 'consultation';
    else document.querySelector('#consultation').scrollIntoView({behavior: reduceMotion.matches ? 'auto' : 'smooth'});
    requestAnimationFrame(() => input.focus({preventScroll:true}));
  }
});
consultationForm.addEventListener('submit', event => {
  event.preventDefault();
  const selected = serviceInputs.filter(input => input.checked).map(input => serviceNames[input.value]);
  if (!selected.length || !consultationForm.reportValidity()) return;
  const values = new FormData(consultationForm);
  const rows = [ ['상담 분야', selected.join(' · ')], ['성함', values.get('customerName')], ['연락처', values.get('phone')], ['연락 가능한 시간', values.get('preferredTime') || '미입력'], ['남기실 말씀', values.get('message') || '미입력'] ];
  const list = document.querySelector('#review-values');
  list.replaceChildren();
  rows.forEach(([label, value]) => {
    const term = document.createElement('dt'); term.textContent = label;
    const description = document.createElement('dd'); description.textContent = value;
    list.append(term, description);
  });
  review.hidden = false;
  review.focus({preventScroll:true});
  review.scrollIntoView({behavior: reduceMotion.matches ? 'auto' : 'smooth', block:'center'});
});
document.querySelector('#edit-consultation').addEventListener('click', () => {
  review.hidden = true;
  consultationForm.querySelector('[name="customerName"]').focus();
});
