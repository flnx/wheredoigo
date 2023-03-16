import styles from './Intro.module.css';
import introImage from '../../../assets/pictures/homepage/intro.png';

import { PrimaryButton } from '../../../components/Buttons/Primary-Btn/PrimaryButton';

export const Intro = () => {
    return (
        <section className={styles.introSection}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.imageContainer}>
                        <img src={introImage} alt="person with a bagpack " />
                    </div>
                    <div className={styles.intro}>
                        <h2 className={styles.title}>
                            Travel any corner of the world
                        </h2>
                        <p className={styles.content}>
                            Take a vacation with your friends and get rid of the
                            boredom!
                        </p>
                        <PrimaryButton>
                            Explore
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
