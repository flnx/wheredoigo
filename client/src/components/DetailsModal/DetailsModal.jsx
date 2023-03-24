import { useEffect } from 'react';
import { Navigate, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';

import { Overlay } from '../Overlay/Overlay';

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
            <Overlay closeModalHandler={closeModalHandler}>
                {destinationInfoTips.info.map((x) => (
                    <TipsTemplate tip={x} key={x._id} />
                ))}
            </Overlay>
        </div>
    );
};

const TipsTemplate = ({ tip }) => {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{tip.title}</h3>
            <p>{tip.description}</p>
        </div>
    );
};
