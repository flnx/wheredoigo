import { Container } from '../../../components/Containers/Container/Container';
import styles from './Categories.module.css';
import homeStyles from '../Home.module.css';

export const Categories = ({ categories = [] }) => {
    return (
        <section>
            <Container>
                <h2 className={homeStyles.title}>Have something in mind..?</h2>
                <div className={styles.categories}>
                    {categories.map((categoryName) => (
                        <Category
                            key={categoryName}
                        >
                            {categoryName}
                        </Category>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export const Category = ({ children: categoryName }) => {
    return (
        <div className={`${styles.card} ${styles[categoryName]}`}>
            <span>{categoryName}</span>
        </div>
    );
};
