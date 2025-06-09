const images = [
  { src: "../images/top1.png", title: "Trade Smarter, Invest Better", subtext: "Analyze markets with our advanced tools and indicators.", desc: "Empowering traders with precision, speed, and security." },
  { src: "../images/top2.jpg", title: "Master the Market Trends", subtext: "Use AI-driven insights to make informed decisions.", desc: "Enhance your trading strategies with real-time data." },
  { src: "../images/top3.jpg", title: "Stay Ahead of the Curve", subtext: "Predict market movements with confidence.", desc: "Advanced algorithms for smarter trading." },
  { src: "../images/top4.avif", title: "Your Gateway to Financial Freedom", subtext: "Trade anytime, anywhere with our secure platform.", desc: "Seamless experience across all devices." }
];
let index = 0;

const texts = [
  { heading: "🚀 Elevate Your Trading Game", paragraph: "Master trading with precision tools and real-time insights. Stay ahead with smart decision-making." },
  { heading: "📈 Decode Market Trends", paragraph: "Analyze price action using advanced indicators like RSI, MACD, and Bollinger Bands to seize opportunities." },
  { heading: "💰 Trade with Confidence", paragraph: "Manage risks effectively with stop losses, emotional control, and efficient execution strategies." },
  { heading: "⚡ Master Risk Management", paragraph: "Protect your capital using smart money management techniques and optimize your position sizing." }
];
let currentIndex = 0;
const images1 = document.querySelectorAll(".fade-img");
const headingElement = document.querySelector(".bottom-text h2");
const paragraphElement = document.querySelector(".bottom-text p");

function updateContent() {
  images1.forEach(img => img.classList.remove("active"));
  let nextImage = images1[currentIndex];
  nextImage.classList.add("active");
  nextImage.addEventListener("transitionend", function changeText() {
      headingElement.innerHTML = texts[currentIndex].heading;
      paragraphElement.innerHTML = texts[currentIndex].paragraph;
      headingElement.style.opacity = 0;
      paragraphElement.style.opacity = 0;
      setTimeout(() => {
          headingElement.style.opacity = 1;
          paragraphElement.style.opacity = 1;
      }, 300);
      nextImage.removeEventListener("transitionend", changeText);
  });
  currentIndex = (currentIndex + 1) % texts.length;
}
setInterval(updateContent, 4000);

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in banner content
    gsap.from('.banner-content', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.banner-section',
        start: 'top 80%',
      },
    });
// Fade in and slide image from left
gsap.from('.banner-image img', {
  opacity: 0,
  x: -80,
  duration: 1.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.banner-image',
    start: 'top 80%',
  },
});
    // Fade in and scale cards
    gsap.from('.card', {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      stagger: 0.3,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.banner-cards',
        start: 'top 80%',
      },
    });

    // Hover effect on cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', duration: 0.3, ease: 'power1.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', duration: 0.3, ease: 'power1.out' });
      });
    });

    // Hover effect on buttons
    const buttons = document.querySelectorAll('.book-now, .contact-btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.1, duration: 0.3, ease: 'power1.out' });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: 'power1.out' });
      });
    });
  } else {
    console.error('GSAP or ScrollTrigger not loaded.');
  }

  gsap.from('.feature-card img', { duration: 1.2, opacity: 0, y: 50, stagger: 0.3, ease: 'power2.out', delay: 0.5 });
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => gsap.to(card.querySelector('img'), { duration: 0.6, scale: 1.1, ease: 'power2.out' }));
  card.addEventListener('mouseleave', () => gsap.to(card.querySelector('img'), { duration: 0.6, scale: 1, ease: 'power2.out' }));
});

document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (mouseY - centerY) / 20;
      const tiltY = (mouseX - centerX) / -20;
      gsap.to(card.querySelector('img'), { duration: 0.4, rotationX: tiltX, rotationY: tiltY, transformPerspective: 1000, ease: 'power1.out' });
  });
  card.addEventListener('mouseleave', () => gsap.to(card.querySelector('img'), { duration: 0.4, rotationX: 0, rotationY: 0, ease: 'power1.out' }));
});
gsap.from('.section-title', { duration: 1, opacity: 0, y: 30, ease: 'power2.out', delay: 0.2 });
gsap.from('.section-subtitle', { duration: 1, opacity: 0, y: 30, ease: 'power2.out', delay: 0.4 });
gsap.from('.feature-box', { duration: 1.2, opacity: 0, x: -100, stagger: 0.2, ease: 'power2.out', delay: 0.7 });
document.querySelectorAll('.feature-card').forEach(card => {
  const img = card.querySelector('img');
  card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (x - centerX) / -15;
      gsap.to(img, { rotationX: rotateX, rotationY: rotateY, scale: 1.05, ease: 'power2.out', duration: 0.4 });
  });
  card.addEventListener('mouseleave', () => gsap.to(img, { rotationX: 0, rotationY: 0, scale: 1, ease: 'power2.out', duration: 0.4 }));
});

gsap.registerPlugin(ScrollTrigger);
// Animate the mockup image on scroll
gsap.from(".mockup img", {
  scrollTrigger: {
    trigger: ".mockup img",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 80,
  rotateX: 15,
  rotateY: -15,
  scale: 0.9,
  duration: 1.4,
  ease: "power4.out"
});

// Mouse 3D tilt and glow effect
const mockupImg = document.querySelector(".mockup img");
const mockupWrapper = document.querySelector(".mockup");

mockupWrapper.addEventListener("mousemove", (e) => {
  const bounds = mockupWrapper.getBoundingClientRect();
  const x = e.clientX - bounds.left;
  const y = e.clientY - bounds.top;
  const centerX = bounds.width / 2;
  const centerY = bounds.height / 2;
  const rotateX = -(y - centerY) / 10;
  const rotateY = (x - centerX) / 10;
  gsap.to(mockupImg, {
    rotationX: rotateX,
    rotationY: rotateY,
    scale: 1.08,
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    ease: "power2.out",
    duration: 0.4
  });
});
mockupWrapper.addEventListener("mouseleave", () => {
  gsap.to(mockupImg, {
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    duration: 0.5,
    ease: "power2.out"
  });
});

// Animate heading & subtitle
gsap.from([".content h2", ".content .subtitle"], {
  scrollTrigger: {
    trigger: ".whats-new-section",
    start: "top 75%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power4.out",
  stagger: 0.15
});

// Animate feature items with alternating directions
document.querySelectorAll(".features li").forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%"
    },
    opacity: 0,
    x: index % 2 === 0 ? -60 : 60,
    duration: 1.1,
    ease: "power3.out",
    delay: index * 0.15
  });
});

