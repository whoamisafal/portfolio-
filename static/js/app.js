/**
 * SAFAL SHRESTHA — PERSONAL DIGITAL LABORATORY
 * Pure Vanilla JavaScript Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500);
  }

  // Initialize all interactive modules
  initScrollProgress();
  initThemeToggle();
  initMobileDrawer();
  initRotatingText();
  initNavObserver();
  initTechnicalVisual();
  initProjectModals();
  initPhotographyGallery();
  initScrollReveal();
  initContactForm();
  initBackToTop();
  initAnimatedCounters();
  initMagneticButtons();
});

/* ==========================================================================
   0. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const progress = (scrollTop / docHeight) * 100;
      bar.style.width = `${progress}%`;
    }
  });
}

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE) WITH LOCALSTORAGE
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const toggleIcon = document.getElementById('themeToggleIcon');
  if (!toggleBtn) return;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('safal-portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default dark
  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('safal-portfolio-theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (toggleIcon) {
      toggleIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
  }
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobileToggleBtn');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!openBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ESC key listener for mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. HERO ROTATING TEXT ANIMATION (VANILLA JS)
   ========================================================================== */
function initRotatingText() {
  const rotatingEl = document.getElementById('rotatingText');
  if (!rotatingEl) return;

  const roles = [
    "AI Systems",
    "Machine Learning",
    "Reinforcement Learning",
    "Intelligent Agents",
    "Computer Vision",
    "MLOps & Cloud"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      charIndex--;
      rotatingEl.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      rotatingEl.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseDuration;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   4. NAVIGATION SECTION OBSERVER & HIGHLIGHTING
   ========================================================================== */
function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function updateActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    drawerLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }
}

/* ==========================================================================
   5. TECHNICAL VISUALIZATION WIDGET (SVG AI NETWORK)
   ========================================================================== */
function initTechnicalVisual() {
  const container = document.getElementById('techVisualContainer');
  if (!container) return;

  // Interactive SVG network representation of Safal's research domains
  const nodes = [
    { id: 'ai', label: 'AI Core', x: 200, y: 50, color: '#38bdf8' },
    { id: 'ml', label: 'Machine Learning', x: 100, y: 130, color: '#06b6d4' },
    { id: 'rl', label: 'Reinforcement Learning', x: 300, y: 130, color: '#8b5cf6' },
    { id: 'vision', label: 'Computer Vision', x: 80, y: 220, color: '#10b981' },
    { id: 'agents', label: 'AI Agents & LLM', x: 320, y: 220, color: '#f59e0b' },
    { id: 'systems', label: 'MLOps & Systems', x: 200, y: 200, color: '#38bdf8' },
    { id: 'realworld', label: 'Real-World Applications', x: 200, y: 280, color: '#06b6d4' }
  ];

  const links = [
    { from: 'ai', to: 'ml' },
    { from: 'ai', to: 'rl' },
    { from: 'ml', to: 'vision' },
    { from: 'rl', to: 'agents' },
    { from: 'ml', to: 'systems' },
    { from: 'rl', to: 'systems' },
    { from: 'vision', to: 'realworld' },
    { from: 'agents', to: 'realworld' },
    { from: 'systems', to: 'realworld' }
  ];

  let svgHtml = `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive AI Systems Architecture Diagram">`;
  
  // Render Link Lines
  links.forEach(link => {
    const sourceNode = nodes.find(n => n.id === link.from);
    const targetNode = nodes.find(n => n.id === link.to);
    svgHtml += `
      <line x1="${sourceNode.x}" y1="${sourceNode.y}" x2="${targetNode.x}" y2="${targetNode.y}" 
            stroke="var(--border-color-hover)" stroke-width="1.5" stroke-dasharray="4 2" />
    `;
  });

  // Render Nodes
  nodes.forEach(node => {
    svgHtml += `
      <g class="tech-node" data-node="${node.id}">
        <circle cx="${node.x}" cy="${node.y}" r="18" fill="var(--bg-surface)" stroke="${node.color}" stroke-width="2" />
        <circle cx="${node.x}" cy="${node.y}" r="6" fill="${node.color}">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x="${node.x}" y="${node.y + 32}" text-anchor="middle" fill="var(--text-secondary)" font-size="11" font-family="var(--font-mono)">${node.label}</text>
      </g>
    `;
  });

  svgHtml += `</svg>`;
  container.innerHTML = svgHtml;
}

