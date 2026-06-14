// ─────────────────────────────────
// NAVIGATION PILL
// ─────────────────────────────────
const pill = document.getElementById('navPill');
const indicator = document.getElementById('navIndicator');

if (pill && indicator) {
  const pillLinks = pill.querySelectorAll('a');

  function moveIndicator(el) {
    const pr = pill.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    indicator.style.width = er.width + 'px';
    indicator.style.transform = 'translateX(' + (er.left - pr.left) + 'px)';
  }

  function setActive(id) {
    pillLinks.forEach(a => {
      const active = a.getAttribute('data-section') === id;
      a.classList.toggle('active', active);
      if (active) moveIndicator(a);
    });
  }

  pillLinks.forEach(a => {
    a.addEventListener('mouseenter', () => moveIndicator(a));
    a.addEventListener('mouseleave', () => {
      const cur = pill.querySelector('a.active');
      if (cur) moveIndicator(cur);
    });
  });

  const sections = document.querySelectorAll('section[id]');
  sections.forEach(s =>
    new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' }).observe(s)
  );

  window.addEventListener('load', () => {
    const first = pill.querySelector('a');
    if (first) {
      indicator.style.transition = 'none';
      moveIndicator(first);
      requestAnimationFrame(() => { indicator.style.transition = ''; });
    }
  });
}

// ─────────────────────────────────
// MOBILE MENU — FIXED
// ─────────────────────────────────
const brg = document.getElementById('brg');
const mob = document.getElementById('mob');
const mobClose = document.getElementById('mob-close');
let menuOpen = false;

function mo() {
  if (!mob || !brg) return;
  menuOpen = true;
  mob.classList.add('open');
  mob.setAttribute('aria-hidden', 'false');
  brg.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const s = brg.querySelectorAll('span');
  if (s[0]) s[0].style.transform = 'translateY(3px) rotate(45deg)';
  if (s[1]) s[1].style.transform = 'translateY(-3px) rotate(-45deg)';
}

function mc() {
  if (!mob || !brg) return;
  menuOpen = false;
  mob.classList.remove('open');
  mob.setAttribute('aria-hidden', 'true');
  brg.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  brg.querySelectorAll('span').forEach(s => { s.style.transform = ''; });
}

// THIS IS THE KEY FIX — exposes mc() globally for onclick="mc()" in HTML
window.mc = mc;

if (brg) brg.addEventListener('click', () => menuOpen ? mc() : mo());
if (mobClose) mobClose.addEventListener('click', mc);

// Also close menu when any mobile link is clicked (backup for onclick)
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', mc);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuOpen) mc();
});

// ─────────────────────────────────
// SCROLL REVEAL ANIMATIONS
// ─────────────────────────────────
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.R').forEach(el => {
  // Add reveal-init class so CSS knows to animate this element
  el.classList.add('reveal-init');
  obs.observe(el);
});

// ─────────────────────────────────
// CONTACT COPY BUTTON
// ─────────────────────────────────
const copyBtn = document.getElementById('contactCopyBtn');
const copyLabel = document.getElementById('contactCopyLabel');
if (copyBtn && copyLabel) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('dev.safalstha@gmail.com').then(() => {
      copyBtn.classList.add('copied');
      copyLabel.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyLabel.textContent = 'Copy address';
      }, 2200);
    }).catch(() => {
      copyLabel.textContent = 'Copy failed';
      setTimeout(() => { copyLabel.textContent = 'Copy address'; }, 2200);
    });
  });
}

// ─────────────────────────────────
// KATHMANDU LOCAL TIME
// ─────────────────────────────────
function updateKTMTime() {
  const el = document.getElementById('contactLocalTime');
  if (!el) return;
  try {
    const now = new Date();
    const ktm = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).format(now);
    el.textContent = ktm + ' NPT (UTC+5:45)';
    el.setAttribute('datetime', now.toISOString());
  } catch (e) {
    el.textContent = '--:--:-- NPT (UTC+5:45)';
  }
}
updateKTMTime();
setInterval(updateKTMTime, 1000);

// ─────────────────────────────────
// PHOTOGRAPHY GALLERY
// ─────────────────────────────────
let lbData = [];
let lbCurrent = 0;
let lb, lbImg, lbCap, lbSubEl, lbCtr, lbCloseEl, lbPrev, lbNext;

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  createLightbox();
  initLightboxEvents();
});

