gsap.registerPlugin(ScrollTrigger);


let scroll;
const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);


let colors = ["#fe5f5e", "#fd945e", "#fdcf5f", "#b4db9d", "#abdaf4", "#dca4d5"];
let ciclo = true;


function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}
initPageTransitions();


function initPageTransitions() {
  barba.hooks.before(() => {
    select("html").classList.add("is-transitioning");
  });
  barba.hooks.after(() => {
    select("html").classList.remove("is-transitioning");
    scroll.init();
  });
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
  });
  barba.init({
    sync: true,
    debug: true,
    timeout: 7000,
    transitions: [
      {
        name: "overlay-transition",
        once(data) {
          // do something once on the initial page load
          initSmoothScroll(data.next.container);
          initPage();

        },
        async leave(data) {
          const done = this.async();
          pageTransition();
          await delay(1000);
          data.current.container.remove();
          done();
        },
        async enter(data) {
          initPage();
        },
        async beforeEnter(data) {
          ScrollTrigger.getAll().forEach((t) => t.kill());
          scroll.destroy();
          initSmoothScroll(data.next.container);
        },
      },
    ],
  });



  function initSmoothScroll(container) {
    scroll = new LocomotiveScroll({
      el: container.querySelector("[data-scroll-container]"),
      smooth: true,
	    repeat: true,
      getDirection: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });
    
    ScrollTrigger.create({
      trigger: container, // Elemento que disparará el trigger
      start: "top top+=300", // Inicia el trigger 300 píxeles desde la parte superior
      end: "bottom top", // Finaliza el trigger en la parte superior del contenedor
      onEnter: () => {
        document.body.classList.add("mi-clase"); // Agrega la clase al body
      },
      onLeaveBack: () => {
        document.body.classList.remove("mi-clase"); // Elimina la clase del body al hacer scroll hacia atrás
      },
    });
  



    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: container.querySelector("[data-scroll-container]").style
        .transform
        ? "transform"
        : "fixed",
    });
    if (!document.querySelector(".pin-wrap")) {
    } else {
      homeActions(container);
    }
    const scrollbar = selectAll(".c-scrollbar");
    if (scrollbar.length > 1) {
      scrollbar[0].remove();
    }





    changeBackgroundColorOnScrollEnter();
    scroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => scroll.update());
    ScrollTrigger.refresh();
  }



  menus();


}
function pageTransition() {
  var tl = gsap.timeline();
  tl.to(".loading-screen", {
    duration: 1.2,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });
  tl.to(".loading-screen", {
    duration: 1,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".loading-screen", { left: "-100%" });
}
function initbg() {
  if (ciclo == true) {
    gsap.to(".bg", { height: "0", duration: 1, ease: Expo.easeInOut });
    ciclo = false;
  } else {
    gsap.to(".bg", { height: "0", duration: 0.1, ease: Expo.easeInOut });
  }

	gsap.to(".outtext-1 .intext", { delay: 0.2, top: "0", duration: 1, ease: Expo.easeInOut, });
	gsap.to(".outtext-2 .intext", { delay: 0.4, top: "0", duration: 1, ease: Expo.easeInOut, });
	// gsap.to(".outtext-3 .intext", { delay: 0.5, top: "0", duration: 1, ease: Expo.easeInOut, });
	// gsap.to(".outtext-4 .intext", { delay: 0.6, top: "0", duration: 1, ease: Expo.easeInOut, });
	gsap.to(".image-digital", { delay: 0.7, opacity: "1", duration: 1, ease: Expo.easeInOut, });

}
function initPage() {
  cursor();
  initbg();
  menus();
  menusMobile();
}
function cursor() {
  var cursor = document.querySelector(".cursor");
  var follower = document.querySelector(".cursor-follow");
  var imageToLoad = document.getElementById("image-to-load");


  var hoverables = document.querySelectorAll(".hoverable");
  var drags = document.querySelectorAll(".drag");

  var hoverables2 = document.querySelectorAll(".hoverable2");





  for (let i = 0; i < hoverables2.length; i++) {
    hoverables2[i].addEventListener("mouseenter", function () {
      // Cambia la fuente de la imagen
      const imageSrc = this.getAttribute("data-image-src");

      imageToLoad.src = imageSrc;

      // Muestra la imagen
      document.querySelector("#image-to-load").style.display = "block";
    });
  
    hoverables2[i].addEventListener("mouseleave", function () {
      // Oculta la imagen cuando el mouse sale de la div
      document.querySelector("#image-to-load").style.display = "none";
    });
  
    hoverables2[i].addEventListener("click", onMouseHoverOut);
  }


  for (let i = 0; i < hoverables2.length; i++) {
    hoverables2[i].addEventListener("mouseenter", onMouseHover);



    hoverables2[i].addEventListener("mouseleave", onMouseHoverOut);
    hoverables2[i].addEventListener("click", onMouseHoverOut);
  }


  for (let i = 0; i < hoverables.length; i++) {
    hoverables[i].addEventListener("mouseenter", onMouseHover);
    hoverables[i].addEventListener("mouseleave", onMouseHoverOut);
    hoverables[i].addEventListener("click", onMouseHoverOut);
  }
  for (let i = 0; i < drags.length; i++) {
    drags[i].addEventListener("mouseenter", onDragOn);
    drags[i].addEventListener("mouseleave", onDragOff);
  }
  var posX = 0,
    posY = 0;
  var posX2 = 0,
    posY2 = 0;
  var mouseX = 0,
    mouseY = 0;



  gsap.to(
    {},
    {
      duration: 0.016,
      repeat: -1,
      onRepeat: () => {
        posX += (mouseX - posX) / 7;
        posY += (mouseY - posY) / 7;
        posX2 += (mouseX - posX2) / 4;
        posY2 += (mouseY - posY2) / 4;
        gsap.set(follower, { css: { left: posX - 10, top: posY - 10 } });
        gsap.set(cursor, { css: { left: posX2, top: posY2 } });
      },
    }
  );


  
  
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  // Hover an element


  function onMouseHover() {
    gsap.to(follower, {
      duration: 0.3,
      css: { backgroundColor: "#fff", width: 150,height: 120, borderRadius:2 },
    });




  }


  function onMouseHoverOut() {
    gsap.to(follower, {
      duration: 0.3,
      css: { backgroundColor: "#f70154",  width: 24,height: 24, borderRadius:'100%' },
    });
  }
  function onDragOn() {
    document.body.classList.add("drag");
  }
  function onDragOff() {
    document.body.classList.remove("drag");
  }
}
function homeActions(container) {

  if (window.innerWidth > 600) {
  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth + 100;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;


  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scroller: container.querySelector("[data-scroll-container]"), //locomotive-scroll
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
  
  let sections = gsap.utils.toArray(".panel");
  let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: ".pin-wrap",
      pin: true,
      scrub: 0.1,
      //snap: directionalSnap(1 / (sections.length - 1)),
      end: "+=3000",
    },
  });
  // red section
}
}
function changeBackgroundColorOnScrollEnter() {
  setTimeout(function () {
    scroll.on("call", (value, way, obj) => {
      console.log(obj);
      const objeto = obj.id.split(" ");
      const primero = objeto[0];
      const segundo = objeto[1];
      if (way === "enter") {
        switch (value) {
          case "pageColor":
            // get color code from data-scroll-id  assigned to body by obj.id
            gsap.to(".container-color", { backgroundColor: '#'+primero  }   );
            if (segundo === "darkmode") {
              document.body.classList.remove("lightmode");
              document.body.classList.add("darkmode");
            } else {
              document.body.classList.remove("darkmode");
              document.body.classList.add("lightmode");
            }
            break;
        }
      }
    });
  }, 100); // delay in milliseconds (100 = 0,1 seconds)
}