/* ==========================================================================
   6. PROJECT DETAIL MODAL (WITH FOCUS TRAP & ACCESSIBILITY)
   ========================================================================== */
const projectsData = {
  'ku-krishi': {
    title: 'KU Krishi App',
    category: 'Computer Vision + Agricultural AI',
    status: 'Nepal ICT Award Semi-Finalist (2024) · Google Play Store Production',
    overview: 'An embedded AI agricultural assistant built at Kathmandu University to resolve crop threats on localized farms. It uses edge computer vision algorithms to instantly isolate agricultural diseases like late blight through smartphone optics, outputting adaptive metrics natively in the Nepali language.',
    problem: 'Smallholder farmers in Nepal face severe crop loss due to delayed plant disease identification and limited access to agronomic experts in remote Himalayan regions.',
    solution: 'Engineered an offline-first Flutter mobile application integrated with quantized MobileNet/YOLOv8 models running on-device for real-time leaf disease diagnosis in Nepali.',
    architecture: 'Flutter Android App -> On-Device TFLite Inference -> FastAPI Cloud Backup -> PyTorch Training Pipeline & OpenCV.',
    tech: ['Flutter SDK', 'Python Engine', 'TensorFlow Mobile', 'YOLOv8 Weights', 'FastAPI Server', 'Firebase Cloud', 'OpenCV Pipeline'],
    github: 'https://github.com/whoamisafal',
    demo: 'https://apkpure.com/tiffin/com.tiffin.tiffin'
  },
  'hydroponics-ai': {
    title: 'Hydroponics AI System',
    category: 'AI + IoT + Reinforcement Learning',
    status: 'STEAM Research Grant Funded (2026) · DFRobot Hardware Sponsored',
    overview: 'An industrial IoT automation platform applying Reinforcement Learning (RL) frameworks to soil-free smart urban farming. Funded by the Ministry of Education, Science and Technology under the STEAM Grant with telemetry equipment sponsored directly by DFRobot.',
    dfrobot: 'Took the initiative to reach out directly to DFRobot via email presenting the research vision. DFRobot came on board as a hardware sponsor, gifting essential components including pH probes, CO2, DHT22, Spectrometer Sensor, ESP32-S3 AI Camera, ESP32-P4, and Waterproof Ultrasonic sensor.',
    problem: 'Traditional hydroponic farming relies heavily on manual, static thresholding, leading to sub-optimal crop yields and nutrient waste.',
    solution: 'Programmed embedded control layer on ESP32 and Raspberry Pi to interface with DFRobot sensor array via MQTT. Developed FastAPI backend with WebSockets and LiveKit real-time video streaming, deployed on a local edge server.',
    architecture: 'Edge Sensors (DFRobot Array) -> ESP32 / Pi Gateway -> MQTT Broker & WebSockets -> FastAPI Backend -> PyTorch RL (Gymnasium) -> LiveKit Video Stream -> Flutter Dashboard.',
    tech: ['Embedded C/C++', 'TensorFlow Core', 'PyTorch RL', 'OpenCV Matrix', 'ESP32 SoC', 'Raspberry Pi', 'Arduino Drivers', 'MQTT Protocol', 'WebSockets', 'FastAPI Backend', 'Flutter Dashboard', 'Gymnasium', 'LiveKit Video Stream'],
    github: 'https://github.com/whoamisafal',
    demo: '#'
  },
  'cloud-infra': {
    title: 'Self-Hosted Public Cloud Infrastructure',
    category: 'Bare-Metal Hardware Stack & Cloud Engineering',
    status: 'Production Deployment (Semester Project — Tiffin Backend)',
    overview: 'Architected, built, and provisioned an independent bare-metal server node from scratch in 2022, configured for public internet access. Hosted production data endpoints, security rules, and real-time transaction pipelines for the Like Tiffin mobile application without commercial cloud provider bills (AWS/GCP/Azure).',
    problem: 'High recurring costs and regional network latency associated with public cloud providers for experimental student-led production services.',
    solution: 'Assembled physical server hardware, managed cooling and power limits, configured Linux network settings, static IP routers, firewall rules, reverse proxy routing, domain handling, and SSL encryption.',
    architecture: 'Public Fiber Uplink -> Static IP Router -> HAProxy Reverse Proxy -> Docker Daemon Processing -> MinIO Object Storage -> PostgreSQL.',
    tech: ['Bare-Metal Linux Architecture', 'Public IP Networking', 'Reverse Proxy Routing', 'Secure SSH Layer', 'Node.js Daemon Processing', 'Hardware System Maintenance', 'Docker', 'MinIO'],
    github: 'https://github.com/whoamisafal',
    demo: '#'
  },
  'aihpc-cluster': {
    title: 'AIHPC – High Performance GPU Cluster',
    category: 'MLOps & Supercomputing Infrastructure',
    status: 'Kathmandu University Department of AI Initiative (2025)',
    overview: 'Led an intensive system orchestration initiative within Kathmandu University\'s Department of AI to build a dedicated high-performance computing cluster (AIHPC). Configured Kubernetes containers for scaling distributed worker loads and established HAProxy layers for load balancing.',
    postMortem: 'The hardware environment was limited because consumer-grade NVIDIA GeForce RTX 3080Ti GPUs lack hardware-level Multi-Instance GPU (MIG) partitioning. This constraint, paired with localized technical team knowledge scaling boundaries (skill issues), prevented stable multi-tenant GPU virtualization, providing deep insight into enterprise vs consumer accelerator boundaries.',
    problem: 'Academic research teams at KU required consolidated high-throughput compute infrastructure for distributed deep learning models.',
    solution: 'Configured multi-node Kubernetes cluster supporting NVIDIA RTX 3080Ti GPUs, HAProxy load balancing, Docker container environments, and resource monitoring pipelines.',
    architecture: 'Bare-Metal Nodes -> Ubuntu Server OS -> NVIDIA Driver Topology -> Kubernetes (K8s) -> HAProxy Load Balancing -> Prometheus / Grafana.',
    tech: ['Kubernetes (K8s)', 'HAProxy Load Balancing', 'NVIDIA RTX 3080Ti', 'Docker Containers', 'Linux Administration', 'GPU Cluster Topology'],
    github: 'https://github.com/whoamisafal',
    demo: '#'
  },
  'treksathi': {
    title: 'TrekSathi Mobile App',
    category: 'GIS Mobile & Agentic AI Application',
    status: 'Live on Google Play Store (bala.ai)',
    overview: 'A high-reliability production trekking companion app engineered to optimize safety workflows for tourists tracking remote mountain corridors across Nepal. Features custom vector trail tracking layers, elevation mapping charts, OpenWeatherMap atmospheric caching, offline GIS coordinates, and agentic AI route suggestions.',
    problem: 'Trekkers in remote Himalayan regions like Annapurna and Everest lack cellular coverage, making navigation, weather forecasting, and safety tracking challenging.',
    solution: 'Built complete Flutter app from scratch, integrated Google Maps SDK with custom trail overlays and waypoint markers, structured geospatial trail dataset, OpenWeatherMap API with severe weather alerts, Django + MongoDB backend, offline map caching, and agentic AI route suggestions.',
    architecture: 'Flutter App -> Google Maps SDK -> Offline Map Cache -> Django REST API -> MongoDB -> OpenWeather API -> Firebase Cloud.',
    tech: ['Flutter Frontend', 'Dart', 'Google Maps SDK', 'Django REST API', 'MongoDB Server', 'OpenWeather API Integration', 'Firebase Cloud'],
    github: 'https://github.com/whoamisafal',
    demo: 'https://apkpure.com/tiffin/com.tiffin.tiffin'
  },
  'like-tiffin': {
    title: 'Like Tiffin Platform',
    category: 'E-Commerce Mobile Platform',
    status: 'Live on Google Play Store (bala.ai)',
    overview: 'A home-cooked meal delivery platform connecting students and office workers with local home chefs, hotels, and restaurants in Nepal. Like Tiffin promotes healthy eating, reduces food waste, and gives home cooks an income stream through pre-order meal subscriptions.',
    problem: 'Small food vendors and home chefs struggled with managing recurring meal subscriptions, daily order changes, and delivery route matching.',
    solution: 'Engineered cross-platform Flutter app for customers and home chefs, real-time Firestore order stream listeners, Google Maps delivery radius matching, centralized Node.js admin backend API, powered by self-hosted bare-metal server infrastructure.',
    architecture: 'Flutter Client -> Firestore Sync Streams -> Node.js Admin Backend -> Google Maps SDK -> Bare-Metal Hosting.',
    tech: ['Flutter Native', 'Dart UI Engine', 'Firebase Storage', 'Firestore Sync Streams', 'Node.js Engine', 'Google Maps SDK'],
    github: 'https://github.com/whoamisafal',
    demo: 'https://apkpure.com/tiffin/com.tiffin.tiffin'
  },
  'pixshop': {
    title: 'PixShop: Multi-Store E-commerce Website',
    category: 'Full-Stack Web Commerce Platform',
    status: 'Sep 2023 - May 2024',
    overview: 'Built a shared Next.js interface and Node.js backend services for multiple shops and their commerce workflows.',
    problem: 'Multiple independent shop owners needed a unified platform to manage their storefronts, inventory, and commerce operations without maintaining separate systems.',
    solution: 'Developed a shared Next.js storefront with multi-tenant architecture and Node.js backend services supporting individual shop workflows, product management, and order processing.',
    architecture: 'Next.js Storefront -> Node.js API Services -> Shared Commerce Core -> Multi-tenant Data Layer.',
    tech: ['Next.js', 'Node.js', 'React', 'Commerce Workflows', 'Multi-tenant Architecture', 'REST APIs'],
    github: 'https://github.com/whoamisafal',
    demo: '#'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const viewBtns = document.querySelectorAll('.btn-view-project');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (!modalOverlay || !modalTitle || !modalBody) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      const project = projectsData[projectId];
      if (!project) return;

      modalTitle.textContent = project.title;
      modalBody.innerHTML = `
        <div class="modal-status-badge">${project.status}</div>
        <p class="modal-overview">${project.overview}</p>
        
        ${project.dfrobot ? `
        <div style="background: var(--accent-cyan-glow); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 class="modal-section-title" style="color: var(--accent-cyan);">HOW DFROBOT BECAME OUR HARDWARE PARTNER</h4>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-primary);">${project.dfrobot}</p>
        </div>` : ''}

        ${project.postMortem ? `
        <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 class="modal-section-title" style="color: var(--accent-amber);">ENGINEERING POST-MORTEM &amp; GPU DIAGNOSTICS</h4>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-primary);">${project.postMortem}</p>
        </div>` : ''}

        <div>
          <h4 class="modal-section-title">THE PROBLEM</h4>
          <p>${project.problem}</p>
        </div>

        <div>
          <h4 class="modal-section-title">ENGINEERING APPROACH &amp; SOLUTION</h4>
          <p>${project.solution}</p>
        </div>

        <div>
          <h4 class="modal-section-title">SYSTEM ARCHITECTURE</h4>
          <p><code>${project.architecture}</code></p>
        </div>

        <div>
          <h4 class="modal-section-title">TECHNOLOGY STACK</h4>
          <div class="tech-tags">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top: 1rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View Source Code &rarr;</a>` : ''}
          ${project.demo && project.demo !== '#' ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Live Google Play Store &rarr;</a>` : ''}
        </div>
      `;

      openModal();
    });
  });

  function openModal() {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
    trapFocus(modalOverlay);
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Trap Focus Helper */
function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }
  });
}

