import styles from "@/scss/app.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";
import textInfo from "./sectionsInfo.json";

gsap.registerPlugin(useGSAP);

export default function Details({section}) {
	const closeBtn = useRef(),
		dContainer = useRef();

	const arrayh = [
		{
			buenas: "holi",
		},
	];

	useGSAP(
		(context, contextSafe) => {
			let open = true;

			const openDetails = contextSafe((estado) => {
				const details = gsap.timeline();
				const width = window.innerWidth;
                console.log(section)

				estado
					? details
							.to(".titleClose", { opacity: 0, duration: 0.3 })
							.to(dContainer.current, { x: -width + 50, duration: 0.5 })
							.to(".detailsContainer", { opacity: 1, duration: 0.3 })
							.to(".closeBtn", { rotate: 0, duration: 0.3 }, "<")
					: details
							.to(".detailsContainer", { opacity: 0, duration: 0.3 })
							.to(dContainer.current, { x: 0, duration: 0.5 })
							.to(".titleClose", { opacity: 1, duration: 0.4 })
							.to(".closeBtn", { rotate: 180, duration: 0.3 }, "<");
				open = !estado;

				return details;
			});

			closeBtn.current.addEventListener("click", () => openDetails(open));
		},
		{ scope: dContainer }
	);

	return (
		<article className={`${styles.details} ${styles.close} details`} ref={dContainer}>
			<button className={`${styles.details__btn} closeBtn`} ref={closeBtn} />
			<h2 className={`${styles.details__titleClose} titleClose`}>
				DETALLES DEL PROYECTO
			</h2>
			<div className={`${styles.detailsContainer}  detailsContainer `}>
				<h2 className={`${styles.detailsContainer__title}`}>{textInfo.text[section].title}</h2>
				<p className={styles.detailsContainer__text}>{textInfo.text[section].info}</p>
				<ul className={styles.detailsContainer__list}>
					<li className={styles.detailsContainer__list_point}><p>{textInfo.text[section].infoItem1}</p></li>
					<li className={styles.detailsContainer__list_point}><p>{textInfo.text[section].infoItem2}</p></li>
				</ul>
				<ul className={`${styles.detailsContainer__nav}`}>
					<li className={`${styles.detailsContainer__nav_item}`}>
						<Link href={""} className={`${styles.detailsContainer__nav_link}`}>
							<h2 className={`${styles.detailsContainer__nav_text}`}>INICIO</h2>{" "}
						</Link>
					</li>
					<li className={`${styles.detailsContainer__nav_item}`}>
						<Link href={""} className={`${styles.detailsContainer__nav_link}`}>
							<h2 className={`${styles.detailsContainer__nav_text}`}>FOTOGRAFÍA</h2>{" "}
						</Link>
					</li>
					<li className={`${styles.detailsContainer__nav_item}`}>
						<Link href={""} className={`${styles.detailsContainer__nav_link}`}>
							<h2 className={`${styles.detailsContainer__nav_text}`}>VIDEO</h2>{" "}
						</Link>
					</li>
					<li className={`${styles.detailsContainer__nav_item}`}>
						<Link href={""} className={`${styles.detailsContainer__nav_link}`}>
							<h2 className={`${styles.detailsContainer__nav_text}`}>DESARROLLO WEB</h2>{" "}
						</Link>
					</li>
					<li className={`${styles.detailsContainer__nav_item}`}>
						<Link href={""} className={`${styles.detailsContainer__nav_link}`}>
							<h2 className={`${styles.detailsContainer__nav_text}`}>OTRA PAGINA</h2>{" "}
						</Link>
					</li>
				</ul>
				<div className={`${styles.detailsContainer__socialMedia}`}>
					<a href=""></a>
					<a href=""></a>
					<a href=""></a>
				</div>
			</div>
		</article>
	);
}
