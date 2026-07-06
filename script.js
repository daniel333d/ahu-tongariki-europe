const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('open');
  navigation.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.classList.remove('open');
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const form = document.querySelector('.contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.querySelector('.form-success').classList.add('show');
  form.reset();
});

const observed = document.querySelectorAll('.device-card, .benefit-grid article, .franchise-card');
const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 650, easing: 'ease-out', fill: 'both' }
      );
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

observed.forEach((element) => reveal.observe(element));
