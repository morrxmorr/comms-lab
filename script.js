
/* Carousel below was done with DeepSeek*/

/* ====================================================
   Simple JS for Image Carousel 
   - Works even if a page doesn't have a carousel
   - Autoplay can be toggled with data-autoplay="true"
   - Change delay with data-interval="3000" (ms)
   ==================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(initCarousel);
});

function initCarousel(carousel) {
  const viewport = carousel.querySelector('.viewport');
  if (!viewport) return;

  const slides = [...viewport.querySelectorAll('img')];
  if (slides.length === 0) return;

  let index = 0;
  const dotsWrap = carousel.querySelector('.dots');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const autoplay = carousel.dataset.autoplay === 'true';
  const interval = parseInt(carousel.dataset.interval || '3500', 10);

  // Setup dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });

  function render() {
    slides.forEach((img, i) => img.classList.toggle('active', i === index));
    dotsWrap.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === index));
  }
  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  let timer = null;
  if (autoplay) {
    timer = setInterval(next, interval);
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => timer = setInterval(next, interval));
  }

  // Initial render
  render();
}

// === Matcha Cursor ****Created w/ GPT**** (Mouse sprite also frm GPT)===

(function () {
  const ICON_SRC = "matcha-cursor.png";     // normal cursor
  const ICON_DOWN_SRC = "matcha-click.png"; // pressed state (add this file)
  const SIZE = 54;

  // Disable on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  // Styles
  const style = document.createElement("style");
  style.textContent = `
    html, body, * { cursor: none !important; }
    input, textarea, select, [contenteditable="true"] { cursor: text !important; }
    @media (pointer: coarse) {
      html, body, * { cursor: auto !important; }
      #matcha-cursor { display: none !important; }
    }
    #matcha-cursor {
      position: fixed; top: 0; left: 0;
      width: ${SIZE}px; height: ${SIZE}px;
      transform: translate(-50%, -50%);
      pointer-events: none; z-index: 2147483647;
      opacity: 0; transition: opacity .12s linear, transform .06s ease;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  // Cursor element
  const cursor = document.createElement("img");
  cursor.id = "matcha-cursor";
  cursor.alt = "";
  cursor.src = ICON_SRC;
  document.body.appendChild(cursor);

  // Preload pressed image to avoid flicker
  const pressedImg = new Image();
  pressedImg.src = ICON_DOWN_SRC;

  let visible = false, x = 0, y = 0, raf = null;

  function show() { if (!visible) { cursor.style.opacity = "1"; visible = true; } }
  function hide() { if (visible) { cursor.style.opacity = "0"; visible = false; } }
  function move() {
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    raf = null;
  }

  document.addEventListener("mousemove", (e) => {
    show();
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(move);
  });
  document.addEventListener("mouseleave", hide);

  // Swap image on press
  const down = () => {
    cursor.src = pressedImg.complete ? ICON_DOWN_SRC : ICON_SRC;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1.0) rotate(6deg)`;
  };
  const up = () => {
    cursor.src = ICON_SRC;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  // Cover mouse & pointer events
  document.addEventListener("mousedown", down);
  document.addEventListener("mouseup", up);
  document.addEventListener("pointerdown", down);
  document.addEventListener("pointerup", up);
  window.addEventListener("blur", up);

  // Helpful warning if image missing
  cursor.addEventListener("error", () => {
    console.warn("Matcha cursor: image not found at", cursor.src);
    hide();
  });
})();


