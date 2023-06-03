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
