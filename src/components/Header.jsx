"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../scss/app.module.scss";
import Lottie from "lottie-web";

gsap.registerPlugin(useGSAP);

export const Header = () => {
  let animationInstance = useRef();
  let openIconRef = useRef();
  let openCount = 0;
  let mailCount = 1;
  const router = usePathname();

  const isActive = (path) => router === path;

  useEffect(() => {
    // LOTTIE ANIMATION

    animationInstance.current = Lottie.loadAnimation({
      container: openIconRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/animations/menuAnimation.json",
    });

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);

  const { contextSafe } = useGSAP();

  const openMenu = contextSafe(() => {
    gsap.to(".menu", { right: openCount == 0 ? "0%" : "-100%", duration: 0.5 });

    openCount === 0
      ? (animationInstance.current.setDirection(1), (openCount = 1))
      : (animationInstance.current.setDirection(-1), (openCount = 0));
    animationInstance.current.play();
  });

  const emailModal = contextSafe(() => {
	  mailCount === 1
      ? (gsap.to(".email", { opacity: 1, duration: 0.2 }),
	  gsap.set(".email", { pointerEvents: "all" }))
      : (gsap.to(".email", { opacity: 0, duration: 0.2 }),
	  gsap.set(".email", { pointerEvents: "none" }));
	  mailCount === 1 ? (mailCount = 0) : (mailCount = 1);
	});

  return (
    <>
      <header className={styles.header}>
        <figure className={styles.header__logo}></figure>
        <button
          className={styles.header__open}
          ref={openIconRef}
          onClick={openMenu}
        />
      </header>
      <div className={`${styles.menu} menu`}>
        <span className={`${styles.menu__span}`}>GALOS</span>
        <ul className={`${styles.menu__list}`}>
          <Link
            href={"/"}
            onClick={openMenu}
            scroll={false}
            className={`${styles.menu__list_link}`}
            style={isActive("/") ? { color: "#DDB26D" } : {}}
          >
            Inicio
          </Link>
          <Link
            href={"/fotografias2"}
            onClick={openMenu}
            scroll={false}
            className={`${styles.menu__list_link}`}
            style={isActive("/fotografias2") ? { color: "#DDB26D" } : {}}
          >
            Fotografías
          </Link>
          <Link
            href={"/videos"}
            onClick={openMenu}
            scroll={false}
            className={`${styles.menu__list_link}`}
            style={isActive("/videos") ? { color: "#DDB26D" } : {}}
          >
            Videos
          </Link>
          <Link
            href={"/website"}
            onClick={openMenu}
            scroll={false}
            className={`${styles.menu__list_link}`}
            style={isActive("/website") ? { color: "#DDB26D" } : {}}
          >
            Desarrollo Web
          </Link>
        </ul>
        <ul className={`${styles.menu__networks}`}>
          <a
            href="https://www.facebook.com/share/1BC5eiKobq/"
            target="_blank"
            className={`${styles.menu__networks_item}`}
          ></a>
          <a
            href="https://www.instagram.com/galoscasacreativa?igsh=anZobHBwdnV1aXVt"
            target="_blank"
            className={`${styles.menu__networks_item}`}
          ></a>
          <a
            href="https://wa.link/01ort0"
			target="_blank"
            className={`${styles.menu__networks_item}`}
          ></a>
          <span
            onClick={emailModal}
            className={`${styles.menu__networks_item}`}
          ></span>
          <span className={`${styles.menu__list_email} email`}>
            galoscasacreativa@gmail.com
          </span>
        </ul>
      </div>
    </>
  );
};
