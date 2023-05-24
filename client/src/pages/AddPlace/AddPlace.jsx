import { useNavigate, useParams } from 'react-router-dom';
import { useRequestCreatePlacePermissions } from '../../hooks/queries/useRequestCreatePlacePermissions';

import { Form } from './Form/Form';
import { DarkOverlay } from '../../components/DarkOverlay/DarkOverlay';

export const AddPlace = () => {
    const { destinationId } = useParams();
    const { data, isLoading, error } = useRequestCreatePlacePermissions(destinationId);
    const navigate = useNavigate();

    if (error) {
        navigate(-1, { replace: true });
        return null;
    }

    return isLoading ? (
        <DarkOverlay isLoading={isLoading} />
    ) : (
        <Form destinationId={destinationId} allowedCategories={data} />
    );
};
