// Typing effect for terminal
const commands = [
  "analyze --report bug_report.md",
  "explore --repo ./src --focus auth",
  "reproduce --test test_login.py",
  "classify --severity high",
  "document --output triage.md",
  "STATUS: done ✓"
];

let commandIndex = 0;
let charIndex = 0;
const typedText = document.getElementById('typed-text');

function type() {
  if (charIndex < commands[commandIndex].length) {
    typedText.innerHTML = commands[commandIndex].substring(0, charIndex + 1) + '<span class="cursor"></span>';
    charIndex++;
    setTimeout(type, 50 + Math.random() * 50);
  } else {
    setTimeout(() => {
      charIndex = 0;
      commandIndex = (commandIndex + 1) % commands.length;
      typedText.innerHTML = '<span class="cursor"></span>';
      setTimeout(type, 500);
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  type();
  
  // Update timestamp
  const timestamp = document.getElementById('timestamp');
  timestamp.textContent = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  
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
  
  // Animate steps on scroll
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
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
  });
});
