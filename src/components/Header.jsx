"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import styles from '../scss/app.module.scss';


export const Header = () => {
	const [active, setActive] = useState(false);
	const [btnText, setBtnText] = useState("MENU");
	const header = useRef();

	const menuActivation = () => {
		!active ? setActive(true) : setActive(false);
		!active ? setBtnText("CLOSE") : setBtnText("MENU");
		document.body.classList.toggle("noScroll", !active);
	};

	/* useEffect(() => {
		gsap.to(header.current, {
			y: 0,
			opacity: 1,
			duration: 3,
			scrollTrigger: {
				trigger: header.current,
				start: '-=40',
				end: '-=50',
			},
		});

		gsap.to(header.current, {
			y: -100,
			opacity: 1,
			duration: 3,
			scrollTrigger: {
				trigger: header.current,
				start: '+=40',
				end
			},
		});
	}, []); */

	return (
		<>
			<div className={styles.header} ref={header}>
				<Link className={styles.logo} href={""}>
					<img className={styles.logo__img} src="/assets/Galos.svg" alt="" />
				</Link>
				<button
					className={`${styles.menu__btn} ${active ? styles.active : ""}`}
					onClick={menuActivation}
				>
					{btnText}
				</button>
			</div>
			<div className={`${styles.menu} ${active == 1 ? styles.active : ""}`}>
				<ul className={styles.menu__list}>
					<li className={styles.menu__item}>
						<Link
							onClick={menuActivation}
							className={`${styles.menu__item_link} ${({ isActive }) =>
								isActive ? styles.active : ""}`}
							href={""}
						>
							INICIO
						</Link>
					</li>
					<li className={styles.menu__item}>
						<Link
							onClick={menuActivation}
							className={`${styles.menu__item_link} ${({ isActive }) =>
								isActive ? styles.active : ""}`}
							href={""}
						>
							FOTOGRAFÍA
						</Link>
					</li>
					<li className={styles.menu__item}>
						<Link
							onClick={menuActivation}
							className={`${styles.menu__item_link} ${({ isActive }) =>
								isActive ? styles.active : ""}`}
							href={""}
						>
							VIDEO
						</Link>
					</li>
					<li className={styles.menu__item}>
						<Link
							onClick={menuActivation}
							className={`${styles.menu__item_link} ${({ isActive }) =>
								isActive ? styles.active : ""}`}
							href={""}
						>
							DISEÑO WEB
						</Link>
					</li>
				</ul>
				<ul className={styles.menu__networks}>
					<li className={styles.menu__network}>
						<a className={styles.menu__network_link} target="_blank" href="https://www.facebook.com/profile.php?id=100066974475945">
							<img
								className={styles.menu__network_icon}
								src="/assets/networksIcons/facebook.svg"
								alt=""
							/>
						</a>
					</li>
					<li className={styles.menu__network}>
						<a className={styles.menu__network_link} target="_blank" href="https://instagram.com/galosvisualservices?igshid=MzRlODBiNWFlZA==">
							<img
								className={styles.menu__network_icon}
								src="/assets/networksIcons/instagram.svg"
								alt=""
							/>
						</a>
					</li>
					<li className={styles.menu__network}>
						<a className={styles.menu__network_link} href="#">
							<img
								className={styles.menu__network_icon}
								src="/assets/networksIcons/whatsapp.svg"
								alt=""
							/>
						</a>
					</li>
				</ul>
			</div>
		</>
	);
};