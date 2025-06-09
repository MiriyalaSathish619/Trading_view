  // Animate hero text: fade in from left with stagger
  const tl = gsap.timeline({ defaults: { opacity: 0, ease: "power4.out" } });

  tl.from(".hero-text h1", {
    x: -80,
    duration: 0.8,
  })
    .from(".hero-text p", {
      x: -60,
      duration: 0.6,
    }, "+=0.2") // slight delay
    .from(".hero-text .cta-btn", {
      x: -40,
      duration: 0.5,
    }, "+=0.15");
  

  // Step 1: Image shake
  gsap.fromTo(".hero-circle img", 
    { x: -10 },
    {
      x: 10,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: "power1.inOut",
      onComplete: circleFormation
    }
  );

  // Step 2: Circle formation animation
  function circleFormation() {
    gsap.fromTo(".hero-circle", 
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.4)"
      }
    );
  }

  const img = document.querySelector(".hero-circle img");

img.addEventListener("mouseenter", () => {
  gsap.to(img, {
    scale: 1.05,
    y: -10,
    duration: 0.4,
    ease: "power2.out"
  });
});

img.addEventListener("mouseleave", () => {
  gsap.to(img, {
    scale: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.inOut"
  });
});




gsap.registerPlugin(ScrollTrigger);

gsap.from(".tv-logo-section", {
  opacity: 0,
  y: 50,
  duration: 1,
  scrollTrigger: {
    trigger: ".tv-footer",
    start: "top bottom", // when footer enters viewport
  },
});

gsap.from(".footer-col", {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".tv-footer",
    start: "top 80%",
  },
});

gsap.from(".download-buttons img", {
  opacity: 0,
  scale: 0.8,
  duration: 0.7,
  stagger: 0.2,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".tv-footer-bottom",
    start: "top 90%",
  }
});


gsap.to(".download-buttons img", {
  scale: 1.05,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});


gsap.from(".social-icons i", {
  opacity: 0,
  y: 10,
  duration: 0.4,
  stagger: {
    each: 0.1,       // Delay between icons
    repeat: -1,      // Loop forever
    repeatDelay: 1,  // Wait a bit before restarting
  },
  ease: "power1.inOut",
});

document.addEventListener('DOMContentLoaded', () => {
  // Particle Effect
  const canvas = document.getElementById('footer-particle-canvas');
  if (!canvas) {
    console.error('Canvas element with ID "footer-particle-canvas" not found.');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get 2D context for canvas.');
    return;
  }

  let particlesArray = [];
  const numberOfParticles = 50;

  // Set canvas size
  function setCanvasSize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.color = Math.random() > 0.5 ? '#008080' : '#00b7b7';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += Math.random() * 0.02 - 0.01;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      if (this.opacity < 0.3) this.opacity = 0.3;
      if (this.opacity > 0.8) this.opacity = 0.8;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.closePath();
    }
  }

  // Initialize particles
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  // Animate particles
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  // Set initial canvas size and start animation
  try {
    setCanvasSize();
    initParticles();
    animateParticles();
  } catch (error) {
    console.error('Error initializing particle animation:', error);
  }

  // Handle resize
  window.addEventListener('resize', () => {
    setCanvasSize();
    initParticles();
  });

});



gsap.fromTo('.halo-item', {
  opacity: 0,
  scale: 0.5
}, {
  opacity: 1,
  scale: 1,
  duration: 1,
  stagger: 0.2,
  ease: "back.out(1.7)"
});