// Optional: subtle parallax motion on mockup wrapper
gsap.to(".mockup", {
  scrollTrigger: {
    trigger: ".whats-new-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  },
  y: -40
});

gsap.from(".pricing-card .icon", {
  scrollTrigger: { trigger: ".pricing-container", start: "top 85%", toggleActions: "play none none none" },
  y: -30, opacity: 0, duration: 1.2, ease: "bounce.out", stagger: 0.2
});
gsap.from(".pricing-card h2", {
  scrollTrigger: { trigger: ".pricing-container", start: "top 80%" },
  clipPath: "inset(0 0 100% 0)", opacity: 0, duration: 1, ease: "power2.out", stagger: 0.2
});
gsap.from(".pricing-card button", {
  scrollTrigger: { trigger: ".pricing-container", start: "top 80%" },
  clipPath: "inset(0 100% 0 0)", opacity: 0, duration: 1, delay: 0.5, ease: "power3.out", stagger: 0.2
});
gsap.from(".pricing-card h3", {
  scrollTrigger: { trigger: ".pricing-container", start: "top 85%" },
  opacity: 0, x: -50, duration: 1, ease: "power3.out", stagger: 0.2
});

gsap.utils.toArray(".journey-point").forEach((point) => {
  gsap.from(point, {
      scrollTrigger: { trigger: point, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0, y: 50, duration: 1, ease: "power3.out"
  });
});

gsap.from('.s3 h3', {
  opacity: 0, y: -50, duration: 1.2, ease: 'power2.out',
  scrollTrigger: { trigger: '.s3 h3', start: 'top 80%', toggleActions: 'play none none none' }
});
gsap.from('.topic-wrapper', {
  opacity: 0, x: -100, duration: 1, stagger: 0.3, ease: 'power2.out',
  scrollTrigger: { trigger: '.topics-container', start: 'top 80%', toggleActions: 'play none none none' }
});




const plans = document.querySelectorAll('.plan');
const planDetails = document.getElementById('plan-details');
const planData = {
  "50K": { title: "$50K Plan", target: "$3000", size: "6 Contracts / 60 Micros", drawdown: "$2000" },
  "100K": { title: "$100K Plan", target: "$6000", size: "12 Contracts / 120 Micros", drawdown: "$4000" },
  "150K": { title: "$150K Plan", target: "$9000", size: "18 Contracts / 180 Micros", drawdown: "$6000" }
};
plans.forEach(plan => {
  plan.addEventListener('click', () => {
      plans.forEach(p => p.classList.remove('active'));
      plan.classList.add('active');
      const selected = plan.getAttribute('data-plan');
      const data = planData[selected];
      planDetails.innerHTML = `
          <h2>${data.title}</h2>
          <div class="item"><span>Profit Target</span><span>${data.target}</span></div>
          <div class="item"><span>Max Position Size</span><span>${data.size}</span></div>
          <div class="item"><span>Trailing Drawdown</span><span>${data.drawdown}</span></div>
          <div class="note">Be consistent. No trading bots allowed.</div>
          <button class="btn">Start Now</button>
      `;
  });
});

// Demo Section - GSAP Animations
gsap.from("#demo-account .demo-title", {
  scrollTrigger: {
    trigger: "#demo-account",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from("#demo-account .demo-feature-list li", {
  scrollTrigger: {
    trigger: "#demo-account",
    start: "top 75%",
    toggleActions: "play none none none"
  },
  x: -50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out"
});

gsap.from("#demo-account .demo-button", {
  scrollTrigger: {
    trigger: "#demo-account",
    start: "top 70%",
    toggleActions: "play none none none"
  },
  scale: 0.8,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "back.out(1.7)"
});

gsap.from("#demo-account .demo-description", {
  scrollTrigger: {
    trigger: "#demo-account",
    start: "top 65%",
    toggleActions: "play none none none"
  },
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.4,
  ease: "power2.out"
});


// Fade-in each metric card with stagger
gsap.from(".timeline-item", {
  scrollTrigger: {
    trigger: ".timeline-container",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 60,
  duration: 1.2,
  stagger: 0.2,
  ease: "power3.out",
});

// Soft zoom on background image as you scroll
gsap.to(".background-image", {
  scale: 1.05,
  ease: "none",
  scrollTrigger: {
    trigger: ".bank-metrics-timeline",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

  // GSAP Animations
  gsap.from('.faq-title', {
    opacity: 0,
    y: -50,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.faq-title', start: 'top 80%', toggleActions: 'play none none none' }
});

gsap.from('.faq-card', {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.faq-grid', start: 'top 80%', toggleActions: 'play none none none' }
});

// FAQ Toggle with Read More
document.querySelectorAll('.faq-read-more').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = button.parentElement;
        const answer = card.querySelector('.faq-answer');
        const isOpen = card.classList.contains('open');

        // Toggle the current card
        if (!isOpen) {
            // Close all other cards
            document.querySelectorAll('.faq-card').forEach(c => {
                if (c !== card) {
                    c.classList.remove('open');
                    const otherAnswer = c.querySelector('.faq-answer');
                    gsap.to(otherAnswer, { duration: 0.4, maxHeight: 0, padding: 0, ease: 'power2.out' });
                    c.querySelector('.faq-read-more').textContent = 'Read More';
                }
            });

            // Open the clicked card
            gsap.fromTo(answer, { opacity: 0, y: 20 }, { duration: 0.5, opacity: 1, y: 0, ease: 'power2.out', onComplete: () => {
                answer.style.maxHeight = answer.scrollHeight + 'px'; // Dynamic height
            }});
            card.classList.add('open');
            button.textContent = 'Read Less';
        } else {
            // Close the clicked card
            gsap.to(answer, { duration: 0.5, opacity: 0, y: 20, ease: 'power2.out', onComplete: () => {
                card.classList.remove('open');
                answer.style.maxHeight = '0'; // Explicitly reset max-height
                button.textContent = 'Read More';
                // Force reflow to reset button position
                card.style.display = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.display = '';
            }});
        }
        e.stopPropagation(); // Prevent click from bubbling to document
    });
});

// Close card when clicking outside
document.addEventListener('click', (e) => {
    const openCard = document.querySelector('.faq-card.open');
    if (openCard && !openCard.contains(e.target)) {
        const answer = openCard.querySelector('.faq-answer');
        const button = openCard.querySelector('.faq-read-more');
        gsap.to(answer, { duration: 0.5, maxHeight: 0, padding: 0, opacity: 0, y: 20, ease: 'power2.out', onComplete: () => {
            openCard.classList.remove('open');
            button.textContent = 'Read More';
            // Force reflow
            openCard.style.display = 'none';
            openCard.offsetHeight; // Trigger reflow
            openCard.style.display = '';
        }});
    }
});

// Search Functionality
const searchInput = document.getElementById('faq-search');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    document.querySelectorAll('.faq-card').forEach(card => {
        const question = card.querySelector('.faq-question').textContent.toLowerCase();
        const preview = card.querySelector('.faq-preview').textContent.toLowerCase();
        const answer = card.querySelector('.faq-answer').textContent.toLowerCase();
        if (question.includes(searchTerm) || preview.includes(searchTerm) || answer.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

  // Navigation link click handler
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section');

      // Hide all sections
      document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
      });

      // Show the target section if not 'home'
      if (targetSection !== 'home') {
        document.querySelector(`.${targetSection}`).classList.remove('hidden');
      } else {
        // Show all original sections for 'home'
        document.querySelectorAll('section:not(.indicators-section):not(.dashboard-section):not(.about-us-section)').forEach(section => {
          section.classList.remove('hidden');
        });
      }
    });
  });





initCharts();


const marketRadios = document.querySelectorAll('input[name="market-type"]');
const contextItems = document.querySelectorAll('.indicator-context');

marketRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const selectedMarket = radio.value;
    contextItems.forEach(item => {
      const trendingText = item.querySelector('.trending-text');
      const rangeBoundText = item.querySelector('.range-bound-text');
      if (selectedMarket === 'trending') {
        trendingText.classList.remove('hidden');
        rangeBoundText.classList.add('hidden');
      } else {
        trendingText.classList.add('hidden');
        rangeBoundText.classList.remove('hidden');
      }
    });
  });
});

