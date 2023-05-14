import { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { CaretRight } from '@phosphor-icons/react';

import styles from './Arrows.module.css';

export const RightArrow = () => {
    const { onRightArrowClickHandler } = useContext(GalleryContext);
    return (
        <div
            className={styles.rightArrow}
            onClick={onRightArrowClickHandler}
            tabIndex={0}
        >
            <CaretRight size={32} />
        </div>
    );
};
