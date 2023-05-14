import { CaretRight } from '@phosphor-icons/react';

import styles from './Arrows.module.css';

export const RightArrow = ({ onClickHandler }) => {
    return (
        <div 
            className={styles.rightArrow} 
            onClick={onClickHandler} 
            tabIndex={0}
        >
            <CaretRight size={32} />
        </div>
    );
};