// Trigger initial state
marketRadios[0].dispatchEvent(new Event('change'));


console.log('DOM loaded, initializing ticker');
updateTicker();


const dashboardSection = document.querySelector('.dashboard-section');
if (dashboardSection && !window.location.hash && dashboardSection.classList.contains('hidden')) {
    dashboardSection.classList.remove('hidden');
}

// Ensure generic dashboard is shown on load
const genericContent = document.querySelector('.dashboard-content.generic-dashboard');
if (genericContent && dashboardSection && !dashboardSection.classList.contains('hidden')) {
    switchDashboard('generic');
}





});

// Sample price data for demonstration
const priceData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  value: 100 + Math.sin(i / 5) * 20 + Math.random() * 10
}));

// Chart initialization
const charts = {
  maChart: null,
  rsiChart: null,
  macdChart: null,
  bbChart: null,
  stochChart: null,
  atrChart: null,
  ichimokuChart: null
};

// Initialize charts
function initCharts() {
  charts.maChart = new Chart(document.getElementById('maChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: priceData.map(d => d.time),
      datasets: [
        {
          label: 'Price',
          data: priceData.map(d => d.value),
          borderColor: '#007bff',
          fill: false
        },
        {
          label: 'SMA',
          data: calculateSMA(priceData.map(d => d.value), 10),
          borderColor: '#ff9900',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { beginAtZero: false }
      }
    }
  });

  charts.rsiChart = new Chart(document.getElementById('rsiChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: priceData.map(d => d.time),
      datasets: [
        {
          label: 'RSI',
          data: calculateRSI(priceData.map(d => d.value), 14),
          borderColor: '#28a745',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { min: 0, max: 100 }
      }
    }
  });

  charts.macdChart = new Chart(document.getElementById('macdChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: priceData.map(d => d.time),
      datasets: [
        {
          label: 'MACD',
          data: calculateMACD(priceData.map(d => d.value), 12, 26, 9).macd,
          borderColor: '#dc3545',
          fill: false
        },
        {
          label: 'Signal',
          data: calculateMACD(priceData.map(d => d.value), 12, 26, 9).signal,
          borderColor: '#ffc107',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { beginAtZero: false }
      }
    }
  });

  // Bollinger Bands Chart
  charts.bbChart = new Chart(document.getElementById('bbChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: priceData.map(d => d.time),
      datasets: [
        {
          label: 'Price',
          data: priceData.map(d => d.value),
          borderColor: '#007bff',
          fill: false
        },
        {
          label: 'Middle Band (SMA)',
          data: calculateBollingerBands(priceData.map(d => d.value), 20, 2).middle,
          borderColor: '#ff9900',
          fill: false
        },
        {
          label: 'Upper Band',
          data: calculateBollingerBands(priceData.map(d => d.value), 20, 2).upper,
          borderColor: '#28a745',
          fill: false
        },
        {
          label: 'Lower Band',
          data: calculateBollingerBands(priceData.map(d => d.value), 20, 2).lower,
          borderColor: '#dc3545',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { beginAtZero: false }
      }
    }
  });

  // Stochastic Oscillator Chart
  charts.stochChart = new Chart(document.getElementById('stochChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: priceData.map(d => d.time),
      datasets: [
        {
          label: '%K',
          data: calculateStochastic(priceData.map(d => d.value), 14).k,
          borderColor: '#007bff',
          fill: false
        },
        {
          label: '%D',
          data: calculateStochastic(priceData.map(d => d.value), 14).d,
          borderColor: '#ff9900',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { min: 0, max: 100 }
      }
    }
  });

  // ATR Chart
  charts.atrChart = new Chart(document.getElementById('atrChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: priceData.map(d => d.time),
      datasets: [
        {
          label: 'ATR',
          data: calculateATR(priceData.map(d => d.value), 14),
          borderColor: '#28a745',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { beginAtZero: true }
      }
    }
  });

  // Ichimoku Cloud Chart
  charts.ichimokuChart = new Chart(document.getElementById('ichimokuChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: priceData.map(d => d.time),
      datasets: [
        {
          label: 'Price',
          data: priceData.map(d => d.value),
          borderColor: '#007bff',
          fill: false
        },
        {
          label: 'Tenkan-sen',
          data: calculateIchimoku(priceData.map(d => d.value), 9, 26, 52).tenkan,
          borderColor: '#ff9900',
          fill: false
        },
        {
          label: 'Kijun-sen',
          data: calculateIchimoku(priceData.map(d => d.value), 9, 26, 52).kijun,
          borderColor: '#dc3545',
          fill: false
        },
        {
          label: 'Senkou Span A',
          data: calculateIchimoku(priceData.map(d => d.value), 9, 26, 52).spanA,
          borderColor: '#28a745',
          fill: false
        },
        {
          label: 'Senkou Span B',
          data: calculateIchimoku(priceData.map(d => d.value), 9, 26, 52).spanB,
          borderColor: '#ffc107',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { beginAtZero: false }
      }
    }
  });
}

