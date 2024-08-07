import { useNavigate } from 'react-router-dom';
import { ButtonLinkPrimary } from 'src/components/Buttons/Primary-Btn/LinkButtonPrimary';
import { Container } from 'src/components/Containers/Container/Container';
import { LoadingSkeleton } from 'src/components/LoadingSkeletons/LoadingSkeleton';
import { SearchBar } from 'src/components/Serach-Bar/SearchBar';

import routeConstants from 'src/constants/routeConstants';
import styles from './Showcase.module.css';

export const Showcase = ({ isLoading }) => {
    const navigate = useNavigate();
    const { DISCOVER } = routeConstants;

    const onSubmitHandler = (searchParam) => {
        if (!searchParam) return;

        navigate(`${DISCOVER.route}?search=${searchParam}`);
    };

    return (
        <div className={styles.showcase}>
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className={styles['showcase-image']}>
                    <Container>
                        <div className={styles.intro}>
                            <h1 className={styles.title}>
                                Discover the world Adventure is out there
                            </h1>
                            <p className={styles.description}>
                                Uncover boundless adventures as you explore the world around
                                you. The thrill awaits!
                            </p>
                            <div className={styles.buttons}>
                                <ButtonLinkPrimary to={DISCOVER.route}>
                                    {DISCOVER.name}
                                </ButtonLinkPrimary>
                            </div>
                            <SearchBar searchParamsSubmitHandler={onSubmitHandler} />
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
};
