export function initParticles() {
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
      fpsLimit: 30, // Reduced from 60 to 30 to cut rendering cost in half
      particles: {
        number: {
          value: 30, // Reduced from 50
          density: {
            enable: true,
            value_area: 1000 // Spread out more
          }
        },
        color: {
          value: ["#06b6d4", "#8b5cf6", "#ffffff"] // Cyan, Purple, White to match theme
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        }
      },
      retina_detect: false // Disabled to save GPU memory and rendering time
    }).then(container => {
      // PERFORMANCE HACK: Pause particles during scroll to guarantee 60fps scrolling
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        if (container) {
          container.pause();
          
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            container.play();
          }, 150);
        }
      }, { passive: true });
    });
  }
}
