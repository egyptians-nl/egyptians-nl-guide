document.addEventListener('DOMContentLoaded', () => {
	const currentLocale = document.documentElement.lang || 'en';
	const languageLinks = document.querySelectorAll('.md-header__option .md-select__link');

	languageLinks.forEach((link) => {
		if (link.getAttribute('hreflang') === currentLocale) {
			link.classList.add('is-active');
			link.setAttribute('aria-current', 'page');
		}
	});
});
