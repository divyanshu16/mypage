// Facebook Pixel Event Tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track "Book A Call" button clicks
    const bookCallButtons = document.querySelectorAll('a[href*="calendar.app.google"]');

    bookCallButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Track as Lead event - standard Facebook event for potential customers
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Book Strategy Call',
                    content_category: 'Consultation'
                });
                console.log('Facebook Pixel: Lead event tracked - Book Strategy Call');
            }
        });
    });
});