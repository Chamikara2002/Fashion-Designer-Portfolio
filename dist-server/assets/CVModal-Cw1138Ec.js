import { n as handleViewCV, t as handleDownloadCV } from "../entry-server.js";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Briefcase, Check, Copy, Download, ExternalLink, FileText, GraduationCap, Mail, MapPin, Phone, Sparkles, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var CVModal_module_default = {
	modalOverlay: "_modalOverlay_3ilsz_2",
	modalCard: "_modalCard_3ilsz_18",
	modalHeader: "_modalHeader_3ilsz_34",
	headerTopRow: "_headerTopRow_3ilsz_44",
	headerTitleBox: "_headerTitleBox_3ilsz_52",
	iconCircle: "_iconCircle_3ilsz_60",
	titleTextGroup: "_titleTextGroup_3ilsz_73",
	titleWithBadge: "_titleWithBadge_3ilsz_80",
	cvTitle: "_cvTitle_3ilsz_87",
	statusBadge: "_statusBadge_3ilsz_98",
	statusDot: "_statusDot_3ilsz_114",
	pulseDot: "_pulseDot_3ilsz_1",
	cvSubtitle: "_cvSubtitle_3ilsz_129",
	closeBtn: "_closeBtn_3ilsz_139",
	headerControls: "_headerControls_3ilsz_161",
	tabGroup: "_tabGroup_3ilsz_169",
	tabBtn: "_tabBtn_3ilsz_177",
	tabIcon: "_tabIcon_3ilsz_197",
	activeTab: "_activeTab_3ilsz_201",
	actionButtonsGroup: "_actionButtonsGroup_3ilsz_208",
	downloadHeaderBtn: "_downloadHeaderBtn_3ilsz_214",
	driveHeaderBtn: "_driveHeaderBtn_3ilsz_241",
	modalBody: "_modalBody_3ilsz_268",
	pdfWrapper: "_pdfWrapper_3ilsz_277",
	pdfHeaderInfoBar: "_pdfHeaderInfoBar_3ilsz_284",
	pdfMetaLeft: "_pdfMetaLeft_3ilsz_295",
	pdfFileIcon: "_pdfFileIcon_3ilsz_302",
	pdfFileName: "_pdfFileName_3ilsz_315",
	pdfFileSub: "_pdfFileSub_3ilsz_326",
	pdfMetaActions: "_pdfMetaActions_3ilsz_333",
	pdfBarBtnPrimary: "_pdfBarBtnPrimary_3ilsz_339",
	pdfBarBtnSecondary: "_pdfBarBtnSecondary_3ilsz_354",
	iframeContainer: "_iframeContainer_3ilsz_369",
	pdfFrame: "_pdfFrame_3ilsz_376",
	digitalCvContainer: "_digitalCvContainer_3ilsz_386",
	cvHeaderBlock: "_cvHeaderBlock_3ilsz_392",
	cvName: "_cvName_3ilsz_399",
	cvRole: "_cvRole_3ilsz_409",
	cvContactRow: "_cvContactRow_3ilsz_418",
	contactBadge: "_contactBadge_3ilsz_425",
	contactBadgeStatic: "_contactBadgeStatic_3ilsz_447",
	badgeIcon: "_badgeIcon_3ilsz_460",
	copyIcon: "_copyIcon_3ilsz_465",
	copyCheck: "_copyCheck_3ilsz_465",
	cvSectionBlock: "_cvSectionBlock_3ilsz_475",
	cvSectionTitle: "_cvSectionTitle_3ilsz_480",
	cvText: "_cvText_3ilsz_493",
	cvList: "_cvList_3ilsz_500",
	cvListItem: "_cvListItem_3ilsz_509",
	bulletDot: "_bulletDot_3ilsz_518",
	expList: "_expList_3ilsz_528",
	expItem: "_expItem_3ilsz_534",
	expHeader: "_expHeader_3ilsz_543",
	expCompany: "_expCompany_3ilsz_554",
	expDate: "_expDate_3ilsz_559",
	expTitle: "_expTitle_3ilsz_563",
	eduList: "_eduList_3ilsz_570",
	eduItem: "_eduItem_3ilsz_576",
	eduSchool: "_eduSchool_3ilsz_586",
	referencesGrid: "_referencesGrid_3ilsz_591",
	refCard: "_refCard_3ilsz_597",
	refName: "_refName_3ilsz_604",
	refRole: "_refRole_3ilsz_610"
};
//#endregion
//#region src/components/CVModal/CVModal.jsx
function CVModal({ isOpen, onClose }) {
	const [activeTab, setActiveTab] = useState("digital");
	const [copiedField, setCopiedField] = useState(null);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			document.body.style.overflow = "unset";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);
	const handleCopy = (text, fieldName) => {
		navigator.clipboard.writeText(text);
		setCopiedField(fieldName);
		setTimeout(() => setCopiedField(null), 2e3);
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx("div", {
		className: CVModal_module_default.modalOverlay,
		onClick: onClose,
		children: /* @__PURE__ */ jsxs(motion.div, {
			className: CVModal_module_default.modalCard,
			onClick: (e) => e.stopPropagation(),
			initial: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			transition: {
				type: "spring",
				damping: 26,
				stiffness: 320
			},
			children: [/* @__PURE__ */ jsxs("div", {
				className: CVModal_module_default.modalHeader,
				children: [/* @__PURE__ */ jsxs("div", {
					className: CVModal_module_default.headerTopRow,
					children: [/* @__PURE__ */ jsxs("div", {
						className: CVModal_module_default.headerTitleBox,
						children: [/* @__PURE__ */ jsx("div", {
							className: CVModal_module_default.iconCircle,
							children: /* @__PURE__ */ jsx(FileText, { size: 18 })
						}), /* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.titleTextGroup,
							children: [/* @__PURE__ */ jsxs("div", {
								className: CVModal_module_default.titleWithBadge,
								children: [/* @__PURE__ */ jsx("h3", {
									className: CVModal_module_default.cvTitle,
									children: "Nirmali L.P.R.N. Ranawaka"
								}), /* @__PURE__ */ jsxs("span", {
									className: CVModal_module_default.statusBadge,
									children: [/* @__PURE__ */ jsx("span", { className: CVModal_module_default.statusDot }), " OFFICIAL CV"]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: CVModal_module_default.cvSubtitle,
								children: "3D DIGITAL FASHION ARCHITECT & SPATIAL DESIGNER"
							})]
						})]
					}), /* @__PURE__ */ jsx("button", {
						className: CVModal_module_default.closeBtn,
						onClick: onClose,
						"aria-label": "Close Modal",
						children: /* @__PURE__ */ jsx(X, { size: 18 })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: CVModal_module_default.headerControls,
					children: [/* @__PURE__ */ jsxs("div", {
						className: CVModal_module_default.tabGroup,
						role: "tablist",
						"aria-label": "CV View Options",
						children: [/* @__PURE__ */ jsxs("button", {
							role: "tab",
							"aria-selected": activeTab === "digital",
							className: `${CVModal_module_default.tabBtn} ${activeTab === "digital" ? CVModal_module_default.activeTab : ""}`,
							onClick: () => setActiveTab("digital"),
							children: [/* @__PURE__ */ jsx(Sparkles, {
								size: 14,
								className: CVModal_module_default.tabIcon
							}), /* @__PURE__ */ jsx("span", { children: "Digital Resume" })]
						}), /* @__PURE__ */ jsxs("button", {
							role: "tab",
							"aria-selected": activeTab === "pdf",
							className: `${CVModal_module_default.tabBtn} ${activeTab === "pdf" ? CVModal_module_default.activeTab : ""}`,
							onClick: () => setActiveTab("pdf"),
							children: [/* @__PURE__ */ jsx(FileText, {
								size: 14,
								className: CVModal_module_default.tabIcon
							}), /* @__PURE__ */ jsx("span", { children: "PDF Document" })]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: CVModal_module_default.actionButtonsGroup,
						children: [/* @__PURE__ */ jsxs("button", {
							className: CVModal_module_default.downloadHeaderBtn,
							onClick: handleDownloadCV,
							title: "Download Vector PDF CV",
							children: [/* @__PURE__ */ jsx(Download, { size: 14 }), /* @__PURE__ */ jsx("span", { children: "Download PDF" })]
						}), /* @__PURE__ */ jsxs("button", {
							className: CVModal_module_default.driveHeaderBtn,
							onClick: handleViewCV,
							title: "Open PDF in Google Drive",
							children: [/* @__PURE__ */ jsx(ExternalLink, { size: 14 }), /* @__PURE__ */ jsx("span", { children: "Google Drive" })]
						})]
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: CVModal_module_default.modalBody,
				children: activeTab === "pdf" ? /* @__PURE__ */ jsxs("div", {
					className: CVModal_module_default.pdfWrapper,
					children: [/* @__PURE__ */ jsxs("div", {
						className: CVModal_module_default.pdfHeaderInfoBar,
						children: [/* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.pdfMetaLeft,
							children: [/* @__PURE__ */ jsx("div", {
								className: CVModal_module_default.pdfFileIcon,
								children: /* @__PURE__ */ jsx(FileText, { size: 18 })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: CVModal_module_default.pdfFileName,
								children: "Nirmali_LPRN_Ranawaka_CV.pdf"
							}), /* @__PURE__ */ jsx("p", {
								className: CVModal_module_default.pdfFileSub,
								children: "Vector Format • High-Resolution Print Ready • 1.2 MB"
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.pdfMetaActions,
							children: [/* @__PURE__ */ jsxs("button", {
								className: CVModal_module_default.pdfBarBtnPrimary,
								onClick: handleDownloadCV,
								children: [/* @__PURE__ */ jsx(Download, { size: 13 }), " Download"]
							}), /* @__PURE__ */ jsxs("button", {
								className: CVModal_module_default.pdfBarBtnSecondary,
								onClick: handleViewCV,
								children: [/* @__PURE__ */ jsx(ExternalLink, { size: 13 }), " Open Drive"]
							})]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: CVModal_module_default.iframeContainer,
						children: /* @__PURE__ */ jsx("iframe", {
							src: "/assets/Nirmali_LPRN_Ranawaka_CV.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH",
							className: CVModal_module_default.pdfFrame,
							title: "Nirmali L.P.R.N. Ranawaka Official CV PDF"
						})
					})]
				}) : /* @__PURE__ */ jsxs("div", {
					className: CVModal_module_default.digitalCvContainer,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.cvHeaderBlock,
							children: [
								/* @__PURE__ */ jsx("h1", {
									className: CVModal_module_default.cvName,
									children: "NIRMALI L.P.R.N. RANAWAKA"
								}),
								/* @__PURE__ */ jsx("div", {
									className: CVModal_module_default.cvRole,
									children: "Lead 3D Digital Fashion Architect & Spatial Designer"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: CVModal_module_default.cvContactRow,
									children: [
										/* @__PURE__ */ jsxs("button", {
											className: CVModal_module_default.contactBadge,
											onClick: () => handleCopy("rajininirmali99@gmail.com", "email"),
											title: "Click to copy email address",
											children: [
												/* @__PURE__ */ jsx(Mail, {
													size: 14,
													className: CVModal_module_default.badgeIcon
												}),
												/* @__PURE__ */ jsx("span", { children: "rajininirmali99@gmail.com" }),
												copiedField === "email" ? /* @__PURE__ */ jsx(Check, {
													size: 12,
													className: CVModal_module_default.copyCheck
												}) : /* @__PURE__ */ jsx(Copy, {
													size: 12,
													className: CVModal_module_default.copyIcon
												})
											]
										}),
										/* @__PURE__ */ jsxs("button", {
											className: CVModal_module_default.contactBadge,
											onClick: () => handleCopy("+94 74 072 1152", "phone"),
											title: "Click to copy phone number",
											children: [
												/* @__PURE__ */ jsx(Phone, {
													size: 14,
													className: CVModal_module_default.badgeIcon
												}),
												/* @__PURE__ */ jsx("span", { children: "+94 74 072 1152" }),
												copiedField === "phone" ? /* @__PURE__ */ jsx(Check, {
													size: 12,
													className: CVModal_module_default.copyCheck
												}) : /* @__PURE__ */ jsx(Copy, {
													size: 12,
													className: CVModal_module_default.copyIcon
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: CVModal_module_default.contactBadgeStatic,
											children: [/* @__PURE__ */ jsx(MapPin, {
												size: 14,
												className: CVModal_module_default.badgeIcon
											}), /* @__PURE__ */ jsx("span", { children: "Colombo, Sri Lanka" })]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.cvSectionBlock,
							children: [/* @__PURE__ */ jsxs("h4", {
								className: CVModal_module_default.cvSectionTitle,
								children: [/* @__PURE__ */ jsx(Sparkles, { size: 15 }), " // PROFILE & VISION"]
							}), /* @__PURE__ */ jsx("p", {
								className: CVModal_module_default.cvText,
								children: "Sculpting digital garments in the negative space. Bridging the gap between high-fashion editorial aesthetics, parametric cloth simulation, and spatial Web3 environments. Over 8+ years of experience pioneering zero-gravity digital draping, procedural textile shaders, and spatial virtual runways for luxury fashion houses."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.cvSectionBlock,
							children: [/* @__PURE__ */ jsxs("h4", {
								className: CVModal_module_default.cvSectionTitle,
								children: [/* @__PURE__ */ jsx(Award, { size: 15 }), " // TECHNICAL COMPETENCIES"]
							}), /* @__PURE__ */ jsxs("ul", {
								className: CVModal_module_default.cvList,
								children: [
									/* @__PURE__ */ jsxs("li", {
										className: CVModal_module_default.cvListItem,
										children: [/* @__PURE__ */ jsx("span", { className: CVModal_module_default.bulletDot }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "CLO 3D & Marvelous Designer (98%):" }), " Pattern drafting, fluid dynamics simulation, PBR texture mapping, avatar rigging."] })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: CVModal_module_default.cvListItem,
										children: [/* @__PURE__ */ jsx("span", { className: CVModal_module_default.bulletDot }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Unreal Engine 5 (92%):" }), " Lumen real-time lighting, Nanite high-poly geometry, MetaHuman Animator, Control Rig."] })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: CVModal_module_default.cvListItem,
										children: [/* @__PURE__ */ jsx("span", { className: CVModal_module_default.bulletDot }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Substance 3D & Houdini Vellum (88%):" }), " Procedural PBR materials, Vellum zero-gravity cloth physics, bioluminescent shaders."] })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: CVModal_module_default.cvListItem,
										children: [/* @__PURE__ */ jsx("span", { className: CVModal_module_default.bulletDot }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Production Tech Packs (95%):" }), " DXF 2D pattern grading, measurement specifications, manufacturing tech packs."] })]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.cvSectionBlock,
							children: [/* @__PURE__ */ jsxs("h4", {
								className: CVModal_module_default.cvSectionTitle,
								children: [/* @__PURE__ */ jsx(Briefcase, { size: 15 }), " // SELECTED EXPERIENCE"]
							}), /* @__PURE__ */ jsxs("div", {
								className: CVModal_module_default.expList,
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: CVModal_module_default.expItem,
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: CVModal_module_default.expHeader,
												children: [/* @__PURE__ */ jsx("span", {
													className: CVModal_module_default.expCompany,
													children: "MAISON VIRTUELLE PARIS"
												}), /* @__PURE__ */ jsx("span", {
													className: CVModal_module_default.expDate,
													children: "2021 - PRESENT"
												})]
											}),
											/* @__PURE__ */ jsx("h5", {
												className: CVModal_module_default.expTitle,
												children: "Lead 3D Fashion Architect"
											}),
											/* @__PURE__ */ jsx("p", {
												className: CVModal_module_default.cvText,
												children: "Spearheaded parametric 3D modeling into haute couture workflows. Orchestrated digital twin creation for 200+ archival garments and reduced prototyping waste by 64%."
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: CVModal_module_default.expItem,
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: CVModal_module_default.expHeader,
												children: [/* @__PURE__ */ jsx("span", {
													className: CVModal_module_default.expCompany,
													children: "ATELIER NOIR"
												}), /* @__PURE__ */ jsx("span", {
													className: CVModal_module_default.expDate,
													children: "2018 - 2021"
												})]
											}),
											/* @__PURE__ */ jsx("h5", {
												className: CVModal_module_default.expTitle,
												children: "Senior Pattern Drafter & 3D Specialist"
											}),
											/* @__PURE__ */ jsx("p", {
												className: CVModal_module_default.cvText,
												children: "Lead pattern drafter for award-winning Monolith FW collection. Implemented 3D quality control standards for bespoke orders."
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: CVModal_module_default.expItem,
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: CVModal_module_default.expHeader,
												children: [/* @__PURE__ */ jsx("span", {
													className: CVModal_module_default.expCompany,
													children: "SYNDICATE FORM"
												}), /* @__PURE__ */ jsx("span", {
													className: CVModal_module_default.expDate,
													children: "2015 - 2018"
												})]
											}),
											/* @__PURE__ */ jsx("h5", {
												className: CVModal_module_default.expTitle,
												children: "Technical Garment Designer"
											}),
											/* @__PURE__ */ jsx("p", {
												className: CVModal_module_default.cvText,
												children: "Authored 100+ production tech packs with DXF pattern integration. Optimized fabric marker yield by 14% using algorithmic nesting."
											})
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.cvSectionBlock,
							children: [/* @__PURE__ */ jsxs("h4", {
								className: CVModal_module_default.cvSectionTitle,
								children: [/* @__PURE__ */ jsx(GraduationCap, { size: 15 }), " // ACADEMIC PEDIGREE"]
							}), /* @__PURE__ */ jsxs("div", {
								className: CVModal_module_default.eduList,
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: CVModal_module_default.eduItem,
										children: [/* @__PURE__ */ jsx("strong", {
											className: CVModal_module_default.eduSchool,
											children: "Parsons School of Design (New York)"
										}), " — MFA Textiles & Spatial Apparel (2021 - 2023)"]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: CVModal_module_default.eduItem,
										children: [/* @__PURE__ */ jsx("strong", {
											className: CVModal_module_default.eduSchool,
											children: "Central Saint Martins (London)"
										}), " — BA (Hons) Fashion Design & Digital Textiles (First Class) (2019 - 2021)"]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: CVModal_module_default.eduItem,
										children: [/* @__PURE__ */ jsx("strong", {
											className: CVModal_module_default.eduSchool,
											children: "Certified Master 3D Specialist"
										}), " — CLO 3D & Marvelous Designer Master Accreditation"]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: CVModal_module_default.cvSectionBlock,
							children: [/* @__PURE__ */ jsxs("h4", {
								className: CVModal_module_default.cvSectionTitle,
								children: [/* @__PURE__ */ jsx(FileText, { size: 15 }), " // INDUSTRY REFERENCES"]
							}), /* @__PURE__ */ jsxs("div", {
								className: CVModal_module_default.referencesGrid,
								children: [/* @__PURE__ */ jsxs("div", {
									className: CVModal_module_default.refCard,
									children: [/* @__PURE__ */ jsx("strong", {
										className: CVModal_module_default.refName,
										children: "Nicolas V. Rose"
									}), /* @__PURE__ */ jsx("div", {
										className: CVModal_module_default.refRole,
										children: "Creative Director @ Maison Virtuelle Paris"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: CVModal_module_default.refCard,
									children: [/* @__PURE__ */ jsx("strong", {
										className: CVModal_module_default.refName,
										children: "Sophia Laurent"
									}), /* @__PURE__ */ jsx("div", {
										className: CVModal_module_default.refRole,
										children: "Head of Digital Apparel @ Atelier Noir"
									})]
								})]
							})]
						})
					]
				})
			})]
		})
	}) });
}
//#endregion
export { CVModal };
