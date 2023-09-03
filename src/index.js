
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});

cursor();

document.body.onscroll = function () {
  if (
    document.body.scrollTop >= 50 ||
    document.documentElement.scrollTop >= 50
  ) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
};


var swiper = new Swiper(".swiper-container", {
    spaceBetween: 15,
    slidesPerView: "1.5",

    loop: true,
    // autoHeight: true,
    pagination: {
      el: ".actuals .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-arrows .swiper-next",
      prevEl: ".swiper-arrows .swiper-prev",
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {

      768: {
        slidesPerView: 3,
        spaceBetween: 15,
        centeredSlides: false,
        pagination: false,
      },
      980: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false,
        pagination: false,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false,
        pagination: false,
        loop: false,
      },
      1600: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false,
        pagination: false,
        loop: false,
      },
    },
  });

  $("#menu-toggle").click(function () {
    $("body").toggleClass("menu-open");
  });



  $(document).ready(function () {
    initvideo();
  });
  
  function initvideo() {
    $(".action--play").click(function () {
      $(".video-wrap").addClass("video-wrap--show");
      $(".video-wrap").removeClass("video-wrap--hide");
      $(".video-player").attr("src", $(this).data("src"));
      $(".video-player source").attr("src", $(this).data("src"));
      $(".video-player").get(0).play();
    });
    $(".action--close").click(function () {
      $(".video-wrap").addClass("video-wrap--hide");
      $(".video-wrap").removeClass("video-wrap--show");
      $(".video-player").get(0).pause();
    });
  }


  const body = document.querySelector('body');

// Guardar la posición actual del scroll
let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

// Función para manejar el evento de scroll
const handleScroll = () => {
  // Obtener la nueva posición del scroll
  const newScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Comparar la posición actual con la nueva posición para determinar la dirección del scroll
  if (newScrollPosition > scrollPosition) {
    // Scroll hacia abajo
    body.classList.remove('scroll-up');
    body.classList.add('scroll-down');
  } else {
    // Scroll hacia arriba
    body.classList.remove('scroll-down');
    body.classList.add('scroll-up');
  }

  // Actualizar la posición actual del scroll
  scrollPosition = newScrollPosition;
};

// Agregar el listener al evento de scroll
window.addEventListener('scroll', handleScroll);
  



console.log('cursor!');

function cursor() {
  console.log('eeeeierpoiejirejerpoijerpoirejpoirj');
  var $cursor = document.querySelector('.cursor');
  var $follower = document.querySelector('.cursor-follow');
  var $hoverables = document.querySelectorAll('.hoverable');
  var $drags = document.querySelectorAll('.drag');

  for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    $hoverables[i].addEventListener('click', onMouseHoverOut);
  }

  for (let i = 0; i < $drags.length; i++) {
    $drags[i].addEventListener('mouseenter', onDragOn);
    $drags[i].addEventListener('mouseleave', onDragOff);
  }
  var posX = 0,
    posY = 0;

  var posX2 = 0,
    posY2 = 0;

  var mouseX = 0,
    mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 7;
      posY += (mouseY - posY) / 7;
      posX2 += (mouseX - posX2) / 4;
      posY2 += (mouseY - posY2) / 4;
      TweenMax.set($follower, {
        css: {
          left: posX - 10,
          top: posY - 10,
        },
      });
      TweenMax.set($cursor, {
        css: {
          left: posX2,
          top: posY2,
        },
      });
    },
  });
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover an element
  function onMouseHover() {
    TweenMax.to($follower, 0.3, {
      css: {
        backgroundColor: '#fff',
        scale: 4,
      },
    });
  }
  function onMouseHoverOut() {
    TweenMax.to($follower, 0.3, {
      scale: 1,
      css: {
        backgroundColor: '#f70154',
        scale: 1,
      },
    });
  }

  function onDragOn() {
    document.body.classList.add('drag');
  }

  function onDragOff() {
    document.body.classList.remove('drag');
  }
}


let pinWrap = document.querySelector(".pin-wrap");
let pinWrapWidth = pinWrap.offsetWidth;
let horizontalScrollLength = pinWrapWidth - window.innerWidth;

gsap.to(".pin-wrap", {
  scrollTrigger: {
    scroller: document.querySelector("[data-scroll-container]"), //locomotive-scroll
    scrub: true,
    trigger: "#sectionPin",
    pin: true,
    // anticipatePin: 1,
    start: "top top",
    end: pinWrapWidth,
  },
  x: -horizontalScrollLength,
  ease: "none",
});
