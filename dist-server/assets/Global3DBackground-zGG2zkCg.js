import React, { useEffect, useMemo, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
var Global3DBackground_module_default = {
	globalBgContainer: "_globalBgContainer_1gts9_1",
	canvasElement: "_canvasElement_1gts9_14"
};
//#endregion
//#region src/components/3D/Global3DBackground.jsx
/**
* Interactive 3D Particle Constellation / Nodes & Connections Canvas Network
* Matches exact style of reference image with gold, cyan, and neon-lime node accents.
* Transparent canvas layer preserving existing site background color.
*/
function ConstellationNetwork3D({ count = 115, maxDistance = 3.3 }) {
	const pointsRef = useRef();
	const linesRef = useRef();
	const { viewport } = useThree();
	const mousePos = useRef(new THREE.Vector3(0, 0, 0));
	useEffect(() => {
		const handleMouseMove = (e) => {
			mousePos.current.x = (e.clientX / window.innerWidth - .5) * viewport.width * .9;
			mousePos.current.y = -(e.clientY / window.innerHeight - .5) * viewport.height * .9;
		};
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [viewport]);
	const [positions, velocities, colors] = useMemo(() => {
		const pos = new Float32Array(count * 3);
		const vel = new Float32Array(count * 3);
		const col = new Float32Array(count * 3);
		const palette = [
			new THREE.Color("#ffc83b"),
			new THREE.Color("#00f0ff"),
			new THREE.Color("#ccff00")
		];
		for (let i = 0; i < count; i++) {
			pos[i * 3] = (Math.random() - .5) * 22;
			pos[i * 3 + 1] = (Math.random() - .5) * 18;
			pos[i * 3 + 2] = (Math.random() - .5) * 10;
			vel[i * 3] = (Math.random() - .5) * .008;
			vel[i * 3 + 1] = (Math.random() - .5) * .008;
			vel[i * 3 + 2] = (Math.random() - .5) * .005;
			const chosen = palette[Math.floor(Math.random() * palette.length)];
			col[i * 3] = chosen.r;
			col[i * 3 + 1] = chosen.g;
			col[i * 3 + 2] = chosen.b;
		}
		return [
			pos,
			vel,
			col
		];
	}, [count]);
	const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);
	const lineColors = useMemo(() => new Float32Array(count * count * 6), [count]);
	useFrame((state) => {
		if (!pointsRef.current || !linesRef.current) return;
		const time = state.clock.getElapsedTime();
		const pGeo = pointsRef.current.geometry;
		const lGeo = linesRef.current.geometry;
		const posArr = pGeo.attributes.position.array;
		let lineVertexCount = 0;
		const targetMX = mousePos.current.x;
		const targetMY = mousePos.current.y;
		for (let i = 0; i < count; i++) {
			const px = posArr[i * 3];
			const py = posArr[i * 3 + 1];
			const dx = targetMX - px;
			const dy = targetMY - py;
			const distToMouse = Math.sqrt(dx * dx + dy * dy);
			if (distToMouse < 4.2 && distToMouse > .1) {
				const force = (1 - distToMouse / 4.2) * .0025;
				velocities[i * 3] += dx * force;
				velocities[i * 3 + 1] += dy * force;
			}
			velocities[i * 3] *= .988;
			velocities[i * 3 + 1] *= .988;
			velocities[i * 3 + 2] *= .988;
			posArr[i * 3] += velocities[i * 3];
			posArr[i * 3 + 1] += velocities[i * 3 + 1];
			posArr[i * 3 + 2] += velocities[i * 3 + 2];
			if (Math.abs(posArr[i * 3]) > 11) velocities[i * 3] *= -1;
			if (Math.abs(posArr[i * 3 + 1]) > 9) velocities[i * 3 + 1] *= -1;
			if (Math.abs(posArr[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
		}
		pGeo.attributes.position.needsUpdate = true;
		const linePosArr = lGeo.attributes.position.array;
		const lineColArr = lGeo.attributes.color.array;
		for (let i = 0; i < count; i++) for (let j = i + 1; j < count; j++) {
			const dx = posArr[i * 3] - posArr[j * 3];
			const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
			const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
			if (Math.sqrt(dx * dx + dy * dy + dz * dz) < maxDistance) {
				linePosArr[lineVertexCount * 3] = posArr[i * 3];
				linePosArr[lineVertexCount * 3 + 1] = posArr[i * 3 + 1];
				linePosArr[lineVertexCount * 3 + 2] = posArr[i * 3 + 2];
				lineColArr[lineVertexCount * 3] = colors[i * 3];
				lineColArr[lineVertexCount * 3 + 1] = colors[i * 3 + 1];
				lineColArr[lineVertexCount * 3 + 2] = colors[i * 3 + 2];
				lineVertexCount++;
				linePosArr[lineVertexCount * 3] = posArr[j * 3];
				linePosArr[lineVertexCount * 3 + 1] = posArr[j * 3 + 1];
				linePosArr[lineVertexCount * 3 + 2] = posArr[j * 3 + 2];
				lineColArr[lineVertexCount * 3] = colors[j * 3];
				lineColArr[lineVertexCount * 3 + 1] = colors[j * 3 + 1];
				lineColArr[lineVertexCount * 3 + 2] = colors[j * 3 + 2];
				lineVertexCount++;
			}
		}
		lGeo.setDrawRange(0, lineVertexCount);
		lGeo.attributes.position.needsUpdate = true;
		lGeo.attributes.color.needsUpdate = true;
		pointsRef.current.rotation.y = time * .02 + targetMX * .015;
		pointsRef.current.rotation.x = targetMY * .015;
		linesRef.current.rotation.y = time * .02 + targetMX * .015;
		linesRef.current.rotation.x = targetMY * .015;
	});
	return /* @__PURE__ */ jsxs("group", { children: [
		/* @__PURE__ */ jsxs("points", {
			ref: pointsRef,
			children: [/* @__PURE__ */ jsxs("bufferGeometry", { children: [/* @__PURE__ */ jsx("bufferAttribute", {
				attach: "attributes-position",
				args: [positions, 3]
			}), /* @__PURE__ */ jsx("bufferAttribute", {
				attach: "attributes-color",
				args: [colors, 3]
			})] }), /* @__PURE__ */ jsx("pointsMaterial", {
				size: .14,
				vertexColors: true,
				transparent: true,
				opacity: .8,
				sizeAttenuation: true
			})]
		}),
		/* @__PURE__ */ jsxs("lineSegments", {
			ref: linesRef,
			children: [/* @__PURE__ */ jsxs("bufferGeometry", { children: [/* @__PURE__ */ jsx("bufferAttribute", {
				attach: "attributes-position",
				args: [linePositions, 3]
			}), /* @__PURE__ */ jsx("bufferAttribute", {
				attach: "attributes-color",
				args: [lineColors, 3]
			})] }), /* @__PURE__ */ jsx("lineBasicMaterial", {
				vertexColors: true,
				transparent: true,
				opacity: .18,
				linewidth: 1
			})]
		}),
		/* @__PURE__ */ jsx(Sparkles, {
			count: 50,
			scale: [
				16,
				16,
				16
			],
			size: 2.5,
			speed: .3,
			color: "#ffc83b",
			opacity: .4
		}),
		/* @__PURE__ */ jsx(Sparkles, {
			count: 35,
			scale: [
				14,
				14,
				14
			],
			size: 3,
			speed: .25,
			color: "#00f0ff",
			opacity: .35
		})
	] });
}
function Global3DBackground() {
	const [isMounted, setIsMounted] = React.useState(false);
	React.useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return /* @__PURE__ */ jsx("div", { className: Global3DBackground_module_default.globalBgContainer });
	return /* @__PURE__ */ jsx("div", {
		className: Global3DBackground_module_default.globalBgContainer,
		children: /* @__PURE__ */ jsxs(Canvas, {
			className: Global3DBackground_module_default.canvasElement,
			camera: {
				position: [
					0,
					0,
					8.5
				],
				fov: 50
			},
			dpr: [1, 1.5],
			gl: {
				antialias: true,
				alpha: true
			},
			children: [
				/* @__PURE__ */ jsx("ambientLight", { intensity: .5 }),
				/* @__PURE__ */ jsx("pointLight", {
					position: [
						10,
						10,
						10
					],
					intensity: 1,
					color: "#ffc83b"
				}),
				/* @__PURE__ */ jsx("pointLight", {
					position: [
						-10,
						-10,
						-10
					],
					intensity: .8,
					color: "#00f0ff"
				}),
				/* @__PURE__ */ jsx(ConstellationNetwork3D, {
					count: 115,
					maxDistance: 3.3
				})
			]
		})
	});
}
//#endregion
export { Global3DBackground, Global3DBackground as default };