// Calculate Simple Moving Average
function calculateSMA(data, period) {
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(null);
    } else {
      const slice = data.slice(i - period + 1, i + 1);
      sma.push(slice.reduce((a, b) => a + b, 0) / period);
    }
  }
  return sma;
}

// Calculate Exponential Moving Average
function calculateEMA(data, period) {
  const k = 2 / (period + 1);
  const ema = [data[0]];
  for (let i = 1; i < data.length; i++) {
    ema.push(data[i] * k + ema[i - 1] * (1 - k));
  }
  return ema;
}

// Calculate RSI
function calculateRSI(data, period) {
  const rsi = [];
  let gains = 0, losses = 0;
  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
    if (i >= period) {
      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgGain / (avgLoss || 1);
      rsi.push(100 - 100 / (1 + rs));
      gains *= (period - 1) / period;
      losses *= (period - 1) / period;
      const newDiff = data[i] - data[i - 1];
      if (newDiff >= 0) gains += newDiff / period;
      else losses -= newDiff / period;
    } else {
      rsi.push(null);
    }
  }
  return rsi;
}

// Calculate MACD
function calculateMACD(data, fastPeriod, slowPeriod, signalPeriod) {
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);
  const macd = fastEMA.map((f, i) => f - slowEMA[i]);
  const signal = calculateEMA(macd, signalPeriod);
  return { macd, signal };
}

// Calculate Bollinger Bands
function calculateBollingerBands(data, period, stdDev) {
  const sma = calculateSMA(data, period);
  const upper = [];
  const lower = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      upper.push(null);
      lower.push(null);
    } else {
      const slice = data.slice(i - period + 1, i + 1);
      const mean = slice.reduce((a, b) => a + b, 0) / period;
      const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
      const deviation = Math.sqrt(variance);
      upper.push(sma[i] + stdDev * deviation);
      lower.push(sma[i] - stdDev * deviation);
    }
  }
  return { upper, lower, middle: sma };
}

// Calculate Stochastic Oscillator
function calculateStochastic(data, period) {
  const k = [];
  const d = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      k.push(null);
      d.push(null);
    } else {
      const slice = data.slice(i - period + 1, i + 1);
      const highest = Math.max(...slice);
      const lowest = Math.min(...slice);
      const current = data[i];
      const kValue = ((current - lowest) / (highest - lowest || 1)) * 100;
      k.push(kValue);
      if (i >= period + 2) {
        const kSlice = k.slice(i - 3 + 1, i + 1);
        d.push(kSlice.reduce((a, b) => a + b, 0) / 3);
      } else {
        d.push(null);
      }
    }
  }
  return { k, d };
}

// Calculate ATR
function calculateATR(data, period) {
  const atr = [];
  const tr = [];
  for (let i = 1; i < data.length; i++) {
    const high = Math.max(data[i], data[i - 1]);
    const low = Math.min(data[i], data[i - 1]);
    const trValue = high - low;
    tr.push(trValue);
  }
  for (let i = 0; i < tr.length; i++) {
    if (i < period - 1) {
      atr.push(null);
    } else {
      const slice = tr.slice(i - period + 1, i + 1);
      atr.push(slice.reduce((a, b) => a + b, 0) / period);
    }
  }
  return atr;
}

