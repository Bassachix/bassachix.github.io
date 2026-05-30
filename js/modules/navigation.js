export function initNavigation() {
  const siteHeader = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const sections = document.querySelectorAll('section[id]');

  // Navbar & Scroll Progress Effect
  let lastScroll = 0;
  const scrollProgress = document.getElementById('scroll-progress');

  let isNavScrolling = false;
  let cachedScrollHeight = 0;
  
  // Cache scroll height on resize to prevent Layout thrashing on scroll
  function updateScrollHeight() {
    cachedScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  }
  window.addEventListener('resize', updateScrollHeight, { passive: true });
  // Initial calculation
  setTimeout(updateScrollHeight, 500);

  function handleNavScroll() {
    if (!isNavScrolling) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        
        // Header background toggle
        if (currentScroll > 50) {
          if (siteHeader) siteHeader.classList.add('scrolled');
        } else {
          if (siteHeader) siteHeader.classList.remove('scrolled');
        }
        
        // Scroll progress bar calculation (Disabled on mobile to prevent Android GPU compositor crashes)
        if (scrollProgress && cachedScrollHeight > 0 && window.innerWidth > 768) {
          const scrollPercentage = Math.min(currentScroll / cachedScrollHeight, 1);
          scrollProgress.style.transform = `scaleX(${scrollPercentage}) translateZ(0)`;
        }

        lastScroll = currentScroll;
        isNavScrolling = false;
      });
      isNavScrolling = true;
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Mobile Menu Toggle
  const bottomNavToggle = document.getElementById('bottomNavToggle');
  
  function toggleMenu() {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    const isExpanded = navToggle.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
    if (bottomNavToggle) {
      bottomNavToggle.classList.toggle('active');
    }
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', toggleMenu);
  }
  
  if (bottomNavToggle && mobileMenu) {
    bottomNavToggle.addEventListener('click', toggleMenu);
  }

  // Close mobile menu when clicking outside or on a link
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target) && (!bottomNavToggle || !bottomNavToggle.contains(e.target))) {
        toggleMenu();
      }
    }
  });

  // Smooth Scroll for Anchor Links
  const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-links a, .bottom-nav-item');

  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        // Since mobile uses bottom nav, we don't need header offset on mobile
        // But on desktop, we still use siteHeader offset
        const isMobile = window.innerWidth <= 768;
        const navHeight = (siteHeader && !isMobile) ? siteHeader.offsetHeight : 0;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          toggleMenu();
        }
      }
    });
  });

  // Active Nav Link using IntersectionObserver for high performance
  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -50% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Reset all links
        document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
          link.style.color = '';
        });

        // Highlight current
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        const mobileLink = document.querySelector(`.mobile-menu a[href="#${id}"]`);
        
        if (navLink) navLink.style.color = 'var(--text-primary)';
        if (mobileLink) mobileLink.style.color = 'var(--text-primary)';
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
