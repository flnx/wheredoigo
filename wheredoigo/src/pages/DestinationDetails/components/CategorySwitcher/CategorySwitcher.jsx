import { CategoriesNav } from '../../../../components/CategoriesNav/CategoriesNav';
import styles from './CategorySwitcher.module.css';

export const CategorySwitcher = () => {
    return (
        <section className={styles.wrapper}>
            <span className={styles.category}>Fun</span>
            <span className={styles.category}>Events</span>
            <span className={styles.category}>Transport</span>
            <span className={styles.category}>Attractions</span>
        </section>
    );
};