import React, { Suspense, lazy, startTransition, useCallback, useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUp, ArrowUpRight, Award, Box, Calendar, CheckCircle, CheckCircle2, Clock, Cpu, Download, Eye, Feather, FileText, Layers, Mail, MapPin, Menu, MessageCircle, Phone, Send, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import confetti from "canvas-confetti";
//#region src/hooks/useScrollSpy.js
/**
* Custom ScrollSpy hook that observes section IDs and highlights active nav link
* @param {Array<string>} sectionIds - List of section DOM element IDs to spy on
* @param {number} offset - Scroll threshold offset in pixels
*/
function useScrollSpy(sectionIds, offset = 120) {
	const [activeSection, setActiveSection] = useState(sectionIds[0] || "home");
	useEffect(() => {
		let sectionPositions = [];
		const updatePositions = () => {
			sectionPositions = sectionIds.map((id) => {
				const el = document.getElementById(id);
				if (!el) return null;
				const top = el.offsetTop;
				return {
					id,
					top,
					bottom: top + el.offsetHeight
				};
			}).filter(Boolean);
		};
		updatePositions();
		const handleScroll = () => {
			const scrollPosition = window.scrollY + offset;
			for (let i = sectionPositions.length - 1; i >= 0; i--) {
				const { id, top, bottom } = sectionPositions[i];
				if (scrollPosition >= top && scrollPosition < bottom) {
					setActiveSection((prev) => prev !== id ? id : prev);
					break;
				}
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", updatePositions, { passive: true });
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", updatePositions);
		};
	}, [sectionIds, offset]);
	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			const elementPosition = element.offsetTop;
			const offsetPosition = Math.max(0, elementPosition - 80);
			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth"
			});
		}
	};
	return {
		activeSection,
		scrollToSection
	};
}
//#endregion
//#region src/utils/cvHandler.js
/**
* Utility helper for Nirmali L.P.R.N. Ranawaka Google Drive CV viewing and direct PDF download handling
*/
var GOOGLE_DRIVE_CV_FOLDER = "https://drive.google.com/drive/folders/10aWgT0OdnYPaWhuIWI_uBY5SFr0ttCqp?usp=sharing";
var LOCAL_CV_PDF_PATH = "/assets/Nirmali_LPRN_Ranawaka_CV.pdf";
/**
* Opens public view of the Google Drive folder containing Nirmali's CV in a new browser tab
*/
function handleViewCV() {
	window.open(GOOGLE_DRIVE_CV_FOLDER, "_blank", "noopener,noreferrer");
}
/**
* Initiates an immediate direct download of Nirmali L.P.R.N. Ranawaka's PDF CV document
*/
function handleDownloadCV() {
	const link = document.createElement("a");
	link.href = LOCAL_CV_PDF_PATH;
	link.setAttribute("download", "Nirmali_LPRN_Ranawaka_CV.pdf");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
var Navbar_module_default = {
	navbar: "_navbar_1oc4w_1",
	navbarScrolled: "_navbarScrolled_1oc4w_19",
	navContainer: "_navContainer_1oc4w_28",
	brand: "_brand_1oc4w_36",
	logoText: "_logoText_1oc4w_43",
	logoDot: "_logoDot_1oc4w_52",
	navLinks: "_navLinks_1oc4w_60",
	navItem: "_navItem_1oc4w_67",
	navLink: "_navLink_1oc4w_60",
	activeLink: "_activeLink_1oc4w_89",
	activeIndicator: "_activeIndicator_1oc4w_94",
	cvBtnGroup: "_cvBtnGroup_1oc4w_106",
	viewCvBtn: "_viewCvBtn_1oc4w_113",
	downloadCvBtn: "_downloadCvBtn_1oc4w_136",
	hireButton: "_hireButton_1oc4w_159",
	mobileMenuBtn: "_mobileMenuBtn_1oc4w_182",
	navLinksOpen: "_navLinksOpen_1oc4w_215"
};
//#endregion
//#region src/components/Navbar/Navbar.jsx
function Navbar({ activeSection, scrollToSection, onOpenCvModal }) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const navItems = [
		{
			id: "home",
			label: "Home"
		},
		{
			id: "about",
			label: "About"
		},
		{
			id: "education",
			label: "Education"
		},
		{
			id: "portfolio",
			label: "Work"
		},
		{
			id: "services",
			label: "Services"
		},
		{
			id: "skills",
			label: "Skills"
		},
		{
			id: "experience",
			label: "Chronicle"
		},
		{
			id: "references",
			label: "References"
		},
		{
			id: "contact",
			label: "Contact"
		}
	];
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const handleNavClick = (id) => {
		scrollToSection(id);
		setMobileOpen(false);
	};
	const handleViewCvClick = () => {
		onOpenCvModal();
		setMobileOpen(false);
	};
	return /* @__PURE__ */ jsx("header", {
		className: `${Navbar_module_default.navbar} ${isScrolled ? Navbar_module_default.navbarScrolled : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: Navbar_module_default.navContainer,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: Navbar_module_default.brand,
					onClick: () => handleNavClick("home"),
					children: [/* @__PURE__ */ jsx("span", {
						className: Navbar_module_default.logoText,
						children: "NIRMALI"
					}), /* @__PURE__ */ jsx("div", { className: Navbar_module_default.logoDot })]
				}),
				/* @__PURE__ */ jsxs("ul", {
					className: `${Navbar_module_default.navLinks} ${mobileOpen ? Navbar_module_default.navLinksOpen : ""}`,
					children: [
						navItems.map((item) => {
							const isActive = activeSection === item.id;
							return /* @__PURE__ */ jsxs("li", {
								className: Navbar_module_default.navItem,
								children: [/* @__PURE__ */ jsx("button", {
									className: `${Navbar_module_default.navLink} ${isActive ? Navbar_module_default.activeLink : ""}`,
									onClick: () => handleNavClick(item.id),
									children: item.label
								}), isActive && /* @__PURE__ */ jsx(motion.div, {
									className: Navbar_module_default.activeIndicator,
									layoutId: "activeNavIndicator",
									transition: {
										type: "spring",
										stiffness: 380,
										damping: 30
									}
								})]
							}, item.id);
						}),
						/* @__PURE__ */ jsxs("li", {
							className: Navbar_module_default.cvBtnGroup,
							children: [/* @__PURE__ */ jsxs("button", {
								className: Navbar_module_default.viewCvBtn,
								onClick: handleViewCvClick,
								title: "View CV inside site",
								children: [/* @__PURE__ */ jsx(FileText, { size: 14 }), " View CV"]
							}), /* @__PURE__ */ jsxs("button", {
								className: Navbar_module_default.downloadCvBtn,
								onClick: handleDownloadCV,
								title: "Direct Download PDF CV",
								children: [/* @__PURE__ */ jsx(Download, { size: 14 }), " Download CV"]
							})]
						}),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
							className: Navbar_module_default.hireButton,
							onClick: () => handleNavClick("contact"),
							children: ["Hire Me ", /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 })]
						}) })
					]
				}),
				/* @__PURE__ */ jsx("button", {
					className: Navbar_module_default.mobileMenuBtn,
					onClick: () => setMobileOpen(!mobileOpen),
					"aria-label": "Toggle menu",
					children: mobileOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
				})
			]
		})
	});
}
var ParticleCanvas_module_default = {
	canvasWrapper: "_canvasWrapper_12ymo_1",
	particleCanvas: "_particleCanvas_12ymo_11"
};
//#endregion
//#region src/components/Hero/ParticleCanvas.jsx
function ParticleCanvas() {
	const canvasRef = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let animationFrameId;
		let width = 0;
		let height = 0;
		let dpr = 1;
		const mouse = {
			x: null,
			y: null,
			radius: 170
		};
		let particles = [];
		class Particle {
			constructor(w, h) {
				this.x = Math.random() * w;
				this.y = Math.random() * h;
				this.vx = (Math.random() - .5) * .8;
				this.vy = (Math.random() - .5) * .8;
				this.baseRadius = Math.random() * 1.5 + 1.2;
				this.radius = this.baseRadius;
				this.baseAlpha = Math.random() * .4 + .4;
				this.alpha = this.baseAlpha;
			}
			update(w, h) {
				this.x += this.vx;
				this.y += this.vy;
				if (this.x < 0) {
					this.x = 0;
					this.vx *= -1;
				} else if (this.x > w) {
					this.x = w;
					this.vx *= -1;
				}
				if (this.y < 0) {
					this.y = 0;
					this.vy *= -1;
				} else if (this.y > h) {
					this.y = h;
					this.vy *= -1;
				}
				if (mouse.x !== null && mouse.y !== null) {
					const dx = mouse.x - this.x;
					const dy = mouse.y - this.y;
					const dist = Math.hypot(dx, dy);
					if (dist < 100 && dist > 0) {
						const force = (100 - dist) / 100;
						const angle = Math.atan2(dy, dx);
						this.x -= Math.cos(angle) * force * 1.5;
						this.y -= Math.sin(angle) * force * 1.5;
						this.radius = this.baseRadius + force * 1.5;
					} else this.radius = this.baseRadius;
				} else this.radius = this.baseRadius;
			}
			draw(context) {
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
				context.fillStyle = `rgba(204, 255, 0, ${this.alpha})`;
				context.shadowColor = "#ccff00";
				context.shadowBlur = 6;
				context.fill();
				context.shadowBlur = 0;
			}
		}
		const initParticles = (w, h) => {
			const area = w * h;
			const count = Math.min(Math.max(Math.floor(area / 15e3), 35), 90);
			particles = [];
			for (let i = 0; i < count; i++) particles.push(new Particle(w, h));
		};
		let cachedCanvasRect = null;
		const handleResize = () => {
			const parent = canvas.parentElement;
			if (!parent) return;
			const rect = parent.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			cachedCanvasRect = rect;
			dpr = window.devicePixelRatio || 1;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.resetTransform();
			ctx.scale(dpr, dpr);
			initParticles(width, height);
		};
		const handleMouseMove = (e) => {
			if (!cachedCanvasRect) {
				const parent = canvas.parentElement;
				if (parent) cachedCanvasRect = parent.getBoundingClientRect();
			}
			if (cachedCanvasRect) {
				mouse.x = e.clientX - cachedCanvasRect.left;
				mouse.y = e.clientY - cachedCanvasRect.top;
			}
		};
		const handleMouseLeave = () => {
			mouse.x = null;
			mouse.y = null;
		};
		const handleScroll = () => {
			cachedCanvasRect = null;
		};
		window.addEventListener("resize", handleResize);
		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseleave", handleMouseLeave);
		handleResize();
		const connectionMaxDist = 135;
		const animate = () => {
			ctx.clearRect(0, 0, width, height);
			for (let i = 0; i < particles.length; i++) {
				const p1 = particles[i];
				p1.update(width, height);
				p1.draw(ctx);
				for (let j = i + 1; j < particles.length; j++) {
					const p2 = particles[j];
					const dx = p1.x - p2.x;
					const dy = p1.y - p2.y;
					const dist = Math.hypot(dx, dy);
					if (dist < connectionMaxDist) {
						const alpha = (1 - dist / connectionMaxDist) * .22;
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.strokeStyle = `rgba(204, 255, 0, ${alpha})`;
						ctx.lineWidth = .8;
						ctx.stroke();
					}
				}
				if (mouse.x !== null && mouse.y !== null) {
					const mdx = p1.x - mouse.x;
					const mdy = p1.y - mouse.y;
					const mdist = Math.hypot(mdx, mdy);
					if (mdist < mouse.radius) {
						const mAlpha = (1 - mdist / mouse.radius) * .55;
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(mouse.x, mouse.y);
						ctx.strokeStyle = `rgba(204, 255, 0, ${mAlpha})`;
						ctx.lineWidth = 1.1;
						ctx.stroke();
					}
				}
			}
			animationFrameId = requestAnimationFrame(animate);
		};
		animate();
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: ParticleCanvas_module_default.canvasWrapper,
		children: /* @__PURE__ */ jsx("canvas", {
			ref: canvasRef,
			className: ParticleCanvas_module_default.particleCanvas
		})
	});
}
var Hero_module_default = {
	heroSection: "_heroSection_1471o_1",
	canvasContainer: "_canvasContainer_1471o_13",
	heroContent: "_heroContent_1471o_23",
	badge: "_badge_1471o_34",
	statusDot: "_statusDot_1471o_51",
	pulse: "_pulse_1471o_1",
	nameTitle: "_nameTitle_1471o_66",
	roleSubtitle: "_roleSubtitle_1471o_78",
	typewriterContainer: "_typewriterContainer_1471o_87",
	prefixText: "_prefixText_1471o_96",
	typedTextWrapper: "_typedTextWrapper_1471o_102",
	typedText: "_typedText_1471o_102",
	cursor: "_cursor_1471o_113",
	blink: "_blink_1471o_1",
	animatedUnderline: "_animatedUnderline_1471o_127",
	description: "_description_1471o_139",
	ctaGrid: "_ctaGrid_1471o_148",
	primaryCtaBtn: "_primaryCtaBtn_1471o_156",
	viewCvBtn: "_viewCvBtn_1471o_181",
	downloadCvBtn: "_downloadCvBtn_1471o_208",
	whatsappCtaBtn: "_whatsappCtaBtn_1471o_234",
	iconBadge: "_iconBadge_1471o_260",
	iconBadgeLime: "_iconBadgeLime_1471o_270",
	iconBadgeDark: "_iconBadgeDark_1471o_280",
	iconBadgeEmerald: "_iconBadgeEmerald_1471o_290",
	scrollIndicator: "_scrollIndicator_1471o_300",
	scrollText: "_scrollText_1471o_313",
	scrollMouse: "_scrollMouse_1471o_321",
	scrollWheel: "_scrollWheel_1471o_329",
	scrollAnim: "_scrollAnim_1471o_1"
};
//#endregion
//#region src/components/Hero/TypewriterSubtitle.jsx
var ROLES = [
	"3D Digital Fashion Architect",
	"Pattern Designer",
	"Fashion Designer",
	"Spatial Garment Architect",
	"3D Apparel Sculptor"
];
function TypewriterSubtitle() {
	const [roleIndex, setRoleIndex] = useState(0);
	const [displayText, setDisplayText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	useEffect(() => {
		const currentRole = ROLES[roleIndex];
		let timer;
		if (!isDeleting) {
			if (displayText.length < currentRole.length) timer = setTimeout(() => {
				setDisplayText(currentRole.slice(0, displayText.length + 1));
			}, 110);
			else timer = setTimeout(() => {
				setIsDeleting(true);
			}, 2e3);
		} else if (displayText.length > 0) timer = setTimeout(() => {
			setDisplayText(currentRole.slice(0, displayText.length - 1));
		}, 55);
		else {
			setIsDeleting(false);
			setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
		}
		return () => clearTimeout(timer);
	}, [
		displayText,
		isDeleting,
		roleIndex
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: Hero_module_default.typewriterContainer,
		children: [/* @__PURE__ */ jsx("span", {
			className: Hero_module_default.prefixText,
			children: "I'm a "
		}), /* @__PURE__ */ jsxs("span", {
			className: Hero_module_default.typedTextWrapper,
			children: [
				/* @__PURE__ */ jsx("span", {
					className: Hero_module_default.typedText,
					children: displayText
				}),
				/* @__PURE__ */ jsx("span", {
					className: Hero_module_default.cursor,
					children: "|"
				}),
				/* @__PURE__ */ jsx("span", { className: Hero_module_default.animatedUnderline })
			]
		})]
	});
}
//#endregion
//#region src/components/Hero/Hero.jsx
function Hero({ scrollToSection, onOpenCvModal }) {
	return /* @__PURE__ */ jsxs("section", {
		id: "home",
		className: Hero_module_default.heroSection,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: Hero_module_default.canvasContainer,
				children: /* @__PURE__ */ jsx(ParticleCanvas, {})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `section-container ${Hero_module_default.heroContent}`,
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: Hero_module_default.badge,
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .6 },
						children: [/* @__PURE__ */ jsx("span", { className: Hero_module_default.statusDot }), "Available for Spatial & 3D Fashion Commissions"]
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: Hero_module_default.nameTitle,
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							delay: .2
						},
						children: /* @__PURE__ */ jsx("h1", { children: "L.P.R.N. RANAWAKA" })
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: Hero_module_default.roleSubtitle,
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							delay: .3
						},
						children: /* @__PURE__ */ jsx(TypewriterSubtitle, {})
					}),
					/* @__PURE__ */ jsx(motion.p, {
						className: Hero_module_default.description,
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							delay: .4
						},
						children: "Sculpting digital garments in the negative space. Bridging the gap between high-fashion editorial aesthetics, parametric cloth physics, and spatial Web3 depth."
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						className: Hero_module_default.ctaGrid,
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							delay: .5
						},
						children: [
							/* @__PURE__ */ jsxs("button", {
								className: Hero_module_default.primaryCtaBtn,
								onClick: () => scrollToSection("portfolio"),
								children: [/* @__PURE__ */ jsx("span", { children: "EXPLORE WORK" }), /* @__PURE__ */ jsx("div", {
									className: Hero_module_default.iconBadge,
									children: /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								className: Hero_module_default.viewCvBtn,
								onClick: onOpenCvModal,
								children: [/* @__PURE__ */ jsx("div", {
									className: Hero_module_default.iconBadgeLime,
									children: /* @__PURE__ */ jsx(FileText, { size: 16 })
								}), /* @__PURE__ */ jsx("span", { children: "VIEW CV" })]
							}),
							/* @__PURE__ */ jsxs("button", {
								className: Hero_module_default.downloadCvBtn,
								onClick: handleDownloadCV,
								children: [/* @__PURE__ */ jsx("div", {
									className: Hero_module_default.iconBadgeDark,
									children: /* @__PURE__ */ jsx(Download, { size: 16 })
								}), /* @__PURE__ */ jsx("span", { children: "DOWNLOAD CV" })]
							}),
							/* @__PURE__ */ jsxs("a", {
								href: "https://wa.me/94740721152",
								target: "_blank",
								rel: "noopener noreferrer",
								className: Hero_module_default.whatsappCtaBtn,
								children: [/* @__PURE__ */ jsx("div", {
									className: Hero_module_default.iconBadgeEmerald,
									children: /* @__PURE__ */ jsx(MessageCircle, { size: 16 })
								}), /* @__PURE__ */ jsx("span", { children: "WHATSAPP DIRECT" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: Hero_module_default.scrollIndicator,
				children: [/* @__PURE__ */ jsx("span", {
					className: Hero_module_default.scrollText,
					children: "SCROLL"
				}), /* @__PURE__ */ jsx("div", {
					className: Hero_module_default.scrollMouse,
					children: /* @__PURE__ */ jsx("div", { className: Hero_module_default.scrollWheel })
				})]
			})
		]
	});
}
//#endregion
//#region src/hooks/use3DTilt.js
/**
* Custom 3D Tilt Hook powered by Framer Motion spring physics
* @param {Object} options Configuration for tilt sensitivity and spring damping
*/
function use3DTilt(options = {}) {
	const { maxTilt = 10, scale = 1.025, springConfig = {
		stiffness: 280,
		damping: 22
	} } = options;
	const cardRef = useRef(null);
	const rawRotateX = useMotionValue(0);
	const rawRotateY = useMotionValue(0);
	const rawScale = useMotionValue(1);
	const rawGlareX = useMotionValue(50);
	const rawGlareY = useMotionValue(50);
	const rawGlareOpacity = useMotionValue(0);
	const rotateX = useSpring(rawRotateX, springConfig);
	const rotateY = useSpring(rawRotateY, springConfig);
	const scaleVal = useSpring(rawScale, springConfig);
	const glareX = useSpring(rawGlareX, springConfig);
	const glareY = useSpring(rawGlareY, springConfig);
	const glareOpacity = useSpring(rawGlareOpacity, springConfig);
	const rectRef = useRef(null);
	return {
		cardRef,
		rotateX,
		rotateY,
		scale: scaleVal,
		glareX,
		glareY,
		glareOpacity,
		handleMouseMove: useCallback((e) => {
			const card = cardRef.current;
			if (!card) return;
			if (!rectRef.current) rectRef.current = card.getBoundingClientRect();
			const rect = rectRef.current;
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const tX = (y - centerY) / centerY * -maxTilt;
			const tY = (x - centerX) / centerX * maxTilt;
			rawRotateX.set(tX);
			rawRotateY.set(tY);
			rawScale.set(scale);
			rawGlareX.set(x / rect.width * 100);
			rawGlareY.set(y / rect.height * 100);
			rawGlareOpacity.set(1);
		}, [
			maxTilt,
			scale,
			rawRotateX,
			rawRotateY,
			rawScale,
			rawGlareX,
			rawGlareY,
			rawGlareOpacity
		]),
		handleMouseLeave: useCallback(() => {
			rectRef.current = null;
			rawRotateX.set(0);
			rawRotateY.set(0);
			rawScale.set(1);
			rawGlareX.set(50);
			rawGlareY.set(50);
			rawGlareOpacity.set(0);
		}, [
			rawRotateX,
			rawRotateY,
			rawScale,
			rawGlareX,
			rawGlareY,
			rawGlareOpacity
		])
	};
}
var TiltCard_module_default = {
	tiltCard: "_tiltCard_t9zk0_1",
	cardInner: "_cardInner_t9zk0_21",
	cardGlare: "_cardGlare_t9zk0_32"
};
//#endregion
//#region src/components/TiltCard/TiltCard.jsx
function TiltCard({ children, className = "", options = {}, onClick }) {
	const { cardRef, rotateX, rotateY, scale, glareX, glareY, glareOpacity, handleMouseMove, handleMouseLeave } = use3DTilt(options);
	const glareBackground = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`);
	return /* @__PURE__ */ jsxs(motion.div, {
		ref: cardRef,
		className: `${TiltCard_module_default.tiltCard} ${className}`,
		style: {
			rotateX,
			rotateY,
			scale,
			transformStyle: "preserve-3d"
		},
		onMouseMove: handleMouseMove,
		onMouseLeave: handleMouseLeave,
		onClick,
		children: [/* @__PURE__ */ jsx("div", {
			className: TiltCard_module_default.cardInner,
			children
		}), /* @__PURE__ */ jsx(motion.div, {
			className: TiltCard_module_default.cardGlare,
			style: {
				background: glareBackground,
				opacity: glareOpacity
			}
		})]
	});
}
var About_module_default = {
	aboutSection: "_aboutSection_lv47t_1",
	tiltCard: "_tiltCard_lv47t_7",
	cardInner: "_cardInner_lv47t_26",
	cardGlare: "_cardGlare_lv47t_37",
	gridTop: "_gridTop_lv47t_53",
	gridBottom: "_gridBottom_lv47t_61",
	heroImgCard: "_heroImgCard_lv47t_69",
	imgFrame: "_imgFrame_lv47t_80",
	heroImg: "_heroImg_lv47t_69",
	imgOverlayPill: "_imgOverlayPill_lv47t_102",
	pillName: "_pillName_lv47t_123",
	pillRole: "_pillRole_lv47t_133",
	cardTag: "_cardTag_lv47t_143",
	cardTitle: "_cardTitle_lv47t_153",
	cardBody: "_cardBody_lv47t_163",
	manifestoNumber: "_manifestoNumber_lv47t_170",
	pedigreeList: "_pedigreeList_lv47t_180",
	pedigreeItem: "_pedigreeItem_lv47t_189",
	bullet: "_bullet_lv47t_200",
	cardIcon: "_cardIcon_lv47t_207",
	sampleMedia: "_sampleMedia_lv47t_221"
};
//#endregion
//#region src/components/About/About.jsx
function About() {
	return /* @__PURE__ */ jsx("section", {
		id: "about",
		className: About_module_default.aboutSection,
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-container",
			children: [
				/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .6 },
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "section-tag",
							children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), " 01. About me."]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "section-title",
							children: "ABOUT"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "section-subtitle",
							children: "As a leading 3D fashion designer Sri Lanka, exploring digital garments as architectural forms in virtual spaces—unconstrained by physical gravity or raw material yield."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: About_module_default.gridTop,
					children: [/* @__PURE__ */ jsx(TiltCard, {
						className: About_module_default.heroImgCard,
						children: /* @__PURE__ */ jsxs("div", {
							className: About_module_default.imgFrame,
							children: [/* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
								srcSet: "/assets/designer-interactive-3d-architect.webp",
								type: "image/webp"
							}), /* @__PURE__ */ jsx("img", {
								src: "/assets/designer-interactive-3d-architect.webp",
								alt: "Nirmali L.P.R.N. Ranawaka - 3D Digital Fashion Architect",
								width: "600",
								height: "800",
								fetchPriority: "high",
								decoding: "async",
								className: About_module_default.heroImg
							})] }), /* @__PURE__ */ jsxs("div", {
								className: About_module_default.imgOverlayPill,
								children: [/* @__PURE__ */ jsx("h3", {
									className: About_module_default.pillName,
									children: "L.P.R.N. Ranawaka"
								}), /* @__PURE__ */ jsx("div", {
									className: About_module_default.pillRole,
									children: "3D Digital Fashion Architect"
								})]
							})]
						})
					}), /* @__PURE__ */ jsxs(TiltCard, { children: [
						/* @__PURE__ */ jsx("div", {
							className: About_module_default.manifestoNumber,
							children: "01"
						}),
						/* @__PURE__ */ jsx("div", {
							className: About_module_default.cardIcon,
							children: /* @__PURE__ */ jsx(Feather, { size: 24 })
						}),
						/* @__PURE__ */ jsx("div", {
							className: About_module_default.cardTag,
							children: "02 / Manifesto"
						}),
						/* @__PURE__ */ jsx("h3", {
							className: About_module_default.cardTitle,
							children: "Manifesto 01."
						}),
						/* @__PURE__ */ jsx("p", {
							className: About_module_default.cardBody,
							children: "As an experienced CLO 3D freelance designer, the physical realm is a starting point, not a constraint. We are no longer bound by gravity, supply chain costs, or organic threads—3D fashion is pure liberation."
						}),
						/* @__PURE__ */ jsx("h4", {
							className: About_module_default.cardTag,
							style: { marginTop: "24px" },
							children: "Foundation & Pedigree"
						}),
						/* @__PURE__ */ jsxs("ul", {
							className: About_module_default.pedigreeList,
							children: [
								/* @__PURE__ */ jsxs("li", {
									className: About_module_default.pedigreeItem,
									children: [/* @__PURE__ */ jsx("span", { className: About_module_default.bullet }), " Central Saint Martins (London)"]
								}),
								/* @__PURE__ */ jsxs("li", {
									className: About_module_default.pedigreeItem,
									children: [/* @__PURE__ */ jsx("span", { className: About_module_default.bullet }), " Parsons School of Design (New York)"]
								}),
								/* @__PURE__ */ jsxs("li", {
									className: About_module_default.pedigreeItem,
									children: [/* @__PURE__ */ jsx("span", { className: About_module_default.bullet }), " Certified CLO 3D & Marvelous Specialist"]
								})
							]
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: About_module_default.gridBottom,
					children: [
						/* @__PURE__ */ jsxs(TiltCard, { children: [
							/* @__PURE__ */ jsx("div", {
								className: About_module_default.cardIcon,
								children: /* @__PURE__ */ jsx(Cpu, { size: 24 })
							}),
							/* @__PURE__ */ jsx("div", {
								className: About_module_default.cardTag,
								children: "03 / Physics"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: About_module_default.cardTitle,
								children: "Parametric Drape"
							}),
							/* @__PURE__ */ jsx("p", {
								className: About_module_default.cardBody,
								children: "Simulating complex zero-gravity silk physics, stress maps, and fluid collision dynamics for real-time virtual runways."
							}),
							/* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
								srcSet: "/assets/parametric-silk-drape-clo3d.webp",
								type: "image/webp"
							}), /* @__PURE__ */ jsx("img", {
								src: "/assets/parametric-silk-drape-clo3d.jpg",
								alt: "Parametric Silk Drape",
								width: "800",
								height: "446",
								loading: "lazy",
								decoding: "async",
								className: About_module_default.sampleMedia
							})] })
						] }),
						/* @__PURE__ */ jsxs(TiltCard, { children: [
							/* @__PURE__ */ jsx("div", {
								className: About_module_default.cardIcon,
								children: /* @__PURE__ */ jsx(Box, { size: 24 })
							}),
							/* @__PURE__ */ jsx("div", {
								className: About_module_default.cardTag,
								children: "04 / Shading"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: About_module_default.cardTitle,
								children: "Material Genesis"
							}),
							/* @__PURE__ */ jsx("p", {
								className: About_module_default.cardBody,
								children: "Authoring custom PBR shaders—liquid titanium, iridescent glass weaves, and bioluminescent smart fabrics in Substance & Houdini."
							}),
							/* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
								srcSet: "/assets/architectural-couture-corset.webp",
								type: "image/webp"
							}), /* @__PURE__ */ jsx("img", {
								src: "/assets/architectural-couture-corset.jpg",
								alt: "Couture Corset Render",
								width: "600",
								height: "803",
								loading: "lazy",
								decoding: "async",
								className: About_module_default.sampleMedia
							})] })
						] }),
						/* @__PURE__ */ jsxs(TiltCard, { children: [
							/* @__PURE__ */ jsx("div", {
								className: About_module_default.cardIcon,
								children: /* @__PURE__ */ jsx(Award, { size: 24 })
							}),
							/* @__PURE__ */ jsx("div", {
								className: About_module_default.cardTag,
								children: "05 / Web3 & Spatial"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: About_module_default.cardTitle,
								children: "Spatial Apparel"
							}),
							/* @__PURE__ */ jsx("p", {
								className: About_module_default.cardBody,
								children: "Engineering optimized Metahuman AR/VR assets, ready for Unreal Engine 5 real-time rendering, Apple Vision Pro, and metaverse fashion shows."
							}),
							/* @__PURE__ */ jsx("div", {
								style: {
									marginTop: "auto",
									paddingTop: "20px"
								},
								children: /* @__PURE__ */ jsxs("div", {
									className: About_module_default.pedigreeItem,
									children: [/* @__PURE__ */ jsx(ShieldCheck, {
										size: 18,
										color: "var(--accent-lime)"
									}), " 100% Industry Standard Tech Packs"]
								})
							})
						] })
					]
				})
			]
		})
	});
}
var Education_module_default = {
	educationSection: "_educationSection_4trxg_1",
	educationGrid: "_educationGrid_4trxg_11",
	eduCard: "_eduCard_4trxg_18",
	yearTag: "_yearTag_4trxg_40",
	schoolName: "_schoolName_4trxg_49",
	degreeTitle: "_degreeTitle_4trxg_58",
	eduDesc: "_eduDesc_4trxg_68",
	courseList: "_courseList_4trxg_76",
	courseItem: "_courseItem_4trxg_85"
};
//#endregion
//#region src/components/Education/Education.jsx
function Education() {
	return /* @__PURE__ */ jsx("section", {
		id: "education",
		className: Education_module_default.educationSection,
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-container",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "section-tag",
						children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), " // 02. Academic & Technical Pedigree"]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						children: "Education & Credentials"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "section-subtitle",
						children: "The foundation of avant-garde minimalist design, academic research, and certified digital fashion expertise."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: Education_module_default.educationGrid,
				children: [
					{
						year: "2019 - 2021",
						school: "Central Saint Martins",
						location: "London, UK",
						degree: "BA (Hons) Fashion Design & Digital Textiles",
						description: "A rigorous exploration of form, silhouette, and materiality. Focused deeply on integrating 3D digital workflows with traditional draping techniques.",
						highlights: [
							"First Class Honors Distinction",
							"Specialization in Parametric Pattern Drafting",
							"Senior Thesis: Zero-Gravity Cloth Dynamics"
						]
					},
					{
						year: "2021 - 2023",
						school: "Parsons School of Design",
						location: "New York, USA",
						degree: "MFA Textiles & Spatial Apparel",
						description: "Advanced research bridging virtual reality sculpting, algorithmic pattern generation, and physical high-fashion execution.",
						highlights: [
							"Digital Textile Design & Generative Shading",
							"3D Apparel Construction via CLO 3D & Unreal Engine",
							"Sustainable Smart Fabrics & 3D Printed Corsetry"
						]
					},
					{
						year: "2023 - PRESENT",
						school: "Advanced Couture Studio",
						location: "Paris / Remote",
						degree: "Certified Master 3D Specialist",
						description: "Continuous independent research bridging virtual reality sculpting, algorithmic pattern generation, and physical high-fashion execution.",
						highlights: [
							"Certified Marvelous Designer & CLO 3D Master",
							"Substance 3D PBR Material Authoring Certification",
							"Unreal Engine 5 Real-Time Rendering Accreditation"
						]
					}
				].map((edu, index) => /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .5,
						delay: index * .15
					},
					children: /* @__PURE__ */ jsxs(TiltCard, {
						className: Education_module_default.eduCard,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: Education_module_default.yearTag,
								children: [
									edu.year,
									" // ",
									edu.location
								]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: Education_module_default.schoolName,
								children: edu.school
							}),
							/* @__PURE__ */ jsx("div", {
								className: Education_module_default.degreeTitle,
								children: edu.degree
							}),
							/* @__PURE__ */ jsx("p", {
								className: Education_module_default.eduDesc,
								children: edu.description
							}),
							/* @__PURE__ */ jsx("ul", {
								className: Education_module_default.courseList,
								children: edu.highlights.map((h, i) => /* @__PURE__ */ jsxs("li", {
									className: Education_module_default.courseItem,
									children: [
										/* @__PURE__ */ jsx(CheckCircle2, {
											size: 16,
											color: "var(--accent-lime)"
										}),
										" ",
										h
									]
								}, i))
							})
						]
					})
				}, index))
			})]
		})
	});
}
var Portfolio_module_default = {
	portfolioSection: "_portfolioSection_16n9i_1",
	filterBar: "_filterBar_16n9i_9",
	filterBtn: "_filterBtn_16n9i_18",
	activeFilter: "_activeFilter_16n9i_36",
	portfolioGrid: "_portfolioGrid_16n9i_44",
	projectCard: "_projectCard_16n9i_51",
	imgWrapper: "_imgWrapper_16n9i_72",
	cardImg: "_cardImg_16n9i_79",
	hoverOverlay: "_hoverOverlay_16n9i_90",
	viewBtn: "_viewBtn_16n9i_109",
	cardContent: "_cardContent_16n9i_124",
	categoryTag: "_categoryTag_16n9i_134",
	projectTitle: "_projectTitle_16n9i_144",
	projectDesc: "_projectDesc_16n9i_153",
	tagPills: "_tagPills_16n9i_161",
	pill: "_pill_16n9i_169",
	modalBackdrop: "_modalBackdrop_16n9i_180",
	modalContent: "_modalContent_16n9i_195",
	closeBtn: "_closeBtn_16n9i_208",
	modalGrid: "_modalGrid_16n9i_229",
	modalMediaCol: "_modalMediaCol_16n9i_234",
	modalImg: "_modalImg_16n9i_238",
	modalInfoCol: "_modalInfoCol_16n9i_245",
	modalTag: "_modalTag_16n9i_253",
	modalTitle: "_modalTitle_16n9i_263",
	modalDesc: "_modalDesc_16n9i_272",
	specsBox: "_specsBox_16n9i_280",
	specsTitle: "_specsTitle_16n9i_289",
	specsList: "_specsList_16n9i_299",
	specItem: "_specItem_16n9i_307",
	toolsUsed: "_toolsUsed_16n9i_317",
	toolPill: "_toolPill_16n9i_325",
	modalActions: "_modalActions_16n9i_335",
	modalWhatsappBtn: "_modalWhatsappBtn_16n9i_340"
};
//#endregion
//#region src/components/Portfolio/ProjectModal.jsx
function ProjectModal({ project, onClose }) {
	if (!project) return null;
	return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx("div", {
		className: Portfolio_module_default.modalBackdrop,
		onClick: onClose,
		children: /* @__PURE__ */ jsxs(motion.div, {
			className: Portfolio_module_default.modalContent,
			onClick: (e) => e.stopPropagation(),
			initial: {
				opacity: 0,
				scale: .9,
				y: 30
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .9,
				y: 30
			},
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 300
			},
			children: [/* @__PURE__ */ jsx("button", {
				className: Portfolio_module_default.closeBtn,
				onClick: onClose,
				"aria-label": "Close modal",
				children: /* @__PURE__ */ jsx(X, { size: 20 })
			}), /* @__PURE__ */ jsxs("div", {
				className: Portfolio_module_default.modalGrid,
				children: [/* @__PURE__ */ jsx("div", {
					className: Portfolio_module_default.modalMediaCol,
					children: /* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
						srcSet: project.image,
						type: "image/webp"
					}), /* @__PURE__ */ jsx("img", {
						src: project.fallbackImage || project.image,
						alt: project.title,
						width: project.width,
						height: project.height,
						className: Portfolio_module_default.modalImg
					})] })
				}), /* @__PURE__ */ jsxs("div", {
					className: Portfolio_module_default.modalInfoCol,
					children: [
						/* @__PURE__ */ jsx("div", {
							className: Portfolio_module_default.modalTag,
							children: project.category
						}),
						/* @__PURE__ */ jsx("h2", {
							className: Portfolio_module_default.modalTitle,
							children: project.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: Portfolio_module_default.modalDesc,
							children: project.fullDescription
						}),
						/* @__PURE__ */ jsxs("div", {
							className: Portfolio_module_default.specsBox,
							children: [/* @__PURE__ */ jsx("h4", {
								className: Portfolio_module_default.specsTitle,
								children: "Technical Specifications"
							}), /* @__PURE__ */ jsx("ul", {
								className: Portfolio_module_default.specsList,
								children: project.specs.map((spec, i) => /* @__PURE__ */ jsxs("li", {
									className: Portfolio_module_default.specItem,
									children: [
										/* @__PURE__ */ jsx(CheckCircle2, {
											size: 16,
											color: "var(--accent-lime)"
										}),
										" ",
										spec
									]
								}, i))
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: Portfolio_module_default.toolsUsed,
							children: project.tools.map((tool, i) => /* @__PURE__ */ jsx("span", {
								className: Portfolio_module_default.toolPill,
								children: tool
							}, i))
						}),
						/* @__PURE__ */ jsx("div", {
							className: Portfolio_module_default.modalActions,
							children: /* @__PURE__ */ jsxs("a", {
								href: `https://wa.me/94740721152?text=${encodeURIComponent(`Hi Nirmali, I am interested in inquiring about your project: ${project.title}`)}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: Portfolio_module_default.modalWhatsappBtn,
								children: [/* @__PURE__ */ jsx(MessageCircle, { size: 18 }), " Inquire via WhatsApp"]
							})
						})
					]
				})]
			})]
		})
	}) });
}
//#endregion
//#region src/components/Portfolio/Portfolio.jsx
function Portfolio() {
	const [activeCategory, setActiveCategory] = useState("All");
	const [selectedProject, setSelectedProject] = useState(null);
	const categories = [
		"All",
		"3D Couture",
		"Spatial Runways",
		"Smart Fabrics",
		"Metahuman AR"
	];
	const projects = [
		{
			id: 1,
			title: "Monolith Fall/Winter Couture",
			category: "3D Couture",
			description: "Parametric digital twin gown created for Paris Virtual Fashion Week.",
			fullDescription: "An exploratory 3D fashion collection featuring zero-gravity kinetic pleats, procedural leather textures, and real-time ray-traced lighting. Engineered with Marvelous Designer and Substance 3D Painter.",
			image: "/assets/monolith-couture-3d-runway.webp",
			fallbackImage: "/assets/monolith-couture-3d-runway.jpg",
			width: 600,
			height: 600,
			tools: [
				"CLO 3D",
				"Marvelous Designer",
				"Unreal Engine 5",
				"Substance"
			],
			specs: [
				"High-poly cloth physics mesh (1.2M polys)",
				"Fully rigged Metahuman avatar integration",
				"Production ready 2D pattern tech pack export",
				"8K PBR texture maps (Albedo, Normal, Roughness)"
			]
		},
		{
			id: 2,
			title: "Zero-Gravity Fluid Silk",
			category: "Smart Fabrics",
			description: "Custom procedural GPU shader simulating liquid silk physics in space.",
			fullDescription: "Custom node-based fabric shader created to achieve liquid metallic refraction on digital garments for virtual world avatars.",
			image: "/assets/parametric-silk-drape-clo3d.webp",
			fallbackImage: "/assets/parametric-silk-drape-clo3d.jpg",
			width: 800,
			height: 446,
			tools: [
				"Houdini (Vellum)",
				"Blender Geometry Nodes",
				"Octane Render"
			],
			specs: [
				"Procedural wave amplitude control",
				"Anisotropic specular highlight shading",
				"Real-time collision detection mesh",
				"Compatible with Unity & Unreal Engine"
			]
		},
		{
			id: 3,
			title: "Architectural Organic Corset",
			category: "Metahuman AR",
			description: "Generative 3D printed lattice corset for spatial fashion exhibitions.",
			fullDescription: "Generative structural design merging algorithmic voronoi patterns with ergonomic female form fitting. Ready for 3D printing and WebAR visualization.",
			image: "/assets/architectural-couture-corset.webp",
			fallbackImage: "/assets/architectural-couture-corset.jpg",
			width: 600,
			height: 803,
			tools: [
				"Rhino Grasshopper",
				"CLO 3D",
				"KeyShot",
				"SparkAR"
			],
			specs: [
				"Watertight STL file for SLA 3D printing",
				"Sub-millimeter pattern precision",
				"Bioluminescent internal light channels",
				"WebAR USDZ / GLTF model optimized"
			]
		},
		{
			id: 4,
			title: "Maison Virtuelle Runway",
			category: "Spatial Runways",
			description: "Immersive 3D virtual fashion show environment for Apple Vision Pro.",
			fullDescription: "Spatial 3D runway architectural scene designed for Apple Vision Pro and Meta Quest 3, showcasing 12 interactive digital avatars.",
			image: "/assets/monolith-couture-3d-runway.webp",
			fallbackImage: "/assets/monolith-couture-3d-runway.jpg",
			width: 600,
			height: 600,
			tools: [
				"Unreal Engine 5.3",
				"Lumen & Nanite",
				"MetaHuman Animator"
			],
			specs: [
				"Real-time 60FPS VR performance",
				"Dynamic spatial audio ambiance",
				"Custom volumetric lighting setup",
				"Multi-user avatar synchronization"
			]
		}
	];
	const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
	return /* @__PURE__ */ jsxs("section", {
		id: "portfolio",
		className: Portfolio_module_default.portfolioSection,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "section-container",
			children: [
				/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { duration: .6 },
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "section-tag",
							children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), " // 02. Digital Archive & Portfolio"]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "section-title",
							children: "Selected Works"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "section-subtitle",
							children: "A curated history of commercial, spatial, and conceptual engagements within the luxury 3D digital fashion space."
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: Portfolio_module_default.filterBar,
					children: categories.map((cat) => /* @__PURE__ */ jsx("button", {
						className: `${Portfolio_module_default.filterBtn} ${activeCategory === cat ? Portfolio_module_default.activeFilter : ""}`,
						onClick: () => startTransition(() => setActiveCategory(cat)),
						children: cat
					}, cat))
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: Portfolio_module_default.portfolioGrid,
					layout: true,
					children: /* @__PURE__ */ jsx(AnimatePresence, { children: filteredProjects.map((project) => /* @__PURE__ */ jsx(motion.div, {
						layout: true,
						initial: {
							opacity: 0,
							scale: .9
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .9
						},
						transition: { duration: .4 },
						children: /* @__PURE__ */ jsxs(TiltCard, {
							className: Portfolio_module_default.projectCard,
							onClick: () => setSelectedProject(project),
							children: [/* @__PURE__ */ jsxs("div", {
								className: Portfolio_module_default.imgWrapper,
								children: [/* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
									srcSet: project.image,
									type: "image/webp"
								}), /* @__PURE__ */ jsx("img", {
									src: project.fallbackImage || project.image,
									alt: project.title,
									width: project.width,
									height: project.height,
									loading: "lazy",
									decoding: "async",
									className: Portfolio_module_default.cardImg
								})] }), /* @__PURE__ */ jsx("div", {
									className: Portfolio_module_default.hoverOverlay,
									children: /* @__PURE__ */ jsxs("button", {
										className: Portfolio_module_default.viewBtn,
										children: ["Inspect 3D Specs ", /* @__PURE__ */ jsx(Eye, { size: 16 })]
									})
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: Portfolio_module_default.cardContent,
								children: [
									/* @__PURE__ */ jsx("div", {
										className: Portfolio_module_default.categoryTag,
										children: project.category
									}),
									/* @__PURE__ */ jsx("h3", {
										className: Portfolio_module_default.projectTitle,
										children: project.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: Portfolio_module_default.projectDesc,
										children: project.description
									}),
									/* @__PURE__ */ jsx("div", {
										className: Portfolio_module_default.tagPills,
										children: project.tools.slice(0, 3).map((tool, i) => /* @__PURE__ */ jsx("span", {
											className: Portfolio_module_default.pill,
											children: tool
										}, i))
									})
								]
							})]
						})
					}, project.id)) })
				})
			]
		}), /* @__PURE__ */ jsx(ProjectModal, {
			project: selectedProject,
			onClose: () => setSelectedProject(null)
		})]
	});
}
var Services_module_default = {
	servicesSection: "_servicesSection_dcqct_1",
	servicesGrid: "_servicesGrid_dcqct_9",
	serviceCard: "_serviceCard_dcqct_16",
	serviceIcon: "_serviceIcon_dcqct_37",
	serviceNumber: "_serviceNumber_dcqct_52",
	serviceTitle: "_serviceTitle_dcqct_61",
	serviceDesc: "_serviceDesc_dcqct_71",
	inquireBtn: "_inquireBtn_dcqct_79"
};
//#endregion
//#region src/components/Services/Services.jsx
function Services() {
	const servicesList = [
		{
			num: "01",
			title: "3D Digital Couture Creation",
			icon: /* @__PURE__ */ jsx(Layers, { size: 26 }),
			description: "End-to-end 3D garment sculpting, high-poly cloth draping, and hyper-realistic rendering for haute couture digital fashion houses and Paris fashion week virtual runways."
		},
		{
			num: "02",
			title: "Spatial Runways in Unreal Engine 5",
			icon: /* @__PURE__ */ jsx(Box, { size: 26 }),
			description: "Real-time spatial 3D runway environments powered by Lumen lighting and MetaHuman Animator, optimized for Apple Vision Pro, Meta Quest, and browser Web3 portals."
		},
		{
			num: "03",
			title: "Procedural Shader Authoring",
			icon: /* @__PURE__ */ jsx(Cpu, { size: 26 }),
			description: "Inventing impossible physical textiles—liquid metallic weaves, bioluminescent thread matrices, and refractive glass fibers using Substance 3D and Houdini."
		},
		{
			num: "04",
			title: "Production Tech Packs & Pattern Grading",
			icon: /* @__PURE__ */ jsx(ShieldCheck, { size: 26 }),
			description: "Seamlessly bridging virtual 3D garment concepts to physical manufacturing. Providing DXF pattern grading, seam allowances, and 100% accurate measurement specs."
		}
	];
	return /* @__PURE__ */ jsx("section", {
		id: "services",
		className: Services_module_default.servicesSection,
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-container",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "section-tag",
						children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), " // 04. Core Capabilities & Services"]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						children: "Specialized Services"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "section-subtitle",
						children: "Explore my digital fashion portfolio for bespoke 3D design solutions catering to luxury brands, spatial game studios, and metaverse fashion week producers."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: Services_module_default.servicesGrid,
				children: servicesList.map((service, index) => /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .5,
						delay: index * .15
					},
					children: /* @__PURE__ */ jsxs(TiltCard, {
						className: Services_module_default.serviceCard,
						children: [
							/* @__PURE__ */ jsx("div", {
								className: Services_module_default.serviceIcon,
								children: service.icon
							}),
							/* @__PURE__ */ jsxs("div", {
								className: Services_module_default.serviceNumber,
								children: ["SERVICE // ", service.num]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: Services_module_default.serviceTitle,
								children: service.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: Services_module_default.serviceDesc,
								children: service.description
							}),
							/* @__PURE__ */ jsxs("a", {
								href: `https://wa.me/94740721152?text=${encodeURIComponent(`Hi Nirmali, I want to inquire about Service: ${service.title}`)}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: Services_module_default.inquireBtn,
								children: ["Inquire Service ", /* @__PURE__ */ jsx(ArrowRight, { size: 16 })]
							})
						]
					})
				}, index))
			})]
		})
	});
}
var Skills_module_default = {
	skillsSection: "_skillsSection_1tegy_1",
	skillsGrid: "_skillsGrid_1tegy_7",
	skillCard: "_skillCard_1tegy_14",
	cardHeader: "_cardHeader_1tegy_36",
	skillName: "_skillName_1tegy_47",
	skillBadge: "_skillBadge_1tegy_55",
	progressContainer: "_progressContainer_1tegy_65",
	progressBar: "_progressBar_1tegy_75",
	skillDetails: "_skillDetails_1tegy_82",
	detailItem: "_detailItem_1tegy_92",
	checkIcon: "_checkIcon_1tegy_103"
};
//#endregion
//#region src/components/Skills/Skills.jsx
function Skills() {
	return /* @__PURE__ */ jsx("section", {
		id: "skills",
		className: Skills_module_default.skillsSection,
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-container",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "section-tag",
						children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), " // 03. Technical Matrix & Capacity"]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						children: "Technical Proficiency"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "section-subtitle",
						children: "Quantifying expertise across digital garment creation, spatial engine design, and procedural fabric generation."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: Skills_module_default.skillsGrid,
				children: [
					{
						title: "CLO 3D & Marvelous Designer",
						category: "CORE DISCIPLINE",
						level: 98,
						details: [
							"Pattern Drafting",
							"Fluid Dynamics",
							"Texture Mapping",
							"Avatar Rigging"
						]
					},
					{
						title: "Unreal Engine 5",
						category: "ENVIRONMENT & LIGHTING",
						level: 92,
						details: [
							"Lumen Lighting",
							"Nanite Geometry",
							"MetaHuman Animator",
							"Control Rig"
						]
					},
					{
						title: "Substance 3D Designer",
						category: "PROCEDURAL SHADERS",
						level: 88,
						details: [
							"PBR Material Authoring",
							"Normal Maps",
							"Roughness Maps",
							"Displacement"
						]
					},
					{
						title: "Houdini & Vellum",
						category: "KINETIC SIMULATION",
						level: 82,
						details: [
							"Vellum Cloth Physics",
							"Zero-Gravity Drape",
							"Strand Dynamics",
							"Procedural Folds"
						]
					},
					{
						title: "Blender Geometry Nodes",
						category: "PROCEDURAL MODELING",
						level: 86,
						details: [
							"Lattice Sculpting",
							"Custom Modifiers",
							"UV Unwrapping",
							"Cycles Rendering"
						]
					},
					{
						title: "Digital Tech Packs & Grading",
						category: "PRODUCTION READY",
						level: 95,
						details: [
							"DXF Pattern Export",
							"Measurement Specs",
							"Seam Allowances",
							"Costing Charts"
						]
					}
				].map((skill, index) => /* @__PURE__ */ jsxs(TiltCard, {
					className: Skills_module_default.skillCard,
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .5,
						delay: index * .1
					},
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: Skills_module_default.cardHeader,
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "section-tag",
								children: skill.category
							}), /* @__PURE__ */ jsx("h3", {
								className: Skills_module_default.skillName,
								children: skill.title
							})] }), /* @__PURE__ */ jsxs("span", {
								className: Skills_module_default.skillBadge,
								children: [skill.level, "%"]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: Skills_module_default.progressContainer,
							children: /* @__PURE__ */ jsx(motion.div, {
								className: Skills_module_default.progressBar,
								initial: { width: 0 },
								whileInView: { width: `${skill.level}%` },
								viewport: { once: true },
								transition: {
									duration: 1,
									ease: "easeOut",
									delay: .2
								}
							})
						}),
						/* @__PURE__ */ jsx("ul", {
							className: Skills_module_default.skillDetails,
							children: skill.details.map((detail, i) => /* @__PURE__ */ jsxs("li", {
								className: Skills_module_default.detailItem,
								children: [
									/* @__PURE__ */ jsx(CheckCircle2, {
										size: 14,
										className: Skills_module_default.checkIcon
									}),
									" ",
									detail
								]
							}, i))
						})
					]
				}, index))
			})]
		})
	});
}
var Experience_module_default = {
	experienceSection: "_experienceSection_9e8go_1",
	timeline: "_timeline_9e8go_11",
	timelineLine: "_timelineLine_9e8go_19",
	timelineItem: "_timelineItem_9e8go_29",
	timelineItemRight: "_timelineItemRight_9e8go_38",
	timelineNode: "_timelineNode_9e8go_46",
	timelineCard: "_timelineCard_9e8go_64",
	timelineYear: "_timelineYear_9e8go_84",
	timelineRole: "_timelineRole_9e8go_93",
	timelineCompany: "_timelineCompany_9e8go_102",
	timelineDesc: "_timelineDesc_9e8go_112",
	achievementList: "_achievementList_9e8go_120",
	achievementItem: "_achievementItem_9e8go_128",
	bulletDot: "_bulletDot_9e8go_138"
};
//#endregion
//#region src/components/Experience/Experience.jsx
function Experience() {
	return /* @__PURE__ */ jsx("section", {
		id: "experience",
		className: Experience_module_default.experienceSection,
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-container",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "section-tag",
						children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), " // 04. Career History & Chronicle"]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						children: "Selected Experience"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "section-subtitle",
						children: "A definitive record of structural design, 3D modeling, and editorial fashion execution."
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: Experience_module_default.timeline,
				children: [/* @__PURE__ */ jsx("div", { className: Experience_module_default.timelineLine }), [
					{
						year: "2021 - PRESENT",
						role: "Lead 3D Fashion Architect",
						company: "MAISON VIRTUELLE",
						description: "Spearheaded the integration of parametric 3D modeling into traditional haute couture workflows. Developed a proprietary digital draping pipeline used in major Paris Fashion Week virtual presentations.",
						achievements: [
							"Orchestrated digital twin creation for 200+ archival garments.",
							"Reduced physical prototyping waste by 64% across 4 luxury lines.",
							"Directed real-time Metahuman avatar runway presentations in Unreal Engine 5."
						]
					},
					{
						year: "2018 - 2021",
						role: "Senior Pattern Drafter & 3D Specialist",
						company: "ATELIER NOIR",
						description: "Bridged the gap between avant-garde concept sketches and structural digital reality. Specialized in complex geometric silhouettes and unconventional fabric manipulation techniques.",
						achievements: ["Lead pattern drafter for the award-winning \"Monolith\" Fall/Winter collection.", "Implemented rigorous 3D quality control standards for bespoke orders."]
					},
					{
						year: "2015 - 2018",
						role: "Technical Garment Designer",
						company: "SYNDICATE FORM",
						description: "Translated conceptual designs into highly detailed production tech packs. Focused on high-performance outerwear, combining high-fashion aesthetics with extreme weather functionality.",
						achievements: ["Authored 100+ production tech packs with DXF pattern integration.", "Optimized fabric marker yield by 14% using algorithmic nesting."]
					}
				].map((exp, index) => {
					const isEven = index % 2 === 0;
					return /* @__PURE__ */ jsxs(motion.div, {
						className: `${Experience_module_default.timelineItem} ${!isEven ? Experience_module_default.timelineItemRight : ""}`,
						initial: {
							opacity: 0,
							x: isEven ? -40 : 40
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: {
							duration: .6,
							delay: index * .2
						},
						children: [/* @__PURE__ */ jsx("div", { className: Experience_module_default.timelineNode }), /* @__PURE__ */ jsxs(TiltCard, {
							className: Experience_module_default.timelineCard,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: Experience_module_default.timelineYear,
									children: [/* @__PURE__ */ jsx(Calendar, {
										size: 14,
										style: {
											display: "inline",
											marginRight: "6px"
										}
									}), exp.year]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: Experience_module_default.timelineRole,
									children: exp.role
								}),
								/* @__PURE__ */ jsx("div", {
									className: Experience_module_default.timelineCompany,
									children: exp.company
								}),
								/* @__PURE__ */ jsx("p", {
									className: Experience_module_default.timelineDesc,
									children: exp.description
								}),
								/* @__PURE__ */ jsx("ul", {
									className: Experience_module_default.achievementList,
									children: exp.achievements.map((item, i) => /* @__PURE__ */ jsxs("li", {
										className: Experience_module_default.achievementItem,
										children: [
											/* @__PURE__ */ jsx("span", { className: Experience_module_default.bulletDot }),
											" ",
											item
										]
									}, i))
								})
							]
						})]
					}, index);
				})]
			})]
		})
	});
}
var References_module_default = {
	referencesSection: "_referencesSection_e1lze_1",
	referencesGrid: "_referencesGrid_e1lze_9",
	refCard: "_refCard_e1lze_16",
	quoteMark: "_quoteMark_e1lze_37",
	quoteText: "_quoteText_e1lze_47",
	authorBox: "_authorBox_e1lze_56",
	authorAvatar: "_authorAvatar_e1lze_69",
	authorName: "_authorName_e1lze_84",
	authorRole: "_authorRole_e1lze_92"
};
//#endregion
//#region src/components/References/References.jsx
function References() {
	return /* @__PURE__ */ jsx("section", {
		id: "references",
		className: References_module_default.referencesSection,
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-container",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "section-tag",
						children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), " // 06. Industry Endorsements & References"]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						children: "Professional References"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "section-subtitle",
						children: "What creative directors, spatial architects, and luxury digital fashion houses say about collaborating with Nirmali."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: References_module_default.referencesGrid,
				children: [
					{
						initials: "NR",
						quote: "Nirmali revolutionized our digital twin workflow. Her mastery over CLO 3D cloth physics and procedural shader authoring allowed us to launch our virtual runway in record time.",
						name: "Nicolas V. Rose",
						role: "Creative Director @ Maison Virtuelle Paris"
					},
					{
						initials: "SL",
						quote: "The level of detail in Nirmali’s 3D zero-gravity draping and production-ready tech packs is unmatched. She bridges avant-garde high fashion with flawless spatial engineering.",
						name: "Sophia Laurent",
						role: "Head of Digital Apparel @ Atelier Noir"
					},
					{
						initials: "MK",
						quote: "Working with Nirmali on our MetaHuman Unreal Engine 5 runway presentation was seamless. Her understanding of Lumen lighting and real-time cloth simulation is world-class.",
						name: "Marcus Vance",
						role: "Lead Spatial Architect @ Syndicate Form Studios"
					}
				].map((item, index) => /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .5,
						delay: index * .15
					},
					children: /* @__PURE__ */ jsxs(TiltCard, {
						className: References_module_default.refCard,
						children: [
							/* @__PURE__ */ jsx("div", {
								className: References_module_default.quoteMark,
								children: "“"
							}),
							/* @__PURE__ */ jsx("p", {
								className: References_module_default.quoteText,
								children: item.quote
							}),
							/* @__PURE__ */ jsx("div", {
								style: {
									display: "flex",
									gap: "4px",
									marginBottom: "16px"
								},
								children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, {
									size: 14,
									fill: "var(--accent-lime)",
									color: "var(--accent-lime)"
								}, i))
							}),
							/* @__PURE__ */ jsxs("div", {
								className: References_module_default.authorBox,
								children: [/* @__PURE__ */ jsx("div", {
									className: References_module_default.authorAvatar,
									children: item.initials
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: References_module_default.authorName,
									children: item.name
								}), /* @__PURE__ */ jsx("div", {
									className: References_module_default.authorRole,
									children: item.role
								})] })]
							})
						]
					})
				}, index))
			})]
		})
	});
}
var Contact_module_default = {
	contactSection: "_contactSection_1v977_1",
	contactGrid: "_contactGrid_1v977_9",
	infoCol: "_infoCol_1v977_17",
	whatsappCard: "_whatsappCard_1v977_25",
	cardHeader: "_cardHeader_1v977_48",
	iconCircle: "_iconCircle_1v977_57",
	whatsappTitle: "_whatsappTitle_1v977_69",
	whatsappNumber: "_whatsappNumber_1v977_77",
	whatsappText: "_whatsappText_1v977_86",
	whatsappLinkBtn: "_whatsappLinkBtn_1v977_94",
	emailDirectCard: "_emailDirectCard_1v977_119",
	emailTitle: "_emailTitle_1v977_141",
	emailAddress: "_emailAddress_1v977_153",
	formCard: "_formCard_1v977_162",
	formTitle: "_formTitle_1v977_180",
	form: "_form_1v977_162",
	inputGroup: "_inputGroup_1v977_195",
	label: "_label_1v977_202",
	input: "_input_1v977_195",
	textarea: "_textarea_1v977_211",
	select: "_select_1v977_211",
	submitBtn: "_submitBtn_1v977_236",
	successMessage: "_successMessage_1v977_261",
	successTitle: "_successTitle_1v977_273"
};
//#endregion
//#region src/components/Contact/Contact.jsx
function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		service: "3D Digital Couture",
		message: ""
	});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSubmitted(true);
			try {
				confetti({
					particleCount: 80,
					spread: 70,
					origin: { y: .6 },
					colors: [
						"#ccff00",
						"#00f0ff",
						"#ffffff"
					]
				});
			} catch (err) {}
			const mailtoUrl = `mailto:rajininirmali99@gmail.com?subject=${encodeURIComponent(`[3D Project Inquiry] ${formData.service} - ${formData.name}`)}&body=${encodeURIComponent(`Client Name: ${formData.name}\nClient Email: ${formData.email}\nService Interested: ${formData.service}\n\nMessage:\n${formData.message}`)}`;
			window.location.href = mailtoUrl;
		}, 600);
	};
	return /* @__PURE__ */ jsx("section", {
		id: "contact",
		className: Contact_module_default.contactSection,
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-container",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "section-tag",
						children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), " // 05. Direct Contact & Inquiries"]
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "section-title",
						children: "Initiate Collaboration"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "section-subtitle",
						children: "Ready to push the boundaries of 3D spatial fashion, virtual runways, or custom digital drape commissions? Get in touch immediately."
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: Contact_module_default.contactGrid,
				children: [/* @__PURE__ */ jsxs("div", {
					className: Contact_module_default.infoCol,
					children: [/* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							x: -30
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: { duration: .6 },
						children: /* @__PURE__ */ jsxs(TiltCard, {
							className: Contact_module_default.whatsappCard,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: Contact_module_default.cardHeader,
									children: [/* @__PURE__ */ jsx("div", {
										className: Contact_module_default.iconCircle,
										children: /* @__PURE__ */ jsx(MessageCircle, { size: 26 })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: Contact_module_default.whatsappTitle,
										children: "Instant WhatsApp"
									}), /* @__PURE__ */ jsx("div", {
										className: Contact_module_default.whatsappNumber,
										children: "+94 74 072 1152"
									})] })]
								}),
								/* @__PURE__ */ jsx("p", {
									className: Contact_module_default.whatsappText,
									children: "Direct line for urgent studio commissions, fashion week consultations, and real-time project quotes."
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "https://wa.me/94740721152",
									target: "_blank",
									rel: "noopener noreferrer",
									className: Contact_module_default.whatsappLinkBtn,
									children: [/* @__PURE__ */ jsx(MessageCircle, { size: 18 }), " Open WhatsApp Chat"]
								})
							]
						})
					}), /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							x: -30
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: {
							duration: .6,
							delay: .2
						},
						children: /* @__PURE__ */ jsxs(TiltCard, {
							className: Contact_module_default.emailDirectCard,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: Contact_module_default.emailTitle,
									children: [/* @__PURE__ */ jsx(Mail, {
										size: 22,
										color: "var(--accent-lime)"
									}), " Official Studio Email"]
								}),
								/* @__PURE__ */ jsx("div", {
									className: Contact_module_default.emailAddress,
									children: "rajininirmali99@gmail.com"
								}),
								/* @__PURE__ */ jsx("div", {
									style: {
										fontSize: "0.85rem",
										color: "var(--text-secondary)"
									},
									children: "Average response time: < 2 hours on business days."
								}),
								/* @__PURE__ */ jsxs("div", {
									style: {
										display: "flex",
										flexDirection: "column",
										gap: "10px",
										marginTop: "12px"
									},
									children: [/* @__PURE__ */ jsxs("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: "10px",
											fontSize: "0.85rem",
											color: "var(--text-secondary)"
										},
										children: [/* @__PURE__ */ jsx(Clock, {
											size: 16,
											color: "var(--accent-lime)"
										}), " Availability: Mon – Sat (09:00 - 18:00 UTC)"]
									}), /* @__PURE__ */ jsxs("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: "10px",
											fontSize: "0.85rem",
											color: "var(--text-secondary)"
										},
										children: [/* @__PURE__ */ jsx(MapPin, {
											size: 16,
											color: "var(--accent-lime)"
										}), " Location: Galle Road, Colombo / Worldwide Remote"]
									})]
								})
							]
						})
					})]
				}), /* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						x: 30
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: { once: true },
					transition: { duration: .6 },
					children: /* @__PURE__ */ jsxs(TiltCard, {
						className: Contact_module_default.formCard,
						children: [/* @__PURE__ */ jsx("h3", {
							className: Contact_module_default.formTitle,
							children: "Send a Project Brief"
						}), submitted ? /* @__PURE__ */ jsxs("div", {
							className: Contact_module_default.successMessage,
							children: [
								/* @__PURE__ */ jsx(CheckCircle, {
									size: 48,
									color: "var(--accent-lime)"
								}),
								/* @__PURE__ */ jsx("h4", {
									className: Contact_module_default.successTitle,
									children: "Inquiry Sent Successfully!"
								}),
								/* @__PURE__ */ jsxs("p", {
									style: {
										color: "var(--text-secondary)",
										fontSize: "0.95rem"
									},
									children: [
										"Thank you, ",
										/* @__PURE__ */ jsx("strong", { children: formData.name }),
										". Your inquiry has been routed to ",
										/* @__PURE__ */ jsx("code", { children: "rajininirmali99@gmail.com" }),
										" and your email client has opened to dispatch the message."
									]
								}),
								/* @__PURE__ */ jsx("button", {
									className: Contact_module_default.submitBtn,
									style: { marginTop: "16px" },
									onClick: () => setSubmitted(false),
									children: "Send Another Message"
								})
							]
						}) : /* @__PURE__ */ jsxs("form", {
							className: Contact_module_default.form,
							onSubmit: handleSubmit,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: Contact_module_default.inputGroup,
									children: [/* @__PURE__ */ jsx("label", {
										htmlFor: "contact-name",
										className: Contact_module_default.label,
										children: "Your Name"
									}), /* @__PURE__ */ jsx("input", {
										id: "contact-name",
										type: "text",
										name: "name",
										required: true,
										placeholder: "e.g. Elena Rostova",
										value: formData.name,
										onChange: handleChange,
										className: Contact_module_default.input
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: Contact_module_default.inputGroup,
									children: [/* @__PURE__ */ jsx("label", {
										htmlFor: "contact-email",
										className: Contact_module_default.label,
										children: "Your Email Address"
									}), /* @__PURE__ */ jsx("input", {
										id: "contact-email",
										type: "email",
										name: "email",
										required: true,
										placeholder: "name@company.com",
										value: formData.email,
										onChange: handleChange,
										className: Contact_module_default.input
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: Contact_module_default.inputGroup,
									children: [/* @__PURE__ */ jsx("label", {
										htmlFor: "contact-service",
										className: Contact_module_default.label,
										children: "Requested Service"
									}), /* @__PURE__ */ jsxs("select", {
										id: "contact-service",
										name: "service",
										"aria-label": "Requested Service",
										value: formData.service,
										onChange: handleChange,
										className: Contact_module_default.select,
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "3D Digital Couture",
												children: "3D Digital Couture Collection"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Spatial Virtual Runway",
												children: "Spatial Virtual Runway (Unreal Engine 5)"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Procedural Fabric Shader",
												children: "Procedural Fabric Shader Development"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Metahuman Asset Rigging",
												children: "Metahuman Apparel Rigging & Tech Packs"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Brand Consultation",
												children: "3D Fashion Design Consultation"
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: Contact_module_default.inputGroup,
									children: [/* @__PURE__ */ jsx("label", {
										htmlFor: "contact-message",
										className: Contact_module_default.label,
										children: "Project Details & Scope"
									}), /* @__PURE__ */ jsx("textarea", {
										id: "contact-message",
										name: "message",
										required: true,
										placeholder: "Describe your vision, deadline, and reference materials...",
										value: formData.message,
										onChange: handleChange,
										className: Contact_module_default.textarea
									})]
								}),
								/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: loading,
									className: Contact_module_default.submitBtn,
									children: loading ? "Processing Brief..." : /* @__PURE__ */ jsxs(Fragment, { children: ["Submit Inquiry ", /* @__PURE__ */ jsx(Send, { size: 18 })] })
								})
							]
						})]
					})
				})]
			})]
		})
	});
}
var Footer_module_default = {
	footer: "_footer_1uruh_1",
	footerGrid: "_footerGrid_1uruh_10",
	brandCol: "_brandCol_1uruh_19",
	footerLogo: "_footerLogo_1uruh_27",
	footerSubname: "_footerSubname_1uruh_37",
	brandDesc: "_brandDesc_1uruh_44",
	colTitle: "_colTitle_1uruh_52",
	linkList: "_linkList_1uruh_62",
	footerLink: "_footerLink_1uruh_70",
	contactInfoItem: "_contactInfoItem_1uruh_85",
	bottomBar: "_bottomBar_1uruh_95",
	backToTopBtn: "_backToTopBtn_1uruh_109"
};
//#endregion
//#region src/components/Footer/Footer.jsx
function Footer({ scrollToSection }) {
	const handleScrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ jsx("footer", {
		className: Footer_module_default.footer,
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-container",
			style: {
				paddingBottom: 0,
				paddingTop: 0
			},
			children: [/* @__PURE__ */ jsxs("div", {
				className: Footer_module_default.footerGrid,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: Footer_module_default.brandCol,
						children: [
							/* @__PURE__ */ jsx("div", {
								className: Footer_module_default.footerLogo,
								children: "NIRMALI"
							}),
							/* @__PURE__ */ jsx("div", {
								className: Footer_module_default.footerSubname,
								children: "Nirmali L.P.R.N. Ranawaka"
							}),
							/* @__PURE__ */ jsx("p", {
								className: Footer_module_default.brandDesc,
								children: "Sculpting digital garments in the negative space. Bridging the gap between high-fashion editorial aesthetics, parametric cloth simulation, and spatial Web3 environments."
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: Footer_module_default.colTitle,
						children: "Navigation"
					}), /* @__PURE__ */ jsxs("ul", {
						className: Footer_module_default.linkList,
						children: [
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
								className: Footer_module_default.footerLink,
								onClick: () => scrollToSection("home"),
								children: "Home"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
								className: Footer_module_default.footerLink,
								onClick: () => scrollToSection("about"),
								children: "About Studio"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
								className: Footer_module_default.footerLink,
								onClick: () => scrollToSection("portfolio"),
								children: "Selected Works"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
								className: Footer_module_default.footerLink,
								onClick: () => scrollToSection("skills"),
								children: "Technical Capacity"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
								className: Footer_module_default.footerLink,
								onClick: () => scrollToSection("experience"),
								children: "Career Chronicle"
							}) })
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: Footer_module_default.colTitle,
						children: "Services"
					}), /* @__PURE__ */ jsxs("ul", {
						className: Footer_module_default.linkList,
						children: [
							/* @__PURE__ */ jsx("li", {
								className: Footer_module_default.footerLink,
								children: "3D Digital Couture"
							}),
							/* @__PURE__ */ jsx("li", {
								className: Footer_module_default.footerLink,
								children: "Spatial UE5 Virtual Runways"
							}),
							/* @__PURE__ */ jsx("li", {
								className: Footer_module_default.footerLink,
								children: "Procedural Fabric Shading"
							}),
							/* @__PURE__ */ jsx("li", {
								className: Footer_module_default.footerLink,
								children: "Metahuman Asset Rigging"
							}),
							/* @__PURE__ */ jsx("li", {
								className: Footer_module_default.footerLink,
								children: "2D/3D Tech Pack Drafting"
							})
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: Footer_module_default.colTitle,
						children: "Contact Us"
					}), /* @__PURE__ */ jsxs("ul", {
						className: Footer_module_default.linkList,
						children: [
							/* @__PURE__ */ jsxs("li", {
								className: Footer_module_default.contactInfoItem,
								children: [/* @__PURE__ */ jsx(Phone, {
									size: 16,
									color: "var(--accent-lime)"
								}), " +94 74 072 1152"]
							}),
							/* @__PURE__ */ jsxs("li", {
								className: Footer_module_default.contactInfoItem,
								children: [/* @__PURE__ */ jsx(Mail, {
									size: 16,
									color: "var(--accent-lime)"
								}), " rajininirmali99@gmail.com"]
							}),
							/* @__PURE__ */ jsxs("li", {
								className: Footer_module_default.contactInfoItem,
								children: [/* @__PURE__ */ jsx(MapPin, {
									size: 16,
									color: "var(--accent-lime)"
								}), " No 33, Galle Road, Colombo"]
							}),
							/* @__PURE__ */ jsx("li", {
								style: { marginTop: "8px" },
								children: /* @__PURE__ */ jsxs("a", {
									href: "https://wa.me/94740721152",
									target: "_blank",
									rel: "noopener noreferrer",
									className: Footer_module_default.backToTopBtn,
									children: [/* @__PURE__ */ jsx(MessageCircle, { size: 14 }), " WhatsApp Direct"]
								})
							})
						]
					})] })
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: Footer_module_default.bottomBar,
				children: [/* @__PURE__ */ jsx("div", { children: "© 2026 Nirmali L.P.R.N. Ranawaka. All Rights Reserved. Designed with spatial precision." }), /* @__PURE__ */ jsxs("button", {
					className: Footer_module_default.backToTopBtn,
					onClick: handleScrollTop,
					children: ["Back To Top ", /* @__PURE__ */ jsx(ArrowUp, { size: 16 })]
				})]
			})]
		})
	});
}
//#endregion
//#region src/App.jsx
var Global3DBackground = lazy(() => import("./assets/Global3DBackground-zGG2zkCg.js").then((m) => ({ default: m.Global3DBackground })));
var CVModal = lazy(() => import("./assets/CVModal-Cw1138Ec.js").then((m) => ({ default: m.CVModal })));
var SECTION_META = {
	home: {
		title: "Nirmali L.P.R.N. Ranawaka | 3D Digital Fashion Architect",
		description: "Official portfolio & 3D digital couture studio of Nirmali Ranawaka. Specializing in CLO 3D, Marvelous Designer, and Unreal Engine 5 virtual runways."
	},
	about: {
		title: "Nirmali Ranawaka | Studio Vision & Manifesto — 3D Fashion",
		description: "Exploring digital garments as architectural forms in virtual spaces—unconstrained by physical gravity or raw material yield."
	},
	education: {
		title: "Nirmali Ranawaka | Academic Pedigree & Credentials",
		description: "Central Saint Martins and Parsons School of Design pedigree. Specializing in parametric pattern drafting, zero-gravity cloth dynamics, and digital textiles."
	},
	portfolio: {
		title: "Nirmali Ranawaka | Selected Works — 3D Digital Fashion",
		description: "A curated archive of commercial, spatial, and conceptual 3D digital couture, metahuman AR garments, and Unreal Engine 5 virtual runways."
	},
	services: {
		title: "Nirmali Ranawaka | Specialized 3D Design Services",
		description: "Bespoke 3D digital fashion solutions for luxury couture brands, spatial game studios, and metaverse fashion week producers."
	},
	skills: {
		title: "Nirmali Ranawaka | Technical Proficiency & 3D Matrix",
		description: "Quantifying 3D fashion engineering expertise across CLO 3D, Marvelous Designer, Unreal Engine 5, Substance 3D, and Houdini Vellum."
	},
	experience: {
		title: "Nirmali Ranawaka | Career Chronicle & Experience",
		description: "Over 8+ years of experience leading 3D fashion architecture, parametric pattern drafting, and spatial runway direction for luxury fashion houses."
	},
	references: {
		title: "Nirmali Ranawaka | Industry Endorsements & References",
		description: "Endorsements and recommendations from creative directors and heads of digital apparel across Paris and international 3D fashion studios."
	},
	contact: {
		title: "Nirmali Ranawaka | Contact & 3D Commissions",
		description: "Direct WhatsApp, email, and commission inquiry portal for Lead 3D Digital Fashion Architect Nirmali L.P.R.N. Ranawaka."
	}
};
function App() {
	const [isCvModalOpen, setIsCvModalOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	React.useEffect(() => {
		setIsMounted(true);
	}, []);
	const { activeSection, scrollToSection } = useScrollSpy([
		"home",
		"about",
		"education",
		"portfolio",
		"services",
		"skills",
		"experience",
		"references",
		"contact"
	], 120);
	const handleOpenCvModal = () => setIsCvModalOpen(true);
	const handleCloseCvModal = () => setIsCvModalOpen(false);
	const currentMeta = SECTION_META[activeSection] || SECTION_META.home;
	return /* @__PURE__ */ jsxs("div", {
		className: "app-main-wrapper",
		children: [
			/* @__PURE__ */ jsxs(Helmet, { children: [
				/* @__PURE__ */ jsx("title", { children: currentMeta.title }),
				/* @__PURE__ */ jsx("meta", {
					name: "description",
					content: currentMeta.description
				}),
				/* @__PURE__ */ jsx("meta", {
					property: "og:title",
					content: currentMeta.title
				}),
				/* @__PURE__ */ jsx("meta", {
					property: "og:description",
					content: currentMeta.description
				})
			] }),
			isMounted && /* @__PURE__ */ jsx(Suspense, {
				fallback: null,
				children: /* @__PURE__ */ jsx(Global3DBackground, {})
			}),
			/* @__PURE__ */ jsx(Navbar, {
				activeSection,
				scrollToSection,
				onOpenCvModal: handleOpenCvModal
			}),
			/* @__PURE__ */ jsx(Hero, {
				scrollToSection,
				onOpenCvModal: handleOpenCvModal
			}),
			/* @__PURE__ */ jsx(About, {}),
			/* @__PURE__ */ jsx(Education, {}),
			/* @__PURE__ */ jsx(Portfolio, {}),
			/* @__PURE__ */ jsx(Services, {}),
			/* @__PURE__ */ jsx(Skills, {}),
			/* @__PURE__ */ jsx(Experience, {}),
			/* @__PURE__ */ jsx(References, {}),
			/* @__PURE__ */ jsx(Contact, {}),
			/* @__PURE__ */ jsx(Footer, { scrollToSection }),
			isMounted && /* @__PURE__ */ jsx(Suspense, {
				fallback: null,
				children: isCvModalOpen && /* @__PURE__ */ jsx(CVModal, {
					isOpen: isCvModalOpen,
					onClose: handleCloseCvModal
				})
			})
		]
	});
}
//#endregion
//#region src/entry-server.jsx
function render() {
	const helmetContext = {};
	return {
		html: renderToString(/* @__PURE__ */ jsx(HelmetProvider, {
			context: helmetContext,
			children: /* @__PURE__ */ jsx(App, {})
		})),
		helmetContext
	};
}
//#endregion
export { handleViewCV as n, render, handleDownloadCV as t };
