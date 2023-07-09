import { useEffect, useState } from 'react';
import { extractServerErrorMessage } from '../../utils/utils';

import styles from './ServerError.module.css';

export const ServerError = ({ errorMessage }) => {
    const [isVisible, setIsVisible] = useState(true);

    // const error = extractServerErrorMessage(errorMessage);
    const error = 'An Error has occured. Please Please excuse us an try again '
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsVisible(false);
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);

    return isVisible ? <span className={styles.serverError}>{error}</span> : null;
};
