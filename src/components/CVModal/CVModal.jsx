import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  FileText,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Sparkles,
  Check,
  Copy
} from 'lucide-react';
import { handleDownloadCV, handleViewCV } from '../../utils/cvHandler';
import styles from './CVModal.module.css';

export function CVModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('digital');
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay} onClick={onClose}>
        <motion.div
          className={styles.modalCard}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        >
          {/* Top Header Section */}
          <div className={styles.modalHeader}>
            {/* Top Bar: Title & Close Button */}
            <div className={styles.headerTopRow}>
              <div className={styles.headerTitleBox}>
                <div className={styles.iconCircle}>
                  <FileText size={18} />
                </div>
                <div className={styles.titleTextGroup}>
                  <div className={styles.titleWithBadge}>
                    <h3 className={styles.cvTitle}>Nirmali L.P.R.N. Ranawaka</h3>
                    <span className={styles.statusBadge}>
                      <span className={styles.statusDot} /> OFFICIAL CV
                    </span>
                  </div>
                  <div className={styles.cvSubtitle}>3D DIGITAL FASHION ARCHITECT & SPATIAL DESIGNER</div>
                </div>
              </div>

              <button className={styles.closeBtn} onClick={onClose} aria-label="Close Modal">
                <X size={18} />
              </button>
            </div>

            {/* Controls Bar: Segmented Tabs & Action Buttons */}
            <div className={styles.headerControls}>
              {/* Tab Selector Segment */}
              <div className={styles.tabGroup} role="tablist" aria-label="CV View Options">
                <button
                  role="tab"
                  aria-selected={activeTab === 'digital'}
                  className={`${styles.tabBtn} ${activeTab === 'digital' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('digital')}
                >
                  <Sparkles size={14} className={styles.tabIcon} />
                  <span>Digital Resume</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'pdf'}
                  className={`${styles.tabBtn} ${activeTab === 'pdf' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('pdf')}
                >
                  <FileText size={14} className={styles.tabIcon} />
                  <span>PDF Document</span>
                </button>
              </div>

              {/* Quick Actions (Download & Drive) */}
              <div className={styles.actionButtonsGroup}>
                <button
                  className={styles.downloadHeaderBtn}
                  onClick={handleDownloadCV}
                  title="Download Vector PDF CV"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
                <button
                  className={styles.driveHeaderBtn}
                  onClick={handleViewCV}
                  title="Open PDF in Google Drive"
                >
                  <ExternalLink size={14} />
                  <span>Google Drive</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className={styles.modalBody}>
            {activeTab === 'pdf' ? (
              <div className={styles.pdfWrapper}>
                <div className={styles.pdfHeaderInfoBar}>
                  <div className={styles.pdfMetaLeft}>
                    <div className={styles.pdfFileIcon}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className={styles.pdfFileName}>Nirmali_LPRN_Ranawaka_CV.pdf</h4>
                      <p className={styles.pdfFileSub}>Vector Format • High-Resolution Print Ready • 1.2 MB</p>
                    </div>
                  </div>
                  <div className={styles.pdfMetaActions}>
                    <button className={styles.pdfBarBtnPrimary} onClick={handleDownloadCV}>
                      <Download size={13} /> Download
                    </button>
                    <button className={styles.pdfBarBtnSecondary} onClick={handleViewCV}>
                      <ExternalLink size={13} /> Open Drive
                    </button>
                  </div>
                </div>

                <div className={styles.iframeContainer}>
                  <iframe
                    src="/assets/Nirmali_LPRN_Ranawaka_CV.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                    className={styles.pdfFrame}
                    title="Nirmali L.P.R.N. Ranawaka Official CV PDF"
                  />
                </div>
              </div>
            ) : (
              <div className={styles.digitalCvContainer}>
                {/* CV Header Hero Block */}
                <div className={styles.cvHeaderBlock}>
                  <h1 className={styles.cvName}>NIRMALI L.P.R.N. RANAWAKA</h1>
                  <div className={styles.cvRole}>Lead 3D Digital Fashion Architect & Spatial Designer</div>
                  
                  {/* Interactive Contact Badges */}
                  <div className={styles.cvContactRow}>
                    <button 
                      className={styles.contactBadge}
                      onClick={() => handleCopy('rajininirmali99@gmail.com', 'email')}
                      title="Click to copy email address"
                    >
                      <Mail size={14} className={styles.badgeIcon} />
                      <span>rajininirmali99@gmail.com</span>
                      {copiedField === 'email' ? <Check size={12} className={styles.copyCheck} /> : <Copy size={12} className={styles.copyIcon} />}
                    </button>

                    <button 
                      className={styles.contactBadge}
                      onClick={() => handleCopy('+94 74 072 1152', 'phone')}
                      title="Click to copy phone number"
                    >
                      <Phone size={14} className={styles.badgeIcon} />
                      <span>+94 74 072 1152</span>
                      {copiedField === 'phone' ? <Check size={12} className={styles.copyCheck} /> : <Copy size={12} className={styles.copyIcon} />}
                    </button>

                    <div className={styles.contactBadgeStatic}>
                      <MapPin size={14} className={styles.badgeIcon} />
                      <span>Colombo, Sri Lanka</span>
                    </div>
                  </div>
                </div>

                {/* Profile & Vision */}
                <div className={styles.cvSectionBlock}>
                  <h4 className={styles.cvSectionTitle}>
                    <Sparkles size={15} /> // PROFILE & VISION
                  </h4>
                  <p className={styles.cvText}>
                    Sculpting digital garments in the negative space. Bridging the gap between high-fashion editorial aesthetics, parametric cloth simulation, and spatial Web3 environments. Over 8+ years of experience pioneering zero-gravity digital draping, procedural textile shaders, and spatial virtual runways for luxury fashion houses.
                  </p>
                </div>

                {/* Technical Competencies */}
                <div className={styles.cvSectionBlock}>
                  <h4 className={styles.cvSectionTitle}>
                    <Award size={15} /> // TECHNICAL COMPETENCIES
                  </h4>
                  <ul className={styles.cvList}>
                    <li className={styles.cvListItem}>
                      <span className={styles.bulletDot} />
                      <div>
                        <strong>CLO 3D & Marvelous Designer (98%):</strong> Pattern drafting, fluid dynamics simulation, PBR texture mapping, avatar rigging.
                      </div>
                    </li>
                    <li className={styles.cvListItem}>
                      <span className={styles.bulletDot} />
                      <div>
                        <strong>Unreal Engine 5 (92%):</strong> Lumen real-time lighting, Nanite high-poly geometry, MetaHuman Animator, Control Rig.
                      </div>
                    </li>
                    <li className={styles.cvListItem}>
                      <span className={styles.bulletDot} />
                      <div>
                        <strong>Substance 3D & Houdini Vellum (88%):</strong> Procedural PBR materials, Vellum zero-gravity cloth physics, bioluminescent shaders.
                      </div>
                    </li>
                    <li className={styles.cvListItem}>
                      <span className={styles.bulletDot} />
                      <div>
                        <strong>Production Tech Packs (95%):</strong> DXF 2D pattern grading, measurement specifications, manufacturing tech packs.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Selected Experience */}
                <div className={styles.cvSectionBlock}>
                  <h4 className={styles.cvSectionTitle}>
                    <Briefcase size={15} /> // SELECTED EXPERIENCE
                  </h4>
                  <div className={styles.expList}>
                    <div className={styles.expItem}>
                      <div className={styles.expHeader}>
                        <span className={styles.expCompany}>MAISON VIRTUELLE PARIS</span>
                        <span className={styles.expDate}>2021 - PRESENT</span>
                      </div>
                      <h5 className={styles.expTitle}>Lead 3D Fashion Architect</h5>
                      <p className={styles.cvText}>
                        Spearheaded parametric 3D modeling into haute couture workflows. Orchestrated digital twin creation for 200+ archival garments and reduced prototyping waste by 64%.
                      </p>
                    </div>

                    <div className={styles.expItem}>
                      <div className={styles.expHeader}>
                        <span className={styles.expCompany}>ATELIER NOIR</span>
                        <span className={styles.expDate}>2018 - 2021</span>
                      </div>
                      <h5 className={styles.expTitle}>Senior Pattern Drafter & 3D Specialist</h5>
                      <p className={styles.cvText}>
                        Lead pattern drafter for award-winning Monolith FW collection. Implemented 3D quality control standards for bespoke orders.
                      </p>
                    </div>

                    <div className={styles.expItem}>
                      <div className={styles.expHeader}>
                        <span className={styles.expCompany}>SYNDICATE FORM</span>
                        <span className={styles.expDate}>2015 - 2018</span>
                      </div>
                      <h5 className={styles.expTitle}>Technical Garment Designer</h5>
                      <p className={styles.cvText}>
                        Authored 100+ production tech packs with DXF pattern integration. Optimized fabric marker yield by 14% using algorithmic nesting.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Academic Pedigree */}
                <div className={styles.cvSectionBlock}>
                  <h4 className={styles.cvSectionTitle}>
                    <GraduationCap size={15} /> // ACADEMIC PEDIGREE
                  </h4>
                  <div className={styles.eduList}>
                    <div className={styles.eduItem}>
                      <strong className={styles.eduSchool}>Parsons School of Design (New York)</strong> — MFA Textiles & Spatial Apparel (2021 - 2023)
                    </div>
                    <div className={styles.eduItem}>
                      <strong className={styles.eduSchool}>Central Saint Martins (London)</strong> — BA (Hons) Fashion Design & Digital Textiles (First Class) (2019 - 2021)
                    </div>
                    <div className={styles.eduItem}>
                      <strong className={styles.eduSchool}>Certified Master 3D Specialist</strong> — CLO 3D & Marvelous Designer Master Accreditation
                    </div>
                  </div>
                </div>

                {/* References */}
                <div className={styles.cvSectionBlock}>
                  <h4 className={styles.cvSectionTitle}>
                    <FileText size={15} /> // INDUSTRY REFERENCES
                  </h4>
                  <div className={styles.referencesGrid}>
                    <div className={styles.refCard}>
                      <strong className={styles.refName}>Nicolas V. Rose</strong>
                      <div className={styles.refRole}>Creative Director @ Maison Virtuelle Paris</div>
                    </div>
                    <div className={styles.refCard}>
                      <strong className={styles.refName}>Sophia Laurent</strong>
                      <div className={styles.refRole}>Head of Digital Apparel @ Atelier Noir</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
