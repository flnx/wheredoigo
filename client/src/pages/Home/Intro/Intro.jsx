import introImage from '../../../assets/pictures/homepage/intro.png';

import { Container } from '../../../components/Containers/Container/Container';
import { ButtonLinkPrimary } from '../../../components/Buttons/Primary-Btn/LinkButtonPrimary';
import { LoadingSkeleton } from '../../../components/LoadingSkeletons/LoadingSkeleton';

import routeConstants from '../../../constants/routeConstants';
import styles from './Intro.module.css';

const { routePath } = routeConstants.DESTINATIONS.BY_ID;

export const Intro = ({ isLoading }) => {
    return (
        <section className={styles.introSection}>
            {isLoading && (
                <div className={styles.overlay}>
                    <LoadingSkeleton />
                </div>
            )}
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.imageContainer}>
                        <img
                            src={introImage}
                            alt="person with a big bagpack"
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.intro}>
                        <h2 className={styles.title}>
                            Embark on an adventurous journey in New Zealand!
                        </h2>
                        <p className={styles.content}>
                            Uncover boundless and limitless wonders as you explore the world
                            around you. The thrill awaits!
                        </p>
                        <ButtonLinkPrimary to={routePath('64963e73ef146e69c5aa2842')}>
                            Discover
                        </ButtonLinkPrimary>
                    </div>
                </div>
            </Container>
        </section>
    );
};
