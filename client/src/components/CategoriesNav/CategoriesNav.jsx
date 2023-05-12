import styles from './CategoriesNav.module.css';

import { Adventure, Beach, Culture, Islands, Mountain, Snow } from '../../utils/icons';

export const CategoriesNav = () => {
    return (
        <div className={styles.categories}>
            <div>
                <Adventure className={styles.icon} />
                <span>Adventure</span>
            </div>
            <div>
                <Beach className={styles.icon} />
                <span>Beach</span>
            </div>
            <div>
                <Culture className={styles.icon} />
                <span>Culture</span>
            </div>
            <div>
                <Islands className={styles.icon} />
                <span>Islands</span>
            </div>
            <div>
                <Mountain className={styles.icon} />
                <span>Mountains</span>
            </div>
            <div>
                <Snow className={styles.icon} />
                <span>Snow</span>
            </div>
        </div>
    );
};
