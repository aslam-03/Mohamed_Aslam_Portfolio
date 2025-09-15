import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ContactInfoItem } from './Cards';
import { Mail, Phone, Linkedin, Github, Send } from './Icons';
import { EMAILJS_CONFIG } from '../utils/emailConfig';

const ContactSection = ({ theme, getThemeClasses }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'aslamachu8558@gmail.com'
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className={`${getThemeClasses('sectionBgPrimary')} py-10 px-2 sm:px-4 md:px-8 transition-colors duration-300`}
    >
      <div className="container mx-auto text-center">
        <h2 className={`${getThemeClasses('heading')} text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 border-b-4 pb-2 sm:pb-4 inline-block font-press-start`}>
          Contact Me
        </h2>
        <div className={`max-w-3xl mx-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border transition-colors duration-300 ${getThemeClasses('cardBg')}`}>
          <p className={`${getThemeClasses('paragraph')} text-lg text-center mb-8 font-vt323`}>
            Feel free to reach out for collaborations, job opportunities, or just to say hello!
          </p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 text-left">
          <ContactInfoItem 
            icon={Mail} 
            label="Email" 
            value="aslamachu8558@gmail.com" 
            link="mailto:aslamachu8558@gmail.com" 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <ContactInfoItem 
            icon={Phone} 
            label="Phone" 
            value="+91 7092841437" 
            link="tel:+917092841437" 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <ContactInfoItem 
            icon={Linkedin} 
            label="LinkedIn" 
            value="linkedin.com/in/mohamed-aslam-" 
            link="https://in.linkedin.com/in/mohamed-aslam-" 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <ContactInfoItem 
            icon={Github} 
            label="GitHub" 
            value="github.com/aslam-03" 
            link="https://github.com/aslam-03" 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
        </div>
        <form className="space-y-6 text-left" onSubmit={handleSubmit}>
          {submitStatus === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Failed to send message. Please try again or contact me directly.
            </div>
          )}
          <div>
            <label 
              htmlFor="name" 
              className={`${getThemeClasses('paragraph')} block text-sm font-bold mb-2`}
            >
              Name
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className={`shadow appearance-none rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 transition-all duration-200 ${getThemeClasses('input')}`} 
              placeholder="Your Name" 
              required 
            />
          </div>
          <div>
            <label 
              htmlFor="email" 
              className={`${getThemeClasses('paragraph')} block text-sm font-bold mb-2`}
            >
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 transition-all duration-200 ${getThemeClasses('input')}`} 
              placeholder="your.email@example.com" 
              required 
            />
          </div>
          <div>
            <label 
              htmlFor="message" 
              className={`${getThemeClasses('paragraph')} block text-sm font-bold mb-2`}
            >
              Message
            </label>
            <textarea 
              id="message" 
              name="message" 
              rows="6" 
              value={formData.message}
              onChange={handleChange}
              className={`shadow appearance-none rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 transition-all duration-200 ${getThemeClasses('input')}`} 
              placeholder="Your message..." 
              required
            />
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`${getThemeClasses('buttonPrimary')} inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send className="mr-2" size={20} /> 
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
);
};

export default ContactSection;
