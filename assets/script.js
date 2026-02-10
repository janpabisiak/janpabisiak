('use strict');

const loadingEl = document.querySelector('.loading');
const hamburgerEl = document.querySelector('.hamburger');
const navbarEl = document.querySelector('.navbar__links');
const navbarLinksEls = document.querySelectorAll('.navbar__links li a');
const skillSectionEl = document.querySelector('#skills');
const skillItemsEls = document.querySelectorAll('.skills__list__item');

const year = new Date().getFullYear();
const sectionPositions = [-999];
let headerHeight;
let fullScroll;
let currentScroll;
let percentageScrolled;

function displayPage() {
	const sectionIds = ['header', 'hero', 'about', 'skills', 'projects', 'contact', 'footer'];

	sectionIds.forEach((section) => {
		document.querySelector(`#${section}`).classList.remove('hidden');
	});

	loadingEl.classList.add('hidden');
}

function updatePercentageScrolled() {
	const percentageScrolledEl = document.querySelector('.percentage-scrolled');

	currentScroll = Math.round(window.scrollY);
	setActiveNavBarLink();

	percentageScrolled = (currentScroll / fullScroll) * 100;
	percentageScrolledEl.style.width = `${percentageScrolled}%`;
}

function setActiveNavBarLink() {
	let currentSection;

	for (let i = 1; i < sectionPositions.length; i++) {
		if (sectionPositions[i - 1] < currentScroll && currentScroll < sectionPositions[i]) currentSection = i - 1;
		else if (currentScroll > sectionPositions[i]) currentSection = i;
	}
	navbarLinksEls.forEach((link, i) => {
		if (currentSection === i) link.classList.add('active');
		else link.classList.remove('active');
	});
}

function scrollImage(imgEl, scrollUp, animationDuration, altImgPrefix) {
	if (window.innerWidth <= 1300) return;

	const { height } = imgEl.getBoundingClientRect();
	const imageSource = new URL(`/images/${altImgPrefix}-full.webp`, window.location.origin).href;

	if (scrollUp) {
		const image = new Image();
		image.src = imageSource;

		image.onload = () => {
			imgEl.src = imageSource;
			imgEl.style.height = `${height}px`;
			imgEl.style.objectFit = 'cover';
			imgEl.style.objectPosition = 'center top';
			imgEl.offsetHeight;
			imgEl.style.transition = `object-position ${animationDuration}s linear`;
			imgEl.style.objectPosition = 'center bottom';
		};
	} else {
		imgEl.style.objectPosition = 'center bottom';
		imgEl.offsetHeight;
		imgEl.style.transition = `object-position ${animationDuration}s linear`;
		imgEl.style.objectPosition = 'center top';
	}
}

function initProjectImagesHover() {
	const images = document.querySelectorAll('.project__image[scrollable] img');

	images.forEach((img) => {
		const prefix = img.getAttribute('altImgPrefix');
		const durationIn = +img.getAttribute('animationDurationMouseEnter') || 2;
		const durationOut = +img.getAttribute('animationDurationMouseLeave') || 1;

		img.addEventListener('mouseenter', () => scrollImage(img, true, durationIn, prefix));
		img.addEventListener('mouseleave', () => scrollImage(img, false, durationOut, prefix));
	});
}

const skillItemsObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry, i) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('appear');
			entry.target.style.animationDelay = `${i * 200}ms`;
		}
	});
});

const moveLeftObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) entry.target.classList.add('move-left');
	});
});

window.onload = () => {
	displayPage();
	initProjectImagesHover();

	fullScroll = Math.round(document.documentElement.scrollHeight - document.documentElement.clientHeight);
	headerHeight = document.querySelector('header').offsetHeight;
	document.querySelectorAll('.section-title').forEach((section) => {
		sectionPositions.push(section.offsetTop - headerHeight);
	});
	sectionPositions[4] = sectionPositions[4] - window.innerHeight;
};

hamburgerEl.addEventListener('click', (e) => {
	e.preventDefault();
	navbarEl.classList.toggle('active');
});

document.addEventListener('scroll', updatePercentageScrolled);

skillItemsEls.forEach((el) => {
	skillItemsObserver.observe(el);
});

moveLeftObserver.observe(skillSectionEl);

document.querySelector('.age').textContent = year - 2004;
document.querySelector('.year').textContent = year;

window.innerWidth <= 870 ? navbarLinksEls[navbarLinksEls.length - 1].classList.remove('btn') : '';
