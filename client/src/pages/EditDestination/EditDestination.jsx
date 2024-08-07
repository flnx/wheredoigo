import { useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

// React Query Hooks
import { useGetDestinationToEdit } from 'src/hooks/queries/useGetDestinationToEdit';
import { useDeleteDestinationImage } from 'src/hooks/queries/useDeleteDestinationImage';
import { useAddDestinationNewImages } from 'src/hooks/queries/useAddDestinationNewImages';

// Custom Hooks
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';

// Local Components
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { Form } from './components/Form/Form';

// Global Components
import { Container } from 'src/components/Containers/Container/Container';
import { FlexSectionContainer } from 'src/components/Containers/FlexSectionContainer/FlexSectionContainer';
import { ImagesManager } from 'src/components/ImagesManager/ImagesManager';
import { TextWrap } from 'src/components/TextWrap/TextWrap';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const { showBoundary } = useErrorBoundary();
    
    // React Query hooks
    const [data, error, isLoading] = useGetDestinationToEdit(destinationId);
    const deleteImageHook = () => useDeleteDestinationImage(destinationId);
    const addImageHook = () => useAddDestinationNewImages(destinationId);
    useDocumentTitle(`Edit ${data?.city}`);

    const destinationTitle = `${data?.city}, ${data?.country}`;

    if (error) {
        showBoundary(error);
        return null;
    }

    return (
        <Container>
            <h1 className="smaller mb-2">
                <TextWrap isLoading={isLoading} content={`Edit ${destinationTitle}`} />
            </h1>
            <FlexSectionContainer>
                <Form
                    categories={data?.category}
                    description={data?.description}
                    details={data?.details}
                    allowedCategories={data?.allowedCategories}
                    destinationId={destinationId}
                    isLoading={isLoading}
                />

                <ImagesManager
                    imagesData={data?.imageUrls || []}
                    deleteImageHook={deleteImageHook}
                    addImageHook={addImageHook}
                    isLoading={isLoading}
                />
            </FlexSectionContainer>

            <PlacesShowcase
                places={data?.places || []}
                destinationId={destinationId}
                isLoading={isLoading}
            />
        </Container>
    );
};
