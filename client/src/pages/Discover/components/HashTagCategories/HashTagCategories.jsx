import styles from './HashTagCategories.module.css';
import { X } from '@phosphor-icons/react';

export const HashTagCategories = ({ categories = [], onHashTagClickHandler }) => {
    const handleHashTagClick = (hashTag) => {
        onHashTagClickHandler({
            // removes the clicked hashtag (category)
            category: categories.filter((tag) => tag !== hashTag),
        });
    };

    return (
        <div className={styles['hash-tags']}>
            {categories.map((category) => (
                <div
                    key={category}
                    className={styles.tag}
                    onClick={() => handleHashTagClick(category)}
                >
                    <div className={styles.header}>
                        <X size={16} className={styles.icon} />
                    </div>
                    <span className={styles.text}>#{category}</span>
                </div>
            ))}
        </div>
    );
};