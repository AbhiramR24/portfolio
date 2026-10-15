(() => {
	const menuButton = document.querySelector('.menu');
	const navigation = document.querySelector('.links');
	if (!menuButton || !navigation) return;

	const closeMenu = () => {
		navigation.classList.remove('open');
		menuButton.setAttribute('aria-expanded', 'false');
		menuButton.setAttribute('aria-label', 'Open navigation');
		menuButton.textContent = '☰';
	};

	menuButton.addEventListener('click', () => {
		const isOpen = navigation.classList.toggle('open');
		menuButton.setAttribute('aria-expanded', String(isOpen));
		menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
		menuButton.textContent = isOpen ? '✕' : '☰';
	});

	navigation.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('click', (event) => {
		if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && navigation.classList.contains('open')) {
			closeMenu();
			menuButton.focus();
		}
	});

	const mobileQuery = window.matchMedia('(max-width: 720px)');
	const handleBreakpoint = (event) => {
		if (!event.matches) closeMenu();
	};
	if (mobileQuery.addEventListener) {
		mobileQuery.addEventListener('change', handleBreakpoint);
	} else {
		mobileQuery.addListener(handleBreakpoint);
	}
})();
