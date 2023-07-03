import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';

import { ClipLoader, PulseLoader } from 'react-spinners';

import styles from './DarkOverlay.module.css';

export const DarkOverlay = ({ onClickHandler, isLoading, text }) => {
    useEffect(() => {
        disableBodyScroll();

        return () => enableBodyScroll();
    }, []);

    return (
        <div className={styles.overlay} onClick={onClickHandler} data-testid="overlay">
            {text ? (
                <p className={styles.text}>
                    {text}
                    <span className={styles.pulseLoader}>
                        <PulseLoader color="#36d7b7" size={10} />
                    </span>
                </p>
            ) : (
                isLoading && (
                    <ClipLoader
                        color="#36d7b7"
                        size={40}
                        loading={isLoading}
                        aria-label="Loading Spinner"
                    />
                )
            )}
        </div>
    );
};