// Calculate Ichimoku Cloud
function calculateIchimoku(data, conversionPeriod, basePeriod, spanBPeriod) {
  const tenkan = [];
  const kijun = [];
  const spanA = [];
  const spanB = [];
  for (let i = 0; i < data.length; i++) {
    // Tenkan-sen (Conversion Line)
    if (i >= conversionPeriod - 1) {
      const slice = data.slice(i - conversionPeriod + 1, i + 1);
      const high = Math.max(...slice);
      const low = Math.min(...slice);
      tenkan.push((high + low) / 2);
    } else {
      tenkan.push(null);
    }
    // Kijun-sen (Base Line)
    if (i >= basePeriod - 1) {
      const slice = data.slice(i - basePeriod + 1, i + 1);
      const high = Math.max(...slice);
      const low = Math.min(...slice);
      kijun.push((high + low) / 2);
    } else {
      kijun.push(null);
    }
    // Senkou Span A
    if (i >= basePeriod - 1) {
      const t = tenkan[i] || 0;
      const k = kijun[i] || 0;
      spanA.push((t + k) / 2);
    } else {
      spanA.push(null);
    }
    // Senkou Span B
    if (i >= spanBPeriod - 1) {
      const slice = data.slice(i - spanBPeriod + 1, i + 1);
      const high = Math.max(...slice);
      const low = Math.min(...slice);
      spanB.push((high + low) / 2);
    } else {
      spanB.push(null);
    }
  }
  return { tenkan, kijun, spanA, spanB };
}

// Update chart based on user input
function updateChart(chartId, typeId, periodId) {
  const chart = charts[chartId];
  if (chartId === 'maChart') {
    const type = document.getElementById(typeId).value;
    const period = parseInt(document.getElementById(periodId).value);
    chart.data.datasets[1].data = type === 'sma'
      ? calculateSMA(priceData.map(d => d.value), period)
      : calculateEMA(priceData.map(d => d.value), period);
    chart.data.datasets[1].label = type.toUpperCase();
  } else if (chartId === 'rsiChart') {
    const period = parseInt(document.getElementById(periodId).value);
    chart.data.datasets[0].data = calculateRSI(priceData.map(d => d.value), period);
  } else if (chartId === 'macdChart') {
    const fast = parseInt(document.getElementById(typeId).value);
    const slow = parseInt(document.getElementById(periodId).value);
    const { macd, signal } = calculateMACD(priceData.map(d => d.value), fast, slow, 9);
    chart.data.datasets[0].data = macd;
    chart.data.datasets[1].data = signal;
  } else if (chartId === 'bbChart') {
    const period = parseInt(document.getElementById(typeId).value);
    const stdDev = parseInt(document.getElementById(periodId).value);
    const { upper, lower, middle } = calculateBollingerBands(priceData.map(d => d.value), period, stdDev);
    chart.data.datasets[1].data = middle;
    chart.data.datasets[2].data = upper;
    chart.data.datasets[3].data = lower;
  } else if (chartId === 'stochChart') {
    const period = parseInt(document.getElementById(periodId).value);
    const { k, d } = calculateStochastic(priceData.map(d => d.value), period);
    chart.data.datasets[0].data = k;
    chart.data.datasets[1].data = d;
  } else if (chartId === 'atrChart') {
    const period = parseInt(document.getElementById(periodId).value);
    chart.data.datasets[0].data = calculateATR(priceData.map(d => d.value), period);
  } else if (chartId === 'ichimokuChart') {
    const setting = document.getElementById(typeId).value;
    const periods = setting === 'default' ? [9, 26, 52] : [7, 22, 44]; // Example custom settings
    const { tenkan, kijun, spanA, spanB } = calculateIchimoku(priceData.map(d => d.value), periods[0], periods[1], periods[2]);
    chart.data.datasets[1].data = tenkan;
    chart.data.datasets[2].data = kijun;
    chart.data.datasets[3].data = spanA;
    chart.data.datasets[4].data = spanB;
  }
  chart.update();
}

function toggleInfoIndicator(button) {
  const infoDiv = button.parentElement.querySelector('.indicator-info');
  infoDiv.classList.toggle('visible');
}

document.addEventListener('DOMContentLoaded', () => {
  const carousel_testimonial = document.querySelector('.carousel-testimonial');
  const dots = document.querySelectorAll('.owl-dots button');

  if (!carousel_testimonial || !dots.length) {
    console.error('Carousel or dots not found');
    return;
  }

  const itemWidth = carousel_testimonial.querySelector('.single-testimonial').offsetWidth + 50;
  let currentIndex = 0;
  const totalItems = carousel_testimonial.children.length;
  const itemsPerView = 2;
  const maxIndex = Math.ceil(totalItems / itemsPerView) - 1;

  function updateCarousel_testimonial() {
    const translateX = -currentIndex * itemWidth * itemsPerView;
    carousel_testimonial.style.transform = `translateX(${translateX}px)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function autoSlide() {
    currentIndex++;
    if (currentIndex > maxIndex) {
      currentIndex = 0; // Loop back to the start
    }
    updateCarousel_testimonial();
  }

  // Start the automatic sliding every 4 seconds (4000ms)
  setInterval(autoSlide, 4000);

  // Initial update to set the starting position
  updateCarousel_testimonial();
});

document.addEventListener('DOMContentLoaded', () => {
  const metricCards = document.querySelectorAll('.metric-card');
  const radius = 220; // distance from center

  metricCards.forEach(card => {
    const angleDeg = parseFloat(card.getAttribute('data-angle'));
    const angleRad = angleDeg * (Math.PI / 180);

    const centerX =100; // half of container width
    const centerY = 100; // half of container height

    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);

    card.style.left = `${x}px`;
    card.style.top = `${y}px`;

    // Rotate back so text stays upright
    card.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg) translate(${radius}px) rotate(${-angleDeg}deg)`;
  });
});

// Toggle educational content
function toggleEdu(button) {
  const content = button.nextElementSibling;
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
}


  // Tab switching and toggle functionality
  document.querySelectorAll('.tabs button').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const targetContent = document.querySelector(targetId);
      const isActive = !targetContent.classList.contains('hidden');

      // Close all tabs
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
      });
      document.querySelectorAll('.tabs button').forEach(btn => {
        btn.classList.remove('active');
      });

      // If the tab was not already open, open it
      if (!isActive) {
        targetContent.classList.remove('hidden');
        button.classList.add('active');
      }
    });
  });

  // Close tab function
  function closeTab(tabId) {
    const tabContent = document.querySelector(`#${tabId}`);
    const button = document.querySelector(`.tabs button[data-target="#${tabId}"]`);
    tabContent.classList.add('hidden');
    button.classList.remove('active');
  }

