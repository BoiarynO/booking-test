import Image from "next/image";

import ImageMobile from "@/assets/images/ImageMobile.webp";

import DurationLabel from "../ui/DurationLabel";

import styles from "./Hero.module.css";

type HeroProps = {
  title?: string;
  subtitle?: string;
};

const Hero = ({
  title = "Cool session",
  subtitle = "Additional type",
}: HeroProps) => {
  return (
    <div className={styles.hero}>
      <div className={styles.description}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <DurationLabel />
      <Image
        src={ImageMobile}
        alt="woman-image"
        className={styles.image}
        width={300}
        loading="eager"
      />
    </div>
  );
};

export default Hero;
