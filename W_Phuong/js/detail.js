const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container h1", scrollRevealOption);

ScrollReveal().reveal(".header__container h4", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// about container
ScrollReveal().reveal(".about__container .section__header", scrollRevealOption);
ScrollReveal().reveal(".about__container .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__container .about__flex", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__container .btn", {
  ...scrollRevealOption,
  delay: 1500,
});

// discover container
ScrollReveal().reveal(".discover__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".discover__card__content", {
  ...scrollRevealOption,
  interval: 500,
  delay: 200,
});

// blogs container
ScrollReveal().reveal(".blogs__card", {
  duration: 1000,
  interval: 400,
});

// journals container
ScrollReveal().reveal(".journals__card", {
  ...scrollRevealOption,
  interval: 400,
});
// reaction
const reactions = document.querySelectorAll('.reactions > div');
const reactionsParent = document.querySelector('.reactions')

reactions.forEach(reaction => {
	reaction.addEventListener('click', function(){
		
		reactionsParent.classList.add('wave');
		
		reactions.forEach(reaction =>{
			reaction.classList.remove('active');
		})
		
		reaction.classList.add('active')
		
		setTimeout(function(){
			reactionsParent.classList.remove('wave');
		},875)
	})
	
})

// demo heart reaction
setTimeout(function(){
	const heartReaction = document.querySelector('.reactions div.love');
	reactionsParent.classList.add('wave');
	heartReaction.classList.add('active');
	setTimeout(function(){
		reactionsParent.classList.remove('wave');
	},875)
},2000)

// Lấy video và vị trí của phần trong trang
var video1 = document.querySelector("#samson video");
var video2 = document.querySelector("#thanhnhaho video");
var video3 = document.querySelector("#puluong video");
var video4 = document.querySelector("#lamkinh video");

// Kiểm tra khi người dùng cuộn trang
window.addEventListener("scroll", function() {
    // Kiểm tra video 1
    var video1Position = video1.getBoundingClientRect();
    if (video1Position.bottom < 0 || video1Position.top > window.innerHeight) {
        video1.pause(); // Dừng video 1 nếu không còn nằm trong tầm nhìn của trình duyệt
    } else{
      video1.play(); // Chạy video 1 nếu còn nằm trong tầm nhìn của trình video
    }

    // Kiểm tra video 2
    var video2Position = video2.getBoundingClientRect();
    if (video2Position.bottom < 0 || video2Position.top > window.innerHeight) {
        video2.pause(); // Dừng video 2 nếu không còn nằm trong tầm nhìn của trình duyệt
    } else {
      video2.play(); // Chạy video 2 nếu còn nằm trong tầm nhìn của trình video
    }

     var video3Position = video3.getBoundingClientRect();
    if (video3Position.bottom < 0 || video3Position.top > window.innerHeight) {
        video3.pause(); // Dừng video 2 nếu không còn nằm trong tầm nhìn của trình duyệt
    } else {
      video3.play(); // Chạy video 2 nếu còn nằm trong tầm nhìn của trình video
    }

     var video4Position = video4.getBoundingClientRect();
    if (video4Position.bottom < 0 || video4Position.top > window.innerHeight) {
        video4.pause(); // Dừng video 2 nếu không còn nằm trong tầm nhìn của trình duyệt
    } else {
      video4.play(); // Chạy video 2 nếu còn nằm trong tầm nhìn của trình video
    }
});

document.getElementById('nghean').addEventListener('click', function() {
    window.location.href = 'NgheAn.html';
});

