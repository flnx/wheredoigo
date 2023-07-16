import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { OverlayDisabledBodyScroll } from '../OverlayDisabledBodyScroll/OverlayDisabledBodyScroll';

import styles from './DetailsModal.module.css';

export const DetailsModal = () => {
    const context = useOutletContext();
    const navigate = useNavigate();

    const { pageRoute } = context;

    useEffect(() => {
        if (!context) {
            return navigate(pageRoute, { replace: true });
        }
    }, [context]);

    const closeModalHandler = () => {
        navigate(pageRoute, { replace: true });
    };

    if (!context) return;

    return (
        <OverlayDisabledBodyScroll closeModalHandler={closeModalHandler}>
            <div className={styles.tips}>
                <h3 className={styles.title}>{tip.context.name}</h3>
                <p className={styles.description}>{context.content}</p>
            </div>
        </OverlayDisabledBodyScroll>
    );
};
