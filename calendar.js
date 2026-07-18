/* ===================================================================
   MediaTrack — "Coming This Month" calendar
   =================================================================== */

/* -----------------------------------------------------------------
   Release schedule — add more entries any time; the timeline below
   groups and renders itself from this single source of truth.
   Poster convention: assets/posters/calendar/<slug>.jpg
   (falls back to a quiet placeholder until a real poster is added)
   ----------------------------------------------------------------- */
const RELEASES = [
  { date: 'August 2', title: 'Lioness', season: 'Season 3', type: 'TV Series', platform: 'Paramount+', slug: 'lioness-s3' },

  { date: 'August 3', title: 'Futurama', season: 'Season 14', type: 'Animated Series', platform: 'Hulu', slug: 'futurama-s14' },

  { date: 'August 5', title: 'Ted Lasso', season: 'Season 4', type: 'TV Series', platform: 'Apple TV+', slug: 'ted-lasso-s4' },
  { date: 'August 5', title: 'Sterling Point', season: 'Season 1', type: 'TV Series', platform: 'Amazon Prime Video', slug: 'sterling-point-s1' },
  { date: 'August 5', title: 'The Shards', season: '', type: 'Miniseries', platform: 'FX on Hulu', slug: 'the-shards' },

  { date: 'August 6', title: 'Monsters of God', season: '', type: 'TV Series', platform: 'Max (HBO)', slug: 'monsters-of-god' },
  { date: 'August 6', title: 'Aryabhatt Ka Zero', season: '', type: 'Movie', platform: 'Theatrical Release', slug: 'aryabhatt-ka-zero' },

  { date: 'August 7', title: 'Tony', season: '', type: 'Movie', platform: 'Theatrical (A24)', slug: 'tony' },
  { date: 'August 7', title: 'One Night Only', season: '', type: 'Movie', platform: 'Theatrical (Universal)', slug: 'one-night-only' },
  { date: 'August 7', title: 'Alley Cats', season: '', type: 'TV Series / Special', platform: 'Netflix', slug: 'alley-cats' },

  { date: 'August 9', title: 'The Chosen in the Wild with Bear Grylls', season: '', type: 'Unscripted Series', platform: 'Amazon Prime Video', slug: 'chosen-in-the-wild' },

  { date: 'August 12', title: 'Reacher', season: 'Season 4', type: 'TV Series', platform: 'Amazon Prime Video', slug: 'reacher-s4' },
  { date: 'August 12', title: 'Re:Zero – Starting Life in Another World', season: 'Season 4, Part 2', type: 'Anime', platform: 'Crunchyroll', slug: 'rezero-s4p2' },

  { date: 'August 13', title: 'Tires', season: 'Season 3', type: 'Comedy Series', platform: 'Netflix', slug: 'tires-s3' },
  { date: 'August 13', title: 'Awarapan 2', season: '', type: 'Movie', platform: 'Theatrical Release', slug: 'awarapan-2' },

  { date: 'August 14', title: 'The End of Oak Street', season: '', type: 'Movie', platform: 'Warner Bros.', slug: 'end-of-oak-street' },
  { date: 'August 14', title: 'PAW Patrol: The Dino Movie', season: '', type: 'Animated Movie', platform: 'Paramount', slug: 'paw-patrol-dino-movie' },

  { date: 'August 16', title: 'Lanterns', season: 'Season 1', type: 'DC TV Series', platform: 'Max', slug: 'lanterns-s1' },

  { date: 'August 17', title: "It's Always Sunny in Philadelphia", season: 'Season 18', type: 'TV Series', platform: 'FXX / Hulu', slug: 'always-sunny-s18' },

  { date: 'August 20', title: 'Outer Banks', season: 'Season 5', type: 'TV Series', platform: 'Netflix', slug: 'outer-banks-s5' },

  { date: 'August 21', title: 'Insidious: Out of the Further', season: '', type: 'Horror Movie', platform: 'Sony Pictures', slug: 'insidious-out-of-the-further' },
  { date: 'August 21', title: 'Mutiny', season: '', type: 'Action Movie', platform: 'Lionsgate', slug: 'mutiny' },

  { date: 'August 26', title: 'One Hundred Years of Solitude: Part Two', season: '', type: 'Miniseries', platform: 'Netflix', slug: 'hundred-years-of-solitude-p2' },

  { date: 'August 28', title: 'Puella Magi Madoka Magica the Movie – Walpurgisnacht: Rising', season: '', type: 'Anime Movie', platform: 'Theatrical', slug: 'madoka-magica-walpurgisnacht' },
  { date: 'August 28', title: 'Coyote vs. Acme', season: '', type: 'Live Action / Animated Movie', platform: 'Theatrical', slug: 'coyote-vs-acme' },
  { date: 'August 28', title: 'The Dog Stars', season: '', type: 'Sci-Fi Drama Movie', platform: 'Theatrical', slug: 'dog-stars' },
];

