/*	Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

var nav;

function page() {
	return (window.location.pathname !== '/' ? window.location.pathname.split('/')[1] : 'default');
}

function load(where) {
	nav.clear();
	nav.pages[where].get();
}

window.onpopstate = function(e) {
	load(page());
}

window.addEvent('domready', function() {
	nav = new Navigation({
		menu: $('menu'),
		main: $('main'),
		site: 'default',
		title: 'Entropy Development',
		markdown: $('markdown'),
		onComplete: function() {
			if(nav.pages[page()] !== undefined) {
				console.log('on page ' + page());
				nav.pages[page()].get();
			} else {
				$('main').set('html', 'Page not found');
			}
		}
	});
	$('home').addEvent('click', function() {
		nav.clear();
		nav.pages.default.get();
		history.pushState({}, '', '/');
		return false;
	});

	nav.get();
});