document.addEventListener('DOMContentLoaded', () => {
  initCharts();

  // Get the current section from the URL hash or pathname
  const currentSection = window.location.hash.replace('#', '') || 'home';

  // Hide all sections initially
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
  });

  // Show the appropriate section based on the currentSection
  if (currentSection === 'indicators') {
    document.querySelector('.indicators-section').classList.remove('hidden');
  } else if (currentSection === 'home') {
    document.querySelectorAll('section:not(.indicators-section):not(.dashboard-section):not(.about-us-section)').forEach(section => {
      section.classList.remove('hidden');
    });
  } else {
    document.querySelector(`.${currentSection}-section`).classList.remove('hidden');
  }
});





const teamTrack = document.getElementById('astroTeamTrack');
const prevBtn = document.getElementById('astroTeamPrev');
const nextBtn = document.getElementById('astroTeamNext');

let currentIndexa = 0;

prevBtn.addEventListener('click', () => {
  if (currentIndexa > 0) {
    currentIndexa--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndexa < 2) {
    currentIndexa++;
    updateCarousel();
  }
});

function updateCarousel() {
  const shift = currentIndexa * (teamTrack.offsetWidth / 3 + 24); // adjust for gap
  teamTrack.style.transform = `translateX(-${shift}px)`;
}




const counters = [
  { id: 'tradersCount', end: 50000 },
  { id: 'toolsCount', end: 120 },
  { id: 'yearsCount', end: 10 }
];

const duration = 2000; // in milliseconds

function animateCounter(id, end, duration) {
  const element = document.getElementById(id);
  let start = 0;
  const stepTime = Math.abs(Math.floor(duration / end));
  const increment = end > 1000 ? Math.ceil(end / 500) : 1;

  const counter = setInterval(() => {
    start += increment;
    if (start >= end) {
      start = end;
      clearInterval(counter);
    }
    element.textContent = start.toLocaleString();
  }, stepTime);
}

function startCountersIfVisible() {
  const container = document.querySelector('.achievements-container');
  const bounding = container.getBoundingClientRect();

  if (
    bounding.top < window.innerHeight &&
    bounding.bottom > 0 &&
    !container.classList.contains('started')
  ) {
    container.classList.add('started');
    counters.forEach(c => animateCounter(c.id, c.end, duration));
  }
}

window.addEventListener('scroll', startCountersIfVisible);
window.addEventListener('load', startCountersIfVisible);