async function initGallery() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;

  try {
    const response = await fetch('static/json/photos.json');
    if (!response.ok) throw new Error('Failed to load photos');
    const data = await response.json();

    // Build lightbox data array
    lbData = data.gallery.map(item => ({
      src: item.url,
      title: item.title,
      sub: item.location || ''
    }));

    // Unique categories for filtering
    const categories = ['all', ...new Set(data.gallery.map(item => item.category))];
    injectFilters(grid, categories);

    grid.innerHTML = '';

    data.gallery.forEach((item, i) => {
      const card = document.createElement('div');
      const layoutClass = i < 5 ? 'photo-grid-item' : 'photo-slider-item';
      card.className = `photo-card pm R reveal-init ${layoutClass}`;
      card.dataset.cat = item.category;
      card.dataset.lb = i;
      card.style.transitionDelay = `${i * 0.1}s`;

      card.innerHTML = `
        <div class="photo-inner">
          <img src="${item.url}" alt="${item.title}" loading="lazy">
          <div class="photo-overlay">
            <span>${item.location || ''}</span>
            <h3>${item.title}</h3>
          </div>
        </div>
      `;

      // Click handler for lightbox
      card.addEventListener('click', () => lbOpen(i));
      card.style.cursor = 'pointer';

      grid.appendChild(card);
    });

    // Observe new elements for scroll reveal
    grid.querySelectorAll('.R.reveal-init').forEach(el => {
      if (!el.classList.contains('in')) obs.observe(el);
    });

    setupFilterLogic();
    setupMouseWheelScroll(grid);

  } catch (e) {
    console.error("Gallery Error:", e);
    grid.innerHTML = '<p class="photo-loader">Gallery currently unavailable.</p>';
  }
}

function injectFilters(container, categories) {
  // Remove existing filters if any
  const existing = document.querySelector('.photo-filters');
  if (existing) existing.remove();

  const filterDiv = document.createElement('div');
  filterDiv.className = 'photo-filters R reveal-init';
  filterDiv.innerHTML = categories.map(cat => `
    <button class="photo-filter-btn ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
      ${cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  `).join('');
  container.parentNode.insertBefore(filterDiv, container);

  // Observe filter bar for reveal
  obs.observe(filterDiv);
}

function setupFilterLogic() {
  document.querySelectorAll('.photo-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.photo-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      document.querySelectorAll('.pm').forEach(tile => {
        if (cat === 'all' || tile.dataset.cat === cat) {
          tile.style.display = '';
          requestAnimationFrame(() => {
            tile.style.opacity = '1';
            tile.style.transform = 'scale(1)';
            tile.style.pointerEvents = 'all';
          });
        } else {
          tile.style.opacity = '0';
          tile.style.transform = 'scale(0.95)';
          tile.style.pointerEvents = 'none';
          setTimeout(() => {
            if (tile.style.opacity === '0') tile.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

function setupMouseWheelScroll(container) {
  container.addEventListener('wheel', (e) => {
    const canScroll = container.scrollWidth > container.clientWidth;
    if (canScroll && e.deltaY !== 0) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  }, { passive: false });
}

// ─────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────
function createLightbox() {
  lb = document.createElement('div');
  lb.id = 'lightbox-modal';
  lb.innerHTML = `
    <span class="lb-close">&times;</span>
    <div class="lb-img-wrap">
      <img class="lb-content" id="lb-img" alt="">
      <button class="lb-nav lb-prev" aria-label="Previous image">←</button>
      <button class="lb-nav lb-next" aria-label="Next image">→</button>
    </div>
    <div class="lb-footer">
      <div id="lb-caption" class="lb-caption"></div>
      <div id="lb-sub" class="lb-sub"></div>
      <div id="lb-counter" class="lb-counter"></div>
    </div>
  `;
  document.body.appendChild(lb);
}

function initLightboxEvents() {
  lb = document.getElementById('lightbox-modal');
  if (!lb) return;

  lbImg = document.getElementById('lb-img');
  lbCap = document.getElementById('lb-caption');
  lbSubEl = document.getElementById('lb-sub');
  lbCtr = document.getElementById('lb-counter');
  lbCloseEl = lb.querySelector('.lb-close');
  lbPrev = lb.querySelector('.lb-prev');
  lbNext = lb.querySelector('.lb-next');

  if (lbCloseEl) lbCloseEl.addEventListener('click', lbClose_);
  if (lbPrev) lbPrev.addEventListener('click', () => lbStep(-1));
  if (lbNext) lbNext.addEventListener('click', () => lbStep(1));

  lb.addEventListener('click', e => {
    if (e.target === lb) lbClose_();
  });

  document.addEventListener('keydown', e => {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') lbClose_();
    if (e.key === 'ArrowLeft') lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
  });
}

function lbOpen(idx) {
  if (!lbData.length) return;
  lbCurrent = ((idx % lbData.length) + lbData.length) % lbData.length;
  lbShow();
  if (lb) {
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function lbClose_() {
  if (lb) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function lbShow() {
  if (!lbData.length || !lbImg || !lbCap || !lbSubEl || !lbCtr) return;

  const d = lbData[lbCurrent];
  lbImg.classList.add('fading');
  setTimeout(() => {
    lbImg.src = d.src;
    lbImg.alt = d.title;
    lbCap.textContent = d.title;
    lbSubEl.textContent = d.sub || '';
    lbCtr.textContent = (lbCurrent + 1) + ' / ' + lbData.length;
    lbImg.classList.remove('fading');
  }, 180);
}

function lbStep(dir) {
  if (!lbData.length) return;
  lbCurrent = ((lbCurrent + dir) + lbData.length) % lbData.length;
  lbShow();
}
