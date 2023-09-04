gsap.registerPlugin(ScrollTrigger);

let scroll;
const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

initSmoothScroll(document);

function initSmoothScroll(container) {
  scroll = new LocomotiveScroll({
    el: container.querySelector("[data-scroll-container]"),
    smooth: true,
    getDirection: true,
  });
  scroll.on("scroll", ScrollTrigger.update);
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
    pinType: container.querySelector("[data-scroll-container]").style.transform
      ? "transform"
      : "fixed",
  });

  if (!document.querySelector(".pin-wrap")) {
    console.log("no existe pin-wrap" + container);
  } else {
    console.log("si existe" + container);
    homeActions(container);
  }

  const scrollbar = selectAll(".c-scrollbar");
  if (scrollbar.length > 1) {
    scrollbar[0].remove();
  }
  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  ScrollTrigger.refresh();
}

function homeActions(container) {
  const loader = select(".bg");

  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scroller: container.querySelector("[data-scroll-container]"), //locomotive-scroll
      scrub: true,
      trigger: "#sectionPin",
      pin: true,
      start: "top top",
      end: pinWrapWidth,
    },
    x: -horizontalScrollLength,
    ease: "none",
  });

  let sections = gsap.utils.toArray('.panel');

  let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.pin-wrap',
      pin: true,
      scrub: 0.1,
      end: '+=3000',
    },
  });
}
