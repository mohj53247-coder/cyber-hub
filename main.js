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

  // glossary category filter
  const chips = document.querySelectorAll('[data-filter]');
  if (chips.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const target = chip.getAttribute('data-filter');
        document.querySelectorAll('.glossary-group').forEach(group => {
          const show = target === 'all' || group.getAttribute('data-category') === target;
          group.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // password strength checker (client-side only, nothing is stored/sent)
  const pwInput = document.getElementById('pw-check');
  if (pwInput) {
    const fill = document.getElementById('pw-fill');
    const result = document.getElementById('pw-result');
    pwInput.addEventListener('input', () => {
      const v = pwInput.value;
      let score = 0;
      if (v.length >= 8) score++;
      if (v.length >= 12) score++;
      if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;

      const levels = [
        { pct: 0,   color: '#E3564B', label: 'فاضية' },
        { pct: 20,  color: '#E3564B', label: 'ضعيفة جدًا' },
        { pct: 40,  color: '#E8A33D', label: 'ضعيفة' },
        { pct: 60,  color: '#E8A33D', label: 'مقبولة' },
        { pct: 80,  color: '#45D9C6', label: 'قوية' },
        { pct: 100, color: '#45D9C6', label: 'قوية جدًا' },
      ];
      const lvl = levels[v.length === 0 ? 0 : score];
      fill.style.width = lvl.pct + '%';
      fill.style.background = lvl.color;
      result.innerHTML = v.length === 0
        ? 'اكتب كلمة مرور تجريبية — ما يتم حفظها أو إرسالها لأي مكان.'
        : `التقييم: <strong style="color:${lvl.color}">${lvl.label}</strong>`;
    });
  }
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
