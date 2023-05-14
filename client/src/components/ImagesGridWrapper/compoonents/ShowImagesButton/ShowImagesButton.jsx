import styles from './ShowImagesButton.module.css';
import { Image } from '@phosphor-icons/react';

export const ShowImagesButton = ({ onClickHandler }) => {
    return (
        <div className={styles['button-wrapper']}>
            <button className={styles.btn} onClick={() => onClickHandler(mainImage)}>
                <span className={styles.imgIcon}>
                    <Image size={20} />
                </span>
                <span>Show all images</span>
            </button>
        </div>
    );
};
