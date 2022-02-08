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

        swipe() {
            const options = {
                mouseStart: 0,
                mouseMoveX: 0,
                mouseEndX: 0
            }

            const slides = this.slides;
            const wrapper = this.wrapper;
            const index = this.options.index;
            const width = this.slideWidth;
            const changeLeft = () => this.changeSlide('left');
            const changeRight = ()=> this.changeSlide('right');


            function setMouseStart(e) {
                if (e.target.closest('.slide') || e.target.classList.contains('.slide')) {
                    options.mouseStartX = e.clientX;
                }
            }

            function setMouseMove(e) {
                e.preventDefault()
                if (e.which === 1) {
                    if (e.target.closest('.slide') || e.target.classList.contains('.slide')) {
                        options.mouseMoveX = e.clientX;
                        const way = options.mouseMoveX - options.mouseStartX;
                        this.wrapper.style.transform = `translateX(-${this.slideWidth * this.options.index - way}px)`
                    }
                } else {
                    options.mouseMoveX = 0
                }
            }

            function swipeSlide(e) {
                this.slides.forEach(el => {
                    if (e.target.closest('.slide') || e.target === el) {
                        this.wrapper.style.transform = `translateX(-${width * this.options.index}px)`
                    }
                })
                if (options.mouseMoveX !== 0) {
                    options.mouseEndX = e.clientX;
                    const way = options.mouseEndX - options.mouseStartX;
                    const swipeWidth = Math.round(this.slideWidth / 7)
                    if (way < swipeWidth || -way < swipeWidth) {
                        this.wrapper.style.transform = `translateX(-${this.slideWidth * this.options.index}px)`
                    }
                    if (-way >= swipeWidth) {
                        this.changeSlide('right');
                    }
                    if (way >= swipeWidth) {
                        this.changeSlide('left');
                    }
                }

            }

            document.addEventListener('mousedown', setMouseStart)
            document.addEventListener('mousemove', setMouseMove)
            document.addEventListener('mouseup', swipeSlide)
        }

    }

    const newSlider = new Slider('.slider__body')
    newSlider.createSlider()

})




