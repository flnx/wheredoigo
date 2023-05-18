import { useEffect, useState } from "react";
import styles from './ServerError.module.css';

export const ServerError = ({errorMessage}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return isVisible ? <span className={styles.serverError}>{errorMessage}</span> : null;
};
