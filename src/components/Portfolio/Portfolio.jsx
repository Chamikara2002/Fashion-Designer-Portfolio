import React, { useState, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';
import { TiltCard } from '../TiltCard/TiltCard';
import { ProjectModal } from './ProjectModal';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', '3D Couture', 'Spatial Runways', 'Smart Fabrics', 'Metahuman AR'];

  const projects = [
    {
      id: 1,
      title: 'Monolith Fall/Winter Couture',
      category: '3D Couture',
      description: 'Parametric digital twin gown created for Paris Virtual Fashion Week.',
      fullDescription: 'An exploratory 3D fashion collection featuring zero-gravity kinetic pleats, procedural leather textures, and real-time ray-traced lighting. Engineered with Marvelous Designer and Substance 3D Painter.',
      image: '/assets/monolith-couture-3d-runway.webp',
      fallbackImage: '/assets/monolith-couture-3d-runway.jpg',
      width: 600,
      height: 600,
      tools: ['CLO 3D', 'Marvelous Designer', 'Unreal Engine 5', 'Substance'],
      specs: [
        'High-poly cloth physics mesh (1.2M polys)',
        'Fully rigged Metahuman avatar integration',
        'Production ready 2D pattern tech pack export',
        '8K PBR texture maps (Albedo, Normal, Roughness)'
      ]
    },
    {
      id: 2,
      title: 'Zero-Gravity Fluid Silk',
      category: 'Smart Fabrics',
      description: 'Custom procedural GPU shader simulating liquid silk physics in space.',
      fullDescription: 'Custom node-based fabric shader created to achieve liquid metallic refraction on digital garments for virtual world avatars.',
      image: '/assets/parametric-silk-drape-clo3d.webp',
      fallbackImage: '/assets/parametric-silk-drape-clo3d.jpg',
      width: 800,
      height: 446,
      tools: ['Houdini (Vellum)', 'Blender Geometry Nodes', 'Octane Render'],
      specs: [
        'Procedural wave amplitude control',
        'Anisotropic specular highlight shading',
        'Real-time collision detection mesh',
        'Compatible with Unity & Unreal Engine'
      ]
    },
    {
      id: 3,
      title: 'Architectural Organic Corset',
      category: 'Metahuman AR',
      description: 'Generative 3D printed lattice corset for spatial fashion exhibitions.',
      fullDescription: 'Generative structural design merging algorithmic voronoi patterns with ergonomic female form fitting. Ready for 3D printing and WebAR visualization.',
      image: '/assets/architectural-couture-corset.webp',
      fallbackImage: '/assets/architectural-couture-corset.jpg',
      width: 600,
      height: 803,
      tools: ['Rhino Grasshopper', 'CLO 3D', 'KeyShot', 'SparkAR'],
      specs: [
        'Watertight STL file for SLA 3D printing',
        'Sub-millimeter pattern precision',
        'Bioluminescent internal light channels',
        'WebAR USDZ / GLTF model optimized'
      ]
    },
    {
      id: 4,
      title: 'Maison Virtuelle Runway',
      category: 'Spatial Runways',
      description: 'Immersive 3D virtual fashion show environment for Apple Vision Pro.',
      fullDescription: 'Spatial 3D runway architectural scene designed for Apple Vision Pro and Meta Quest 3, showcasing 12 interactive digital avatars.',
      image: '/assets/monolith-couture-3d-runway.webp',
      fallbackImage: '/assets/monolith-couture-3d-runway.jpg',
      width: 600,
      height: 600,
      tools: ['Unreal Engine 5.3', 'Lumen & Nanite', 'MetaHuman Animator'],
      specs: [
        'Real-time 60FPS VR performance',
        'Dynamic spatial audio ambiance',
        'Custom volumetric lighting setup',
        'Multi-user avatar synchronization'
      ]
    }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">
            <Sparkles size={16} /> // 02. Digital Archive & Portfolio
          </span>
          <h2 className="section-title">Selected Works</h2>
          <p className="section-subtitle">
            A curated history of commercial, spatial, and conceptual engagements within the luxury 3D digital fashion space.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
              onClick={() => startTransition(() => setActiveCategory(cat))}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div className={styles.portfolioGrid} layout>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard
                  className={styles.projectCard}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className={styles.imgWrapper}>
                    <picture>
                      <source srcSet={project.image} type="image/webp" />
                      <img
                        src={project.fallbackImage || project.image}
                        alt={project.title}
                        width={project.width}
                        height={project.height}
                        loading="lazy"
                        decoding="async"
                        className={styles.cardImg}
                      />
                    </picture>
                    <div className={styles.hoverOverlay}>
                      <button className={styles.viewBtn}>
                        Inspect 3D Specs <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.categoryTag}>{project.category}</div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.description}</p>

                    <div className={styles.tagPills}>
                      {project.tools.slice(0, 3).map((tool, i) => (
                        <span key={i} className={styles.pill}>{tool}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Popup */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
