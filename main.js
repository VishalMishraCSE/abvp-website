/* ==========================================================================
   72nd National Conference of ABVP — Bhagyanagar, Telangana
   Main JavaScript (3D Animations, Parallax, Navigation & Interactivity)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- Elements ---
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sideDots = document.querySelectorAll('.page-dot');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const heroSection = document.getElementById('home');
  const heroContent = document.querySelector('.hero-content');
  const navCards = document.querySelectorAll('.stone-nav-tile, .nav-card');
  const scheduleTabs = document.querySelectorAll('.schedule-tab');
  const schedulePanels = document.querySelectorAll('.schedule-panel');
  const animatedElements = document.querySelectorAll('[data-animate]');

  // --- Sticky Header on Scroll ---
  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to Top Button Visibility
    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile Menu Toggle ---
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('open');
      });
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#register') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Scroll to Top Action ---
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Active Nav & Side Pagination Observer ---
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Update main header nav active link
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update side dots (01, 02, 03, 04)
        sideDots.forEach(function (dot) {
          if (dot.getAttribute('data-section') === id) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (sec) {
    sectionObserver.observe(sec);
  });

  // --- Scroll Entrance Animation Observer ---
  const animateObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  animatedElements.forEach(function (el) {
    animateObserver.observe(el);
  });

  // Trigger animations in hero immediately after splash
  function triggerHeroAnimations() {
    const heroAnimates = heroSection ? heroSection.querySelectorAll('[data-animate]') : [];
    heroAnimates.forEach(function (el) {
      el.classList.add('animated');
    });
  }

  document.addEventListener('splashComplete', triggerHeroAnimations);
  // Fallback in case splash is skipped or already seen
  setTimeout(triggerHeroAnimations, 1000);

  // --- 3D Parallax Effect on Hero Section (Mouse Move) ---
  if (heroSection && window.innerWidth > 992) {
    heroSection.addEventListener('mousemove', function (e) {
      const rect = heroSection.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      const normX = mouseX / (rect.width / 2);
      const normY = mouseY / (rect.height / 2);

      // Hero Content subtle 3D tilt
      if (heroContent) {
        heroContent.style.transform = `perspective(1000px) rotateY(${normX * 4}deg) rotateX(${-normY * 4}deg) translateZ(10px)`;
      }

      // Flag figure shift
      const flagFigure = heroSection.querySelector('.hero-flag-figure');
      if (flagFigure) {
        flagFigure.style.transform = `translateX(${-normX * 14}px) translateY(${-normY * 10}px)`;
      }
    });

    heroSection.addEventListener('mouseleave', function () {
      if (heroContent) {
        heroContent.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        heroContent.style.transition = 'transform 0.5s ease-out';
      }
      const flagFigure = heroSection.querySelector('.hero-flag-figure');
      if (flagFigure) {
        flagFigure.style.transform = 'none';
        flagFigure.style.transition = 'transform 0.5s ease-out';
      }
    });
  }

  // --- 3D Tilt Effect on Golden Nav Cards ---
  navCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.04)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });

  // --- Conference Programme Day-by-Day Tab Switching ---
  scheduleTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const day = this.getAttribute('data-day');

      scheduleTabs.forEach(function (t) { t.classList.remove('active'); });
      schedulePanels.forEach(function (p) { p.classList.remove('active'); });

      this.classList.add('active');
      const targetPanel = document.getElementById('day-' + day);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --- Gallery Item Click / Interaction (Soft Lightbox Feel) ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const title = this.querySelector('span') ? this.querySelector('span').textContent : 'Gallery Image';
      console.log('Viewing gallery item:', title);
    });
  });

});

