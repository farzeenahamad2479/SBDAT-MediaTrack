/* ===================================================================
   MediaTrack — interactions
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------------
     Graceful fallback for logo / hero background
     ----------------------------------------------------------------- */
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = document.querySelector(img.dataset.fallback);
      img.style.display = 'none';
      if (fallback) fallback.classList.add('is-fallback', 'show');
    }, { once: true });
  });

  /* -----------------------------------------------------------------
     Hero -> Login reveal (index.html)
     ----------------------------------------------------------------- */
  const beginBtn = document.querySelector('[data-begin-journey]');

  if (beginBtn) {

    const hero = document.querySelector('.hero');
    const authStage = document.querySelector('.auth-stage.is-embedded');

    beginBtn.addEventListener('click', () => {

      hero.classList.add('is-leaving');

      setTimeout(() => {

        authStage.classList.add('is-visible');
        authStage.querySelector('input')?.focus({
          preventScroll: true
        });

      }, 500);

    });

  }

  /* -----------------------------------------------------------------
     Input has-value styling
     ----------------------------------------------------------------- */
  document.querySelectorAll('.field').forEach(field => {

    const input = field.querySelector('input');

    if (!input) return;

    const sync = () => {
      field.classList.toggle(
        'has-value',
        input.value.trim().length > 0
      );
    };

    input.addEventListener('input', sync);
    input.addEventListener('blur', sync);

    sync();

  });

  /* -----------------------------------------------------------------
     Password show / hide
     ----------------------------------------------------------------- */
  document.querySelectorAll('.field-toggle').forEach(btn => {

    btn.addEventListener('click', () => {

      const input = btn.parentElement.querySelector('input');

      if (!input) return;

      const hidden = input.type === 'password';

      input.type = hidden ? 'text' : 'password';

      btn.setAttribute(
        'aria-label',
        hidden ? 'Hide password' : 'Show password'
      );

    });

  });

  /* -----------------------------------------------------------------
     Ripple animation
     ----------------------------------------------------------------- */
  document.querySelectorAll('.btn-primary').forEach(btn => {

    btn.addEventListener('click', function (e) {

      const rect = btn.getBoundingClientRect();

      const ripple = document.createElement('span');

      const size = Math.max(rect.width, rect.height) * 1.6;

      ripple.className = 'ripple';

      ripple.style.width = ripple.style.height = size + 'px';

      ripple.style.left =
        (e.clientX - rect.left - size / 2) + 'px';

      ripple.style.top =
        (e.clientY - rect.top - size / 2) + 'px';

      btn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 650);

    });

  });

  /* -----------------------------------------------------------------
     Login + Signup
     ----------------------------------------------------------------- */

  document.querySelectorAll('form[data-auth-form]').forEach(form => {

    form.addEventListener('submit', (e) => {

      e.preventDefault();

      let valid = true;
      let firstBadInput = null;

      form.querySelectorAll('input[required]').forEach(input => {

        const error =
          form.querySelector(`.field-error[data-for="${input.name}"]`);

        let message = '';

        if (!input.value.trim()) {

          message = 'This field is required.';

        }
        else if (
          input.type === 'email' &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
        ) {

          message = 'Enter a valid email address.';

        }
        else if (
          input.name === 'password' &&
          form.dataset.authForm === 'signup' &&
          input.value.length < 6
        ) {

          message = 'Use at least 6 characters.';

        }
        else if (input.name === 'confirmPassword') {

          const pass =
            form.querySelector('input[name="password"]');

          if (pass && pass.value !== input.value) {

            message = 'Passwords do not match.';

          }

        }

        if (error) {

          error.textContent = message;
          error.classList.toggle('show', !!message);

        }

        if (message) {

          valid = false;

          if (!firstBadInput)
            firstBadInput = input;

        }

      });

      if (!valid) {

        firstBadInput?.focus();
        return;

      }

      const btn = form.querySelector('.btn-primary');

      const original = btn.textContent;

      /* ============================================================
         LOGIN
         ============================================================ */

      if (form.dataset.authForm === 'login') {

        const identifier =
          form.querySelector('input[name="identifier"]').value.trim();

        const password =
          form.querySelector('input[name="password"]').value;

        const passwordError =
          form.querySelector('.field-error[data-for="password"]');

        const validUser =

          identifier.toLowerCase() === 'demo' ||

          identifier.toLowerCase() === 'demo@mediatrack.com';

        if (!validUser || password !== '1234') {

          if (passwordError) {

            passwordError.textContent =
              'Incorrect email/username or password.';

            passwordError.classList.add('show');

          }

          form.querySelector(
            'input[name="password"]'
          ).focus();

          return;

        }

        if (passwordError) {

          passwordError.textContent = '';

          passwordError.classList.remove('show');

        }

        btn.textContent = 'Signing In...';

        btn.style.pointerEvents = 'none';

        setTimeout(() => {

          btn.textContent = 'Welcome';

          document.body.classList.add('leaving');

          setTimeout(() => {

            window.location.href = 'home.html';

          }, 380);

        }, 700);

        return;

      }

      /* ============================================================
         SIGNUP
         ============================================================ */

      btn.textContent = 'Creating Account...';

      btn.style.pointerEvents = 'none';

      setTimeout(() => {

        btn.textContent = 'Account Created ✓';

        setTimeout(() => {

          document.body.classList.add('leaving');

          setTimeout(() => {

            window.location.href = 'login.html';

          }, 380);

        }, 900);

      }, 900);

    });

  });

  /* -----------------------------------------------------------------
     Smooth page transitions
     ----------------------------------------------------------------- */

  document.querySelectorAll('a[data-nav]').forEach(link => {

    link.addEventListener('click', e => {

      const href = link.getAttribute('href');

      if (!href) return;

      e.preventDefault();

      document.body.classList.add('leaving');

      setTimeout(() => {

        window.location.href = href;

      }, 380);

    });

  });

});