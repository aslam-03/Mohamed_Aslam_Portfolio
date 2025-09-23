// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create a new email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Get your Service ID, Template ID, and Public Key
// 5. Replace the values below with your actual credentials

export const emailConfig = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

// Debug logging to verify environment variables are loaded
console.log('Environment Variables Check:', {
  SERVICE_ID: emailConfig.SERVICE_ID || 'MISSING',
  TEMPLATE_ID: emailConfig.TEMPLATE_ID || 'MISSING',
  PUBLIC_KEY: emailConfig.PUBLIC_KEY ? 'LOADED' : 'MISSING'
});

// Example email template for EmailJS:
// Subject: New Contact Form Message from {{from_name}}
// Body:
// You have a new message from your portfolio contact form.
//
// Name: {{from_name}}
// Email: {{from_email}}
// Message: {{message}}
//
// Please reply to {{from_email}} to respond to this inquiry.
