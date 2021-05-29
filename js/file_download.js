

const categories__items = document.querySelectorAll('.categories__item');
const sidebar__btn = document.querySelectorAll('.sidebar__btn');
let body = document.querySelector('body');

categories__items.forEach(function (categories__item) {
	categories__item.addEventListener('click', function (e) {
		if ((e.target.classList.contains('categories__title'))) {
			e.target.classList.toggle('categories__title--active');
			e.target.nextElementSibling.classList.toggle('categories__body--hidden');
		};

		if ((e.target.classList.contains('categories__title-text'))) {
			e.target.parentElement.classList.toggle('categories__title--active');
			e.target.parentElement.nextElementSibling.classList.toggle('categories__body--hidden');
		};

	});
});
sidebar__btn.forEach(function (sidebar__btn) {
	sidebar__btn.addEventListener('click', function (e) {
		if ((e.target.classList.contains('sidebar__btn'))) {
			e.target.classList.toggle('sidebar__btn--active');
			e.target.nextElementSibling.classList.toggle('categories__under-btn--hidden');
			body.classList.toggle('lock-without-owerflow')
		};

		if ((e.target.classList.contains('sidebar__btn-title'))) {
			e.target.parentElement.classList.toggle('sidebar__btn--active');
			e.target.parentElement.nextElementSibling.classList.toggle('categories__under-btn--hidden');
			body.classList.toggle('lock-without-owerflow')
		};

	});
});

let burger = document.querySelector('.header__burger');
let menuBody = document.querySelector('.header__menu');

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	menuBody.classList.toggle('active');
	body.classList.toggle('lock')
})


function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();


function smoothScroll(target, duration) {
	var target = document.querySelector(target);
	var targetPosition = target.getBoundingClientRect().top;
	var startPosition = window.pageYOffset;
	var distance = targetPosition;
	var startTime = null;

	function animation(currentTime) {
		if (startTime === null) startTime = currentTime;
		var timeElapsed = currentTime - startTime;
		var run = ease(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation);
	}

	function ease(t, b, c, d) {
		t /= d;
		return -c * t * (t - 2) + b;
	}

	requestAnimationFrame(animation);
}

var section1 = document.querySelector('.article__loadlink');
var description = document.querySelector('.article__headlinks-item_description');
var relatedPosts = document.querySelector('.article__headlinks-item_related-posts');
var comments = document.querySelector('.article__headlinks-item-comments');


section1.addEventListener('click', () => {
	smoothScroll('.article__loadlink-anchor', 2000);
})

description.addEventListener('click', () => {
	smoothScroll('.article__description', 1000);
})

relatedPosts.addEventListener('click', () => {
	smoothScroll('.article__related-posts', 2500);
})

comments.addEventListener('click', () => {
	smoothScroll('#vk_comments', 2500);
})

