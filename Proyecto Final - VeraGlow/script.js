/*
 * Archivo: script.js
 * Descripción: Contiene la lógica interactiva para el sitio web VeraGlow,
 * incluyendo el carrusel de imágenes y efectos hover.
 * Autor: [Tu Nombre]
 * Fecha: 14 de junio de 2025
 */

// Espera a que todo el contenido del DOM (Document Object Model) esté completamente cargado
// antes de ejecutar cualquier script. Esto asegura que todos los elementos HTML estén disponibles.
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el elemento que actúa como fondo del carrusel, donde se mostrarán las imágenes.
    const carouselBackground = document.querySelector('.carousel-background');
    // Selecciona todos los elementos que representan los puntos de navegación del carrusel.
    const carouselDots = document.querySelectorAll('.carousel-dot');

    let currentImageIndex = 0; // Variable para rastrear la imagen actualmente mostrada en el carrusel.

    // Array de rutas de imágenes para el carrusel.
    // **IMPORTANTE: Asegúrate de que estas rutas coincidan con las de 'data-image' en el HTML.**
    const images = [
        'ruta/a/imagen1.jpg',
        'ruta/a/imagen2.jpg',
        'ruta/a/imagen3.jpg',
        'ruta/a/imagen4.jpg'
    ];

    /**
     * @function updateCarouselImage
     * @description Actualiza la imagen de fondo del carrusel y resalta el punto de navegación activo.
     * @param {number} index El índice de la imagen a mostrar (basado en el array `images`).
     */
    function updateCarouselImage(index) {
        // Establece la imagen de fondo del elemento `carouselBackground` usando la URL del array.
        carouselBackground.style.backgroundImage = `url('${images[index]}')`;

        // Itera sobre todos los puntos del carrusel para actualizar su estilo.
        carouselDots.forEach((dot, i) => {
            if (i === index) {
                // Si el punto actual coincide con el índice de la imagen mostrada, resáltalo.
                dot.style.borderColor = '#007bff'; // O el color que indiques para el estado activo.
            } else {
                // De lo contrario, restaura el color de borde predeterminado.
                dot.style.borderColor = '#ccc';
            }
        });
    }

    // Configura el carrusel para que cambie de imagen automáticamente a intervalos regulares.
    // Un carrusel más avanzado podría incluir animaciones más suaves.
    setInterval(() => {
        // Calcula el índice de la siguiente imagen (vuelve a 0 si llega al final del array).
        currentImageIndex = (currentImageIndex + 1) % images.length;
        // Llama a la función para actualizar la imagen y los puntos de navegación.
        updateCarouselImage(currentImageIndex);
    }, 5000); // Cambia la imagen cada 5000 milisegundos (5 segundos).

    // Agrega listeners de eventos a cada punto del carrusel para la interactividad con el ratón.
    carouselDots.forEach((dot, index) => {
        // Evento 'mouseenter': cuando el cursor entra en el área del punto.
        dot.addEventListener('mouseenter', () => {
            // Guarda la imagen de fondo actual del dot (si la tiene) antes de cambiarla,
            // para poder restaurarla al salir el cursor.
            dot.dataset.originalImage = dot.style.backgroundImage;
            // Cambia la imagen de fondo del dot a la imagen de producto correspondiente
            // (definida en el atributo `data-image` del HTML).
            dot.style.backgroundImage = `url('${dot.dataset.image}')`;
            dot.style.backgroundSize = 'cover';
            dot.style.backgroundPosition = 'center';
        });

        // Evento 'mouseleave': cuando el cursor sale del área del punto.
        dot.addEventListener('mouseleave', () => {
            // Restaura la imagen de fondo original del dot. Si no tenía una, se quitará.
            dot.style.backgroundImage = dot.dataset.originalImage || 'none';
        });

        // Evento 'click': cuando se hace clic en un punto del carrusel.
        dot.addEventListener('click', () => {
            // Actualiza la imagen principal del carrusel a la imagen correspondiente al punto clicado.
            updateCarouselImage(index);
            // Establece el índice actual para que el carrusel automático continúe desde esta imagen.
            currentImageIndex = index;
        });
    });

    // Llama a la función de actualización de imagen al cargar la página para mostrar la primera imagen.
    updateCarouselImage(currentImageIndex);
});


// Al final de script.js
const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.main-menu-nav');

menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});