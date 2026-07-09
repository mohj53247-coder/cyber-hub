// nav toggle (mobile)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // terminal typing effect on home hero
  const term = document.querySelector('[data-terminal]');
  if (term) runTerminal(term);
});

function runTerminal(el) {
  const lines = JSON.parse(el.getAttribute('data-terminal'));
  el.innerHTML = '';
  let li = 0;

  function typeLine() {
    if (li >= lines.length) return;
    const { text, cls } = lines[li];
    const row = document.createElement('div');
    row.className = 'line ' + (cls || '');
    el.appendChild(row);
    let ci = 0;
    const speed = 18;
    const iv = setInterval(() => {
      row.textContent = text.slice(0, ci + 1);
      ci++;
      if (ci >= text.length) {
        clearInterval(iv);
        li++;
        setTimeout(typeLine, 260);
      }
    }, speed);
  }
  typeLine();
}
