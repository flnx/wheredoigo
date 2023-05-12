import styles from './CategoriesNav.module.css';

import { Adventure, Beach, Culture, Islands, Mountain, Snow } from '../../utils/icons';

export const CategoriesNav = ({ onCategoryClickHandler }) => {
    return (
        <div className={styles.categories}>
            <div>
                <Adventure
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Adventure')}
                />
                <span>Adventure</span>
            </div>
            <div>
                <Beach
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Beach')}
                />
                <span>Beach</span>
            </div>
            <div>
                <Culture
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Cultural')}
                />
                <span>Cultural</span>
            </div>
            <div>
                <Islands
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Islands')}
                />
                <span>Islands</span>
            </div>
            <div>
                <Mountain
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Mountains')}
                />
                <span>Mountains</span>
            </div>
            <div>
                <Snow
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Snow')}
                />
                <span>Snow</span>
            </div>
        </div>
    );
};
