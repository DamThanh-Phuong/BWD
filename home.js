document.getElementById('checkbox').addEventListener('change', function() {
    var navigation = document.getElementById('nav');
    if(this.checked) {
    navigation.classList.add('active');
    } else {
    navigation.classList.remove('active');
    }
    });
    let nav = document.querySelector("nav");
    window.onscroll = function() {
        if (document.documentElement.scrollTop > 20) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    }
    $(document).ready(function(){
        $('.dropdown').on('mouseover', function(){
            $('.dropdown-toggle', this).trigger('click');
        });
    });
    
    const btns = document.querySelectorAll(".nav-btn");
    const slides = document.querySelectorAll(".video-slide");
    const contents = document.querySelectorAll(".slide-content");
    var sliderNav = function(manual) {
        btns.forEach((btn) => {
            btn.classList.remove("active");
        });
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        contents.forEach((content) => {
            content.classList.remove("active");
        });
        btns[manual].classList.add("active");
        slides[manual].classList.add("active");
        contents[manual].classList.add("active");
    }
    btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            sliderNav(i);
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