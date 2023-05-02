import introImage from '../../../assets/pictures/homepage/intro.png';
import { Container } from '../../../components/Containers/Container/Container';
import { ButtonLinkPrimary } from '../../../components/Buttons/Primary-Btn/LinkButtonPrimary';

import routeConstants from '../../../constants/routeConstants';
import styles from './Intro.module.css';

const { DISCOVER } = routeConstants;

export const Intro = () => {
    return (
        <section className={styles.introSection}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.imageContainer}>
                        <img src={introImage} alt="person with a big bagpack" />
                    </div>
                    <div className={styles.intro}>
                        <h2 className={styles.title}>Travel any corner of the world</h2>
                        <p className={styles.content}>
                            Take a vacation with your friends and get rid of the boredom!
                        </p>
                        <ButtonLinkPrimary to={DISCOVER.route}>
                            Discover (change it)
                        </ButtonLinkPrimary>
                    </div>
                </div>
            </Container>
        </section>
    );
};
