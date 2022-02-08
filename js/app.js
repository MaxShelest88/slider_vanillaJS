document.addEventListener('DOMContentLoaded', () => {
    /*	const sliderWrapper = document.querySelector('.slider__wrapper')
        const slides = document.querySelectorAll('.slider__slide')
        const slide = document.querySelector('.slider__slide')
        const controls = document.querySelector('.slider__controls')
        let index = 0;
        const width = slide.clientWidth;
        const inactiveAllSlides = () => {
            slides.forEach(slide => {
                slide.classList.remove('current')
            })
        }*/

    // slides[index].classList.add('current')

    /*controls.addEventListener('click', (e) => {
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
        if (e.which === 1) {
            if (e.target.closest('.slide') || e.target.classList.contains('.slide')) {
                mouseMoveX = e.clientX;
                const way = mouseMoveX - mouseStartX;
                sliderWrapper.style.transform = `translateX(-${width * index - way}px)`
            }
        } else {
            mouseMoveX = 0
        }
    }

    function swipeSlide(e) {
        slides.forEach(el => {
            if (e.target.closest('.slide') || e.target === el) {
                sliderWrapper.style.transform = `translateX(-${width * index}px)`
            }
        })
        if (mouseMoveX !== 0) {
            const mouseEndX = e.clientX;
            const way = mouseEndX - mouseStartX;
            if (way < Math.round(width / 7) || -way < Math.round(width / 7)) {
                sliderWrapper.style.transform = `translateX(-${width * index}px)`
            }
            if (-way >= Math.round(width / 7)) {
                changeSlide('right')
            }
            if (way >= Math.round(width / 7)) {
                changeSlide('left')
            }
        }

    }

    document.addEventListener('mousedown', setMouseStart)
    document.addEventListener('mousemove', setMouseMove)
    document.addEventListener('mouseup', swipeSlide)*/

    class Slider {
        constructor(parent) {
            this.parent = document.querySelector(parent)
            this.slides = [...this.parent.children]
            this.slideWidth = this.slides[0].clientWidth;
            this.options = {
                sliderControls: true,
                index: 0
            }
            this.mouseCoords ={
                mouseStart: 0,
                mouseMoveX: 0,
                mouseEndX: 0,
            }
        }

        createSlider() {
            this.createSliderStructure()
            this.setCurrentSlide(this.slides)
            if (this.options.sliderControls) {
                this.createControls()
            }
            this.swipe()
        }


        createSliderStructure() {
            this.wrapper = document.createElement('div')
            this.wrapper.classList.add('slider__wrapper')
            this.wrapper.style.cssText = `
            margin: 40px 0px 0px 0px;
            \tdisplay: flex;
            \ttransition: transform 0.5s ease;`
            this.parent.style.cssText = `overflow:hidden`
            this.slides.forEach(el => {
                el.classList.add('slide')
            })
            this.wrapper.append(...this.slides)
            this.parent.append(this.wrapper)
        }

        removeCurrentSlide(slides) {
            slides.forEach(slide => {
                slide.classList.remove('current')
            })
        }

        setCurrentSlide(slides) {
            slides[this.options.index].classList.add('current')
        }

        changeSlide(direction) {
            switch (direction) {
                case 'right':
                    this.removeCurrentSlide(this.slides)
                    this.options.index++;
                    if (this.options.index === this.slides.length) {
                        this.options.index = this.slides.length - 1
                    }
                    this.setCurrentSlide(this.slides)
                    break;
                case 'left':
                    this.removeCurrentSlide(this.slides)
                    this.options.index--;
                    if (this.options.index < 0) {
                        this.options.index = 0;
                    }
                    this.setCurrentSlide(this.slides)
                    break;
            }
            this.wrapper.style.transform = `translateX(-${this.slideWidth * this.options.index}px)`
        }

        createControls() {
            const controls = document.createElement('div')
            controls.classList.add('slider__controls')
            controls.innerHTML = `
            <div class="btn btn__left"></div>
            <div class="btn btn__right"></div>
            `
            this.wrapper.insertAdjacentElement('afterend', controls)

            controls.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn__left')) {
                    this.changeSlide('left')
                }
                if (e.target.classList.contains('btn__right')) {
                    this.changeSlide('right')
                }
            })
        }

        swipe(){
            document.addEventListener('mousedown', this.setMouseStart.bind(this))
            document.addEventListener('mousemove', this.setMouseMove.bind(this))
            document.addEventListener('mouseup', this.swipeSlide.bind(this))
        }

        setMouseStart(e) {
            if (e.target.closest('.slide') || e.target.classList.contains('.slide')) {
                this.mouseCoords.mouseStartX = e.clientX;
            }
        }

        setMouseMove(e) {
            e.preventDefault()
            if (e.which === 1) {
                if (e.target.closest('.slide') || e.target.classList.contains('.slide')) {
                    this.mouseCoords.mouseMoveX = e.clientX;
                    const way = this.mouseCoords.mouseMoveX - this.mouseCoords.mouseStartX;
                    this.wrapper.style.transform = `translateX(-${this.slideWidth * this.options.index - way}px)`
                }
            } else {
                this.mouseCoords.mouseMoveX = 0
            }
        }

        swipeSlide(e) {
            this.slides.forEach(el => {
                if (e.target.closest('.slide') || e.target === el) {
                    this.wrapper.style.transform = `translateX(-${this.slideWidth * this.options.index}px)`
                }
            })
            if (this.mouseCoords.mouseMoveX !== 0) {
                this.mouseCoords.mouseEndX = e.clientX;
                const way = this.mouseCoords.mouseEndX - this.mouseCoords.mouseStartX;
                const swipeWidth = Math.round(this.slideWidth / 7)
                if (way < swipeWidth || -way < swipeWidth) {
                    this.wrapper.style.transform = `translateX(-${this.slideWidth * this.options.index}px)`
                }
                if (-way >= swipeWidth) {
                    this.changeSlide('right')
                }
                if (way >= swipeWidth) {
                    this.changeSlide('left')
                }
            }
        }
    }


    const newSlider = new Slider('.slider__body')
    newSlider.createSlider()

})




