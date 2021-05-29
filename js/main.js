

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

let burger = document.querySelector('.header__arrow');
let menuBody = document.querySelector('.header__theme');

burger.addEventListener('click', () => {
	burger.classList.toggle('active');
	menuBody.classList.toggle('active');
	body.classList.toggle('lock')
})

let bell = document.querySelector('.icons__bell');
let menuBell = document.querySelector('.header__them');

// burger.addEventListener('click', () => {
// 	burger.classList.toggle('active');
// 	menuBody.classList.toggle('active');
// 	body.classList.toggle('lock')
// })

let theme = localStorage.getItem('theme')

if (theme == null) {
	setTheme('blue')
} else {
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('header__dot')

for (var i = 0; themeDots.length > i; i++) {
	themeDots[i].addEventListener('click', function () {
		let mode = this.dataset.mode
		console.log('Option clicked', mode)
		setTheme(mode)
	})
}

function setTheme(mode) {
	if (mode == 'blue') {
		document.querySelector('.theme-style').href = 'css/style.css'
	}
	if (mode == 'green') {
		document.querySelector('.theme-style').href = 'css/green.css'
	}
	if (mode == 'white') {
		document.querySelector('.theme-style').href = 'css/white.css'
	}

	localStorage.setItem('theme', mode)
}



// const tl = new TimelineLite({ paused: true });

// tl.to(".pinned_jim", 1, {
// 	width: "60%",
// 	ease: Power2.easeOut
// })
// 	.fromTo('.sidebar', 1, {
// 		opacity: 0,
// 		x: 50,
// 		ease: Power2.easeOut
// 	}, {
// 		opacity: 1,
// 		x: 0
// 	})

// bell.addEventListener("click", () => {
// 	tl.play();
// })

// let icon = document.querySelector('#icon')
// let song = document.querySelector('.mysong')

// icon.addEventListener('click', () => {
// 	if (song.paused) {
// 		song.play();
// 		icon.src = "../img/SVG/pause.svg"
// 	} else {
// 		song.pause();
// 		icon.src = "../img/SVG/Vector-3.svg"
// 	}
// })

/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
	el: "#app",
	data() {
		return {
			audio: null,
			circleLeft: null,
			barWidth: null,
			duration: null,
			currentTime: null,
			isTimerPlaying: false,
			tracks: [
				{
					name: "Yesterday",
					artist: "Beatles",
					source: "https://raw.githubusercontent.com/NazarKan/music/master/audio/The Beatles - Yesterday.mp3",
					url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
					favorited: false
				},
				{
					name: "Everybody Knows",
					artist: "Leonard Cohen",
					source: "https://raw.githubusercontent.com/NazarKan/music/master/audio/Leonard Cohen - Everybody Knows.mp3",
					url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
					favorited: true
				},
				{
					name: "Holding Out For A Hero",
					artist: "Bonnie Tyler",
					cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
					source: "https://raw.githubusercontent.com/NazarKan/music/master/audio/Bonnie Tyler - Holding Out For A Hero.mp3",
					url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
					favorited: false
				},
				{
					name: "Survival",
					artist: "Eminem",
					cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
					source: "https://raw.githubusercontent.com/NazarKan/music/master/audio/Eminem - Survival.mp3",
					url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
					favorited: false
				},
				{
					name: "Слева горы, справа горы",
					artist: "Манвел Пашаян",
					cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
					source: "https://raw.githubusercontent.com/NazarKan/music/master/audio/Манвел Пашаян - Слева горы, справа горы.mp3",
					url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
					favorited: false
				},

			],
			currentTrack: null,
			currentTrackIndex: 0,
			transitionName: null
		};
	},
	methods: {
		play() {
			if (this.audio.paused) {
				this.audio.play();
				this.isTimerPlaying = true;
			} else {
				this.audio.pause();
				this.isTimerPlaying = false;
			}
		},
		generateTime() {
			let width = (100 / this.audio.duration) * this.audio.currentTime;
			this.barWidth = width + "%";
			this.circleLeft = width + "%";
			let durmin = Math.floor(this.audio.duration / 60);
			let dursec = Math.floor(this.audio.duration - durmin * 60);
			let curmin = Math.floor(this.audio.currentTime / 60);
			let cursec = Math.floor(this.audio.currentTime - curmin * 60);
			if (durmin < 10) {
				durmin = "0" + durmin;
			}
			if (dursec < 10) {
				dursec = "0" + dursec;
			}
			if (curmin < 10) {
				curmin = "0" + curmin;
			}
			if (cursec < 10) {
				cursec = "0" + cursec;
			}
			this.duration = durmin + ":" + dursec;
			this.currentTime = curmin + ":" + cursec;
		},
		updateBar(x) {
			let progress = this.$refs.progress;
			let maxduration = this.audio.duration;
			let position = x - progress.offsetLeft;
			let percentage = (100 * position) / progress.offsetWidth;
			if (percentage > 100) {
				percentage = 100;
			}
			if (percentage < 0) {
				percentage = 0;
			}
			this.barWidth = percentage + "%";
			this.circleLeft = percentage + "%";
			this.audio.currentTime = (maxduration * percentage) / 100;
			this.audio.play();
		},
		clickProgress(e) {
			this.isTimerPlaying = true;
			this.audio.pause();
			this.updateBar(e.pageX);
		},
		prevTrack() {
			this.transitionName = "scale-in";
			this.isShowCover = false;
			if (this.currentTrackIndex > 0) {
				this.currentTrackIndex--;
			} else {
				this.currentTrackIndex = this.tracks.length - 1;
			}
			this.currentTrack = this.tracks[this.currentTrackIndex];
			this.resetPlayer();
		},
		nextTrack() {
			this.transitionName = "scale-out";
			this.isShowCover = false;
			if (this.currentTrackIndex < this.tracks.length - 1) {
				this.currentTrackIndex++;
			} else {
				this.currentTrackIndex = 0;
			}
			this.currentTrack = this.tracks[this.currentTrackIndex];
			this.resetPlayer();
		},
		resetPlayer() {
			this.barWidth = 0;
			this.circleLeft = 0;
			this.audio.currentTime = 0;
			this.audio.src = this.currentTrack.source;
			setTimeout(() => {
				if (this.isTimerPlaying) {
					this.audio.play();
				} else {
					this.audio.pause();
				}
			}, 300);
		},
		favorite() {
			this.tracks[this.currentTrackIndex].favorited = !this.tracks[
				this.currentTrackIndex
			].favorited;
		}
	},
	created() {
		let vm = this;
		this.currentTrack = this.tracks[0];
		this.audio = new Audio();
		this.audio.src = this.currentTrack.source;
		this.audio.ontimeupdate = function () {
			vm.generateTime();
		};
		this.audio.onloadedmetadata = function () {
			vm.generateTime();
		};
		this.audio.onended = function () {
			vm.nextTrack();
			this.isTimerPlaying = true;
		};

		// this is optional (for preload covers)
		for (let index = 0; index < this.tracks.length; index++) {
			const element = this.tracks[index];
			let link = document.createElement('link');
			link.rel = "prefetch";
			link.href = element.cover;
			link.as = "image"
			document.head.appendChild(link)
		}
	}
});


