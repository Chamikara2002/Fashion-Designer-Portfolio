import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Mail, Send, CheckCircle, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TiltCard } from '../TiltCard/TiltCard';
import styles from './Contact.module.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D Digital Couture',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ccff00', '#00f0ff', '#ffffff']
        });
      } catch (err) {
        // Fallback
      }

      // Also generate mailto backup action
      const mailtoUrl = `mailto:rajininirmali99@gmail.com?subject=${encodeURIComponent(`[3D Project Inquiry] ${formData.service} - ${formData.name}`)}&body=${encodeURIComponent(`Client Name: ${formData.name}\nClient Email: ${formData.email}\nService Interested: ${formData.service}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={16} /> // 05. Direct Contact & Inquiries
          </span>
          <h2 className="section-title">Initiate Collaboration</h2>
          <p className="section-subtitle">
            Ready to push the boundaries of 3D spatial fashion, virtual runways, or custom digital drape commissions? Get in touch immediately.
          </p>
        </motion.div>

        <div className={styles.contactGrid}>
          {/* Info Column */}
          <div className={styles.infoCol}>
            {/* WhatsApp Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard className={styles.whatsappCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconCircle}>
                    <MessageCircle size={26} />
                  </div>
                  <div>
                    <h3 className={styles.whatsappTitle}>Instant WhatsApp</h3>
                    <div className={styles.whatsappNumber}>+94 74 072 1152</div>
                  </div>
                </div>
                <p className={styles.whatsappText}>
                  Direct line for urgent studio commissions, fashion week consultations, and real-time project quotes.
                </p>
                <a
                  href="https://wa.me/94740721152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappLinkBtn}
                >
                  <MessageCircle size={18} /> Open WhatsApp Chat
                </a>
              </TiltCard>
            </motion.div>

            {/* Email Direct Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TiltCard className={styles.emailDirectCard}>
                <div className={styles.emailTitle}>
                  <Mail size={22} color="var(--accent-lime)" /> Official Studio Email
                </div>
                <div className={styles.emailAddress}>rajininirmali99@gmail.com</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Average response time: &lt; 2 hours on business days.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <Clock size={16} color="var(--accent-lime)" /> Availability: Mon – Sat (09:00 - 18:00 UTC)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={16} color="var(--accent-lime)" /> Location: Galle Road, Colombo / Worldwide Remote
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard className={styles.formCard}>
              <h3 className={styles.formTitle}>Send a Project Brief</h3>

            {submitted ? (
              <div className={styles.successMessage}>
                <CheckCircle size={48} color="var(--accent-lime)" />
                <h4 className={styles.successTitle}>Inquiry Sent Successfully!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been routed to <code>rajininirmali99@gmail.com</code> and your email client has opened to dispatch the message.
                </p>
                <button
                  className={styles.submitBtn}
                  style={{ marginTop: '16px' }}
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-name" className={styles.label}>Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="contact-email" className={styles.label}>Your Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="contact-service" className={styles.label}>Requested Service</label>
                  <select
                    id="contact-service"
                    name="service"
                    aria-label="Requested Service"
                    value={formData.service}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="3D Digital Couture">3D Digital Couture Collection</option>
                    <option value="Spatial Virtual Runway">Spatial Virtual Runway (Unreal Engine 5)</option>
                    <option value="Procedural Fabric Shader">Procedural Fabric Shader Development</option>
                    <option value="Metahuman Asset Rigging">Metahuman Apparel Rigging & Tech Packs</option>
                    <option value="Brand Consultation">3D Fashion Design Consultation</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="contact-message" className={styles.label}>Project Details & Scope</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Describe your vision, deadline, and reference materials..."
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? 'Processing Brief...' : (
                    <>
                      Submit Inquiry <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
