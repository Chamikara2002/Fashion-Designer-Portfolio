import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, FileText } from 'lucide-react';
import styles from './FloatingSidebar.module.css';

/* Custom Clean SVG Brand Icons */
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function FloatingSidebar({ onOpenCvModal }) {
  const socialLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn Profile',
      icon: <LinkedinIcon />,
      url: 'https://linkedin.com/in/nirmali-ranawaka-3d-fashion'
    },
    {
      id: 'github',
      name: 'GitHub Repositories',
      icon: <GithubIcon />,
      url: 'https://github.com/nirmaliranawaka'
    },
    {
      id: 'youtube',
      name: 'YouTube Runway Reel',
      icon: <YoutubeIcon />,
      url: 'https://youtube.com/@nirmaliranawaka3d'
    },
    {
      id: 'instagram',
      name: 'Instagram 3D Couture',
      icon: <InstagramIcon />,
      url: 'https://instagram.com/nirmali.3dfashion'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp (+94 740721152)',
      icon: <MessageCircle size={16} />,
      url: 'https://wa.me/94740721152'
    },
    {
      id: 'email',
      name: 'Email Studio',
      icon: <Mail size={16} />,
      url: 'mailto:rajininirmali99@gmail.com'
    },
    {
      id: 'cv_drive',
      name: 'View CV Document',
      icon: <FileText size={16} />,
      onClick: onOpenCvModal
    }
  ];

  return (
    <motion.aside
      className={styles.floatingSidebar}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {socialLinks.map((item) => (
        <div key={item.id} className={styles.iconWrapper}>
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className={styles.iconBtn}
              aria-label={item.name}
            >
              {item.icon}
            </button>
          ) : (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBtn}
              aria-label={item.name}
            >
              {item.icon}
            </a>
          )}
          <span className={styles.tooltip}>{item.name}</span>
        </div>
      ))}
    </motion.aside>
  );
}
