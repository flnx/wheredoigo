import { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { CaretLeft } from '@phosphor-icons/react';

import styles from './Arrows.module.css';

export const LeftArrow = () => {
    const { onLeftArrowClickHandler } = useContext(GalleryContext);
    return (
        <div
            className={styles.leftArrow}
            onClick={onLeftArrowClickHandler}
            tabIndex={0}
        >
            <CaretLeft size={32} />
        </div>
    );
};
