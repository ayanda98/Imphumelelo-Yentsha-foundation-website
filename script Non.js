document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create FormData object
            const formData = new FormData(this);
            
            // Display loading indicator
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Send the form data
            fetch('/submit-form', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle successful submission
                if (data.success) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you for your submission! We will review your application and get back to you soon.';
                    this.appendChild(successMessage);
                    
                    // Reset form
                    this.reset();
                    
                    // If it's a modal form, close the modal after 3 seconds
                    const parentModal = this.closest('.modal');
                    if (parentModal) {
                        setTimeout(() => {
                            parentModal.style.display = "none";
                            document.body.style.overflow = "auto";
                        }, 3000);
                    }
                } else {
                    // Show error message
                    alert('There was an error with your submission. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error with your submission. Please try again later.');
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    });
});
function validateForm(form) {
    let isValid = true;
    
    // Remove any existing error messages
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            displayError(field, 'This field is required');
        }
    });
    
    // Validate email fields
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !validateEmail(field.value)) {
            isValid = false;
            displayError(field, 'Please enter a valid email address');
        }
    });
    
    // Validate phone fields
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        if (field.value && !validatePhone(field.value)) {
            isValid = false;
            displayError(field, 'Please enter a valid phone number');
        }
    });
    
    return isValid;
}

function displayError(field, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    field.parentNode.appendChild(errorMessage);
    
    // Highlight the field
    field.style.borderColor = 'red';
    
    // Reset border color when user starts typing
    field.addEventListener('input', function() {
        this.style.borderColor = '';
        const error = this.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Basic validation - adjust as needed for Eswatini phone format
    const re = /^\+?[0-9\s\-()]{7,20}$/;
    return re.test(phone);
}
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm(this)) {
        return;
    }
    
    // Continue with form submission...
});
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            const messageElement = document.getElementById('newsletter-message');
            
            if (!validateEmail(email)) {
                messageElement.textContent = 'Please enter a valid email address.';
                messageElement.style.color = 'red';
                return;
            }
            
            // Display loading message
            messageElement.textContent = 'Subscribing...';
            messageElement.style.color = '#333';
            
            // Submit to backend
            fetch('/subscribe-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    messageElement.textContent = 'Thank you for subscribing!';
                    messageElement.style.color = 'green';
                    newsletterForm.reset();
                } else {
                    messageElement.textContent = data.message || 'Subscription failed. Please try again.';
                    messageElement.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageElement.textContent = 'Subscription failed. Please try again.';
                messageElement.style.color = 'red';
            });
        });
    }
});
