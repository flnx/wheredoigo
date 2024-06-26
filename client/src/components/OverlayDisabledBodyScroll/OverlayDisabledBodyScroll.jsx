// Components
import { X } from '@phosphor-icons/react';
import { DarkOverlay } from '../DarkOverlay/DarkOverlay';

import styles from './OverlayDisabledBodyScroll.module.css';

export const OverlayDisabledBodyScroll = ({ children, closeModalHandler }) => {
    return (
        <>
            <DarkOverlay onClickHandler={closeModalHandler}/>
            <div className={styles.wrapper}>
                <X
                    size={32}
                    onClick={closeModalHandler}
                    className={styles.closeIcon}
                />
                {children}
            </div>
        </>
    );
};
