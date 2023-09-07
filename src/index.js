

gsap.registerPlugin(ScrollTrigger);


let scroll;
const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
//const container = select('.site-main');


let colors = ['black', 'black', 'blue', 'gray', 'black', 'gray'];
let ciclo = true;

initPageTransitions();



function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}



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
			getDirection: true,
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
}
function initPage() {
	cursor();
}
function cursor() {
	var cursor = document.querySelector(".cursor");
	var follower = document.querySelector(".cursor-follow");
	var hoverables = document.querySelectorAll(".hoverable");
	var drags = document.querySelectorAll(".drag");
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
			css: { backgroundColor: "#fff", scale: 4 },
		});
	}
	function onMouseHoverOut() {
		gsap.to(follower, {
			duration: 0.3,
			css: { backgroundColor: "#f70154", scale: 1 },
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
	const loader = select(".bg");
	initbg();
	
	let pinWrap = document.querySelector(".pin-wrap");
	let pinWrapWidth = pinWrap.offsetWidth;
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





	let sections = gsap.utils.toArray('.panel');

	let scrollTween = gsap.to(sections, {
	  xPercent: -100 * (sections.length - 1),
	  ease: 'none', // <-- IMPORTANT!
	  scrollTrigger: {
		trigger: '.pin-wrap',
		pin: true,
		scrub: 0.1,
		//snap: directionalSnap(1 / (sections.length - 1)),
		end: '+=3000',
	  },
	});
  
  
	// red section
	gsap.to('.box-1', {
	  y: -130,
	  duration: 2,
	  ease: 'elastic',
	  scrollTrigger: {
		trigger: '.box-1',
		containerAnimation: scrollTween,
		start: 'left center',
		toggleActions: 'play none none reset',
		id: '1',
	  },
	});
  


}



function changeBackgroundColorOnScrollEnter() {
	setTimeout(function () {
	  scroll.on('call', (value, way, obj) => {


		console.log(obj);

		const objeto = obj.id.split(' ');
		const primero = objeto[0];
		const segundo = objeto[1];
  
  
  
		if (way === 'enter') {
		  switch (value) {
			case 'pageColor':
			  // get color code from data-scroll-id  assigned to body by obj.id
			  gsap.to('.container-color', { backgroundColor: colors[primero] });
  
			  if (segundo === 'darkmode') {
				document.body.classList.remove('lightmode');
				document.body.classList.add('darkmode');
			  } else {
				document.body.classList.remove('darkmode');
				document.body.classList.add('lightmode');
			  }
  
			  break;
		  }
		}
	  });
	}, 100); // delay in milliseconds (100 = 0,1 seconds)
  }