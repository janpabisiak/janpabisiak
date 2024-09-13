const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
let headerHeight;
const sectionsOffsetTop = [];
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
	headerHeight = document.querySelector('header').offsetHeight;
	document.querySelectorAll('.section-title').forEach((section) => {
		sectionsOffsetTop.push({
			section: section.textContent.toLowerCase().replaceAll(' ', '-'),
			position: section.offsetTop - headerHeight,
		});
	});
};

document.addEventListener('scroll', () => {
	currentScroll = Math.round(window.scrollY);
	if (currentScroll > headerHeight && currentScroll < sectionsOffsetTop[0].position) {
		navbarLinks.childNodes[1].childNodes[1].firstChild.classList.add('active');
	}
	if (currentScroll > sectionsOffsetTop[0].position && currentScroll < sectionsOffsetTop[1].position) {
		navbarLinks.childNodes[1].childNodes[1].firstChild.classList.remove('active');
		navbarLinks.childNodes[1].childNodes[3].firstChild.classList.add('active');
	}
	if (currentScroll > sectionsOffsetTop[1].position && currentScroll < sectionsOffsetTop[2].position) {
		navbarLinks.childNodes[1].childNodes[3].firstChild.classList.remove('active');
		navbarLinks.childNodes[1].childNodes[5].firstChild.classList.add('active');
	}
	if (currentScroll > sectionsOffsetTop[2].position && currentScroll < sectionsOffsetTop[3].position) {
		navbarLinks.childNodes[1].childNodes[5].firstChild.classList.remove('active');
		navbarLinks.childNodes[1].childNodes[7].firstChild.classList.add('active');
	}

	percOfScrolledContent = (currentScroll / fullScroll) * 100;
	document.querySelector('.percOfScrolledContent').style.width = `${percOfScrolledContent}%`;
});

toggleButton.addEventListener('click', (e) => {
	e.preventDefault();
	navbarLinks.classList.toggle('active');
});

// navbarLinks.addEventListener('click', (e) => {
// 	if (e.target.nodeName != 'A') return;
// 	e.target.classList.add('active');
// 	if (previousClickedNavLink !== undefined) previousClickedNavLink.classList.remove('active');
// 	previousClickedNavLink = e.target;
// });

window.innerWidth <= 768 ? navbarLinks.childNodes[1].childNodes[11].firstChild.classList.remove('btn') : '';

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
