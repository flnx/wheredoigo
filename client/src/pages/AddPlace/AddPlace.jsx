import { useParams } from 'react-router-dom';
import { useRequestCreatePlacePermissions } from '../../hooks/queries/useRequestCreatePlacePermissions';
import { useErrorBoundary } from 'react-error-boundary';

import { Form } from './Form/Form';
import { DarkOverlay } from '../../components/DarkOverlay/DarkOverlay';

export const AddPlace = () => {
    const { showBoundary } = useErrorBoundary();
    const { destinationId } = useParams();
    const { data, isLoading, error } = useRequestCreatePlacePermissions(destinationId);

    if (error) {
        showBoundary(error);
        return null;
    }

    return isLoading ? (
        <DarkOverlay isLoading={isLoading} />
    ) : (
        <Form destinationId={destinationId} allowedCategories={data} />
    );
};
