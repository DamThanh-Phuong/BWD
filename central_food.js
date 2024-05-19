$(document).ready(function() {
    // Toggle navigation active class
    $('#checkbox').change(function() {
        $('#nav').toggleClass('active', this.checked);
    });
    // Trigger dropdown on mouseover
    $('.dropdown').on('mouseover', function() {
        $('.dropdown-toggle', this).trigger('click');
    });
    const slides = $('.slide');
    const numofSlides = slides.length;
    let slideNumber = 0;
    function changeSlide(increment) {
        slides.removeClass('active');
        slideNumber = (slideNumber + increment + numofSlides) % numofSlides;
        slides.eq(slideNumber).addClass('active');
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
const defaultColor = "#fff"; // Default color in case no background color is found
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
    // Get the element under the mouse pointer
    const element = document.elementFromPoint(x, y);
    let backgroundColor = defaultColor;
    if (element) {
        const computedStyle = getComputedStyle(element);
        backgroundColor = computedStyle.backgroundColor || defaultColor;
    }
    circles.forEach(function(circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        // Determine circle color based on background color
        if (backgroundColor === "rgb(0, 0, 0)") {
            circle.style.backgroundColor = "#fff"; // Set to white if background is black
        } else if (backgroundColor === "rgb(255, 255, 255)") {
            circle.style.backgroundColor = "#000"; // Set to black if background is white
        } else {
            circle.style.backgroundColor = "#fff"; // Set to white for other colors
        }
        circle.style.scale = (circles.length - index) / circles.length;
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
    class DragScroll{
        constructor(obj){
            this.el = document.querySelector(obj.el);
            this.wrap = document.querySelector(obj.wrap);
            this.items = document.querySelectorAll(obj.item);
            // this.bar = document.querySelector(obj.bar);
            this.init();
        }
        init(){
            this.progress = 0;
            this.speed = 0;
            this.oldX = 0;
            this.x = 0;
            this.playrate = 0;

            this.bindings();
            this.events();
            this.calculate();
            this.raf();
        }
        bindings(){
            [
                "events",
                "calculate",
                "raf",
                "handleWheel",
                "move",
                "handleTouchStart",
                "handleTouchMove",
                "handleTouchEnd",
            ].forEach((method) => {
                this[method] = this[method].bind(this);
            })
        }
        calculate() {
            this.progress = 0;
            this.wrapWidth = this.items[0].clientWidth * this.items.length;
            this.wrap.style.width = `${this.wrapWidth}px`;
            this.maxScroll = this.wrapWidth - this.el.clientWidth;
        }
        handleWheel(e){
            this.progress += e.deltaY;
            this.move();
        }
        handleTouchStart(e){
            e.preventDefault();
            this.dragging = true;
            this.startX = e.clientX || e.touches[0].clientX;
        }
        handleTouchMove(e){
            if(!this.dragging) return false;
            const x = e.clientX || e.touches[0].clientX;
            this.progress += (this.startX - x) * 2.5;
            this.startX = x;
            this.move();
        }
        handleTouchEnd(){
            this.dragging = false;
        }
        move(){
            this.progress = clamp(this.progress, 0, this.maxScroll);
        }
        events(){
            window.addEventListener("resize", this.calculate);
            window.addEventListener("wheel", this.handleWheel);
            this.el.addEventListener("touchstart", this.handleTouchStart);
            window.addEventListener("touchmove", this.handleTouchMove);
            window.addEventListener("touchend", this.handleTouchEnd);
            window.addEventListener("mousedown", this.handleTouchStart);
            window.addEventListener("mousemove", this.handleTouchMove);
            window.addEventListener("mouseup", this.handleTouchEnd);
            document.body.addEventListener("mouseleave", this.handleTouchEnd);
        }
        raf() {
            this.x = lerp(this.x, this.progress, 0.1);
            this.playrate = this.x / this.maxScroll;

            this.wrap.style.transform = `translateX(${-this.x}px)`;
            // this.bar.style.transform = `scaleX(${0.18 + this.playrate * 0.82})`;

            this.speed = Math.min(100, this.oldX - this.x);
            this.oldX = this.x;

            this.items.forEach((item) => {
                item.style.transform = `scale(${1 - Math.abs(this.speed) * 0.005})`;
                item.querySelector("img").style.transform = `scaleX(${1 - Math.abs(this.speed) * 0.004})`;
            });
        }
    }
    const scroll = new DragScroll({
        el: ".img-gallery",
        wrap: ".slider-wrapper",
        item: ".slider-item",
        // bar: ".slider-progress-bar",
    });
    const animateScroll = () => {
        requestAnimationFrame(animateScroll);
        scroll.raf();
    }
    animateScroll();
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('.slider-item img');
        images.forEach(image => {
            image.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });