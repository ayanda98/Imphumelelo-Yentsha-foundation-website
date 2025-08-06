document.addEventListener('DOMContentLoaded', () => {

    // Get a reference to all the forms on your website
    const businessForm = document.getElementById('business-loan-form');
    const aiItForm = document.getElementById('ai-it-form');
    const contactForm = document.getElementById('contact-form');

    // Function to handle form submission
    const handleFormSubmission = (form) => {
        form.addEventListener('submit', (event) => {
            // Prevent the default form submission (page refresh)
            event.preventDefault();

            // Here you would add code to collect and send the form data
            // to a server, email, or a database.
            // For now, we will just show a success message.
            
            console.log('Form submitted:', form.id); // Log to the console for debugging
            alert('Thank you for your application! We will be in touch shortly.');

            // Reset the form fields after submission
            form.reset();
        });
    };

    // Apply the form submission handler to each of your forms
    if (businessForm) {
        handleFormSubmission(businessForm);
    }

    if (aiItForm) {
        handleFormSubmission(aiItForm);
    }

    if (contactForm) {
        handleFormSubmission(contactForm);
    }

});