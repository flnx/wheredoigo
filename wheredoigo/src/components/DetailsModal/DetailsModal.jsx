import { useNavigate, useOutletContext } from 'react-router-dom';

import styles from './DetailsModal.module.css';

export const DetailsModal = () => {
    const information = useOutletContext();
    const navigate = useNavigate();

    const closeModalHandler = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className={styles.modal} onClick={closeModalHandler}>
            <h3>Lorem Ipsum</h3>
            <p>{information}</p>
        </div>
    );
};
