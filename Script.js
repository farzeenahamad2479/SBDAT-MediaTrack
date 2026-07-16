/* ===================================================================
   MediaTrack — Auth UI interactions
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- track input "has value" state for icon accent ---- */
  document.querySelectorAll('.field').forEach(field => {
    const input = field.querySelector('input');
    if (!input) return;
    const sync = () => field.classList.toggle('has-value', input.value.trim().length > 0);
    input.addEventListener('input', sync);
    input.addEventListener('blur', sync);
    sync();
  });

  /* ---- password visibility toggles ---- */
  document.querySelectorAll('.field-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.classList.toggle('is-visible', isHidden);
      btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
  });

  /* ---- button ripple + press feedback ---- */
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

  /* ---- lightweight front-end-only validation ---- */
  const form = document.querySelector('form[data-auth-form]');
  if (form) {
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
      btn.textContent = form.dataset.authForm === 'signup' ? 'Creating account…' : 'Signing in…';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.textContent = 'Success ✓';
        setTimeout(() => {
          btn.textContent = originalLabel;
          btn.style.pointerEvents = '';
        }, 1200);
      }, 900);
    });
  }

  /* ---- smooth page transition on nav links ---- */
  document.querySelectorAll('a[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });

  /* ---- subtle parallax on the floating background slabs ---- */
  const slabs = document.querySelectorAll('.slab');
  if (slabs.length && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      slabs.forEach((slab, i) => {
        const depth = (i + 1) * 6;
        slab.style.marginLeft = `${x * depth}px`;
        slab.style.marginTop = `${y * depth}px`;
      });
    });
  }

});