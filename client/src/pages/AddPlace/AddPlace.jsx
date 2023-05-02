import { useNavigate, useParams } from 'react-router-dom';
import { useRequestCreatePlacePermissions } from '../../hooks/queries/useRequestCreatePlacePermissions';

import { Form } from './Form/Form';

export const AddPlace = () => {
    const { destinationId } = useParams();
    const permissions = useRequestCreatePlacePermissions(destinationId);
    const navigate = useNavigate();

    if (permissions.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (permissions.error) {
        navigate(-1, { replace: true });
        return null;
    }

    return <Form destinationId={destinationId} />;
};
