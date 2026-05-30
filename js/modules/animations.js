export function initAnimations() {
  // ── Typing Animation (Typed.js) ──
  const typingText = document.getElementById('typing-text');
  if (typingText && typeof Typed !== 'undefined') {
    new Typed('#typing-text', {
      strings: [
        'Digital Creator',
        'Web Developer',
        'Tech Explorer',
        'Problem Solver'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      cursorChar: '|',
      smartBackspace: true
    });
  }

  // ── Initialize AOS (Animate On Scroll) ──
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }
}
