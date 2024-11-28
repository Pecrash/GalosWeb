import Image from "next/image";
import styles from "@/scss/app.module.scss";
import { Content } from "next/font/google";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import useObserver from "./useObserver";

gsap.registerPlugin(useGSAP);

export default function Photos({
	firstImages,
	secondImages,
	width,
	duration,
	animation,
}) {
	const slider = useRef(),
		slider2 = useRef();

	useGSAP(() => {
		/* gsap.to(slider.current, {
			xPercent: -100,
			repeat: -1,
			duration: duration,
			ease: "none",
		});
		gsap.to(slider2.current, {
			xPercent: -100,
			repeat: -1,
			duration: duration,
			ease: "none",
		}); */
	});

	return (
		<>
			<div className={`${styles.photoContainer} slider`} ref={slider}>
				<section className={`${styles.photoSlider}`} style={{ width: width }}>
					{firstImages.map((image) => {
						return (
							<figure className={styles.photoSlider__img} key={image.src}>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									sizes="(min-width: 1200px) 40vw, (min-width: 768px) 70vw, (min-width: 360px) 70vw"
									style={{ objectFit: "cover", objectPosition: "40% 10%" }}
								/>
							</figure>
						);
					})}
				</section>
				<section className={styles.photoSlider} style={{ width: width }}>
					{secondImages.map((image) => {
						return (
							<figure className={styles.photoSlider__img} key={image.src}>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									sizes="(min-width: 1200px) 40vw, (min-width: 768px) 70vw, (min-width: 360px) 70vw"
									style={{ objectFit: "cover", objectPosition: "40% 10%" }}
								/>
							</figure>
						);
					})}
				</section>
			</div>

			<div className={`${styles.photoContainer}`} ref={slider2}>
				<section className={`${styles.photoSlider}`} style={{ width: width }}>
					{firstImages.map((image) => {
						return (
							<figure className={styles.photoSlider__img} key={image.src}>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									sizes="(min-width: 1200px) 40vw, (min-width: 768px) 70vw, (min-width: 360px) 70vw"
									style={{ objectFit: "cover", objectPosition: "40% 10%" }}
								/>
							</figure>
						);
					})}
				</section>
				<section className={styles.photoSlider} style={{ width: width }}>
					{secondImages.map((image) => {
						return (
							<figure className={styles.photoSlider__img} key={image.src}>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									sizes="(min-width: 1200px) 40vw, (min-width: 768px) 70vw, (min-width: 360px) 70vw"
									style={{ objectFit: "cover", objectPosition: "40% 10%" }}
								/>
							</figure>
						);
					})}
				</section>
			</div>
		</>
	);
}
