"use client";

import Image from "next/image";
import styles from "../scss/app.module.scss";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-web";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/all";
import Typed from "typed.js";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, Observer);

export default function Home() {
	let animRef = useRef();
	let container = useRef();
	let type = useRef();

	// esta variable contiene las referencias de la lista de servicios
	let servicesRef = [];

	let services = [
		{ title: "servicio 1", description: "descripcion del servicio 1", id: 0 },
		{ title: "servicio 2", description: "descripcion del servicio 2", id: 1 },
		{ title: "servicio 3", description: "descripcion del servicio 3", id: 2 },
		{ title: "servicio 4", description: "descripcion del servicio 4", id: 3 },
	];

	let index = 0,
		animating,
		[active, setActive] = useState(0),
		valuesActive = 0;

	useEffect(() => {
		// se actualizan las referencias para poder acceder a ellas
		servicesRef = gsap.utils.toArray(".service");

		// LOTTIE ANIMATION

		const anim = Lottie.loadAnimation({
			container: animRef.current,
			renderer: "svg",
			loop: false,
			autoplay: true,
			path: "/animations/plant.json",
		});

		const typed = new Typed(type.current, {
			strings: [
				"Aqui habran un chingo de textos cambiando constantemente de manera cool^2000",
				"aqui tenemos otra frase para probar la funcionalidad^2000",
			],
			typeSpeed: 30,
			backSpeed: 10,
			loop: true,
			showCursor: false,
		});

		return () => {
			anim.destroy();
			typed.destroy();
		};
	}, []);

	// GSAP ANIMATIONS

	useGSAP(
		(context, contextSafe) => {
			// SECTIONS transition
			const sections = gsap.utils.toArray(".section");
			let clamp = gsap.utils.clamp(-1, sections.length - 1);
			let currentIndex = 0;
			// se da el tamaño inicial al primer servicio
			gsap.set(servicesRef[0], {flex: 5})
			const tl = gsap.timeline({
				defaults: { duration: 0.6 },
				onComplete: () => (animating = false),
			});

			const next = (index, value) => {
				index = clamp(index);
				animating = true;

				value === 1
					? tl
							.to(sections[index], { opacity: 1 })
							.set(sections[index], { pointerEvents: "auto" })
					: tl
							.to(sections[currentIndex], { opacity: 0 })
							.set(sections[currentIndex], { pointerEvents: "none" });

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

	const { contextSafe } = useGSAP({ scope: container });

	// SERVICES OPEN ANIMATION
	const servicesClick = contextSafe((index) => {
		servicesRef.forEach((item, itemIndex) => {
			itemIndex === index ? gsap.set(item, { flex: "5" }) : gsap.set(item, { flex: "1" });
		});

		console.log("este es el index: " + servicesRef);
	});

	// VALUES SECTION ANIMATION
	const valuesClick = contextSafe(() => {
		const valuesSection = gsap.timeline({ defaults: { duration: 0.5 } });
		setActive(0);

		valuesActive === 2
			? valuesSection.to(".mision", { height: "90svh" })
			: valuesSection.to(".mision", { height: "10svh" });
	});

	return (
		<>
			<body>
				<main ref={container} className={`${styles.container} container`}>
					<section className={`${styles.welcome} section welcome`}>
						<div className={styles.welcome__container}>
							<h1 className={`${styles.welcome__title}`}>
								<span className={`${styles.welcome__title_one}`}>
									SOMOS GALOS UNA AGENCIA PREPARADA{" "}
								</span>
								<span className={`${styles.welcome__title_two}`}>
									PARA AYUDARTE A CRECER
								</span>
							</h1>
							<div className={styles.welcome__animation} ref={animRef}></div>
						</div>
						<article className={styles.welcome__text}>
							<p ref={type} style={styles.welcome__text_p}></p>
						</article>
					</section>

					<section className={`${styles.services} section services`}>
						<div className={styles.services__content}>
							<p className={styles.services__title}>
								Podemos apoyarte en cada paso para conseguir tu presencia digital
							</p>
							<p className={styles.services__p}></p>
						</div>
						<div
							className={styles.services__gallery}
							/* onPointerOver={() => {
								setActive(1);
								gsap.set(servicesRef[0], { backgroundColor: "green" });
								console.log(servicesRef)
							}} */
						>
							{services.map((item) => {
								return (
									<article
										key={item.title}
										className={`${styles.services__item} ${
											item.id === 0 ? styles.active : ""
										} service`}
										onPointerOver={() => servicesClick(item.id)}
									>
										<h2 className={styles.services__item_title}>{item.title}</h2>
										<p className={styles.services__item_desc}>{item.description}</p>
										<button className={styles.services__item_btn}></button>
									</article>
								);
							})}
							{/* <article
								className={`${styles.services__item} ${
									active === 0 ? styles.active : ""
								} service`}
							>
								<h2 className={styles.services__item_title}>SERVICIO DE ALGO</h2>
								<p className={styles.services__item_desc}>parrafo cualquier por ahora</p>
								<button className={styles.services__item_btn}></button>
							</article>
							<article className={`${styles.services__item} service`}>
								<h2 className={styles.services__item_title}>SERVICIO DE ALGO</h2>
								<p className={styles.services__item_desc}>parrafo cualquier por ahora</p>
								<button className={styles.services__item_btn}></button>
							</article>
							<article className={`${styles.services__item} service`}>
								<h2 className={styles.services__item_title}>SERVICIO DE ALGO</h2>
								<p className={styles.services__item_desc}>parrafo cualquier por ahora</p>
								<button className={styles.services__item_btn}></button>
							</article>
							<article className={`${styles.services__item} service`}>
								<h2 className={styles.services__item_title}>SERVICIO DE ALGO</h2>
								<p className={styles.services__item_desc}>parrafo cualquier por ahora</p>
								<button className={styles.services__item_btn}></button>
							</article>
							<article className={`${styles.services__item} service`}>
								<h2 className={styles.services__item_title}>SERVICIO DE ALGO</h2>
								<p className={styles.services__item_desc}>parrafo cualquier por ahora</p>
								<button className={styles.services__item_btn}></button>
							</article> */}
						</div>
					</section>

					<section className={`${styles.values} section`}>
						<div
							className={`${styles.values__mision} mision`}
							onClick={() => {
								console.log("estado: " + active);
								valuesActive = 2;
								valuesClick();
							}}
						>
							<article className={`${styles.values__mision_titleCont} misionTitle`}>
								<h2 className={`${styles.values__mision_title} misionDesc`}>Misión</h2>
							</article>
							<p className={`${styles.values__mision_desc}`}>somos un parrafo grandote</p>
						</div>
						<div
							className={`${styles.values__vision} vision`}
							onClick={() => {
								valuesActive = 3;
								valuesClick();
							}}
						>
							<h2 className={`${styles.values__vision_title} visionTitle`}>Visión</h2>
							<p className={`${styles.values__vision_desc} visionDesc`}>
								somos un parrafo grandote
							</p>
							<article className={`${styles.values__extra} visionExtra`}>
								<h2 className={`${styles.values__extra_title}`}>VISIÓN</h2>
							</article>
						</div>
					</section>
					<footer className={styles.footer}></footer>
				</main>
			</body>
		</>
	);
}
