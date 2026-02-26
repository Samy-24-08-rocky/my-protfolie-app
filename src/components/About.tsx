"use client";

import styles from "./About.module.css";
import { Reveal } from "./Reveal";

const About = () => {
    return (
        <section id="about">
            <div className={styles.aboutContainer}>
                <div className={styles.aboutContent}>
                    <Reveal width="100%">
                        <h2 className={styles.title}>
                            About <span className="text-gradient">Me</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%">
                        <p className={styles.description}>
                            I am a passionate Software Developer with a strong foundation in
                            both Web and Mobile ecosystems. With expertise in React and
                            Next.js for the web, and Java, Android, and Flutter for mobile, I
                            build seamless digital experiences that bridge the gap between
                            functionality and aesthetics. I specialize in creating robust,
                            scalable, and user-friendly applications that solve real-world problems.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
