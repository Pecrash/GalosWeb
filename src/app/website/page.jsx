"use client";

import styles from "@/scss/app.module.scss";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin, CustomEase } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP, Observer, ScrollToPlugin);

export default function Website(params) {
	const arrow = useRef(),
		container = useRef(),
		sections = useRef(),
		valuesRef = useRef();

	let clamp = useRef();
	let animating;

	const valores = [
		{
			title: "Diseños enfocados en representarte",
			description:
				"Es vital diseñar un sitio web que te represente correctamente y desde el primer vistazo sea evidente a quien pertenece",
			id: 0,
		},
		{
			title: "Diseños enfocados en representarte",
			description:
				"Es vital diseñar un sitio web que te represente correctamente y desde el primer vistazo sea evidente a quien pertenece",
			id: 1,
		},
		{
			title: "Diseños enfocados en representarte",
			description:
				"Es vital diseñar un sitio web que te represente correctamente y desde el primer vistazo sea evidente a quien pertenece",
			id: 2,
		},
	];

	useEffect(() => {
		// LOTTIE ANIMATION
	}, []);

	useGSAP(
		() => {
			// ANIMACIONES

			let yValue = -180;

			let tl = gsap.timeline({
				repeat: -1,
				repeatDelay: 14,
				defaults: {
					duration: 0.7,
					ease: "power2.inOut",
				},
			});

			tl.to(".value", { yPercent: -100, translateY: "-0.9375rem" })
				.to(".value", { yPercent: -200, translateY: "-1.875rem" }, ">14")
				.to(".value", { yPercent: -300, translateY: "-2.8125rem" }, ">14")
				.to(".value", { yPercent: -400, translateY: "-3.75rem" }, ">14");
		},
		{ scope: container }
	);

	/* const { contextSafe } = useGSAP();

	const servicesClick = contextSafe((index) => {
		valuesRef.current.forEach((item, itemIndex) => {
			itemIndex === index
				? gsap.set(item, { flex: "3", duration: 5 })
				: gsap.set(item, { flex: "1" });
		});
	}); */

	const Services = () => {
		return (
			<>
				<article className={`${styles.website__services_value} value`}>
					<h3 className={`${styles.website__services_value_title}`}>
						DISEÑO WEB RESPONSIVE
					</h3>
					<p className={`${styles.website__services_value_p}`}>
						Garantizamos que cada usuario tendrá una experiencia perfecta, sin importar
						dónde o cómo se conecte, creando experiencias que fluyen con naturalidad en
						cualquier pantalla.
					</p>
				</article>
				<article className={`${styles.website__services_value} value`}>
					<h3 className={`${styles.website__services_value_title}`}>DISEÑO UI&UX</h3>
					<p className={`${styles.website__services_value_p}`}>
						Diseñamos la cara de tu marca en el mundo digital. Creamos flujos simples,
						lógicos y sin frustraciones, para que la experiencia sea tan memorable como
						efectiva, donde cada botón, letra y color cuentan tu historia.
					</p>
				</article>
				<article className={`${styles.website__services_value} value`}>
					<h3 className={`${styles.website__services_value_title}`}>
						OPTIMIZACIÓN DE RENDIMIENTO
					</h3>
					<p className={`${styles.website__services_value_p}`}>
						Un sitio rápido no solo mejora la experiencia del usuario, sino que también
						impulsa tus resultados, la experiencia que ofreces a tus clientes debe ser
						fluida y sin trabas para evitar perder oportunidades valiosas.
					</p>
				</article>
				<article className={`${styles.website__services_value} value`}>
					<h3 className={`${styles.website__services_value_title}`}>
						ACOMPAÑAMIENTO CONSTANTE
					</h3>
					<p className={`${styles.website__services_value_p}`}>
						Sabemos que un sitio web puede ser un gran paso para tu negocio y por lo mismo
						pueden surgir gran cantidad de dudas y obstáculos, estamos para acompañarte en
						el paso a paso y asegurarnos de que todo vaya acorde a tus objetivos.
					</p>
				</article>
			</>
		);
	};

	return (
		<>
			<main className={`${styles.website}`} ref={container}>
				<section className={`${styles.website__welcome}`}>
					<h2 className={`${styles.website__welcome_title}`}>
						TODA GRAN MARCA DEBE TENER UN SITIO WEB A SU ALTURA
					</h2>
					<p className={`${styles.website__welcome_p}`}>
						DE LA MANO CONTIGO PODEMOS CREAR EL SITIO WEB IDEAL
					</p>
				</section>
				<section className={`${styles.website__services}`}>
					<article className={`${styles.website__services_intro}`}>
						<h2 className={`${styles.website__services_intro_title}`}>
							SOLUCIONES WEB A TU MEDIDA
						</h2>
						<p className={`${styles.website__services_intro_p}`}>
							Un sitio web no es solo cuestión de estética; es un arte que combina la
							esencia de una marca con las necesidades únicas de su audiencia, un espacio
							digital donde cada color, cada palabra y cada interacción evocan confianza y
							conexión.{" "}
						</p>
					</article>
					<section className={`${styles.website__services_container} container`}>
						<Services />
						<Services />
					</section>
				</section>
				<section className={`${styles.website__presentation}`}>
					<div className={`${styles.website__presentation_container}`}>
						<h2 className={`${styles.website__presentation_title}`}>
							GALOS CASA CREATIVA
						</h2>
						<p className={`${styles.website__presentation_p}`}>
							La primera impresión es digital, tu sitio web es más que una página; es tu
							carta de presentación, tu escaparate y tu mejor vendedor. En Galos Casa
							Creativa, creamos espacios digitales únicos que no solo destacan, sino que
							inspiran y conectan con tu público objetivo.
						</p>
					</div>
					<img
						src="/hand_coding.svg"
						className={`${styles.website__presentation_img}`}
						alt=""
					/>
				</section>
				<section className={`${styles.website__contact}`}>
					<img className={`${styles.website__contact_img}`} src="/puzzle.svg" alt="" />
					<h2 className={`${styles.website__contact_title}`}>
						CUENTANOS ACERCA DE TU PROXIMO PROYECTO
					</h2>
					<div className={`${styles.website__contact_btns}`}>
						<a className={`${styles.website__contact_btn}`} href="#">
							EMAIL
						</a>
						<a className={`${styles.website__contact_btn}`} href="#">
							WHATSAPP
						</a>
					</div>
				</section>
			</main>
		</>
	);
}
