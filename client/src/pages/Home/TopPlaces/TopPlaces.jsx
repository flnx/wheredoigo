import { Container } from '../../../components/Containers/Container/Container';
import { Places } from '../../../components/Places/Places';
import styles from './TopPlaces.module.css';

export const TopPlaces = () => {
    return (
        <section>
            <Container>
                <h2 className={styles.title}>European places you may wanna check out</h2>
                <Places />
            </Container>
        </section>
    );
};
