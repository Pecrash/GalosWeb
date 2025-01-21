"use client";

import styles from "@/scss/app.module.scss";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP, Observer);

export default function Videos(params) {
	// GSAP animations

	const videoInfo = {
		one: {
			title: "A NADIE LE COPIO - 'EL TIGRE DEL PUEBLO'",
			description:
				"Lorem ipsum dolor sit amet consectetur. Vitae etiam tincidunt a feugiat facilisi est sit nisl in. Gravida aliquet tellus sed nibh euismod vitae dui. Libero sed amet ut quisque tortor adipiscing non. Etiam faucibus adipiscing et lobortis libero enim massa semper.",
			datos: {
				one: "datos técnicos o información adicional del proyecto",
				two: "datos técnicos o información adicional del proyecto",
			},
		},

		two: {
			title: "VESTIGIOS - ECOS",
			description:
				"Lorem ipsum dolor sit amet consectetur. Vitae etiam tincidunt a feugiat facilisi est sit nisl in. Gravida aliquet tellus sed nibh euismod vitae dui. Libero sed amet ut quisque tortor adipiscing non. Etiam faucibus adipiscing et lobortis libero enim massa semper.",
			datos: {
				one: "datos técnicos o información adicional del proyecto",
				two: "datos técnicos o información adicional del proyecto",
			},
		},

		three: {
			title: "ET TALKS - EPISODE #1",
			description:
				"Lorem ipsum dolor sit amet consectetur. Vitae etiam tincidunt a feugiat facilisi est sit nisl in. Gravida aliquet tellus sed nibh euismod vitae dui. Libero sed amet ut quisque tortor adipiscing non. Etiam faucibus adipiscing et lobortis libero enim massa semper.",
			datos: {
				one: "datos técnicos o información adicional del proyecto",
				two: "datos técnicos o información adicional del proyecto",
			},
		},

		four: {
			title: "Video cuatro",
			description:
				"Lorem ipsum dolor sit amet consectetur. Vitae etiam tincidunt a feugiat facilisi est sit nisl in. Gravida aliquet tellus sed nibh euismod vitae dui. Libero sed amet ut quisque tortor adipiscing non. Etiam faucibus adipiscing et lobortis libero enim massa semper.",
			datos: {
				one: "datos técnicos o información adicional del proyecto",
				two: "datos técnicos o información adicional del proyecto",
			},
		},

		five: {
			title: "Video cinco",
			description:
				"Lorem ipsum dolor sit amet consectetur. Vitae etiam tincidunt a feugiat facilisi est sit nisl in. Gravida aliquet tellus sed nibh euismod vitae dui. Libero sed amet ut quisque tortor adipiscing non. Etiam faucibus adipiscing et lobortis libero enim massa semper.",
			datos: {
				one: "datos técnicos o información adicional del proyecto",
				two: "datos técnicos o información adicional del proyecto",
			},
		},

		six: {
			title: "Video seis",
			description:
				"Lorem ipsum dolor sit amet consectetur. Vitae etiam tincidunt a feugiat facilisi est sit nisl in. Gravida aliquet tellus sed nibh euismod vitae dui. Libero sed amet ut quisque tortor adipiscing non. Etiam faucibus adipiscing et lobortis libero enim massa semper.",
			datos: {
				one: "datos técnicos o información adicional del proyecto",
				two: "datos técnicos o información adicional del proyecto",
			},
		},
	};

	const container = useRef();
	const sections = useRef();
	let clamp = useRef();
	let animating;

	useGSAP(
		(context, contextSafe) => {
			const tl = gsap.timeline({
				defaults: { duration: 0.6 },
				onComplete: () => (animating = false),
			});

			// Transición de cada una de las secciones al realizar scroll
			sections.current = gsap.utils.toArray(".section");
			clamp.current = gsap.utils.clamp(0, sections.current.length - 1);
			let currentIndex = 0;

			// value da la dirección del scroll
			const next = (index, value) => {
				index = clamp.current(index);
				animating = true;

				value === 1
					? tl
							.to(sections.current[index], { opacity: 1 })
							.set(sections.current[index], { pointerEvents: "auto" })
					: tl
							.to(sections.current[currentIndex], { opacity: currentIndex == 0 ? 1 : 0 })
							.set(sections.current[currentIndex], { pointerEvents: "none" });

				currentIndex = index;
				console.log("Index: " + currentIndex);
			};

			const sectionsObserver = Observer.create({
				target: window,
				type: "wheel,touch",
				onDown: () => !animating && next(currentIndex - 1, 0),
				onUp: () => !animating && next(currentIndex + 1, 1),
				tolerance: 10,
				preventDefault: true,
				wheelSpeed: -1,
			});
		},
		{ scope: container }
	);

	const youtubeVideos = {
		one: (
			<iframe
				width="100%"
				height="100%"
				src="https://www.youtube.com/embed/iy9tmxBvZGU?si=SezIh5-iu9WSjWsr"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		),
		two: (
			<iframe
				width="100%"
				height="100%"
				src="https://www.youtube.com/embed/rhAJf8ZHj_M?si=4-ZUM4I_o3nPECmJ"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		),
		three: (
			<iframe
				width="100%"
				height="100%"
				src="https://www.youtube.com/embed/W8-FFE6R-rM?si=JGM_ZxkxUs89R2Oc"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		),
	};

	const VideoSection = ({ title, description, datos, video }) => {
		return (
			<section className={`${styles.videoSection} section`}>
				<h2 className={`${styles.videoSection__title}`}>{title}</h2>
				<p className={`${styles.videoSection__description}`}>{description}</p>
				<ul className={`${styles.videoSection__list}`}>
					<li className={`${styles.videoSection__list_item}`}>{datos.one}</li>
					<li className={`${styles.videoSection__list_item}`}>{datos.two}</li>
				</ul>
				<div className={`${styles.videoSection__video}`}>{video}</div>
			</section>
		);
	};

	return (
		<>
			<main ref={container} className={`${styles.videosContainer}`}>
				<VideoSection
					title={videoInfo.one.title}
					description={videoInfo.one.description}
					datos={videoInfo.one.datos}
					video={youtubeVideos.one}
				/>
				<VideoSection
					title={videoInfo.two.title}
					description={videoInfo.two.description}
					datos={videoInfo.two.datos}
					video={youtubeVideos.two}
				/>
				<VideoSection
					title={videoInfo.three.title}
					description={videoInfo.three.description}
					datos={videoInfo.three.datos}
					video={youtubeVideos.three}
				/>
			</main>
		</>
	);
}
