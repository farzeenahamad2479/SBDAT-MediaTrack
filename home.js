/* ===================================================================
   MediaTrack — Home dashboard interactions
   =================================================================== */

/* -----------------------------------------------------------------
   Poster library — add more entries here any time; every row below
   is generated from this single source of truth.
   ----------------------------------------------------------------- */
const POSTERS = [
  { title: 'Dune',         src: 'assets/posters/dune.jpg',         category: 'Movies' },
  { title: 'Breaking Bad', src: 'assets/posters/breaking-bad.jpg', category: 'Series' },
  { title: 'One Piece',    src: 'assets/posters/one-piece.jpg',    category: 'Anime'  },
  { title: 'Chernobyl',    src: 'assets/posters/chernobyl.jpg',    category: 'Mini Series' },
  { title: 'Odyssey',      src: 'assets/posters/odyssey.jpg',      category: 'Coming Soon' },
  { title: 'Spider-Man',   src: 'assets/posters/spiderman.jpg',    category: 'Coming Soon' },
];

const WATCHLIST = [
  'Dune — Part Two',
  'Breaking Bad — S05',
  'One Piece — Wano Arc',
  'Chernobyl — Ep. 3',
  'The Odyssey',
];

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------------
     Image fallback (in case a poster hasn't been added to assets/posters yet)
     ----------------------------------------------------------------- */
  const handleImgFallback = (img) => {
    img.addEventListener('error', () => {
      const card = img.closest('.watch-card, .poster-card, .featured-card, .banner, .quiz-visual');
      if (card) card.classList.add('is-placeholder');
      img.style.display = 'none';
    }, { once: true });
  };
  document.querySelectorAll('img').forEach(handleImgFallback);

  /* -----------------------------------------------------------------
     Build Trending / Upcoming / Top Picks rows from POSTERS
     ----------------------------------------------------------------- */
  const buildRow = (containerId, items) => {
    const track = document.getElementById(containerId);
    if (!track) return;
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'poster-card';
      card.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <span class="poster-name">${item.title}</span>
      `;
      track.appendChild(card);
    });
  };

  buildRow('trendingRow', POSTERS);
  buildRow('upcomingRow', POSTERS.filter(p => p.category === 'Coming Soon').concat(POSTERS.slice(0, 3)));
  buildRow('topPicksRow', [...POSTERS].reverse());

  // re-attach fallback handling for the freshly injected images
  document.querySelectorAll('.poster-card img').forEach(handleImgFallback);

  /* -----------------------------------------------------------------
     Scroll-triggered fade/scale reveals
     ----------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('.banner, .watch-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* -----------------------------------------------------------------
     Subtle parallax zoom on cinematic banners while scrolling
     ----------------------------------------------------------------- */
  const banners = Array.from(document.querySelectorAll('.banner'));
  let ticking = false;

  const updateParallax = () => {
    const vh = window.innerHeight;
    banners.forEach(banner => {
      const rect = banner.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = 1 - Math.min(Math.max((rect.top) / vh, 0), 1); // 0 -> entering, 1 -> centered/past
      const media = banner.querySelector('.banner-media');
      if (media) {
        const translate = (progress - 0.5) * 24; // gentle vertical drift
        media.style.transform = `translateY(${translate}px)`;
      }
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();

  /* -----------------------------------------------------------------
     Daily Film Quiz — one lightweight, front-end-only round
     ----------------------------------------------------------------- */
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizVisual = document.querySelector('.quiz-visual');
  const quizResult = document.querySelector('.quiz-result');
  const correctAnswer = 'Dune';

  quizOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      quizOptions.forEach(b => b.disabled = true);
      quizVisual?.classList.add('is-revealed');
      if (btn.dataset.answer === correctAnswer) {
        btn.classList.add('is-correct');
        quizResult.textContent = "Correct — that's Dune.";
      } else {
        btn.classList.add('is-wrong');
        quizOptions.forEach(b => {
          if (b.dataset.answer === correctAnswer) b.classList.add('is-correct');
        });
        quizResult.textContent = 'Not quite — that was Dune.';
      }
      quizResult.classList.add('show');
    });
  });

  /* -----------------------------------------------------------------
     Random Pick from Watchlist
     ----------------------------------------------------------------- */
  const shuffleBtn = document.querySelector('.shuffle-btn');
  const pickEl = document.querySelector('.watchlist-pick');
  if (shuffleBtn && pickEl) {
    shuffleBtn.addEventListener('click', () => {
      pickEl.classList.add('is-swapping');
      setTimeout(() => {
        const pick = WATCHLIST[Math.floor(Math.random() * WATCHLIST.length)];
        pickEl.textContent = pick;
        pickEl.classList.remove('is-swapping');
      }, 220);
    });
  }

});