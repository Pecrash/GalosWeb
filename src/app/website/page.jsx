"use client";

import styles from "@/scss/app.module.scss";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP, Observer);

export default function Website(params) {
	const arrow = useRef(),
		phone = useRef(),
		arrowRef = useRef(),
		phoneRef = useRef(),
		container = useRef(),
		sections = useRef();

	let clamp = useRef();
	let animating;

	const imageUrl = [
		{
			url: "/Images/web/barberShop.jpg",
		},
		{
			url: "/Images/web/hotel.jpg",
		},
		{
			url: "/Images/web/odontologia.jpg",
		},
		{
			url: "/Images/web/orange.jpg",
		},
	];

	useEffect(() => {
		// LOTTIE ANIMATION

		arrow.current = Lottie.loadAnimation({
			container: arrowRef.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			path: "/animations/Scroll.json",
		});

		phone.current = Lottie.loadAnimation({
			container: phoneRef.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			path: "/animations/responsive.json",
		});

		return () => {
			arrow.current.destroy();
			phone.current.destroy();
		};
	}, []);

	useGSAP(
		() => {
			gsap.to(".image", {
				opacity: 1,
				stagger: 2,
				repeat: -1,
				repeatDelay: 2,
			});

			// SECTIONS TRANSITION
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

	return (
		<>
			<main className={`${styles.websitesContainer}`} ref={container}>
				<section className={`${styles.websitesContainer__one} section`}>
					{imageUrl.map((item) => {
						return (
							<figure key={item.url} className={`${styles.websitesContainer__one_image} image`}>
								<Image fill src={item.url} />
							</figure>
						);
					})}
					<h2 className={`${styles.websitesContainer__one_title}`}>
						TODA GRAN MARCA DEBE TENER UN SITIO WEB A SU ALTURA
					</h2>
					<span className={`${styles.websitesContainer__one_span}`}>
						<p className={`${styles.websitesContainer__one_p}`}>Conoce más</p>
						<div
							className={`${styles.websitesContainer__one_arrow}`}
							ref={arrowRef}
						></div>
					</span>
				</section>
				<section className={`${styles.websitesContainer__two} section`}>
					<h2 className={`${styles.websitesContainer__two_title}`}>
						TU MARCA SIEMPRE PRESENTE EN CUALQUIER PANTALLA
					</h2>
					<div
						className={`${styles.websitesContainer__two_animation}`}
						ref={phoneRef}
					></div>
					<p className={`${styles.websitesContainer__two_p}`}>
						Tu presencia online no debe verse limitada por el tipo de dispositivo en el
						que te visualizan, un sitio web debe ser capaz de adaptarse fácilmente. El
						Responsive Design es más que una tendencia, es una necesidad en el mundo
						digital actual.{" "}
					</p>
				</section>
				<section className={`${styles.websitesContainer__three} section`}>
					<h2>CONOCE ALGUNOS DE NUESTROS PROYECTOS...</h2>
					<section>
						<article>
							<Image />
							<a href=""></a>
						</article>
						<article>
							<Image />
							<a href=""></a>
						</article>
						<article>
							<Image />
							<a href=""></a>
						</article>
					</section>
				</section>
				<section className={`${styles.websitesContainer__four} section`}>
					<h2>DE LA MANO CONTIGO PODEMOS CREAR EL SITIO WEB IDEAL</h2>
					<section>
						<article>
							<h3>Diseños enfocados en representarte</h3>
							<p></p>
						</article>
						<article>
							<h3>Diseños enfocados en representarte</h3>
							<p></p>
						</article>
						<article>
							<h3>Diseños enfocados en representarte</h3>
							<p></p>
						</article>
					</section>
				</section>
			</main>
		</>
	);
}