document.getElementById('contactFormElement').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('formFeedback');

  if (!name || !email || !message) {
    feedback.textContent = 'Please fill out all fields.';
    feedback.style.color = '#DC2626';
    feedback.classList.remove('hidden');
    return;
  }

  // Save to localStorage
  const contactData = { name, email, message, time: new Date().toISOString() };
  localStorage.setItem('contactFormSubmission', JSON.stringify(contactData));

  // Show success message
  feedback.textContent = 'Thank you! Your message has been saved.';
  feedback.style.color = '#16A34A';
  feedback.classList.remove('hidden');

  // Reset form
  document.getElementById('contactFormElement').reset();
});






        function showDemoForm() {
          console.log('showDemoForm called'); // Debug
          const demoContent = document.querySelector('.demo-content-wrapper');
          const demoForm = document.querySelector('#demo-form');
          const demoSection = document.querySelector('#demo-account');
          const demoImage = document.querySelector('.demo-bg-image');
          const demoFormContent = document.querySelector('.demo-form-content');
        
          if (demoContent && demoForm && demoSection && demoImage && demoFormContent) {
            // Hide demo content
            demoContent.classList.add('hidden');
            demoForm.classList.remove('hidden');
        
            // Calculate form height and set image/section height
            const formHeight = demoFormContent.offsetHeight + 40; // Add padding buffer
            demoSection.style.minHeight = `${formHeight}px`;
            demoImage.style.minHeight = `${formHeight}px`;
          } else {
            console.error('Elements not found:', { demoContent, demoForm, demoSection, demoImage, demoFormContent });
          }
        }
        
        function showDemoSection() {
          console.log('showDemoSection called'); // Debug
          const demoContent = document.querySelector('.demo-content-wrapper');
          const demoForm = document.querySelector('#demo-form');
          const demoSection = document.querySelector('#demo-account');
          const demoImage = document.querySelector('.demo-bg-image');
        
          if (demoContent && demoForm && demoSection && demoImage) {
            // Show demo content
            demoForm.classList.add('hidden');
            demoContent.classList.remove('hidden');
        
            // Revert heights to 100vh
            demoSection.style.minHeight = '100vh';
            demoImage.style.minHeight = '100vh';
          } else {
            console.error('Elements not found:', { demoContent, demoForm, demoSection, demoImage });
          }
        }
        
        function toggleReferral() {
          const referralInput = document.getElementById('referral-id');
          const checkbox = document.getElementById('enable-referral');
          referralInput.disabled = !checkbox.checked;
        }
        
        function togglePassword() {
          const passwordInput = document.getElementById('password');
          const eyeIcon = document.querySelector('.eye-icon');
          if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.textContent = '🙈';
          } else {
            passwordInput.type = 'password';
            eyeIcon.textContent = '👁️';
          }
        }
        
        // Dynamic ticker (March 21, 2025 preference)
        function updateTicker() {
          const price = (24750 + Math.random() * 100 - 50).toFixed(2);
          const change = (Math.random() * 0.5 - 0.25).toFixed(2);
          const ticker = document.querySelector('.market-ticker');
          if (ticker) {
            ticker.innerHTML = `NIFTY 50: ₹${price} <span class="${change >= 0 ? 'up' : 'down'}">${change}%</span>`;
          }
        }
        setInterval(updateTicker, 5000);
        
      
      


        const responses = {
          pricing: [
            {
              pattern: /tell me about (the )?lite plan/i,
              response: 'The Lite Plan costs ₹1 per order for the first 20 trades/month, then ₹10 per order. It’s ideal for beginners with zero AMC charges and flexible trading on NSE. Want to compare it with the Flat Fee Plan?'
            }
          ],
          demat: [
            {
              pattern: /how do i open a demat account\?/i,
              response: 'A Demat account holds your shares electronically. To open one with ATS, visit our portal, submit KYC (Aadhaar, PAN, address proof), complete video verification, and link your bank. Ready to start?'
            }
          ],
          market: [
            {
              pattern: /what(’|')?s the nifty 50 trend today\?/i,
              response: 'NIFTY 50 is at ₹24,750.25, up 0.45% today. For real-time trends, sign up for our platform. Interested in other indices like BSE Sensex?'
            }
          ],
          trading: [
            {
              pattern: /explain intraday trading/i,
              response: 'Intraday trading involves buying and selling within the same day to profit from price movements. ATS offers ₹15/order on our Flat Fee Plan for intraday. Want strategies for intraday?'
            }
          ]
        };
        
        
        function toggleChatbot() {
          const chatbotWindow = document.querySelector('.chatbot-window');
          chatbotWindow.classList.toggle('hidden');
        }
        
        function closeChatbot() {
          const chatbotWindow = document.querySelector('.chatbot-window');
          chatbotWindow.classList.add('hidden');
        }
        
        function sendMessage() {
          const input = document.getElementById('chatbotInput');
          const messages = document.getElementById('chatbotMessages');
          const typingIndicator = document.getElementById('typingIndicator');
          const message = input.value.trim();
        
          if (!message) return;
        
          // Add user message
          const userMessage = document.createElement('div');
          userMessage.className = 'chatbot-message user';
          userMessage.innerHTML = `<img src="../images/workshop.jpeg" alt="User Avatar"><div class="message-content">${message}</div>`;
          messages.appendChild(userMessage);
        
          // Show typing indicator
          typingIndicator.classList.remove('hidden');
        
          // Simulate AI response
          setTimeout(() => {
            const response = getBotResponse(message);
            console.log('User message:', message, 'Bot response:', response); // Debugging
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot';
            botMessage.innerHTML = `<img src="../images/workshop.jpeg" alt="Bot Avatar"><div class="message-content">${response}</div>`;
            messages.appendChild(botMessage);
            typingIndicator.classList.add('hidden');
            messages.scrollTop = messages.scrollHeight;
          }, 1000);
        
          input.value = '';
          messages.scrollTop = messages.scrollHeight;
        }
        
        function sendPredefined(query) {
          const messages = document.getElementById('chatbotMessages');
          const typingIndicator = document.getElementById('typingIndicator');
        
          // Add user message
          const userMessage = document.createElement('div');
          userMessage.className = 'chatbot-message user';
          userMessage.innerHTML = `<img src="../images/profile-1.jpg" alt="User Avatar"><div class="message-content">${query}</div>`;
          messages.appendChild(userMessage);
        
          // Show typing indicator
          typingIndicator.classList.remove('hidden');
        
          // Simulate AI response
          setTimeout(() => {
            const response = getBotResponse(query);
            console.log('Predefined query:', query, 'Bot response:', response); // Debugging
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot';
            botMessage.innerHTML = `<img src="../images/world_map.png" alt="Bot Avatar"><div class="message-content">${response}</div>`;
            messages.appendChild(botMessage);
            typingIndicator.classList.add('hidden');
            messages.scrollTop = messages.scrollHeight;
          }, 1000);
        
          messages.scrollTop = messages.scrollHeight;
        }
        
        function getCurrentSection() {
          const sections = [
            { id: 'hero-section', name: 'hero' },
            { id: 'pricing-section', name: 'pricing' },
            { id: 'demo-account', name: 'demo' },
            { id: 'faq-section', name: 'faq' }
          ];
          for (const section of sections) {
            const element = document.getElementById(section.id) || document.querySelector(`.${section.id}`);
            if (element && element.getBoundingClientRect().top <= window.innerHeight / 2) {
              return section.name;
            }
          }
          return 'general';
        }
        
        function getBotResponse(message) {
          // Rule-based matching first
          for (const category of Object.keys(responses)) {
            for (const rule of responses[category]) {
              if (rule.pattern.test(message)) {
                return rule.response;
              }
            }
          }
        
          // Context-aware response as a secondary fallback
          const contextResponses = {
            pricing: 'You’re in the pricing section! Want details on the Lite Plan (₹1/order), Flat Fee (₹15/order), or Unlimited Plan (₹899/month)?',
            demo: 'Checking out the demo account? It offers ₹50,000 in virtual funds to practice trading. Ask me how to sign up!',
            faq: 'In the FAQ section? I can answer questions like “What is a Demat account?” or “What are trading fees?” Try me!'
          };
        
          // Reduced randomness to ensure consistency
          if (getCurrentSection() !== 'general' && Math.random() < 0.1) { // Changed from 0.3 to 0.1
            return contextResponses[getCurrentSection()] || 'I can help with trading queries! Try asking about pricing, demo accounts, or NIFTY 50 trends.';
          }
        
          // Default fallback
          return 'I can assist with trading topics like pricing, Demat accounts, or market trends. Try asking “What’s the Lite Plan?” or “How to trade intraday?”';
        }





           // Particle effect for background
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Scroll to contact section
    function scrollToContact() {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }






    const track = document.getElementById('astroTeamTrack');
    const prevBtni = document.getElementById('astroTeamPrev');
    const nextBtni = document.getElementById('astroTeamNext');
    let currentIndexi = 0;
    const totalItemsi = 5; // Number of team members
    let visibleItems = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;

    function updateCarouseli() {
      const offset = -(currentIndexi * (100 / visibleItems));
      track.style.transform = `translateX(${offset}%)`;
      prevBtni.disabled = currentIndexi === 0;
      nextBtni.disabled = currentIndexi >= totalItemsi - visibleItems;
    }

    prevBtni.addEventListener('click', () => {
      if (currentIndexi > 0) {
        currentIndexi--;
        updateCarouseli();
      }
    });

    nextBtni.addEventListener('click', () => {
      if (currentIndexi < totalItemsi - visibleItems) {
        currentIndexi++;
        updateCarouseli();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50 && currentIndexi < totalItemsi - visibleItems) {
        currentIndexi++;
        updateCarouseli();
      } else if (touchEndX > touchStartX + 50 && currentIndexi > 0) {
        currentIndexi--;
        updateCarouseli();
      }
    });

    // Responsive adjustment
    window.addEventListener('resize', () => {
      visibleItems = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
      updateCarouseli();
    });

    // Initialize
    updateCarouseli();




     // Counter animation
     function animateCounter(id, endValue, duration) {
      const element = document.getElementById(id);
      let startValue = 0;
      const increment = endValue / (duration / 16); // 60fps
      let currentValue = startValue;

      function updateCounter() {
        currentValue += increment;
        if (currentValue >= endValue) {
          currentValue = endValue;
          element.textContent = Math.floor(currentValue);
          return;
        }
        element.textContent = Math.floor(currentValue);
        requestAnimationFrame(updateCounter);
      }

      updateCounter();
    }

    // Intersection Observer to trigger counters
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounter('tradersCount', 10000, 2000); // 10,000 traders
        animateCounter('toolsCount', 50, 2000);     // 50 tools
        animateCounter('yearsCount', 5, 2000);      // 5 years
        observer.disconnect(); // Run once
      }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.achievements-container'));

       // Scroll to about section (placeholder)
       function scrollToAbout() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fallback: redirect to about page or show more content
          console.log('About section not found. Add #about or implement expand logic.');
        }
      }



      const testimonial_track = document.querySelector('.testimonial-track');
