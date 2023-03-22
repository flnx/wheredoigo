import { useEffect } from 'react';
import { Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import { X } from 'phosphor-react';

import styles from './DetailsModal.module.css';

export const DetailsModal = () => {
    const destinationInfoTips = useOutletContext();
    const navigate = useNavigate();
    const { destinationId } = useParams();

    if (!destinationInfoTips) {
        return <Navigate to={`/destinations/${destinationId}`} replace />;
    }

    useEffect(() => {
        disableBodyScroll();

        return () => enableBodyScroll();
    }, []);

    const closeModalHandler = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={closeModalHandler} />
            <div className={styles.wrapper}>
                <X
                    size={32}
                    weight="duotone"
                    onClick={closeModalHandler}
                    className={styles.closeIcon}
                />
                {destinationInfoTips.info.map((x) => (
                    <TipsTemplate tip={x} key={x._id} />
                ))}
            </div>
        </div>
    );
};

const TipsTemplate = ({ tip }) => {
    return (
        <div className={styles.tip}>
            <h3 className={styles.tipTitle}>{tip.title}</h3>
            <p>{tip.description}</p>
        </div>
    );
};