/* ==========================================================================
    7. PHOTOGRAPHY MASONRY GALLERY & LIGHTBOX
    ========================================================================== */
function initPhotographyGallery() {
  const photoGrid = document.getElementById('photo-grid');
  const filterBtns = document.querySelectorAll('.photo-filter-btn');
  const lightbox = document.getElementById('photoLightbox');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxVisualContainer = document.getElementById('lightboxVisualContainer');

  if (!photoGrid) return;

  let currentPhotoIndex = 0;
  let photoCards = [];

  fetch('static/json/photos.json')
    .then(res => res.json())
    .then(data => {
      if (!data.gallery || data.gallery.length === 0) {
        photoGrid.innerHTML = '<div class="photo-loader">No photos available.</div>';
        return;
      }

      photoGrid.innerHTML = '';
      data.gallery.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'photo-card reveal';
        card.setAttribute('data-category', (item.category || 'landscape').toLowerCase());
        card.setAttribute('data-caption', item.title);
        card.setAttribute('data-img', item.url);
        card.innerHTML = `
          <img class="photo-card-visual" src="${item.url}" alt="${item.title}" loading="lazy" />
          <div class="photo-overlay">
            <span class="photo-tag">${(item.category || 'Landscape').toUpperCase()}</span>
            <span class="photo-caption">${item.title}</span>
          </div>
        `;
        photoGrid.appendChild(card);
        photoCards.push(card);
      });

      initFilters();
      initLightbox();
      initScrollReveal();
    })
    .catch(err => {
      console.error('Failed to load photos:', err);
      photoGrid.innerHTML = '<div class="photo-loader">Gallery unavailable.</div>';
    });

  function initFilters() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        photoCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  function initLightbox() {
    photoCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        currentPhotoIndex = index;
        openLightbox(currentPhotoIndex);
      });
    });

    function openLightbox(index) {
      const card = photoCards[index];
      if (!card || !lightbox) return;

      const caption = card.getAttribute('data-caption');
      const imgSrc = card.getAttribute('data-img');

      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxVisualContainer) {
        lightboxVisualContainer.innerHTML = `<img src="${imgSrc}" alt="${caption}" style="max-width:100%;max-height:70vh;border-radius:8px;" />`;
      }

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function nextPhoto() {
      currentPhotoIndex = (currentPhotoIndex + 1) % photoCards.length;
      openLightbox(currentPhotoIndex);
    }

    function prevPhoto() {
      currentPhotoIndex = (currentPhotoIndex - 1 + photoCards.length) % photoCards.length;
      openLightbox(currentPhotoIndex);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextPhoto);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevPhoto);

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    });
  }

  function initScrollReveal() {
    const revealElements = photoGrid.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }
}

/* ==========================================================================
   8. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION & MAILTO FALLBACK
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alert = document.getElementById('formAlert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      return;
    }

    // Show success feedback
    if (alert) {
      alert.textContent = `Thank you, ${name}! Opening mail client to send your message to hello@safalkumarshrestha.com.np...`;
      alert.classList.add('success');
      alert.style.display = 'block';
    }

    // Construct mailto URL
    const mailtoUrl = `mailto:hello@safalkumarshrestha.com.np?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    form.reset();
  });
}

/* ==========================================================================
    11. ANIMATED COUNTERS
    ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
    12. MAGNETIC BUTTON EFFECT
    ========================================================================== */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn, .nav-cta, .btn-view-project');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
function initBackToTop() {
  const topBtn = document.getElementById('backToTopBtn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
