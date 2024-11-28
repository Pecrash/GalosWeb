"use client";

import imagesRoutes from "../fotografias/sectionsInfo.json";
import Image from "next/image";
import styles from "@/scss/app.module.scss";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { Value } from "sass";

gsap.registerPlugin(ScrollToPlugin);

export default function Fotografias2(params) {
	const container = useRef();
	const carousel = useRef();
	const { contextSafe } = useGSAP({ scope: container });
	/* let clamp = gsap.utils.clamp(0, imagesRoutes.eventos.length); */
	/* let valor = 0; */
	/* let imageWidth = imagesRoutes.eventos[valor].width; */
	/* let offsetX = (window.innerWidth - imageWidth) / 2; */

	const PhotoSet = ({ images, className }) => {
		return (
			<>
			<h2>TITLE</h2>
				<div
					ref={carousel}
					className={`${styles.photoContainer__carousel} ${className} testCont`}
				>
					{images.map((item) => {
						return (
							<figure
								/* style={{height: "100vh", width: item.width}} */ id={item.id}
								className={styles.photoContainer__carousel_figure}
								style={{ gridRow: item.span === 2 ? "span 2" : "span 1" }}
								key={item.src}
							>
								{
									<Image
										src={item.src}
										fill
										alt={item.alt}
										className={styles.images}
										style={{ objectFit: "cover" }}
									/>
								}
							</figure>
						);
					})}
				</div>
			</>
		);
	};

	/* useEffect(() => {
		valor = carousel.current.childNodes.length / 2;

		gsap.to(".testCont", {
			duration: 2,
			scrollTo: { x: `#E${valor}`, offsetX: offsetX },
			ease: "power3",
		});

		console.log(valor)
	}, []); */

	/* const moveItem = (value) => {
		let firstItem = carousel.current.firstElementChild;
		let lastItem = carousel.current.lastElementChild;

		value === "left"
			? carousel.current.insertBefore(lastItem, firstItem)
			: carousel.current.appendChild(firstItem);

		console.log("Item" + lastItem);
	}; */
	// SE PUEDE USAR LA UTILIDAD DE GSAP PARA LIMITAR LOS VALORES
	/* const scrollTo = contextSafe((value) => {
		valor = value === "left" ? valor - 1 : valor + 1;
		valor = clamp(valor);

		gsap.to(".testCont", {
			duration: 2,
			scrollTo: { x: `#E${valor}`, offsetX: offsetX },
			ease: "power3",
		});
		console.log("valor:" + imageWidth);

		moveItem(value);
	}); */

	// USAR EL SCROLL Y TOUCH PARA MOVER LAS IMÁGENES, SERÁ FÁCIL CON OBSERVER DE GSAP
	return (
		<>
			<main className={styles.photoContainer} ref={container}>
				<PhotoSet
					images={imagesRoutes.eventos}
					className={styles.photoContainer__carousel1}
				/>
				<PhotoSet
					images={imagesRoutes.moda}
					className={styles.photoContainer__carousel2}
				/>
			</main>
		</>
	);
}