/* RAK NovaChem — site behaviour (no dependencies) */
(function () {
  'use strict';

  // ====== EDIT THESE IF YOUR CONTACT DETAILS CHANGE ======
  var WHATSAPP_NUMBER = '917758826537';          // country code + number, no "+" or spaces
  var ENQUIRY_EMAIL = 'sales@raknovachem.com';
  var DEFAULT_MESSAGE = 'Hello RAK NovaChem, I would like to know more about your products.';
  // =======================================================

  function waLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message || DEFAULT_MESSAGE);
  }

  document.documentElement.classList.add('js');

  // Every WhatsApp link on the site gets its number + prefilled message from here
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var product = a.getAttribute('data-product');
    var industry = a.getAttribute('data-industry');
    var msg = a.getAttribute('data-wa') || DEFAULT_MESSAGE;
    if (product) {
      msg = 'Hello RAK NovaChem, I would like a quote for: ' + product +
            (industry ? ' (' + industry + ')' : '') +
            '.\n\nQuantity: \nDelivery location: ';
    }
    a.href = waLink(msg);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---------- Products page: search + industry filter ----------
  var search = document.getElementById('product-search');
  var chips = document.querySelectorAll('.chip[data-filter]');
  var sections = document.querySelectorAll('.industry');
  var empty = document.querySelector('.no-results');
  var activeFilter = 'all';

  function applyFilter() {
    var q = search ? search.value.trim().toLowerCase() : '';
    var anyVisible = false;
    sections.forEach(function (sec) {
      var matchesIndustry = activeFilter === 'all' || sec.id === activeFilter;
      var visibleInSection = 0;
      sec.querySelectorAll('.product').forEach(function (p) {
        var show = matchesIndustry && (!q || p.textContent.toLowerCase().indexOf(q) !== -1 ||
                   sec.getAttribute('data-name').toLowerCase().indexOf(q) !== -1);
        p.hidden = !show;
        if (show) visibleInSection++;
      });
      sec.querySelectorAll('.product-group').forEach(function (g) {
        g.hidden = !g.querySelector('.product:not([hidden])');
      });
      sec.hidden = visibleInSection === 0;
      if (visibleInSection) anyVisible = true;
    });
    if (empty) empty.classList.toggle('show', !anyVisible);
  }

  if (sections.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        activeFilter = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        applyFilter();
      });
    });
    if (search) search.addEventListener('input', applyFilter);
    var custom = document.getElementById('custom-enquiry');
    if (custom && search) {
      custom.addEventListener('click', function () {
        custom.href = waLink('Hello RAK NovaChem, I am looking for: ' + search.value.trim() + '. Can you source it?');
      });
    }
  }

  // ---------- Contact page: enquiry form -> WhatsApp or email (no server needed) ----------
  var form = document.getElementById('enquiry-form');
  if (form) {
    // Pre-select a product when arriving from a link like contact.html?product=Acetone
    var params = new URLSearchParams(window.location.search);
    if (params.get('product')) form.elements.requirement.value = params.get('product');

    var compose = function () {
      var f = form.elements;
      var lines = [
        'New enquiry from raknovachem.com',
        '',
        'Name: ' + f.name.value.trim(),
        'Company: ' + (f.company.value.trim() || '-'),
        'Phone: ' + f.phone.value.trim(),
        'Email: ' + (f.email.value.trim() || '-'),
        'Industry: ' + f.industry.value,
        'Requirement: ' + f.requirement.value.trim()
      ];
      return lines.join('\n');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.open(waLink(compose()), '_blank', 'noopener');
    });

    var emailBtn = document.getElementById('send-email');
    if (emailBtn) {
      emailBtn.addEventListener('click', function () {
        if (!form.reportValidity()) return;
        window.location.href = 'mailto:' + ENQUIRY_EMAIL +
          '?subject=' + encodeURIComponent('Product enquiry — ' + form.elements.name.value.trim()) +
          '&body=' + encodeURIComponent(compose());
      });
    }
  }
})();
