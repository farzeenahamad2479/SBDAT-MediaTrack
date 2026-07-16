/* ===================================================================
   MediaTrack — interactions
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------------
     Graceful fallback for img1 (logo) / img2 (hero background):
     if the real asset hasn't been placed at assets/logo.png or
     assets/hero-bg.jpg yet, swap in the quiet CSS placeholder
     instead of showing a broken image.
     ----------------------------------------------------------------- */
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = document.querySelector(img.dataset.fallback);
      img.style.display = 'none';
      if (fallback) fallback.classList.add('is-fallback', 'show');
    }, { once: true });
  });

  /* -----------------------------------------------------------------
     Hero -> login cinematic reveal (index.html only)
     ----------------------------------------------------------------- */
  const beginBtn = document.querySelector('[data-begin-journey]');
  if (beginBtn) {
    const hero = document.querySelector('.hero');
    const authStage = document.querySelector('.auth-stage.is-embedded');

    beginBtn.addEventListener('click', () => {
      hero.classList.add('is-leaving');
      setTimeout(() => {
        authStage.classList.add('is-visible');
        authStage.querySelector('input')?.focus({ preventScroll: true });
      }, 500);
    });
  }

  /* -----------------------------------------------------------------
     "has value" state, kept purely for potential future styling
     ----------------------------------------------------------------- */
  document.querySelectorAll('.field').forEach(field => {
    const input = field.querySelector('input');
    if (!input) return;
    const sync = () => field.classList.toggle('has-value', input.value.trim().length > 0);
    input.addEventListener('input', sync);
    input.addEventListener('blur', sync);
    sync();
  });

  /* -----------------------------------------------------------------
     Password visibility toggles
     ----------------------------------------------------------------- */
  document.querySelectorAll('.field-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
  });

  /* -----------------------------------------------------------------
     Button ripple (monochrome — no colour)
     ----------------------------------------------------------------- */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.6;
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* -----------------------------------------------------------------
     Front-end-only validation
     ----------------------------------------------------------------- */
  document.querySelectorAll('form[data-auth-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      let firstBadInput = null;

      form.querySelectorAll('input[required]').forEach(input => {
        const errorEl = form.querySelector(`.field-error[data-for="${input.name}"]`);
        let message = '';

        if (!input.value.trim()) {
          message = 'This field is required.';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          message = 'Enter a valid email address.';
        } else if (input.name === 'password' && input.value.length < 6) {
          message = 'Use at least 6 characters.';
        } else if (input.name === 'confirmPassword') {
          const pass = form.querySelector('input[name="password"]');
          if (pass && input.value !== pass.value) message = 'Passwords do not match.';
        }

        if (errorEl) {
          errorEl.textContent = message;
          errorEl.classList.toggle('show', !!message);
        }
        if (message) {
          valid = false;
          if (!firstBadInput) firstBadInput = input;
        }
      });

      if (!valid) {
        firstBadInput?.focus();
        return;
      }

      const btn = form.querySelector('.btn-primary');
      const originalLabel = btn.textContent;
      btn.textContent = form.dataset.authForm === 'signup' ? 'Creating Account…' : 'Signing In…';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.textContent = 'Welcome';
        setTimeout(() => {
          btn.textContent = originalLabel;
          btn.style.pointerEvents = '';
        }, 1200);
      }, 900);
    });
  });

  /* -----------------------------------------------------------------
     Cinematic page-to-page transition (login.html <-> signup.html)
     ----------------------------------------------------------------- */
  document.querySelectorAll('a[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });

});