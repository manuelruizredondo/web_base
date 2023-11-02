let abierto = false; // Variable para rastrear el estado de la div (menú abierto o cerrado)
const miDiv = $('#menu-gsap-wrap'); // Selecciona el elemento con el ID 'menu-gsap-wrap' y lo guarda en la variable miDiv
const menuGsap = $('.menu-gsap'); // Selecciona elementos con la clase 'menu-gsap' y los guarda en la variable menuGsap

// Crea una línea de tiempo (timeline) de GSAP con ciertas configuraciones
const tlmenu = gsap.timeline({
  paused: true, // La animación comienza en pausa

  onReverseComplete: function () {
    miDiv.addClass('hidden-menu2'); // Agrega la clase 'hidden-menu2' a miDiv
    menuGsap.removeClass('menu-open'); // Elimina la clase 'menu-open' de elementos en menuGsap

    abierto = false; // Cambia el estado de abierto a falso (menú cerrado)
  }
});

// Agrega animaciones a la línea de tiempo tlmenu
tlmenu
  .to(miDiv, { duration: 0.2, left: '70%', ease: 'cubic-bezier(0.47, 0, 0.745, 0.715)' }) // Desplaza el menú hacia la izquierda
  .to({}, { duration: 0.2 }) // Añade un retraso de 0.5 segundos

  // Realiza una animación escalonada en los elementos 'nav li'
  .staggerFromTo('nav li', 0.6, { x: -50, opacity: 0 }, { x: 0, opacity: 1, ease: Back.easeOut }, 0.1);

// Asocia un controlador de clic a elementos con la clase 'openButton'
$('.openButton').click(function() {
  if (abierto) { // Si el menú está abierto

    tlmenu.reverse(0); // Revierte la animación para cerrar el menú
      
  } else { // Si el menú está cerrado
    miDiv.removeClass('hidden-menu2'); // Elimina la clase 'hidden-menu2' de miDiv

    tlmenu.play(0); // Reproduce la animación para abrir el menú
    abierto = true; // Cambia el estado de abierto a verdadero (menú abierto)
    menuGsap.addClass('menu-open'); // Agrega la clase 'menu-open' a elementos en menuGsap
  }
});

function toggleMenu() {
  if (abierto) {
    // Si el menú está abierto, revierte la animación para cerrar el menú
    tlmenu.reverse(0);
  } else {
    // Si el menú está cerrado
    miDiv.removeClass('hidden-menu2'); // Elimina la clase 'hidden-menu2' de miDiv
    tlmenu.play(0); // Reproduce la animación para abrir el menú
    abierto = true; // Cambia el estado de abierto a verdadero (menú abierto)
    menuGsap.addClass('menu-open'); // Agrega la clase 'menu-open' a elementos en menuGsap
  }
}

