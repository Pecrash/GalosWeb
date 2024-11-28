"use client";

import styles from "@/scss/app.module.scss";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import Photos from "./Photos";
import Link from "next/link";
import imagesRoutes from "./sectionsInfo.json";
import Details from "./Details";

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

export default function Fotografias() {
	const container = useRef();
	const [section, setSection] = useState(0);
	/* let index = 0, */
	let animating;

	// GSAP animation

	// VAMOS A INTENTAR CAMBIAR LAS CLASES PONIENDO DISPLAY NONE
	// HAY QUE INTENTAR HACER FUNCIONAR EL OBSERVER
	useGSAP(
		(context, contextSafe) => {
			// SECTIONS animation
			let currentIndex = -1;
			const sections = gsap.utils.toArray(".section");
			let clamp = gsap.utils.clamp(0, sections.length - 1);

			const tl = gsap.timeline({
				defaults: { duration: 0.6 },
				onComplete: () => (animating = false),
			});

			const next = (index, value) => {
				index = clamp(index);
				animating = true;

				if (value === 1) {
					index < 4
						? tl
								.set(sections[index], { display: "flex" })
								.to(sections[index], { opacity: 1 })
								.set(sections[currentIndex], { display: "none" })
						: tl
								.set(sections[index], { display: "flex" })
								.to(sections[index], { opacity: 1 });
				} else if (value === 0) {
					tl.set(sections[index], { display: "flex" })
						.to(sections[currentIndex], { opacity: 0 })
						.set(sections[currentIndex], { display: "none" });
				}

				setSection(index);
				currentIndex = index;

				console.log("Index: " + currentIndex);
				console.log("value: " + value);
			};

			Observer.create({
				target: window,
				type: "wheel,touch",
				onDown: () => !animating && next(currentIndex - 1, 0),
				onUp: () => !animating && next(currentIndex + 1, 1),
				onLeft: () => !animating && next(currentIndex + 1, 1),
				onRight: () => !animating && next(currentIndex - 1, 0),
				tolerance: 10,
				preventDefault: true,
				wheelSpeed: -1,
			});
		},
		{ scope: container }
	);

	return (
		<>
			<main className={styles.container} ref={container}>
				<Details section={section} />
				<section className={`${styles.frontPage} frontPage section`}>
					<h1>CONSTRUIMOS NARRATIVAS PODEROSAS QUE CONECTEN CON TU AUDIENCIA</h1>
				</section>
				<button
					onClick={() => {
						console.log(section);
					}}
					style={{
						position: "absolute",
						zIndex: "6",
						background: "red",
						width: "100px",
						height: "100px",
					}}
				></button>
				{/* FIRST SECION */}
				<section className={`${styles.section} section`}>
					<Photos
						className={`${styles.slider} slider`}
						firstImages={imagesRoutes.eventos}
						secondImages={imagesRoutes.eventos2}
						width={"4315px"}
						duration={4315 / 120}
					/>
				</section>

				{/* SECOND SECTION */}
				<section className={`${styles.section} section`}>
					<Photos
						firstImages={imagesRoutes.moda}
						secondImages={imagesRoutes.moda2}
						width={"4615px"}
						duration={4615 / 60}
					/>
				</section>

				{/* THIRD SECTION */}
				<section className={`${styles.section} section`}>
					<Photos
						firstImages={imagesRoutes.naturaleza}
						secondImages={imagesRoutes.naturaleza2}
						width={"1570px"}
						duration={1570 / 60}
					/>
				</section>

				{/* FOURTH SECTION */}
				<section className={`${styles.section} three section`}>
					<Photos
						firstImages={imagesRoutes.productos}
						secondImages={imagesRoutes.productos2}
						width={"1570px"}
						duration={1570 / 60}
					/>
				</section>
			</main>
		</>
	);
}
