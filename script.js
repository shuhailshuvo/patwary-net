const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

let language = 'en';
document.querySelector('.lang-toggle').addEventListener('click', event => {
  language = language === 'en' ? 'bn' : 'en';
  document.documentElement.lang = language;
  document.body.classList.toggle('bn', language === 'bn');
  document.querySelectorAll('[data-en][data-bn]').forEach(element => {
    element.innerHTML = element.dataset[language];
  });
  document.querySelectorAll('[data-en-placeholder][data-bn-placeholder]').forEach(element => {
    element.placeholder = element.dataset[`${language}Placeholder`];
  });
  event.currentTarget.textContent = language === 'en' ? 'বাংলা' : 'English';
});

document.querySelectorAll('.plan-link').forEach(link => link.addEventListener('click', () => {
  sessionStorage.setItem('patwaryNetSelectedPlan', link.dataset.plan);
}));

document.getElementById('coverage-form').addEventListener('submit', event => {
  event.preventDefault();
  const area = document.getElementById('area').value.trim();
  const selected = sessionStorage.getItem('patwaryNetSelectedPlan');
  const subject = encodeURIComponent('Patwary Net coverage and connection inquiry');
  const body = encodeURIComponent(`Hello Patwary Net team,\n\nPlease check coverage for: ${area}\n${selected ? `Package of interest: ${selected}\n` : ''}\nMy name: \nMy phone number: `);
  window.location.href = `mailto:patwarynet2018@gmail.com?subject=${subject}&body=${body}`;
});
