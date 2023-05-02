import { useNavigate, useOutletContext } from 'react-router-dom';
import { Overlay } from '../Overlay/Overlay';

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
        <div style={{ marginBottom: '1rem', padding: '1rem 1.5rem' }}>
            <h3 style={{ marginBottom: '0.85rem' }}>{tip.title}</h3>
            <p>{tip.description}</p>
        </div>
    );
};
