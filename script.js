// Quote carousel
const quotes = document.querySelectorAll('.quote');
let currentQuote = 0;

function rotateQuotes() {
  quotes[currentQuote].classList.remove('active');
  currentQuote = (currentQuote + 1) % quotes.length;
  quotes[currentQuote].classList.add('active');
}

setInterval(rotateQuotes, 4000);

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Uptime counter (from page load)
const startTime = Date.now();
const uptimeEl = document.getElementById('uptime');

function updateUptime() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  uptimeEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateUptime, 1000);
updateUptime();

// Animate odds bars on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.odds-fill');
      fills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = width;
        }, 100);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.odds-list').forEach(el => {
  observer.observe(el);
});

// Form handling for contact page
function showStatus(message, success = true) {
  const el = document.getElementById('statusMessage');
  if (!el) return;
  el.textContent = message;
  el.className = success ? 'success' : 'error';
  el.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  if (!form) return; // not the contact page
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };
    try {
      const resp = await fetch('https://example.com/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!resp.ok) throw new Error('Network response was not ok');
      showStatus('Thank you, we’ll be in touch.', true);
      form.reset();
    } catch (err) {
      console.error(err);
      showStatus('Oops – something went wrong. Please try again later.', false);
    }
  });
});
