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
		switch (direction) {
			case 'right':
				inactiveAllSlides()
				index++;
				if (index === slides.length) {
					index = slides.length - 1
				}
				slides[index].classList.add('current')
				break;
			case 'left':
				inactiveAllSlides()
				index--;
				if (index < 0) {
					index = 0;
				}
				slides[index].classList.add('current')
				break;
		}
		sliderWrapper.style.transform = `translateX(-${width * index}px)`
	}

	let mouseStartX = 0;
	let mouseMoveX = 0;
	function setMouseStart(e) {
		if (e.target.closest('.slide') || e.target.classList.contains('.slide')) {
			mouseStartX = e.clientX;
		}
	}

	function setMouseMove(e) {
		e.preventDefault()
		if (e.which == 1) {
			if (e.target.closest('.slide') || e.target.classList.contains('.slide')) {
				mouseMoveX = e.clientX;
				const way = mouseMoveX - mouseStartX;
				sliderWrapper.style.transform = `translateX(-${width * index - way}px)`
			}
		} else {
			mouseMoveX = 0
		}
	}

	function setMouseEnd(e) {
		slides.forEach(el => {
			if (e.target.closest('.slide') === el || e.target === el) {
				sliderWrapper.style.transform = `translateX(-${width * index}px)`
			}
		})
		if (mouseMoveX != 0) {
			const mouseEndX = e.clientX;
			const way = mouseEndX - mouseStartX;
			console.log(way);
			if (way < Math.round(width / 6) || -way < Math.round(width / 6)) {
				sliderWrapper.style.transform = `translateX(-${width * index}px)`
			}
			if (-way >= Math.round(width / 6)) {
				changeSlide('right')
			}
			if (way >= Math.round(width / 6)) {
				changeSlide('left')
			}
		}

	}

	document.addEventListener('mousedown', setMouseStart)
	document.addEventListener('mousemove', setMouseMove)
	document.addEventListener('mouseup', setMouseEnd)
})




