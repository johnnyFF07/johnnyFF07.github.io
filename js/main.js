// JavaScript Principal con Efectos de Scroll
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Solo aplicar smooth scroll para enlaces internos
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    if (navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                    }
                }
            }
        });
    });
    
    // Efecto de scroll reveal - elementos que aparecen al hacer scroll
    const scrollReveal = function() {
        const elements = document.querySelectorAll('.service-card, .service-preview, .testimonial, .mv-card, .team-member, .feature, .welcome-content, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Efecto de onda en el banner al cargar
    const bannerWaveEffect = function() {
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.transform = 'translateY(0)';
            banner.style.opacity = '1';
        }
    };
    
    // Efecto de carga inicial - elementos entran desde diferentes direcciones
    const initialLoadAnimation = function() {
        const logo = document.querySelector('.logo');
        const navItems = document.querySelectorAll('nav ul li');
        const bannerContent = document.querySelector('.banner-content');
        
        // Animación del logo
        if (logo) {
            logo.style.transform = 'translateY(0)';
            logo.style.opacity = '1';
        }
        
        // Animación de los items del menú con delay
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
            }, 200 * (index + 1));
        });
        
        // Animación del contenido del banner
        if (bannerContent) {
            setTimeout(() => {
                bannerContent.style.transform = 'translateY(0)';
                bannerContent.style.opacity = '1';
            }, 800);
        }
    };
    
    // Establecer propiedades iniciales para animación
    const setupInitialAnimations = function() {
        // Banner
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.transform = 'translateY(-50px)';
            banner.style.opacity = '0';
            banner.style.transition = 'transform 1s ease, opacity 1s ease';
        }
        
        // Logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.transform = 'translateY(-20px)';
            logo.style.opacity = '0';
            logo.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        }
        
        // Items del menú
        const navItems = document.querySelectorAll('nav ul li');
        navItems.forEach(item => {
            item.style.transform = 'translateY(-20px)';
            item.style.opacity = '0';
            item.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        });
        
        // Contenido del banner
        const bannerContent = document.querySelector('.banner-content');
        if (bannerContent) {
            bannerContent.style.transform = 'translateY(50px)';
            bannerContent.style.opacity = '0';
            bannerContent.style.transition = 'transform 1s ease, opacity 1s ease';
        }
        
        // Elementos que aparecen al hacer scroll
        const animatedElements = document.querySelectorAll('.service-card, .service-preview, .testimonial, .mv-card, .team-member, .feature, .welcome-content, .section-title');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
    };
    
    // Efecto de hover en tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card, .service-preview');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });
    
    // Efecto de parallax en el banner
    const parallaxEffect = function() {
        const banner = document.querySelector('.banner');
        if (banner) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            banner.style.transform = `translateY(${rate}px)`;
        }
    };
    
    // Botón para subir al inicio
    const createScrollToTopButton = function() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollButton.classList.add('scroll-to-top');
        document.body.appendChild(scrollButton);
        
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('show');
            } else {
                scrollButton.classList.remove('show');
            }
        });
        
        // Scroll al hacer clic
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    // Inicializar todas las animaciones
    setupInitialAnimations();
    initialLoadAnimation();
    
    // Ejecutar animaciones al cargar y al hacer scroll
    window.addEventListener('load', function() {
        bannerWaveEffect();
        scrollReveal();
        createScrollToTopButton();
    });
    
    window.addEventListener('scroll', function() {
        scrollReveal();
        parallaxEffect();
    });
    
    // Formulario de contacto (comportamiento básico)
    const contactForm = document.getElementById('appointmentForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            if (!name || !email || !phone) {
                alert('Por favor, complete todos los campos obligatorios.');
                return;
            }
            
            // Animación de envío exitoso
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                // Aquí normalmente enviarías los datos del formulario a un servidor
                // Por ahora, solo mostraremos una alerta con animación
                alert('¡Gracias por tu mensaje! Te contactaremos pronto para confirmar tu cita.');
                contactForm.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});