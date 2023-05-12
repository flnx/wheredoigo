import styles from './CategoriesNav.module.css';

import { Adventure, Beach, Culture, Islands, Mountain, Snow } from '../../utils/icons';

export const CategoriesNav = () => {
    return (
        <div className={styles.categories}>
            <div className={styles.icon}>
                <Adventure />
            </div>
            <div className={styles.icon}>
                <Beach />
            </div>
            <div className={styles.icon}>
                <Culture />
            </div>
            <div className={styles.icon}>
                <Islands />
            </div>
            <div className={styles.icon}>
                <Mountain />
            </div>
            <div className={styles.icon}>
                <Snow />
            </div>
        </div>
    );
};
