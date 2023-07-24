import PropTypes from 'prop-types';

import { Adventure, Beach, Culture, Islands, Mountain, Snow } from 'src/utils/icons';
import styles from './CategoriesNav.module.css';

const propTypes = {
    onCategoryClickHandler: PropTypes.func.isRequired,
};

export const CategoriesNav = ({ onCategoryClickHandler }) => {
    return (
        <div className={styles.categories}>
            <div>
                <Adventure
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Adventure')}
                    data-testid="adventure-icon"
                />
                <span>Adventure</span>
            </div>
            <div>
                <Beach
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Beach')}
                    data-testid="beach-icon"
                />
                <span>Beach</span>
            </div>
            <div>
                <Culture
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Cultural')}
                    data-testid="culture-icon"
                />
                <span>Cultural</span>
            </div>
            <div>
                <Islands
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Islands')}
                    data-testid="islands-icon"
                />
                <span>Islands</span>
            </div>
            <div>
                <Mountain
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Mountains')}
                    data-testid="mountain-icon"
                />
                <span>Mountains</span>
            </div>
            <div>
                <Snow
                    className={styles.icon}
                    onClick={() => onCategoryClickHandler('Snow')}
                    data-testid="snow-icon"
                />
                <span>Snow</span>
            </div>
        </div>
    );
};

CategoriesNav.propTypes = propTypes;
