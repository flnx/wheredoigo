import styles from './HashTagCategories.module.css';
import { X } from '@phosphor-icons/react';

export const HashTagCategories = ({ tags = [], onHashTagClickHandler }) => {
    return (
        <div className={styles['hash-tags']}>
            {tags.map((tag) => (
                <div
                    key={tag}
                    className={styles.tag}
                    onClick={() => onHashTagClickHandler(tag)}
                >
                    <div className={styles.header}>
                        <X size={16} className={styles.icon} />
                    </div>
                    <span className={styles.text}>#{tag}</span>
                </div>
            ))}
        </div>
    );
};