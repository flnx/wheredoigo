import { PrimaryButton } from '../../../components/Buttons/Primary-Btn/PrimaryButton';
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
                        <PrimaryButton>Discover</PrimaryButton>
                    </div>
                    <SearchBar />
                </div>
            </Container>
        </div>
    );
};
