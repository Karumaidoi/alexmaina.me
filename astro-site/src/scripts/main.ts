import AOS from 'aos';
import { Notyf } from 'notyf';

AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

const notyf = new Notyf({
  duration: 4000,
  position: { x: 'right', y: 'top' },
});

const toggle = document.getElementById('nav-toggle');
const menu = document.querySelector<HTMLElement>('.navbar__menu');

toggle?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('open');
  toggle.classList.toggle('active', !!isOpen);
  toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll<HTMLAnchorElement>('.navbar__menu__item__link').forEach((link) => {
  link.addEventListener('click', () => {
    menu?.classList.remove('open');
    toggle?.classList.remove('active');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('contact-form-id') as HTMLFormElement | null;

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      form.reset();
      notyf.success('Message sent. I will get back to you shortly.');
    } else {
      notyf.error('Could not send your message. Please try again.');
    }
  } catch {
    notyf.error('Network error. Please try again.');
  }
});

const dateEl = document.getElementById('date');
if (dateEl) dateEl.textContent = String(new Date().getFullYear());
