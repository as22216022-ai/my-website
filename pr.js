// Basic enhancements: current year, mobile nav toggle, menu population, form validation and feedback

// Current year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('primary-nav');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });
}

// Menu items
const MENU_ITEMS = [
  { category: 'starters', name: 'Pepper soup', desc: 'Spicy, aromatic broth with local spices.', price: '250' },
  { category: 'starters', name: 'Crispy plantain', desc: 'Golden-fried plantain with tangy dip.', price: '200' },
  { category: 'mains', name: 'Jollof & grilled chicken', desc: 'Smoky, rich flavors with seasonal salad.', price: '550' },
  { category: 'mains', name: 'Domoda (peanut stew)', desc: 'Hearty stew with rice and fresh veggies.', price: '500' },
  { category: 'desserts', name: 'Coconut tart', desc: 'Sweet, flaky tart with coconut filling.', price: '300' },
  { category: 'desserts', name: 'Baobab mousse', desc: 'Light dessert with baobab notes.', price: '320' },
  { category: 'drinks', name: 'Ginger lemonade', desc: 'Zesty, refreshing blend.', price: '180' },
  { category: 'drinks', name: 'Wonjo (hibiscus) juice', desc: 'Bright, floral, chilled.', price: '200' },
];

function renderMenu(category = 'starters') {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const items = MENU_ITEMS.filter(i => i.category === category);
  grid.innerHTML = items.map(i => `
    <article class="card">
      <h3>${i.name}</h3>
      <p>${i.desc}</p>
      <p><strong>Price:</strong> D${i.price}</p>
    </article>
  `).join('');
}

// Tabs behavior
const tabs = document.querySelectorAll('.tab');
if (tabs.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderMenu(tab.dataset.category);
    });
  });
  // Initial render
  renderMenu('starters');
}

// Helpers
function setError(id, message) {
  const msgEl = document.getElementById(id);
  if (msgEl) msgEl.textContent = message || '';
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
  return /^[+0-9 ()-]{7,}$/.test(value);
}

// Reservation form validation
const reservationForm = document.getElementById('reservation-form');
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    let valid = true;

    if (!name) { setError('name-error', 'Please enter your full name.'); valid = false; } else setError('name-error');
    if (!isEmail(email)) { setError('email-error', 'Please enter a valid email.'); valid = false; } else setError('email-error');
    if (!isPhone(phone)) { setError('phone-error', 'Please enter a valid phone number.'); valid = false; } else setError('phone-error');
    if (!date) { setError('date-error', 'Please select a date.'); valid = false; } else setError('date-error');
    if (!time) { setError('time-error', 'Please select a time.'); valid = false; } else setError('time-error');
    if (!guests || guests < 1 || guests > 12) { setError('guests-error', 'Guests must be between 1 and 12.'); valid = false; } else setError('guests-error');

    const feedback = document.getElementById('reservation-feedback');
    if (valid) {
      feedback.textContent = 'Reservation submitted successfully! We will confirm via email.';
      reservationForm.reset();
    } else {
      feedback.textContent = 'Please correct the highlighted fields and try again.';
    }
  });
}

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cname').value.trim();
    const email = document.getElementById('cemail').value.trim();
    const message = document.getElementById('cmessage').value.trim();
    let valid = true;

    if (!name) { setError('cname-error', 'Please enter your full name.'); valid = false; } else setError('cname-error');
    if (!isEmail(email)) { setError('cemail-error', 'Please enter a valid email.'); valid = false; } else setError('cemail-error');
    if (!message) { setError('cmessage-error', 'Please write a message.'); valid = false; } else setError('cmessage-error');

    const feedback = document.getElementById('contact-feedback');
    if (valid) {
      feedback.textContent = 'Message sent! We’ll get back to you soon.';
      contactForm.reset();
    } else {
      feedback.textContent = 'Please fix the errors and resubmit.';
    }
  });
}