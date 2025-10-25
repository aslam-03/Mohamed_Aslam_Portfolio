import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Github, Send } from './Icons';
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
      className={`bg-transparent py-10 px-2 sm:px-4 md:px-8 transition-colors duration-300`}
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
                <div className={`p-3 rounded-full ${getThemeClasses('buttonPrimary')} group-hover:scale-110 transition-transform duration-300`}>
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className={`${getThemeClasses('cardTitle')} text-base font-bold font-press-start mb-1`}>
                    Email
                  </p>
                  <a 
                    href="mailto:mohamed.aslam.i.2004@gmail.com"
                    className={`${getThemeClasses('cardText')} text-sm font-vt323 hover:underline break-all`}
                  >
                    mohamed.aslam.i.2004@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className={`${getThemeClasses('cardBg')} group relative overflow-hidden rounded-lg shadow-md p-4 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg text-center border-2 ${getThemeClasses('techTag')}`}>
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full ${getThemeClasses('buttonPrimary')} group-hover:scale-110 transition-transform duration-300`}>
                  <Linkedin size={24} className="text-white" />
                </div>
                <div>
                  <p className={`${getThemeClasses('cardTitle')} text-base font-bold font-press-start mb-1`}>
                    LinkedIn
                  </p>
                  <a 
                    href="https://in.linkedin.com/in/mohamed-aslam-i"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${getThemeClasses('cardText')} text-sm font-vt323 hover:underline`}
                  >
                    linkedin.com/in/mohamed-aslam-i
                  </a>
                </div>
              </div>
            </div>

            <div className={`${getThemeClasses('cardBg')} group relative overflow-hidden rounded-lg shadow-md p-4 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg text-center border-2 ${getThemeClasses('techTag')}`}>
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full ${getThemeClasses('buttonPrimary')} group-hover:scale-110 transition-transform duration-300`}>
                  <Github size={24} className="text-white" />
                </div>
                <div>
                  <p className={`${getThemeClasses('cardTitle')} text-base font-bold font-press-start mb-1`}>
                    GitHub
                  </p>
                  <a 
                    href="https://github.com/aslam-03"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${getThemeClasses('cardText')} text-sm font-vt323 hover:underline`}
                  >
                    github.com/aslam-03
                  </a>
                </div>
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
