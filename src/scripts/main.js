import AOS from 'aos';
import { Notyf } from 'notyf';
import 'aos/dist/aos.css';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 5000,
});

// Animate on scroll
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

function makeContact() {
  const form = document.getElementById('contact-form-id');
  const fieldset = form.querySelector('fieldset');

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    fieldset.disabled = true;

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        notyf.success('Thank you for your submission');
        form.reset();
        fieldset.disabled = false;
      })
      .catch(() => {
        notyf.error('Oops! There was a problem submitting your form');
        fieldset.disabled = false;
      });
  }

  form.addEventListener('submit', handleSubmit);
}

document.addEventListener('DOMContentLoaded', function () {
  // Set current year in footer
  const el = document.getElementById('date');
  el.innerHTML = new Date().getFullYear();

  // Smooth scroll for Hire Me button
  const href = document.getElementById('hire');
  href.addEventListener('click', function (e) {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    const targetElement = document.querySelector(target);

    targetElement.scrollIntoView({
      behavior: 'smooth',
    });
  });

  // Contact form
  makeContact();

  // Hamburger menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.navbar__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('.navbar__menu__item__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
