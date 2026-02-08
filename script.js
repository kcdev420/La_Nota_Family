document.addEventListener('DOMContentLoaded', () => {

    // 1. Inicializar la librería AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: false, // Tu cambio se respeta
        offset: 50,
    });

    // Pequeño retraso para asegurar que los iframes y todo se haya renderizado
    setTimeout(() => {
        AOS.refresh();
    }, 300); // Tu cambio de 100ms se respeta

    // 2. Smooth Scroll para los links de navegación (este código es el mismo)
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop - 70, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Lógica del Carrusel de la Pantalla de Inicio
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const slideInterval = 7000; // Tu cambio de 7 segundos se respeta

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Mostrar el primer slide al cargar
    if (slides.length > 0) {
        showSlide(currentSlide);
        // Iniciar el carrusel automático
        setInterval(nextSlide, slideInterval);
    }

    // 4. Lógica de "Animar" para Próximos Estrenos
    const animarButtons = document.querySelectorAll('.btn-animar');

    // Cargar los contadores guardados del localStorage al iniciar
    animarButtons.forEach(button => {
        const estrenoId = button.dataset.estreno; // Ej: 'ritmo-nocturno'
        const corazonesSpan = document.getElementById(`corazones-${estrenoId}`);
        const savedCount = localStorage.getItem(`corazones-${estrenoId}`);
        if (savedCount) {
            corazonesSpan.textContent = savedCount;
        }
    });


    animarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const estrenoId = button.dataset.estreno; // Obtiene el ID del estreno
            const corazonesSpan = document.getElementById(`corazones-${estrenoId}`);
            
            let currentCount = parseInt(corazonesSpan.textContent);
            currentCount++;
            corazonesSpan.textContent = currentCount;

            // Guarda el nuevo contador en localStorage
            localStorage.setItem(`corazones-${estrenoId}`, currentCount);

            // Efecto visual rápido de "pop"
            corazonesSpan.style.transform = 'scale(1.2)';
            setTimeout(() => {
                corazonesSpan.style.transform = 'scale(1)';
            }, 200);
        });
    });

});