import { Container } from '../../../components/Containers/Container/Container';
import styles from './Categories.module.css';
import homeStyles from '../Home.module.css';

export const Categories = () => {
    return (
        <section>
            <Container>
                <h2 className={homeStyles.title}>Have something in mind..?</h2>
                <div className={styles.categories}>
                    <Category>Lake</Category>
                    <Category>Beach</Category>
                    <Category>Mountain</Category>
                    <Category>History</Category>
                    <Category>Snow</Category>
                    <Category>Summer</Category>
                </div>
            </Container>
        </section>
    );
};

export const Category = ({ children: categoryName }) => {
    return (
        <div className={styles.card}>
            <span>{categoryName}</span>
        </div>
    );
};
