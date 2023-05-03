import { useNavigate, useOutletContext } from 'react-router-dom';
import { Overlay } from '../Overlay/Overlay';

import styles from './DetailsModal.module.css';

export const DetailsModal = () => {
    const destinationInfoTips = useOutletContext();
    const navigate = useNavigate();

    if (!destinationInfoTips) {
        return navigate(-1, { replace: true });
    }

    const closeModalHandler = () => {
        navigate(-1, { replace: true });
    };

    return (
        <Overlay closeModalHandler={closeModalHandler}>
            {destinationInfoTips.info.map((x) => (
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
