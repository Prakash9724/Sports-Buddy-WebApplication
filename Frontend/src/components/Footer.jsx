import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ],
    sports: [
      { name: 'Cricket', path: '/sports/cricket' },
      { name: 'Football', path: '/sports/football' },
      { name: 'Basketball', path: '/sports/basketball' },
      { name: 'Badminton', path: '/sports/badminton' }
    ],
    social: [
      { icon: <Facebook className="h-5 w-5" />, path: 'https://facebook.com' },
      { icon: <Twitter className="h-5 w-5" />, path: 'https://twitter.com' },
      { icon: <Instagram className="h-5 w-5" />, path: 'https://instagram.com' },
      { icon: <Youtube className="h-5 w-5" />, path: 'https://youtube.com' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="SportsBuddy" className="h-10 w-auto" />
              <span className="text-xl font-bold text-white">SportsBuddy</span>
            </Link>
            <p className="text-gray-400">
              Connecting sports enthusiasts and creating active communities.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Popular Sports</h3>
            <ul className="space-y-2">
              {footerLinks.sports.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {footerLinks.social.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} SportsBuddy. Made with <Heart className="h-4 w-4 inline text-red-500" /> by Prakash
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-indigo-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-indigo-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 