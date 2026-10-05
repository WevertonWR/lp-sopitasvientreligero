/**
 * ============================================
 * SOPITAS — Landing Page LATAM
 * Interactive Behaviors & Configuration
 * ============================================
 */

(function () {
  'use strict';

  /* ===================================================================
     CONFIGURATION — Edit these values to set up your offer
     =================================================================== */
  const CONFIG = {
    // ===== CHECKOUT URL: Your payment page link =====
    checkoutUrl: 'https://pay.hotmart.com/H107896872I?checkoutMode=10', // Replace with your real checkout URL, e.g. 'https://pay.hotmart.com/XXXXX'

    // ===== PRICE: Display price and currency =====
    price: '10.90',       // e.g. '29.90' or '197'
    oldPrice: '27.90',    // Anchor price to show discount
    currency: '$ ',      // e.g. '$ ', 'MXN $ '
    paymentNote: '',       // e.g. 'Pago único' or '3 cuotas sin interés de $XX'

    // ===== ACCESS: How does the buyer receive the material? =====
    accessNote: '',        // e.g. 'Acceso inmediato después de la confirmación del pago'

    // ===== CONTACT =====
    contactEmail: 'contacto@sopitas.com', // Your real contact email

    // ===== TESTIMONIALS: Set to true when you have real reviews =====
    showTestimonials: true,
  };
  /* =================================================================== */


  /* ----- Apply Configuration ----- */
  function applyConfig() {
    // Price
    const priceEl = document.getElementById('config-price');
    if (priceEl) priceEl.textContent = CONFIG.price;

    const oldPriceEls = document.querySelectorAll('.config-old-price');
    oldPriceEls.forEach(el => el.textContent = CONFIG.oldPrice);

    const currencyEl = document.getElementById('config-currency');
    if (currencyEl) currencyEl.textContent = CONFIG.currency;

    const oldCurrencyEls = document.querySelectorAll('.config-old-currency');
    oldCurrencyEls.forEach(el => el.textContent = CONFIG.currency);

    const paymentNoteEl = document.getElementById('config-payment-note');
    if (paymentNoteEl) paymentNoteEl.textContent = CONFIG.paymentNote;

    // Access
    const accessEl = document.getElementById('config-access');
    if (accessEl) accessEl.textContent = CONFIG.accessNote;

    // Contact email
    const contactEl = document.getElementById('config-contact-email');
    if (contactEl) {
      contactEl.href = 'mailto:' + CONFIG.contactEmail;
      contactEl.textContent = CONFIG.contactEmail;
    }

    // Footer year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Checkout links — all CTA buttons pointing to checkout
    const checkoutLinks = document.querySelectorAll('.checkout-link');
    checkoutLinks.forEach(function (link) {
      // Only update links that point to "#" or start with "#oferta" for the offer button
      if (CONFIG.checkoutUrl && CONFIG.checkoutUrl !== '#oferta') {
        // If a real checkout URL is set, the offer CTA opens it
        if (link.id === 'cta-offer') {
          link.href = CONFIG.checkoutUrl;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        // All other CTAs still scroll to the offer section
      }
    });

    // Testimonials section
    const testimonialSection = document.getElementById('opiniones');
    if (testimonialSection) {
      if (CONFIG.showTestimonials) {
        testimonialSection.classList.add('has-testimonials');
      } else {
        testimonialSection.classList.remove('has-testimonials');
      }
    }
  }


  /* ----- Smooth Scroll for Anchor Links ----- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const offset = 20; // Small offset from top
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }


  /* ----- Sticky Mobile CTA ----- */
  function initStickyCTA() {
    var stickyCta = document.getElementById('sticky-cta');
    var heroSection = document.getElementById('hero');
    if (!stickyCta || !heroSection) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          stickyCta.classList.remove('visible');
          stickyCta.setAttribute('aria-hidden', 'true');
        } else {
          stickyCta.classList.add('visible');
          stickyCta.setAttribute('aria-hidden', 'false');
        }
      });
    }, { threshold: 0 });

    observer.observe(heroSection);
  }


  /* ----- FAQ Accordion ----- */
  function initAccordion() {
    var items = document.querySelectorAll('.accordion-item');

    items.forEach(function (item) {
      var header = item.querySelector('.accordion-header');
      var content = item.querySelector('.accordion-content');

      if (!header || !content) return;

      header.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');

        // Close all other items
        items.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            var otherContent = otherItem.querySelector('.accordion-content');
            var otherHeader = otherItem.querySelector('.accordion-header');
            if (otherContent) otherContent.style.maxHeight = '0';
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        if (isOpen) {
          item.classList.remove('active');
          content.style.maxHeight = '0';
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }


  /* ----- Image Modal / Lightbox ----- */
  function initModal() {
    var overlay = document.getElementById('image-modal');
    var modalImg = document.getElementById('modal-img');
    var closeBtn = document.getElementById('modal-close');

    if (!overlay || !modalImg) return;

    // Close handlers
    function closeModal() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Global function called from inline onclick
  window.openModal = function (imgEl) {
    var overlay = document.getElementById('image-modal');
    var modalImg = document.getElementById('modal-img');
    if (!overlay || !modalImg) return;

    modalImg.src = imgEl.src;
    modalImg.alt = imgEl.alt;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };


  /* ----- Scroll Reveal Animation ----- */
  function initScrollReveal() {
    var revealElements = document.querySelectorAll(
      '.for-whom-card, .module-card, .step-card, .bonus-card, .security-badge, .guarantee-card, .accordion-item'
    );

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      revealElements.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Set initial state
    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger animation based on sibling index
          var parent = entry.target.parentElement;
          var siblings = parent ? Array.from(parent.children) : [];
          var index = siblings.indexOf(entry.target);
          var delay = Math.min(index * 80, 400);

          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }


  /* ----- Touch Carousel Indicators ----- */
  function initCarouselHint() {
    var tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(function (track) {
      // Add subtle shadow hint for scrollability
      function updateScrollHint() {
        var canScrollLeft = track.scrollLeft > 10;
        var canScrollRight = track.scrollLeft < (track.scrollWidth - track.clientWidth - 10);

        track.style.maskImage = canScrollLeft && canScrollRight
          ? 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
          : canScrollRight
            ? 'linear-gradient(to right, black 95%, transparent 100%)'
            : canScrollLeft
              ? 'linear-gradient(to right, transparent 0%, black 5%)'
              : 'none';

        track.style.webkitMaskImage = track.style.maskImage;
      }

      track.addEventListener('scroll', updateScrollHint, { passive: true });
      // Initial check
      setTimeout(updateScrollHint, 100);
    });
  }


  /* ----- Module Details Modal/Accordion ----- */
  function initModuleDetails() {
    const isDesktop = () => window.innerWidth >= 769;
    const cards = document.querySelectorAll('.module-card');
    const modal = document.getElementById('module-modal');
    const modalBody = document.getElementById('module-modal-body');
    const modalClose = document.querySelector('.global-modal-close');
    
    if (!modal) return;

    const closeModal = () => {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });

    cards.forEach(card => {
        const btn = card.querySelector('.btn-ver-mas');
        if (!btn) return;
        
        const detailsContent = card.querySelector('.module-details-content').innerHTML;
        const num = card.querySelector('.module-number').textContent;
        const title = card.querySelector('h3').textContent;

        btn.addEventListener('click', () => {
            if (isDesktop()) {
                // Desktop: Open modal
                modalBody.innerHTML = `
                    <div class="modal-header-info" style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
                        <div class="module-number" style="margin-bottom:0;">${num}</div>
                        <h3 style="font-family:var(--font-heading); font-size:20px; color:var(--green-deep); line-height:1.2; margin:0;">${title}</h3>
                    </div>
                    <div class="modal-details-injected">
                        ${detailsContent}
                    </div>
                `;
                modal.classList.add('is-active');
                document.body.style.overflow = 'hidden';
            } else {
                // Mobile: Accordion toggle
                const isOpen = card.classList.contains('is-open');
                
                // Close all others
                cards.forEach(c => {
                    c.classList.remove('is-open');
                    const b = c.querySelector('.btn-ver-mas');
                    if (b) {
                        b.querySelector('.btn-text').innerHTML = 'Ver qué incluye &rarr;';
                        b.setAttribute('aria-expanded', 'false');
                    }
                });

                if (!isOpen) {
                    card.classList.add('is-open');
                    btn.querySelector('.btn-text').innerHTML = 'Ver menos &uarr;';
                    btn.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });
  }


  /* ----- Localize Price ----- */
  async function localizePrice() {
    try {
      const geoRes = await fetch('https://get.geojs.io/v1/ip/country.json');
      const geoData = await geoRes.json();
      const countryCode = geoData.country;

      const countryToCurrency = {
        'BR': 'BRL', 'MX': 'MXN', 'CO': 'COP', 'CL': 'CLP',
        'AR': 'ARS', 'PE': 'PEN', 'ES': 'EUR', 'US': 'USD'
      };

      const userCurrency = countryToCurrency[countryCode] || 'USD';
      if (userCurrency === 'USD') return;

      const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
      const rateData = await rateRes.json();

      if (rateData && rateData.rates && rateData.rates[userCurrency]) {
        const rate = rateData.rates[userCurrency];
        const basePrice = parseFloat(CONFIG.price.replace(',', '.'));
        const baseOldPrice = parseFloat(CONFIG.oldPrice.replace(',', '.'));
        let localPrice = basePrice * rate;
        let localOldPrice = baseOldPrice * rate;

        let currencySymbol = userCurrency + ' ';
        const symbols = {
          'BRL': 'R$ ', 'MXN': 'MXN $ ', 'COP': 'COP $ ', 'CLP': 'CLP $ ',
          'ARS': 'ARS $ ', 'PEN': 'S/ ', 'EUR': '€ '
        };

        if (symbols[userCurrency]) {
          currencySymbol = symbols[userCurrency];
        }

        let formattedPrice, formattedOldPrice;
        if (['CLP', 'COP'].includes(userCurrency)) {
           formattedPrice = Math.round(localPrice).toLocaleString('es-CL');
           formattedOldPrice = Math.round(localOldPrice).toLocaleString('es-CL');
        } else {
           formattedPrice = localPrice.toFixed(2).replace('.', ',');
           formattedOldPrice = localOldPrice.toFixed(2).replace('.', ',');
        }

        const priceEl = document.getElementById('config-price');
        const oldPriceEls = document.querySelectorAll('.config-old-price');
        const currencyEl = document.getElementById('config-currency');
        const oldCurrencyEls = document.querySelectorAll('.config-old-currency');
        
        if (priceEl) priceEl.textContent = formattedPrice;
        if (currencyEl) currencyEl.textContent = currencySymbol;
        
        oldPriceEls.forEach(el => el.textContent = formattedOldPrice);
        oldCurrencyEls.forEach(el => el.textContent = currencySymbol);
      }
    } catch (err) {
      console.warn('Geolocation pricing failed:', err);
    }
  }


  /* ----- Initialize Everything ----- */
  function init() {
    applyConfig();
    localizePrice();
    initSmoothScroll();
    initStickyCTA();
    initAccordion();
    initModal();
    initScrollReveal();
    initCarouselHint();
    initModuleDetails();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
