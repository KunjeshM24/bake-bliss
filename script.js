/* =========================================================
   BAKE BLISS BY GURPREET — SCRIPT
   Vanilla JS, no dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADING SCREEN ---------- */
 const loadingScreen = document.getElementById("loading-screen");

window.addEventListener("load", () => {

    // Keep splash visible for 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add("loaded");
    }, 750);

});

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- SCROLL PROGRESS BAR ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }

  /* ---------- NAVBAR SCROLLED STATE + BACK TO TOP ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  function handleScrollUI(){
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');

    updateProgress();
  }
  window.addEventListener('scroll', handleScrollUI, { passive: true });
  handleScrollUI();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- MOBILE MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- THEME TOGGLE (dark mode + localStorage) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('bakebliss-theme');
  if (savedTheme === 'dark') root.setAttribute('data-theme', 'dark');

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('bakebliss-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('bakebliss-theme', 'dark');
    }
  });

  /* ---------- COOKIE NOTICE ---------- */
  const cookieNotice = document.getElementById('cookie-notice');
  const cookieAccept = document.getElementById('cookie-accept');
  if (!localStorage.getItem('bakebliss-cookie-accepted')) {
    setTimeout(() => cookieNotice.classList.add('show'), 1200);
  }
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('bakebliss-cookie-accepted', 'true');
    cookieNotice.classList.remove('show');
  });

  /* ---------- CUSTOM CURSOR ---------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
  window.addEventListener('mousemove', (e) => {
    dotX = e.clientX; dotY = e.clientY;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
  });
  function animateRing(){
    ringX += (dotX - ringX) * 0.15;
    ringY += (dotY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button, .cake-card, .masonry-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '52px';
      cursorRing.style.height = '52px';
      cursorRing.style.opacity = '0.6';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '32px';
      cursorRing.style.height = '32px';
      cursorRing.style.opacity = '1';
    });
  });

  /* ---------- BUTTON RIPPLE EFFECT ---------- */
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- INTERSECTION OBSERVER: FADE ANIMATIONS ---------- */
  const animatedEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach(el => observer.observe(el));

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el){
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const hasDecimal = el.hasAttribute('data-decimal');
    let current = 0;
    const duration = 1400;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    const format = (n) => hasDecimal ? n.toFixed(1) : Math.floor(n);
    const tick = () => {
      current += increment;
      if (current >= target) {
        el.textContent = format(target);
      } else {
        el.textContent = format(current);
        requestAnimationFrame(() => setTimeout(tick, stepTime));
      }
    };
    tick();
  }

  /* ---------- PARALLAX HERO ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax'));
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  /* ---------- MOUSE TRACKING GLOW ON HERO BLOBS ---------- */
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      document.querySelectorAll('.hero-blob').forEach((blob, i) => {
        const factor = (i + 1) * 0.4;
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

  /* ---------- LIGHTBOX GALLERY ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  document.querySelectorAll('.masonry-item').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.getAttribute('data-full') || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- TESTIMONIAL SLIDER ---------- */
  const track = document.getElementById('testimonial-track');
  const dotsWrap = document.getElementById('testimonial-dots');
  if (track) {
    const slides = track.children.length;
    let current = 0;
    for (let i = 0; i < slides; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    }
    function goToSlide(i){
      current = i;
      track.style.transform = `translateX(-${i * 100}%)`;
      [...dotsWrap.children].forEach((d, idx) => d.classList.toggle('active', idx === i));
    }
    let autoSlide = setInterval(() => {
      current = (current + 1) % slides;
      goToSlide(current);
    }, 5000);
    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.parentElement.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        current = (current + 1) % slides;
        goToSlide(current);
      }, 5000);
    });
  }

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const head = item.querySelector('.accordion-head');
    const body = item.querySelector('.accordion-body');
    head.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ---------- CONTACT FORM VALIDATION ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: 'name', errId: 'err-name', test: v => v.trim().length >= 2, msg: 'Please enter your full name.' },
        { id: 'phone', errId: 'err-phone', test: v => /^[0-9+\-\s]{7,15}$/.test(v.trim()), msg: 'Please enter a valid phone number.' },
        { id: 'email', errId: 'err-email', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
        { id: 'message', errId: 'err-message', test: v => v.trim().length >= 10, msg: 'Please tell us a little more (min 10 characters).' }
      ];

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        const errEl = document.getElementById(f.errId);
        const group = input.closest('.form-group');
        if (!f.test(input.value)) {
          valid = false;
          group.classList.add('error');
          errEl.textContent = f.msg;
        } else {
          group.classList.remove('error');
          errEl.textContent = '';
        }
      });

      if (valid) {
        // Frontend-only demo: redirect to thank-you page.
        // Replace this with a real form backend (e.g. Netlify Forms, Formspree) for production.
        window.location.href = 'thank-you.html';
      }
    });
  }

  /* ---------- NEWSLETTER FORM ---------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const successEl = document.getElementById('newsletter-success');
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        successEl.textContent = "You're on the list! Thank you for subscribing. 🍰";
        emailInput.value = '';
      } else {
        successEl.style.color = '#e57373';
        successEl.textContent = 'Please enter a valid email address.';
      }
    });
  }

  /* ---------- FLOATING CAKES SHOWCASE ANIMATION ---------- */
  const cakesContainer = document.getElementById('showcase-cakes');
  if (cakesContainer && window.gsap) {
    const cakeItems = Array.from(cakesContainer.querySelectorAll('.cake-item'));
    const wrapperEl = cakesContainer.parentElement;
    
    // Set initial sizes and positions
    const cakeSizes = [
      { width: 260, height: 340 },  // Cake 1 (far left)
      { width: 330, height: 420 },  // Cake 2 (left)
      { width: 540, height: 620 },  // Cake 3 (center)
      { width: 330, height: 420 },  // Cake 4 (right)
      { width: 260, height: 340 }   // Cake 5 (far right)
    ];

    cakeItems.forEach((cake, index) => {
      const size = cakeSizes[index % cakeSizes.length];
      cake.style.width = size.width + 'px';
      cake.style.height = size.height + 'px';
      
      // Add individual floating motion to each cake
      gsap.to(cake, {
        y: 10,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });
    });

    // Create seamless horizontal loop
    // The carousel moves continuously from right to left
    const loopDistance = cakeSizes.reduce((sum, size) => sum + size.width, 0) + (cakeSizes.length * 100); // width + gaps

    gsap.to(cakesContainer, {
      x: -loopDistance,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % loopDistance)
      }
    });

    // Continuous position update for depth and scale effects
    function updateCakeDepthEffects() {
      const containerRect = wrapperEl.getBoundingClientRect();
      const containerCenter = window.innerWidth / 2;
      const viewportWidth = window.innerWidth;

      cakeItems.forEach((cake, index) => {
        const cakeRect = cake.getBoundingClientRect();
        const cakeCenter = cakeRect.left + cakeRect.width / 2;
        
        // Calculate distance from viewport center (-1 to 1)
        const distFromCenter = (cakeCenter - containerCenter) / (viewportWidth / 2);
        const absDist = Math.abs(distFromCenter);

        // Depth-based scale and opacity
        let scale = 0.72;      // Default (far)
        let opacity = 0.60;
        let shadowBlur = 25;
        let upOffset = 0;

        if (absDist < 0.18) {
          // Center cake - most prominent
          scale = 1.25;
          opacity = 1.0;
          shadowBlur = 80;
          upOffset = -35;
        } else if (absDist < 0.50) {
          // Side cakes - medium emphasis
          scale = 0.92;
          opacity = 0.85;
          shadowBlur = 45;
          upOffset = -15;
        }

        // Apply transforms (combining with existing floating animation)
        cake.style.transform = `scale(${scale}) translateY(${upOffset}px)`;
        cake.style.opacity = opacity;
        cake.style.zIndex = Math.round(500 - absDist * 500);
        
        // Dynamic shadow
        const shadowOpacity = Math.min(0.20, 0.12 + (1 - absDist) * 0.15);
        cake.querySelector('.cake-img').style.filter = `drop-shadow(0 ${shadowBlur}px ${shadowBlur * 2.5}px rgba(0, 0, 0, ${shadowOpacity}))`;
      });
    }

    // Update on every frame for smooth depth effects
    gsap.ticker.add(updateCakeDepthEffects);
    updateCakeDepthEffects();
  }


});