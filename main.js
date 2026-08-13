// ════════════════════════════════════════════════════════════
// Language Toggle
// ════════════════════════════════════════════════════════════
(function() {
  const langBtns = document.querySelectorAll('[data-set-lang]');
  const langElems = document.querySelectorAll('[data-lang]');

  function setLang(lang) {
    langElems.forEach(el => {
      if (el.dataset.lang === lang) {
        el.classList.add('lang-active');
      } else {
        el.classList.remove('lang-active');
      }
    });
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setLang === lang);
    });
    document.documentElement.lang = lang;
  }

  // Init: default ES
  setLang('es');

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.setLang));
  });
})();

// ════════════════════════════════════════════════════════════
// Industry Switcher
// ════════════════════════════════════════════════════════════
(function() {
  const tabs = document.querySelectorAll('.industry-tab');
  const panes = document.querySelectorAll('.industry-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Activate all tabs with same data-tab (ES + EN)
      tabs.forEach(t => {
        t.classList.toggle('active', t.dataset.tab === target);
      });

      // Show only the matching pane
      panes.forEach(p => {
        p.classList.toggle('active', p.dataset.pane === target);
      });
    });
  });
})();
// ════════════════════════════════════════════════════════════
// FAQ Accordion
// ════════════════════════════════════════════════════════════
(function() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
})();
