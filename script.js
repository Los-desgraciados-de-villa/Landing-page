// Toggle menu for mobile
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.Menu-Horizontal').classList.toggle('show');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.Menu-Horizontal');
    const toggle = document.querySelector('.menu-toggle');
    
    if (!menu.contains(event.target) && !toggle.contains(event.target) && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }
});

// Form validation for contact form
document
    .getElementById("formularioSolicitud")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Siempre prevenir el envío al inicio

      const nombres = document.getElementById("nombres").value.trim();
      const apellidos = document.getElementById("apellidos").value.trim();
      const tipoDoc = document.getElementById("tipoDoc").value;
      const numeroDoc = document.getElementById("numeroDoc").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const tipoInmueble = document.getElementById("tipoInmueble").value;
      const direccion = document.getElementById("direccion").value.trim();
      const tipoCertificado = document.getElementById("tipoCertificado").value;
      const preferencias = document.querySelectorAll('input[name="preferencia"]:checked');

      if (!nombres || !apellidos || !tipoDoc || !numeroDoc || !email || !telefono || !tipoInmueble || !direccion || !tipoCertificado) {
        showSnackbar("Por favor, complete todos los campos del formulario", "error");
        return;
      }

      if (!validateEmail(email)) {
        showSnackbar("Por favor, ingrese un correo válido", "error");
        return;
      }

      if (!validatePhone(telefono)) {
        showSnackbar("Por favor, ingrese un teléfono válido", "error");
        return;
      }
      
      if (preferencias.length === 0) {
        showSnackbar("Por favor, seleccione al menos una preferencia de contacto", "error");
        return;
      }

      const confirmation = confirm(
          "Está a punto de enviar su solicitud de certificación, ¿Desea continuar?"
      );
      if (!confirmation) {
        return;
      }

      // Si pasó toda la validación, mostramos el mensaje
      showSnackbar("Solicitud enviada correctamente. Nos pondremos en contacto dentro de 24 horas.", "success");

      // Limpiar el formulario
      this.reset();
    });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function validatePhone(phone) {
  const re = /^[0-9]{7,15}$/;
  return re.test(phone);
}

function showSnackbar(message, type = "success") {
  const snackbar = document.getElementById("mensajeEnviado");
  snackbar.innerHTML = type === "success" 
    ? `<span class="material-icons">check_circle</span> ${message}`
    : `<span class="material-icons">error</span> ${message}`;
  
  snackbar.style.backgroundColor = type === "success" ? "#323232" : "#d32f2f";
  snackbar.style.display = "flex";
  
  setTimeout(() => {
    snackbar.style.display = "none";
  }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.Menu-Horizontal').classList.remove('show');
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.servicio-item, .beneficio-item, .pregunta-item');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight - 100) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.querySelectorAll('.servicio-item, .beneficio-item, .pregunta-item').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check
animateOnScroll();