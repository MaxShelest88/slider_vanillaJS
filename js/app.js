document.addEventListener('DOMContentLoaded', () => {
	const sliderWrapper = document.querySelector('.slider__wrapper')
	const slides = document.querySelectorAll('.slider__slide')
	const slide = document.querySelector('.slider__slide')
	const controls = document.querySelector('.slider__controls')
	let index = 0;
	const width = slide.clientWidth;
	const inactiveAllSlides = () => {
		slides.forEach(slide => {
			slide.classList.remove('current')
		})
	}

	slides[index].classList.add('current')

	controls.addEventListener('click', (e) => {
		if (e.target.classList.contains('controls__left')) {
			changeSlide('left')

		}
		if (e.target.classList.contains('controls__right')) {
			changeSlide('right')

		}
	})

	function changeSlide(direction) {
		if (direction === 'right') {
			inactiveAllSlides()
			index++;
			if (index === slides.length) {
				index = slides.length - 1
			}
			slides[index].classList.add('current')
		}
		if (direction === 'left') {
			inactiveAllSlides()
			index--;
			if (index < 0) {
				index = 0;
			}
			slides[index].classList.add('current')
		}
		sliderWrapper.style.transform = `translateX(-${width * index}px)`
	}

	slides.forEach(el => {
		let mouseStartX = 0;
		let mouseEndX = 0;
		function setMouseStart(e) {
			mouseStartX = e.clientX;
		}
		function setMouseMove(e) {
			e.preventDefault()
			mouseEndX = e.clientX;
		}

		function setMouseEnd(e) {
			mouseEndX = e.clientX;
			const way = mouseEndX - mouseStartX;
			if (-way > Math.round(width / 6)) {
				changeSlide('right')
			}
			if (way > Math.round(width / 6)) {
				changeSlide('left')
			}
		}

		el.addEventListener('mousedown', setMouseStart)
		el.addEventListener('mousemove', setMouseMove)
		el.addEventListener('mouseup', setMouseEnd)

	})

})




