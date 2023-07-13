import { useEffect, useState } from 'react';
import { extractServerErrorMessage } from '../../utils/utils';

import styles from './ServerErrorPopUp.module.css';

export const ServerErrorPopUp = ({ errorMessage }) => {
    const [isVisible, setIsVisible] = useState(true);

    
    let error = errorMessage;
    
    if (typeof errorMessage !== 'string') {
        error = extractServerErrorMessage(error);
    }
    
    console.log(error);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return isVisible ? <span className={styles.serverError}>{error}</span> : null;
};
