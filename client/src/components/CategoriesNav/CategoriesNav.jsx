import styles from './CategoriesNav.module.css';

import { Adventure, Beach, Culture, Islands, Mountain, Snow } from '../../utils/icons';

export const CategoriesNav = () => {
    return (
        <div className={styles.categories}>
            <Adventure />
            <Beach />
            <Culture />
            <Islands />
            <Mountain />
            <Snow />
        </div>
    );
};