/* type -> monochrome pill icon */
function typeIcon(type) {
  if (/anime/i.test(type)) return '🎌';
  if (/miniseries/i.test(type)) return '🎞';
  if (/animated/i.test(type)) return '🎨';
  if (/movie/i.test(type)) return '🎬';
  return '📺';
}

document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('timeline');
  if (!track) return;

  /* -----------------------------------------------------------------
     Group the flat RELEASES array by date, preserving chronological
     order of first appearance.
     ----------------------------------------------------------------- */
  const grouped = [];
  const indexByDate = {};
  RELEASES.forEach(item => {
    if (!(item.date in indexByDate)) {
      indexByDate[item.date] = grouped.length;
      grouped.push({ date: item.date, items: [] });
    }
    grouped[indexByDate[item.date]].items.push(item);
  });

  /* -----------------------------------------------------------------
     Render
     ----------------------------------------------------------------- */
  grouped.forEach(group => {
    const dateBlock = document.createElement('div');
    dateBlock.className = 'date-block';

    const divider = document.createElement('div');
    divider.className = 'date-divider';
    divider.innerHTML = `<h2 class="date-heading">${group.date.toUpperCase()}</h2>`;
    dateBlock.appendChild(divider);

    const cardsWrap = document.createElement('div');
    cardsWrap.className = 'date-cards';

    group.items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'release-card';
      card.innerHTML = `
        <div class="release-poster">
          <img src="assets/posters/calendar/${item.slug}.jpg" alt="${item.title}" loading="lazy" decoding="async">
        </div>
        <div class="release-info">
          <h3 class="release-title">${item.title}</h3>
          ${item.season ? `<p class="release-season">${item.season}</p>` : ''}
          <div class="release-meta">
            <span class="meta-pill"><span class="icon">${typeIcon(item.type)}</span>${item.type}</span>
            <span class="meta-item"><span class="icon">🖥</span>${item.platform}</span>
            <span class="meta-item"><span class="icon">📅</span>${group.date}</span>
          </div>
        </div>
      `;
      cardsWrap.appendChild(card);
    });

    dateBlock.appendChild(cardsWrap);
    track.appendChild(dateBlock);
  });

  /* -----------------------------------------------------------------
     Poster fallback — quiet placeholder with the type icon until a
     real poster is added at assets/posters/calendar/<slug>.jpg
     ----------------------------------------------------------------- */
  document.querySelectorAll('.release-poster img').forEach((img) => {
    img.addEventListener('error', () => {
      const wrap = img.closest('.release-poster');
      const icon = wrap.parentElement.querySelector('.meta-pill .icon')?.textContent || '🎬';
      wrap.classList.add('is-placeholder');
      wrap.innerHTML = `<span class="placeholder-icon">${icon}</span>`;
    }, { once: true });
  });

  /* -----------------------------------------------------------------
     Scroll-triggered fade-up reveal
     ----------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.release-card').forEach(card => revealObserver.observe(card));

});