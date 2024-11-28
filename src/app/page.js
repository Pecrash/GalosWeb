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
	let anim;

	let services = [
		{
			title: "FOTOGRAFÍAS",
			description:
				"Lorem ipsum dolor sit amet consectetur. Massa cras egestas odio scelerisque. Volutpat et dictum eu amet sem est tortor. Ornare at turpis cursus fusce nulla est phasellus. Eget ullamcorper ac nulla a nam.",
			id: 0,
		},
		{
			title: "VIDEOS",
			description:
				"Lorem ipsum dolor sit amet consectetur. Massa cras egestas odio scelerisque. Volutpat et dictum eu amet sem est tortor. Ornare at turpis cursus fusce nulla est phasellus. Eget ullamcorper ac nulla a nam.",
			id: 1,
		},
		{
			title: "DESARROLLO WEB",
			description:
				"Lorem ipsum dolor sit amet consectetur. Massa cras egestas odio scelerisque. Volutpat et dictum eu amet sem est tortor. Ornare at turpis cursus fusce nulla est phasellus. Eget ullamcorper ac nulla a nam.",
			id: 2,
		},
		{
			title: "DISEÑO",
			description:
				"Lorem ipsum dolor sit amet consectetur. Massa cras egestas odio scelerisque. Volutpat et dictum eu amet sem est tortor. Ornare at turpis cursus fusce nulla est phasellus. Eget ullamcorper ac nulla a nam.",
			id: 3,
		},
	];

	let index = 0,
		animating,
		[active, setActive] = useState(0);

	useEffect(() => {
		// se actualizan las referencias para poder acceder a ellas
		servicesRef = gsap.utils.toArray(".service");

		// LOTTIE ANIMATION

		anim = Lottie.loadAnimation({
			container: animRef.current,
			renderer: "svg",
			loop: false,
			autoplay: true,
			path: "/animations/plant.json",
		});

		anim.setDirection(0);

		// TYPE ANIMATION

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
			let clamp = gsap.utils.clamp(0, sections.length - 1);
			let currentIndex = 0;
			// se da el tamaño inicial al primer servicio
			gsap.set(servicesRef[0], { flex: 5 });
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
							.to(sections[currentIndex], { opacity: currentIndex == 0 ? 1 : 0 })
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
			itemIndex === index
				? gsap.set(item, { flex: "5", duration: 5 })
				: gsap.set(item, { flex: "1" });
		});

		console.log("este es el index: " + servicesRef);
	});

	// VALUES SECTION ANIMATION
	const valuesClick = contextSafe((value) => {
		const valuesSection = gsap.timeline({ defaults: { duration: 0.5 } });
		let mm = gsap.matchMedia();
		setActive(0);

		value === 2 //
			? (mm.add("(max-width: 820px)", () => {
					valuesSection
						.to(".mision", { height: "calc(100svh - 5.8125rem)" })
						.to(".visionExtra", { opacity: 1 }, "<");
			  }),
			  mm.add("(min-width: 1200px)", () => {
					valuesSection
						.to(".misionExtra", {opacity: 0},)
						.to(".mision", { width: "calc(100vw - 6.8125rem)" })
						.to(".misionDesc", {opacity: 1, duration: 0.3})
						.to(".misionTitle", {opacity: 1}, "<")
						.to(".visionExtra", { opacity: 1 }, "<");
			  }))
			: (mm.add("(max-width: 820px)", () => {
					valuesSection
						.to(".mision", { height: "5.8125rem" })
						.to(".visionExtra", { opacity: 0 }, "<");
			  }),
			  mm.add("(min-width: 1200px)", () => {
					valuesSection
						.to(".misionDesc", {opacity: 0, duration: 0.3})
						.to(".misionTitle", {opacity: 0}, "<")
						.to(".mision", { width: "6.8125rem" })
						.to(".misionExtra", {opacity: 1}, "<")
						.to(".visionExtra", { opacity: 0 }, "<");
			  }));
	});

	return (
		<>
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
						<p ref={type} className={styles.welcome__text_p}></p>
					</article>
				</section>

				<section className={`${styles.services} section services`}>
					<div className={styles.services__content}>
						<h2 className={styles.services__title}>
							Podemos apoyarte en cada paso para conseguir tu presencia digital
						</h2>
						<p className={styles.services__p}>
							Lorem ipsum dolor sit amet consectetur. Massa cras egestas odio scelerisque.
							Volutpat et dictum eu amet sem est tortor. Ornare at turpis cursus fusce
							nulla est phasellus. Eget ullamcorper ac nulla a nam.
						</p>
						<p className={styles.services__p}>
							Lorem ipsum dolor sit amet consectetur. Massa cras egestas odio scelerisque.
							Volutpat et dictum eu amet sem est tortor. Ornare at turpis cursus fusce
							nulla est phasellus. Eget ullamcorper ac nulla a nam.
						</p>
					</div>
					<div className={styles.services__gallery}>
						{services.map((item) => {
							return (
								<article
									key={item.title}
									className={`${styles.services__item}  service`}
									onPointerOver={() => servicesClick(item.id)}
								>
									<h2 className={styles.services__item_title}>{item.title}</h2>
									<div className={`${styles.services__item_content} serviceContent`}>
										<p className={styles.services__item_desc}>{item.description}</p>
										<button className={styles.services__item_btn}></button>
									</div>
								</article>
							);
						})}
					</div>
				</section>

				<section className={`${styles.values} section`}>
					<div
						className={`${styles.values__mision} mision`}
						onClick={() => {
							console.log("estado: " + active);
							valuesClick(2);
						}}
					>
						{/* <article className={`${styles.values__mision_titleCont} misionTitle`}>
							</article> */}
						<h2 className={`${styles.misionExtra} misionExtra`}>MISIÓN</h2>
						<h2 className={`${styles.values__mision_title} misionTitle`}>Misión</h2>
						<p className={`${styles.values__mision_desc} misionDesc`}>
							En Galos estamos dedicados a definir el futuro del storytelling visual,
							superando límites y estableciendo nuevos estándares de calidad y
							creatividad, con un enfoque distintivo en elegancia, innovación y futurismo.
							Nuestra misión es trascender las expectativas convencionales mediante la
							creación de experiencias visuales sofisticadas y cautivadoras.
						</p>
						<p className={`${styles.values__mision_desc} misionDesc`}>
							Trabajamos para ofrecer soluciones visuales que desafíen las normas
							establecidas y conecten emocionalmente con el público. Nos motiva crear
							obras que no sólo capturen la atención, sino que también inspiren y generen
							conversaciones duraderas, elevando el arte del storytelling visual a nuevas
							alturas.
						</p>
					</div>
					<div
						className={`${styles.values__vision} vision`}
						onClick={() => {
							valuesClick(3);
						}}
					>
						<h2 className={`${styles.values__vision_title} visionTitle`}>Visión</h2>
						<p className={`${styles.values__vision_desc} visionDesc`}>
							En Galos, nos visionamos siendo referentes en la creación de experiencias
							visuales que no sólo entretengan, sino que también inspiren y transformen, a
							través de la excelencia técnica y creativa. Aspiramos a influir
							positivamente en la narrativa visual global, elevando constantemente los
							estándares de calidad y de productos audiovisuales.
						</p>
						<p className={`${styles.values__vision_desc} visionDesc`}>
							Fomentando una cultura creativa que nos impulse a ir más allá de lo
							convencional, transformando ideas innovadoras en experiencias visuales
							únicas. Creemos en el poder de la creatividad como motor de cambio,
							generando proyectos que evocan emociones, cuentan historias significativas y
							dejan una huella duradera en el público.
						</p>
						{/* <article className={`${styles.values__extra} visionExtra`}></article> */}
						<h2 className={`${styles.values__extra_title} visionExtra`}>VISIÓN</h2>
					</div>
				</section>
				<footer className={styles.footer}></footer>
			</main>
		</>
	);
}
