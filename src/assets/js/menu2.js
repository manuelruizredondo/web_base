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