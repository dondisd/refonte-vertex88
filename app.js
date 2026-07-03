// Reveals au scroll + parallaxe légère du "88" du hero. Rien de bloquant.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal des sections avec cascade sur les grilles
  var items = document.querySelectorAll('[data-reveal]');
  if (!reduced && 'IntersectionObserver' in window) {
    var seen = 0;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var siblings = el.parentElement ? el.parentElement.querySelectorAll('[data-reveal]') : [];
        var idx = Array.prototype.indexOf.call(siblings, el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx * 90, 450) : 0) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Parallaxe discrète du filigrane "88"
  var mark = document.querySelector('.hero-88');
  if (mark && !reduced) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight) mark.style.transform = 'translateY(' + y * 0.18 + 'px)';
        ticking = false;
      });
    }, { passive: true });
  }
})();
