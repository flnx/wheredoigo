import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { Overlay } from '../Overlay/Overlay';

import styles from './DetailsModal.module.css';

export const DetailsModal = () => {
    const context = useOutletContext();
    const navigate = useNavigate();

    const { route } = context;

    console.log(context);

    useEffect(() => {
        if (!context) {
            return navigate(route, { replace: true });
        }
    }, [context]);

    const closeModalHandler = () => {
        navigate(route, { replace: true });
    };

    if (!context) return;

    return (
        <Overlay closeModalHandler={closeModalHandler}>
            {context.info.map((x) => (
                <TipsTemplate tip={x} key={x._id} />
            ))}
        </Overlay>
    );
};

const TipsTemplate = ({ tip }) => {
    return (
        <div className={styles.tips}>
            <h3 className={styles.title}>{tip.title}</h3>
            <p className={styles.description}>{tip.description}</p>
        </div>
    );
};
