import { CaretLeft } from '@phosphor-icons/react';

import styles from './Arrows.module.css';

export const LeftArrow = ({ onClickHandler }) => {
    return (
        <div 
            className={styles.leftArrow} 
            onClick={onClickHandler} 
            tabIndex={0}
        >
            <CaretLeft size={32} />
        </div>
    );
};