const testimonial_btn_prev = document.querySelector('.testimonial-nav.prev');
const testimonial_btn_next = document.querySelector('.testimonial-nav.next');
let testimonial_index = 0;
const testimonial_total = document.querySelectorAll('.testimonial-card').length;
let testimonial_visible = window.innerWidth > 768 ? 2 : 1;

function updateTestimonialCarousel() {
  const testimonial_offset = -(testimonial_index * (100 / testimonial_visible));
  testimonial_track.style.transform = `translateX(${testimonial_offset}%)`;
  testimonial_btn_prev.disabled = testimonial_index === 0;
  testimonial_btn_next.disabled = testimonial_index >= testimonial_total - testimonial_visible;
}

testimonial_btn_prev.addEventListener('click', () => {
  if (testimonial_index > 0) {
    testimonial_index--;
    updateTestimonialCarousel();
  }
});

testimonial_btn_next.addEventListener('click', () => {
  if (testimonial_index < testimonial_total - testimonial_visible) {
    testimonial_index++;
    updateTestimonialCarousel();
  }
});

// Swipe support
let testimonial_swipeStart = 0;
let testimonial_swipeEnd = 0;

testimonial_track.addEventListener('touchstart', e => {
  testimonial_swipeStart = e.changedTouches[0].screenX;
});

testimonial_track.addEventListener('touchend', e => {
  testimonial_swipeEnd = e.changedTouches[0].screenX;
  if (testimonial_swipeEnd < testimonial_swipeStart - 50 && testimonial_index < testimonial_total - testimonial_visible) {
    testimonial_index++;
    updateTestimonialCarousel();
  } else if (testimonial_swipeEnd > testimonial_swipeStart + 50 && testimonial_index > 0) {
    testimonial_index--;
    updateTestimonialCarousel();
  }
});

// Responsive adjustments
window.addEventListener('resize', () => {
  testimonial_visible = window.innerWidth > 768 ? 2 : 1;
  testimonial_index = Math.min(testimonial_index, testimonial_total - testimonial_visible);
  updateTestimonialCarousel();
});

// Initialize
updateTestimonialCarousel();



  // Optional: Add intersection observer for animation trigger
  const observeri = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.recognition-card').forEach(card => {
        card.style.animation = 'cardFadeIn 0.8s ease forwards';
      });
      observeri.disconnect();
    }
  }, { threshold: 0.5 });

  observeri.observe(document.querySelector('.recognitions-section'));


      // Optional: Add intersection observer for animation trigger
      const observerc = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          document.querySelectorAll('.culture-text-card, .culture-image-container, .culture-cta').forEach(el => {
            el.style.animation = 'cardFadeIn 0.8s ease forwards';
          });
          observerc.disconnect();
        }
      }, { threshold: 0.5 });
  
      observerc.observe(document.querySelector('.culture-community-section'));


          // Intersection observer for animation trigger
    const observerj = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.milestone-item, .milestone-cta').forEach((el, index) => {
          el.style.animation = `cardFadeIn 0.8s ease forwards`;
          el.style.animationDelay = `${0.2 * (index + 1)}s`;
        });
        observerj.disconnect();
      }
    }, { threshold: 0.3 });



    const observerco = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.core-value-item, .core-values-cta').forEach((el, index) => {
          el.style.animation = `cardFadeIn 0.8s ease forwards`;
          el.style.animationDelay = `${0.2 * (index + 1)}s`;
        });
        observerco.disconnect();
      }
    }, { threshold: 0.3 });

    observerco.observe(document.querySelector('.core-values-section'));
        


     // Intersection observer for animation trigger
     const observerfo = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.connect-title, .connect-form, .action-button').forEach((el) => {
          el.style.animation = 'fadeIn 0.5s ease forwards';
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observerfo.observe(document.querySelector('.connect-section'));

    // Basic form submission feedback


    // Function to switch dashboard content (now only for generic view management)
function switchDashboard(type) {
  const dashboardSection = document.querySelector('.dashboard-section');
  const contents = document.querySelectorAll('.dashboard-content');

  // Show the generic dashboard by default (no other content to toggle)
  contents.forEach(content => {
      if (content.classList.contains('generic-dashboard')) {
          content.classList.remove('hidden');
      } else {
          content.classList.add('hidden');
      }
  });
}

