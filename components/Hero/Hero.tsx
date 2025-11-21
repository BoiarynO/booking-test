import Image from "next/image";
import DurationLabel from "../ui/DurationLabel";

import ImageMobile from "@/assets/images/ImageMobile.webp";

import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.description}>
        <h1 className={styles.title}>Cool session</h1>
        <p className={styles.subtitle}>Additional type</p>
      </div>
      <DurationLabel />
      <Image src={ImageMobile} alt="" className={styles.image} width={300} />
    </div>
  );
};

export default Hero;
