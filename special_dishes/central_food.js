$(document).ready(function() {
    $('#checkbox').change(function() {
        $('#nav').toggleClass('active', this.checked);
    });
    $('.dropdown').on('mouseover', function() {
        $('.dropdown-toggle', this).trigger('click');
    });

    const slides = $('.slide');
    const numofSlides = slides.length;
    let slideNumber = 0;

    function changeSlide(increment) {
        slides.removeClass('active');
        slideNumber = (slideNumber + increment + numofSlides) % numofSlides;
        const newSlide = slides.eq(slideNumber);
        newSlide.addClass('active');

        // Scroll to the img-slide section of the new active slide
        const imgSlide = newSlide.find('.img-slide');
        if (imgSlide.length) {
            imgSlide[0].scrollIntoView({ behavior: 'smooth' });
        }
    }

    const images = [
        '/Images_Chang/QuangNam.jpg',
        '/Images_Chang/QuangNgai.jpg',
        '/Images_Chang/KhanhHoa.jpg',
        '/Images_Chang/KonTum.jpg',
        '/Images_Chang/DakNong1.jpg',
        '/Images_Chang/DakLak.jpg',
        '/Images_Chang/GiaLai.jpg',
    ];
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        $('.img-slide').css('backgroundImage', `url(${images[currentIndex]})`);
    }, 2500);
    $('#nextButton').click(() => changeSlide(1));
    $('#prevButton').click(() => changeSlide(-1));
    const sections = $('section');
    $(window).scroll(() => {
        const top = $(window).scrollTop();
        sections.each(function() {
            const offset = $(this).offset().top - 150;
            const height = $(this).outerHeight();
            const isWithinViewport = top >= offset && top < offset + height;
            $(this).toggleClass('show', isWithinViewport);
            if (isWithinViewport) {
                $('.animate', this).each(function(index) {
                    $(this).css({
                        transitionDelay: `${Math.random() * 0.5}s`,
                        transitionDuration: `${0.5 + Math.random()}s`
                    });
                });
            }
        });
    });
});

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const defaultColor = "#fff";

circles.forEach(function(circle) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = defaultColor;
});

window.addEventListener("mousemove", function(e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    const element = document.elementFromPoint(x, y);
    let backgroundColor = defaultColor;
    
    if (element) {
        const computedStyle = getComputedStyle(element);
        backgroundColor = computedStyle.backgroundColor || defaultColor;
    }
    
    circles.forEach(function(circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        
        if (backgroundColor === "rgb(0, 0, 0)") {
            circle.style.backgroundColor = "#fff";
        } else if (backgroundColor === "rgb(255, 255, 255)") {
            circle.style.backgroundColor = "#000";
        } else {
            circle.style.backgroundColor = "#fff";
        }
        
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        circle.x = x;
        circle.y = y;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();

    function clamp(number, min, max) {
        return Math.min(Math.max(number, min), max);
    }
    
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    
    class DragScroll {
        constructor(obj) {
            this.el = obj.el;
            this.wrap = obj.wrap;
            this.items = obj.items;
            this.init();
        }
    
        init() {
            this.progress = 0;
            this.speed = 0;
            this.oldX = 0;
            this.x = 0;
            this.playrate = 0;
            this.dragging = false;
            this.clickThreshold = 5;
            this.bindings();
            this.events();
            this.calculate();
            this.raf();
        }
    
        bindings() {
            ["events", "calculate", "raf", "handleWheel", "move", "handleTouchStart", "handleTouchMove", "handleTouchEnd", "handleClick"].forEach((method) => {
                this[method] = this[method].bind(this);
            });
        }
    
        calculate() {
            this.progress = 0;
            this.wrapWidth = this.items[0].clientWidth * this.items.length;
            this.wrap.style.width = `${this.wrapWidth}px`;
            this.maxScroll = this.wrapWidth - this.el.clientWidth;
        }
    
        handleWheel(e) {
            this.progress += e.deltaY;
            this.move();
        }
    
        handleTouchStart(e) {
            e.preventDefault();
            this.dragging = true;
            this.startX = e.clientX || e.touches[0].clientX;
            this.startProgress = this.progress;
        }
    
        handleTouchMove(e) {
            if (!this.dragging) return false;
            const x = e.clientX || e.touches[0].clientX;
            this.progress += (this.startX - x) * 2.5;
            this.startX = x;
            this.move();
        }
    
        handleTouchEnd() {
            this.dragging = false;
        }
    
        handleClick(e) {
            if (Math.abs(this.progress - this.startProgress) < this.clickThreshold) {
                const targetId = e.target.getAttribute('data-target');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    
        move() {
            this.progress = clamp(this.progress, 0, this.maxScroll);
        }
    
        events() {
            window.addEventListener("resize", this.calculate);
            window.addEventListener("wheel", this.handleWheel);
            this.el.addEventListener("touchstart", this.handleTouchStart);
            window.addEventListener("touchmove", this.handleTouchMove);
            window.addEventListener("touchend", this.handleTouchEnd);
            window.addEventListener("mousedown", this.handleTouchStart);
            window.addEventListener("mousemove", this.handleTouchMove);
            window.addEventListener("mouseup", this.handleTouchEnd);
            document.body.addEventListener("mouseleave", this.handleTouchEnd);
            this.items.forEach(item => item.addEventListener('click', this.handleClick));
        }
    
        raf() {
            this.x = lerp(this.x, this.progress, 0.1);
            this.playrate = this.x / this.maxScroll;
    
            this.wrap.style.transform = `translateX(${-this.x}px)`;
    
            this.speed = Math.min(100, this.oldX - this.x);
            this.oldX = this.x;
    
            this.items.forEach((item) => {
                item.style.transform = `scale(${1 - Math.abs(this.speed) * 0.005})`;
                item.querySelector("img").style.transform = `scaleX(${1 - Math.abs(this.speed) * 0.004})`;
            });
    
            requestAnimationFrame(this.raf);
        }
    }
    
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide) => {
        const scroll = new DragScroll({
            el: slide.querySelector(".img-gallery"),
            wrap: slide.querySelector(".slider-wrapper"),
            items: slide.querySelectorAll(".slider-item"),
        });
    });    
    const animateScroll = () => {
        requestAnimationFrame(animateScroll);
        scroll.raf();
    }
    animateScroll();
    
    $(document).ready(function() {
        // Function to check the background color of the current section
        function updateHeaderColor() {
            const sections = $('section');
            const top = $(window).scrollTop();
            let headerColor = 'white'; // Default color
    
            sections.each(function() {
                const offset = $(this).offset().top - 150;
                const height = $(this).outerHeight();
                const isWithinViewport = top >= offset && top < offset + height;
    
                if (isWithinViewport) {
                    const backgroundColor = $(this).css('background-color');
                    if (backgroundColor === 'rgb(0, 0, 0)') {
                        headerColor = 'black';
                    } else if (backgroundColor === 'rgb(255, 255, 255)') {
                        headerColor = 'white';
                    } else {
                        headerColor = 'black';
                    }
                }
            });
    
            $('header .brand, header .navigation .navigation-items a').css('color', headerColor);
        }
    
        // Call the function on scroll and when the document is ready
        $(window).scroll(updateHeaderColor);
        updateHeaderColor();
    });
    