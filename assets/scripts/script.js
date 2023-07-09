// hide loading container
window.onload = () => {
	document.querySelector('.loading-container').classList.add('hidden');
	document.querySelector('header').classList.remove('hidden');
	document.querySelector('#home').classList.remove('hidden');
	document.querySelector('#about').classList.remove('hidden');
	document.querySelector('#projects').classList.remove('hidden');
	document.querySelector('#contact').classList.remove('hidden');
	document.querySelector('footer').classList.remove('hidden');
};

// toggle menu button
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

toggleButton.addEventListener('click', (e) => {
	e.preventDefault();
	navbarLinks.classList.toggle('active');
});

// fix contact link in nav
if (window.innerWidth < 768) {
	document.querySelector('.contact-link').classList.remove('btn');
}

// load email
setTimeout(() => {
	const emailLinkEl = document.querySelector('#email');

	const user = 'contact';
	const domain = 'janpabisiak.com';
	const email = user + '@' + domain;
	emailLinkEl.href = `mailto:${email}`;
	const textEmail = document.createTextNode(email);
	emailLinkEl.appendChild(textEmail);
}, 1000);

// load year
const year = new Date().getFullYear();
document.querySelector('.year').textContent = year;
