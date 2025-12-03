// Función para cambiar el color de los nav-links cuando el navbar está dentro de una sección con "section-bg"
function updateNavLinksColor() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section-bg');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para verificar si el navbar está dentro de alguna sección
    function checkNavbarPosition() {
        if (!navbar) return;
        
        const navbarRect = navbar.getBoundingClientRect();
        const navbarBottom = navbarRect.bottom;
        const navbarTop = navbarRect.top;
        
        // Verificar si el navbar está dentro de alguna sección con "section-bg"
        const isInsideSection = Array.from(sections).some(section => {
            const sectionRect = section.getBoundingClientRect();
            
            // El navbar está dentro si su parte superior está dentro de la sección
            return navbarTop >= sectionRect.top && navbarTop <= sectionRect.bottom;
        });
        
        // Agregar o remover la clase según la posición
        if (isInsideSection) {
            navLinks.forEach(link => link.classList.add('color-primary'));
        } else {
            navLinks.forEach(link => link.classList.remove('color-primary'));
        }
    }
    
    // Observar cada sección
    const observer = new IntersectionObserver(() => {
        checkNavbarPosition();
    }, {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '0px'
    });
    
    // Observar todas las secciones con "section-bg"
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Verificar en scroll para mayor precisión
    window.addEventListener('scroll', checkNavbarPosition);
    
    // Verificar al cargar
    checkNavbarPosition();
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', updateNavLinksColor);
