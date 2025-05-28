function begin() {
  window.location.href = "begin.html";
}

function table() {
  window.location.href = "tableofcontents.html";
}

function results() {
  window.location.href = "results.html";
}

function events() {
  window.location.href = "events.html"; // Replace [placeholder] if needed
}

function goTo(page) {
  window.location.href = page;
}

const carousels = {};

function scrollCarousel(id, direction) {
  const container = document.querySelector(`.carousel[data-id="${id}"]`);
  const images = container.querySelectorAll('.carousel-image');

  if (!carousels[id]) carousels[id] = 0;

  images[carousels[id]].classList.remove('active');

  carousels[id] = (carousels[id] + direction + images.length) % images.length;

  images[carousels[id]].classList.add('active');
}

function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const id = carousel.dataset.id;
    const images = carousel.querySelectorAll('.carousel-image');
    if (images.length > 0) {
      carousels[id] = 0;
      images[0].classList.add('active');
    }

    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    prevBtn?.addEventListener('click', () => scrollCarousel(id, -1));
    nextBtn?.addEventListener('click', () => scrollCarousel(id, 1));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Accordion
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains('open');

      if (isOpen) {
        content.classList.remove('open');
        content.style.maxHeight = null;
        header.classList.remove('active');
      } else {
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.classList.add('active');
      }
    });
  });

  // Redacted
  document.querySelectorAll('.redacted').forEach(el => {
    el.addEventListener('click', () => {
      if (!el.classList.contains('revealed')) {
        el.textContent = el.dataset.reveal;
        el.classList.add('revealed');
      }
    });
  });

  // Initialize carousels
  initCarousels();
});

// Animate progress bars
window.addEventListener('load', () => {
  document.querySelectorAll('.progress-fill').forEach(el => {
    const pct = el.style.getPropertyValue('--pct') || '0%';
    setTimeout(() => {
      el.style.width = pct;
    }, 100);
  });
});

// Optional: Arrow key navigation
document.addEventListener('keydown', e => {
  if (document.activeElement.tagName.toLowerCase() === 'input') return;
  const visibleCarousel = document.querySelector('.carousel-image.active')?.closest('.carousel');
  const id = visibleCarousel?.dataset.id;
  if (!id) return;

  if (e.key === 'ArrowRight') scrollCarousel(id, 1);
  if (e.key === 'ArrowLeft') scrollCarousel(id, -1);
});
