// Typing animation
const text = "triager.initialize() — observing everything, touching nothing...";
const typedText = document.getElementById('typed-text');
let i = 0;

function type() {
  if (i < text.length) {
    typedText.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
    i++;
    setTimeout(type, 50 + Math.random() * 50);
  } else {
    typedText.innerHTML = text + '<span class="cursor"></span>';
  }
}

// Start typing after a short delay
setTimeout(type, 500);

// Set timestamp
const now = new Date();
document.getElementById('timestamp').textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step, .severity').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
