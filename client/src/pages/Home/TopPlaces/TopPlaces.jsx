import { Container } from '../../../components/Containers/Container/Container';
import { Places } from '../../../components/Places/Places';
import { extractServerErrorMessage } from '../../../utils/utils';

import styles from '../Home.module.css';

export const TopPlaces = ({ places }) => {
    return (
        <section>
            <Container>
                <h2 className={styles.title}>Europe awaits you!</h2>
                {places.error ? (
                    <p>{extractServerErrorMessage(places.error)}</p>
                ) : (
                    <Places places={places.data} />
                )}
            </Container>
        </section>
    );
};
