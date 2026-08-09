/**
 * Call Lens landing page — client-side behavior.
 * - Mobile nav toggle
 * - Scroll reveal animations (respects prefers-reduced-motion)
 * - Lead capture form validation + mock submission handling
 */
(function () {
  'use strict';

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Lead capture form ---------------- */
  var form = document.getElementById('demo-request-form');
  if (!form) return;

  var statusBox = document.getElementById('form-status');
  var submitBtn = form.querySelector('button[type="submit"]');

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var validators = {
    name: function (value) {
      if (!value.trim()) return 'Please enter your full name.';
      if (value.trim().length < 2) return 'Name looks too short.';
      return '';
    },
    email: function (value) {
      if (!value.trim()) return 'Please enter your work email.';
      if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email address.';
      return '';
    },
    company: function (value) {
      if (!value.trim()) return 'Please enter your company name.';
      return '';
    },
    teamSize: function (value) {
      if (!value) return 'Please select a team size.';
      return '';
    },
    phone: function () {
      return ''; // optional field
    }
  };

  function fieldEls(name) {
    var input = form.elements[name];
    var errorEl = form.querySelector('[data-error-for="' + name + '"]');
    return { input: input, errorEl: errorEl };
  }

  function validateField(name) {
    var refs = fieldEls(name);
    if (!refs.input) return true;
    var validate = validators[name];
    var message = validate ? validate(refs.input.value) : '';

    if (message) {
      refs.input.setAttribute('aria-invalid', 'true');
      if (refs.errorEl) refs.errorEl.textContent = message;
      return false;
    }

    refs.input.removeAttribute('aria-invalid');
    if (refs.errorEl) refs.errorEl.textContent = '';
    return true;
  }

  Object.keys(validators).forEach(function (name) {
    var refs = fieldEls(name);
    if (!refs.input) return;
    refs.input.addEventListener('blur', function () { validateField(name); });
    refs.input.addEventListener('input', function () {
      if (refs.input.getAttribute('aria-invalid') === 'true') validateField(name);
    });
  });

  function setStatus(type, message) {
    if (!statusBox) return;
    statusBox.className = 'form-status ' + type;
    statusBox.textContent = message;
    statusBox.setAttribute('role', type === 'error' ? 'alert' : 'status');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var fieldNames = Object.keys(validators);
    var allValid = fieldNames.map(validateField).every(Boolean);

    if (!allValid) {
      setStatus('error', 'Please fix the highlighted fields and try again.');
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      company: form.elements.company.value.trim(),
      teamSize: form.elements.teamSize.value,
      phone: form.elements.phone.value.trim(),
      submittedAt: new Date().toISOString()
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    // No backend is wired up yet — persist locally so the request isn't lost,
    // and surface a clear success state to the visitor.
    try {
      var existing = JSON.parse(window.localStorage.getItem('callLensDemoRequests') || '[]');
      existing.push(payload);
      window.localStorage.setItem('callLensDemoRequests', JSON.stringify(existing));
    } catch (storageError) {
      // localStorage may be unavailable (private mode, quota) — non-fatal.
      console.warn('Could not persist demo request locally:', storageError);
    }

    window.setTimeout(function () {
      setStatus('success', "Thanks, " + payload.name.split(' ')[0] + " — we'll be in touch within one business day to schedule your demo.");
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request My Demo';
    }, 500);
  });
})();
