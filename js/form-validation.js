// Validación de Formularios
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Validación en tiempo real para campos requeridos
        const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
    
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validación específica para email
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            if (!validateEmail(emailField.value)) {
                showError(emailField, 'Por favor, introduce un correo electrónico válido.');
                isValid = false;
            }
        }
        
        // Validación específica para teléfono
        const phoneField = form.querySelector('input[type="tel"]');
        if (phoneField && phoneField.value) {
            if (!validatePhone(phoneField.value)) {
                showError(phoneField, 'Por favor, introduce un número de teléfono válido.');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        
        // Limpiar errores previos
        clearError(field);
        
        // Validar campo requerido
        if (field.hasAttribute('required') && !value) {
            showError(field, 'Este campo es obligatorio.');
            return false;
        }
        
        // Validaciones específicas por tipo de campo
        if (field.type === 'email' && value && !validateEmail(value)) {
            showError(field, 'Por favor, introduce un correo electrónico válido.');
            return false;
        }
        
        if (field.type === 'tel' && value && !validatePhone(value)) {
            showError(field, 'Por favor, introduce un número de teléfono válido.');
            return false;
        }
        
        return true;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        // Permite formatos internacionales y nacionales
        const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return re.test(phone);
    }
    
    function showError(field, message) {
        field.classList.add('error');
        
        // Crear elemento de error si no existe
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
    }
    
    function clearError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
});