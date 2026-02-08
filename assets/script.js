'use strict';

const loadingEl = document.querySelector('.loading');
const hamburgerEl = document.querySelector('.hamburger');
const navbarEl = document.querySelector('.navbar__links');
const navbarLinksEls = document.querySelectorAll('.navbar__links ul li a');
const heroSectionBackgroundEl = getComputedStyle(document.querySelector('#hero'), ':before').getPropertyValue('content');
const skillItemsEls = document.querySelectorAll('.skills__list__item');

const year = new Date().getFullYear();
const sectionPositions = [-999];
let headerHeight;
let fullScroll;
let currentScroll;
let percentageScrolled;

window.innerWidth <= 870 ? navbarLinksEls[navbarLinksEls.length - 1].classList.remove('btn') : '';

const displayPage = () => {
	const sectionIds = ['header', 'hero', 'about', 'skills', 'projects', 'contact', 'footer'];

	sectionIds.forEach((section) => {
		document.querySelector(`#${section}`).classList.remove('hidden');
	});

	loadingEl.classList.add('hidden');
};

const updatePercentageScrolled = () => {
	const percentageScrolledEl = document.querySelector('.percentage-scrolled');

	currentScroll = Math.round(window.scrollY);
	setActiveNavBarLink();

	percentageScrolled = (currentScroll / fullScroll) * 100;
	percentageScrolledEl.style.width = `${percentageScrolled}%`;
};

const setActiveNavBarLink = () => {
	let currentSection;

	for (let i = 1; i < sectionPositions.length; i++) {
		if (sectionPositions[i - 1] < currentScroll && currentScroll < sectionPositions[i]) currentSection = i - 1;
		else if (currentScroll > sectionPositions[i]) currentSection = i;
	}
	navbarLinksEls.forEach((link, i) => {
		if (currentSection === i) link.classList.add('active');
		else link.classList.remove('active');
	});
};

const skillItemsObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry, i) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('appear');
			entry.target.style.animationDelay = `${i * 200}ms`;
		}
	});
});

window.onload = () => {
	Promise.all([...document.images].map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))).then(() => {
		displayPage();

		fullScroll = Math.round(document.documentElement.scrollHeight - document.documentElement.clientHeight);
		headerHeight = document.querySelector('header').offsetHeight;
		document.querySelectorAll('.section-title').forEach((section) => {
			sectionPositions.push(section.offsetTop - headerHeight);
		});
		sectionPositions[4] = sectionPositions[4] - window.innerHeight;
	});
};

hamburgerEl.addEventListener('click', (e) => {
	e.preventDefault();
	navbarEl.classList.toggle('active');
});

document.addEventListener('scroll', updatePercentageScrolled);

skillItemsEls.forEach((el) => {
	skillItemsObserver.observe(el);
});

document.querySelector('.age').textContent = year - 2004;
document.querySelector('.year').textContent = year;
