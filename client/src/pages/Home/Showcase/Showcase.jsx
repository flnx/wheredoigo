import { ButtonLinkPrimary } from '../../../components/Buttons/Primary-Btn/LinkButtonPrimary';
import { Container } from '../../../components/Containers/Container/Container';
import { LoadingSkeleton } from '../../../components/LoadingSkeletons/LoadingSkeleton';
import { SearchBar } from '../../../components/Serach-Bar/SearchBar';

import routeConstants from '../../../constants/routeConstants';
import styles from './Showcase.module.css';

const { DISCOVER } = routeConstants;

export const Showcase = ({ isLoading }) => {
    return (
        <div className={styles.showcase}>
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className={styles['showcase-image']}>
                    <Container>
                        <div className={styles.intro}>
                            <h1 className={styles.title}>
                                Discover the world. Adventure is out there
                            </h1>
                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                                voluptates.
                            </p>
                            <div className={styles.buttons}>
                                <ButtonLinkPrimary to={DISCOVER.route}>
                                    {DISCOVER.name}
                                </ButtonLinkPrimary>
                            </div>
                            <SearchBar />
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
};
