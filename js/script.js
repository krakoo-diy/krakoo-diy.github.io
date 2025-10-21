// script.js — interactions du ePortfolio

document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('y');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Filtres des projets
  const chips = document.querySelectorAll('.chip');
  const grid = document.getElementById('projectsGrid');
  const cards = grid ? Array.from(grid.querySelectorAll('.project')) : [];
  const search = document.getElementById('searchInput');

  function applyFilters() {
    const activeChip = document.querySelector('.chip[aria-pressed="true"]');
    const tag = activeChip ? activeChip.dataset.filter : 'all';
    const q = (search && search.value || '').toLowerCase();

    cards.forEach(c => {
      const tags = (c.dataset.tags || '').split(/\s+/);
      const title = c.querySelector('h3').textContent.toLowerCase();
      const tech = Array.from(c.querySelectorAll('.pill')).map(p => p.textContent.toLowerCase()).join(' ');
      const matchTag = tag === 'all' || tags.includes(tag);
      const matchText = !q || title.includes(q) || tech.includes(q);
      c.style.display = (matchTag && matchText) ? '' : 'none';
    });
  }

  chips.forEach(ch => {
    ch.addEventListener('click', () => {
      chips.forEach(x => x.setAttribute('aria-pressed', 'false'));
      ch.setAttribute('aria-pressed', 'true');
      applyFilters();
    });
  });

  if (search) search.addEventListener('input', applyFilters);

  // Modal d'image
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  if (modal && modalImg && modalClose) {
    document.querySelectorAll('.project img').forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.dataset.full || img.src;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modalImg.removeAttribute('src');
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) modalClose.click();
    });
  }
});
