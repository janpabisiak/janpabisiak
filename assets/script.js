'use strict';

const toggleButton = document.querySelector('.toggle-button');
const navbar = document.querySelector('.navbar-links');
const navbarLinks = document.querySelectorAll('.navbar-links ul li a');
const percOfScrolledElm = document.querySelector('.percOfScrolled');
const sectionPositions = [-999];
let headerHeight;
let fullScroll;
let currentScroll;
let percOfScrolled;

const setActiveNavBarLink = () => {
	let currentSection;
	for (let i = 1; i < sectionPositions.length; i++) {
		if (sectionPositions[i - 1] < currentScroll && currentScroll < sectionPositions[i]) currentSection = i - 1;
		else if (currentScroll > sectionPositions[i]) currentSection = i;
	}
	navbarLinks.forEach((link, i) => {
		if (currentSection === i) link.classList.add('active');
		else link.classList.remove('active');
	});
};

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
	headerHeight = document.querySelector('header').offsetHeight;
	document.querySelectorAll('.section-title').forEach((section) => {
		sectionPositions.push(section.offsetTop - headerHeight);
	});
	sectionPositions[4] = sectionPositions[4] - window.innerHeight;
};

document.addEventListener('scroll', () => {
	currentScroll = Math.round(window.scrollY);
	setActiveNavBarLink();

	percOfScrolled = (currentScroll / fullScroll) * 100;
	percOfScrolledElm.style.width = `${percOfScrolled}%`;
});

toggleButton.addEventListener('click', (e) => {
	e.preventDefault();
	navbar.classList.toggle('active');
});

window.innerWidth <= 768 ? navbarLinks[navbarLinks.length - 1].classList.remove('btn') : '';

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry, i) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('appear');
			entry.target.style.animationDelay = `${i * 200}ms`;
		}
	});
});

document.querySelectorAll('.skills .skill-badge').forEach((el) => {
	observer.observe(el);
});

const year = new Date().getFullYear();
document.querySelector('.age').textContent = year - 2004;
document.querySelector('.year').textContent = year;
