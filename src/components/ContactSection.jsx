import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Linkedin, Github, Send, Instagram } from './Icons';
import { emailConfig } from '../utils/emailConfig';

const ContactSection = ({ getThemeClasses }) => {
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
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'mohamed.aslam.i.2004@gmail.com'
      };

      await emailjs.send(
        emailConfig.SERVICE_ID,
        emailConfig.TEMPLATE_ID,
        templateParams,
        emailConfig.PUBLIC_KEY
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
      className={`bg-transparent py-10 px-2 sm:px-4 md:px-8 transition-colors duration-300 scroll-mt-24 md:scroll-mt-28`}
    >
      <div className="container mx-auto text-center">
        <h2 className={`${getThemeClasses('heading')} text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 border-b-4 pb-2 sm:pb-4 inline-block font-press-start`}>
          Contact Me
        </h2>
        <div className={`max-w-3xl mx-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border transition-colors duration-300 ${getThemeClasses('cardBg')}`}>
          <p className={`${getThemeClasses('paragraph')} text-lg text-center mb-8 font-vt323`}>
            Feel free to reach out for collaborations, job opportunities, or just to say hello!
          </p>
          {/* Contact Links - Three column layout for better visual balance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className={`${getThemeClasses('cardBg')} group relative overflow-hidden rounded-lg shadow-md p-4 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg text-center border-2 ${getThemeClasses('techTag')}`}>
              <div className="flex flex-col items-center space-y-3">
                <a 
                  href="https://in.linkedin.com/in/mohamed-aslam-i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex p-3 rounded-full ${getThemeClasses('buttonPrimary')} group-hover:scale-110 transition-transform duration-300`}
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin size={24} className="text-white" />
                </a>
                <p className={`${getThemeClasses('cardTitle')} text-base font-bold font-press-start`}>LinkedIn</p>
              </div>
            </div>

            <div className={`${getThemeClasses('cardBg')} group relative overflow-hidden rounded-lg shadow-md p-4 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg text-center border-2 ${getThemeClasses('techTag')}`}>
              <div className="flex flex-col items-center space-y-3">
                <a 
                  href="https://github.com/aslam-03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex p-3 rounded-full ${getThemeClasses('buttonPrimary')} group-hover:scale-110 transition-transform duration-300`}
                  aria-label="View GitHub profile"
                >
                  <Github size={24} className="text-white" />
                </a>
                <p className={`${getThemeClasses('cardTitle')} text-base font-bold font-press-start`}>GitHub</p>
              </div>
            </div>

            <div className={`${getThemeClasses('cardBg')} group relative overflow-hidden rounded-lg shadow-md p-4 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg text-center border-2 ${getThemeClasses('techTag')}`}>
              <div className="flex flex-col items-center space-y-3">
                <a 
                  href="https://www.instagram.com/mohamed_aslam._.03?igsh=ZmZvdXZlODQzYzdh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex p-3 rounded-full ${getThemeClasses('buttonPrimary')} group-hover:scale-110 transition-transform duration-300`}
                  aria-label="Follow on Instagram"
                >
                  <Instagram size={24} className="text-white" />
                </a>
                <p className={`${getThemeClasses('cardTitle')} text-base font-bold font-press-start`}>Instagram</p>
              </div>
            </div>
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
            <div className={`${getThemeClasses('cardBg')} rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-400/70`}> 
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className={`bg-transparent shadow-none appearance-none rounded-xl w-full py-3 px-4 leading-tight focus:outline-none transition-all duration-200 ${getThemeClasses('inputText')}`} 
                placeholder="Your Name" 
                required 
              />
            </div>
          </div>
          <div>
            <label 
              htmlFor="email" 
              className={`${getThemeClasses('paragraph')} block text-sm font-bold mb-2`}
            >
              Email
            </label>
            <div className={`${getThemeClasses('cardBg')} rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-400/70`}> 
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className={`bg-transparent shadow-none appearance-none rounded-xl w-full py-3 px-4 leading-tight focus:outline-none transition-all duration-200 ${getThemeClasses('inputText')}`} 
                placeholder="your.email@example.com" 
                required 
              />
            </div>
          </div>
          <div>
            <label 
              htmlFor="message" 
              className={`${getThemeClasses('paragraph')} block text-sm font-bold mb-2`}
            >
              Message
            </label>
            <div className={`${getThemeClasses('cardBg')} rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-400/70`}> 
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                value={formData.message}
                onChange={handleChange}
                className={`bg-transparent shadow-none appearance-none rounded-xl w-full py-3 px-4 leading-tight focus:outline-none transition-all duration-200 resize-none ${getThemeClasses('inputText')}`} 
                placeholder="Your message..." 
                required
              />
            </div>
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
