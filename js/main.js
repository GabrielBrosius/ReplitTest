/* ==========================================================================
   GABRIEL BROSIUS PORTFOLIO - CORE SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- NAVBAR SCROLL EFFECT ---
  const nav = document.querySelector('nav.fixed-nav');
  const checkScroll = () => {
    if (window.scrollY > window.innerHeight * 0.7) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll(); // Run once at load

  // --- MOBILE NAV TOGGLE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- REVEAL ON SCROLL ANIMATIONS (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Animates once
        }
      });
    }, {
      root: null,
      threshold: 0,
      rootMargin: '-100px 0px -50px 0px' // Offset to trigger before fully visible
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --- SCROLL SPY (ACTIVE NAV LINKS) ---
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
  const mobileSpyLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const activeSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          // Update Desktop Links
          desktopLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          // Update Mobile Links
          mobileSpyLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      root: null,
      rootMargin: '-40% 0px -55% 0px', // Focus middle region
      threshold: 0
    });

    sections.forEach(section => activeSectionObserver.observe(section));
  }

  // --- CONTACT FORM AJAX HANDLING ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      // Update loading status
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      const formData = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        message: document.getElementById('form-message').value,
        _subject: "New message from portfolio",
        _captcha: "false",
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/gmbrosius@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (data.success === 'true' || data.success === true) {
          // Success
          formStatus.textContent = 'Message sent — talk soon.';
          formStatus.className = 'form-status success';
          formStatus.style.display = 'block';
          contactForm.reset();
        } else {
          // Server error
          throw new Error('FormSubmit error');
        }
      } catch (err) {
        // Network/system error
        formStatus.textContent = 'Something went wrong — try again.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }

  // --- PROJECT STICKY TITLE ---
  const stickyTitle = document.querySelector('.sticky-project-title');
  if (stickyTitle) {
    const checkStickyScroll = () => {
      if (window.scrollY > window.innerHeight * 0.35) {
        stickyTitle.classList.add('visible');
      } else {
        stickyTitle.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', checkStickyScroll, { passive: true });
    checkStickyScroll(); // Run once at load
  }
});
