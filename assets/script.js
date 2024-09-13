const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
let fullScroll;
let currentScroll;
let percOfScrolledContent;
let previousClickedNavLink;

window.onload = () => {
	document.querySelector('.loading-container').classList.add('hidden');
	document.querySelector('header').classList.remove('hidden');
	document.querySelector('#home').classList.remove('hidden');
	document.querySelector('#about').classList.remove('hidden');
	document.querySelector('#skills').classList.remove('hidden');
	document.querySelector('#projects').classList.remove('hidden');
	document.querySelector('#contact').classList.remove('hidden');
	document.querySelector('footer').classList.remove('hidden');
	fullScroll = Math.round(document.documentElement.scrollHeight - document.documentElement.clientHeight);
};

document.addEventListener('scroll', () => {
	currentScroll = Math.round(window.scrollY);
	percOfScrolledContent = (currentScroll / fullScroll) * 100;
	document.querySelector('.percOfScrolledContent').style.width = `${percOfScrolledContent}%`;
});

toggleButton.addEventListener('click', (e) => {
	e.preventDefault();
	navbarLinks.classList.toggle('active');
});
window.innerWidth < 768 && document.querySelector('.contact-link').classList.remove('btn');

navbarLinks.addEventListener('click', (e) => {
	if (e.target.nodeName != 'A') return;
	e.target.classList.add('active');
	if (previousClickedNavLink !== undefined) previousClickedNavLink.classList.remove('active');
	previousClickedNavLink = e.target;
});

setTimeout(() => {
	const emaiLEl = document.querySelector('#email');
	const address = 'contact@janpabisiak.com';
	emaiLEl.href = `mailto:${address}`;
	let r = document.createTextNode(address);
	emaiLEl.appendChild(r);
}, 1000);

const year = new Date().getFullYear();
document.querySelector('.age').textContent = year - 2004;
document.querySelector('.year').textContent = year;
