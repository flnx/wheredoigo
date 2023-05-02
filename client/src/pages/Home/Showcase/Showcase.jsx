import { ButtonLinkPrimary } from '../../../components/Buttons/Primary-Btn/LinkButtonPrimary';
import { Container } from '../../../components/Containers/Container/Container';
import { SearchBar } from '../../../components/Serach-Bar/SearchBar';
import styles from './Showcase.module.css';

export const Showcase = () => {
    return (
        <div className={styles.showcase}>
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
                        <ButtonLinkPrimary to="/discover">Discover</ButtonLinkPrimary>
                    </div>
                    <SearchBar />
                </div>
            </Container>
        </div>
    );
};
