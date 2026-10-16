(() => {
	if (!window.AOS || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const animationTargets = document.querySelectorAll(
		'.hero-copy, .portrait, .section > .wrap > .head, .section > .wrap > .head-row, ' +
		'.about > *, .card, .edu > *, #skills .skills, .contact > *, .detail-back, ' +
		'.detail-heading, .detail-feature, .detail-copy, .detail-aside'
	);

	animationTargets.forEach((target, index) => {
		target.dataset.aos = 'fade-up';
		if (target.matches('.card')) target.dataset.aosDelay = String((index % 2) * 100);
	});

	window.AOS.init({
		duration: 650,
		easing: 'ease-out-cubic',
		offset: 70,
		mirror: true,
		once: false
	});
})();

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