function menus() {


const cambiarTextoBoton1 = document.getElementById("cambiarTextoBoton1");
const cambiarTextoBoton2 = document.getElementById("cambiarTextoBoton2");
const cambiarTextoBoton3 = document.getElementById("cambiarTextoBoton3");
const cambiarTextoBoton4 = document.getElementById("cambiarTextoBoton4");
const cambiarTextoBoton5 = document.getElementById("cambiarTextoBoton5");


const miParrafo = document.getElementById("miParrafo");


// Agrega un evento de clic al botón
cambiarTextoBoton1.addEventListener("click", function() {
miParrafo.textContent = "Home";
});

cambiarTextoBoton2.addEventListener("click", function() {
miParrafo.textContent = "About";
});

cambiarTextoBoton3.addEventListener("click", function() {
miParrafo.textContent = "Proyectos";
});

cambiarTextoBoton4.addEventListener("click", function() {
miParrafo.textContent = "Blog";
});

cambiarTextoBoton5.addEventListener("click", function() {
miParrafo.textContent = "Contacta";
});



}



function menusMobile() {

let abierto = false; // Variable para rastrear el estado de la div
const miDiv = $('#menu-gsap-wrap');
const menuGsap = $('.menu-gsap');


const tlmenu = gsap.timeline({
  paused: true,
  
  onReverseComplete: function () {
    miDiv.addClass('hidden-menu2');
    menuGsap.removeClass('menu-open');

    abierto = false;
  }
});

tlmenu
  .to(miDiv, { duration: 0.2, left: '0%', ease: 'cubic-bezier(0.47, 0, 0.745, 0.715)' })
  .to({}, { duration: 0.5 }) // Añade un retraso de 0.5 segundos

  .staggerFromTo('nav li', 0.6, { x: -50, opacity: 0 }, { x: 0, opacity: 1, ease: Back.easeOut }, 0.1);



$('.openButton').click(function() {
  if (abierto) {

    tlmenu.reverse(0);
      
  } else {
    miDiv.removeClass('hidden-menu2');

    tlmenu.play(0);
    abierto = true;
    menuGsap.addClass('menu-open');
  }
});

}