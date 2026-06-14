
const pill      = document.getElementById('navPill');
const indicator = document.getElementById('navIndicator');
const pillLinks = pill.querySelectorAll('a');

function moveIndicator(el) {
  const pr = pill.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  indicator.style.width     = er.width  + 'px';
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


const brg      = document.getElementById('brg');
const mob      = document.getElementById('mob');
const mobClose = document.getElementById('mob-close');
let open = false;

function mo() {
  open = true;
  mob.classList.add('open');
  mob.setAttribute('aria-hidden', 'false');
  brg.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const s = brg.querySelectorAll('span');
  s[0].style.transform = 'translateY(3px) rotate(45deg)';
  s[1].style.transform = 'translateY(-3px) rotate(-45deg)';
}
function mc() {
  open = false;
  mob.classList.remove('open');
  mob.setAttribute('aria-hidden', 'true');
  brg.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  brg.querySelectorAll('span').forEach(s => { s.style.transform = ''; });
}

brg.addEventListener('click', () => open ? mc() : mo());
mobClose.addEventListener('click', mc);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) mc(); });


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
document.querySelectorAll('.R').forEach(el => obs.observe(el));


const copyBtn   = document.getElementById('contactCopyBtn');
const copyLabel = document.getElementById('contactCopyLabel');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('safal@safalshrestha.com.np').then(() => {
      copyBtn.classList.add('copied');
      copyLabel.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyLabel.textContent = 'Copy address';
      }, 2200);
    });
  });
}


function updateKTMTime() {
  const el = document.getElementById('contactLocalTime');
  if (!el) return;
  const now = new Date();
  const ktm = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kathmandu',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(now);
  el.textContent = ktm + ' NPT (UTC+5:45)';
  el.setAttribute('datetime', now.toISOString());
}
updateKTMTime();
setInterval(updateKTMTime, 1000);



document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    createLightbox(); 

});

async function initGallery() {
    const grid = document.getElementById('photo-grid');
    if (!grid) return;

    try {
        const response = await fetch('static/json/photos.json');
        const data = await response.json();
        
        // 1. Unique categories for filtering
        const categories = ['all', ...new Set(data.gallery.map(item => item.category))];
        injectFilters(grid, categories);

        grid.innerHTML = '';

        data.gallery.forEach((item, i) => {
            const card = document.createElement('div');
            
            // Logic: Assign grid class to first 5, slider class to the rest
            const layoutClass = i < 5 ? 'photo-grid-item' : 'photo-slider-item';
            card.className = `photo-card pm R ${layoutClass}`; 
            card.dataset.cat = item.category;
            card.style.transitionDelay = `${i * 0.1}s`;
            
            card.innerHTML = `
                <div class="photo-inner" onclick="openFullImage('${item.url}', '${item.title}')">
                    <img src="${item.url}" alt="${item.title}" loading="lazy">
                    <div class="photo-overlay">
                        <span>${item.location}</span>
                        <h3>${item.title}</h3>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        revealOnScroll();
        setupFilterLogic();
        setupMouseWheelScroll(grid);

    } catch (e) {
        console.error("Gallery Error:", e);
        grid.innerHTML = "<p>Gallery currently unavailable.</p>";
    }
}

function injectFilters(container, categories) {
    if (document.querySelector('.photo-filters')) return;
    const filterDiv = document.createElement('div');
    filterDiv.className = 'photo-filters R';
    filterDiv.innerHTML = categories.map(cat => `
        <button class="photo-filter-btn ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `).join('');
    container.parentNode.insertBefore(filterDiv, container);
}

function setupFilterLogic() {
    document.querySelectorAll('.photo-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.photo-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.filter;
            
            document.querySelectorAll('.pm').forEach(tile => {
                if (cat === 'all' || tile.dataset.cat === cat) {
                    tile.style.display = 'block';
                    setTimeout(() => {
                        tile.style.opacity = '1';
                        tile.style.transform = 'scale(1)';
                        tile.style.pointerEvents = 'all';
                    }, 10);
                } else {
                    tile.style.opacity = '.15';
                    tile.style.transform = 'scale(0.97)';
                    tile.style.pointerEvents = 'none';
                    // Optional: hide to collapse grid space
                    setTimeout(() => { if(tile.style.opacity < 0.2) tile.style.display = 'none'; }, 500);
                }
            });
        });
    });
}


function createLightbox() {
    const lb = document.createElement('div');
    lb.id = 'lightbox-modal';
    lb.innerHTML = `
        <span class="lb-close">&times;</span>
        <img class="lb-content" id="lb-img">
        <div id="lb-caption"></div>
    `;
    document.body.appendChild(lb);
    lb.onclick = (e) => { if (e.target.id !== 'lb-img') lb.classList.remove('active'); };
}

function openFullImage(url, title) {
    const lb = document.getElementById('lightbox-modal');
    document.getElementById('lb-img').src = url;
    document.getElementById('lb-caption').innerText = title;
    lb.classList.add('active');
}

/* ── UTILITIES ── */
function setupMouseWheelScroll(container) {
    container.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0 && container.scrollLeft + container.clientWidth < container.scrollWidth) {
            container.scrollLeft += e.deltaY;
        }
    });
}

const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active'); 
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.R').forEach(el => observer.observe(el));
};


function lbOpen(idx) {
  lbCurrent = ((idx % lbData.length) + lbData.length) % lbData.length;
  lbShow();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function lbClose_() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function lbShow() {
  const d = lbData[lbCurrent];
  lbImg.classList.add('fading');
  setTimeout(() => {
    lbImg.src = d.src;
    lbImg.alt = d.title;
    lbCap.textContent = d.title;
    lbSubEl.textContent = d.sub;
    lbCtr.textContent = (lbCurrent + 1) + ' / ' + lbData.length;
    lbImg.classList.remove('fading');
  }, 180);
}
function lbStep(dir) {
  lbCurrent = ((lbCurrent + dir) + lbData.length) % lbData.length;
  lbShow();
}

lbClose.addEventListener('click', lbClose_);
lbPrev.addEventListener('click',  () => lbStep(-1));
lbNext.addEventListener('click',  () => lbStep(1));
lb.addEventListener('click', e => { if (e.target === lb) lbClose_(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     lbClose_();
  if (e.key === 'ArrowLeft')  lbStep(-1);
  if (e.key === 'ArrowRight') lbStep(1);
});

document.querySelectorAll('[data-lb]').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => lbOpen(+el.dataset.lb));
});

