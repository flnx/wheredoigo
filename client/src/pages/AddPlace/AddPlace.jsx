import { useParams } from 'react-router-dom';

// React Query Hooks
import { useRequestCreatePlacePermissions } from 'src/hooks/queries/useRequestCreatePlacePermissions';

// Global Hoooks
import { useErrorBoundary } from 'react-error-boundary';

// Custom Hooks
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';

// Global Components
import { DarkOverlay } from 'src/components/DarkOverlay/DarkOverlay';

// Local Components
import { Form } from './Form/Form';

export const AddPlace = () => {
    const { showBoundary } = useErrorBoundary();
    const { destinationId } = useParams();
    const { data, isLoading, error } = useRequestCreatePlacePermissions(destinationId);
    useDocumentTitle(`Add place - ${data?.city || ''}`);

    if (error) {
        showBoundary(error);
        return null;
    }

    return isLoading ? (
        <DarkOverlay isLoading={isLoading} />
    ) : (
        <>
            <Form
                destinationId={destinationId}
                allowedCategories={data.allowedPlaceCategories}
                city={data.city}
            />
        </>
    );
};
