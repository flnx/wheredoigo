import { useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

// Custom Hooks
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';

// React Query Hooks
import { useGetPlaceToEdit } from 'src/hooks/queries/useGetPlaceToEdit';
import { useDeletePlaceImage } from 'src/hooks/queries/useDeletePlaceImage';
import { useAddPlaceNewImages } from 'src/hooks/queries/useAddPlaceNewImages';


// Local Components
import { Form } from './components/Form/Form';

// Global Components
import { Container } from 'src/components/Containers/Container/Container';
import { FlexSectionContainer } from 'src/components/Containers/FlexSectionContainer/FlexSectionContainer';
import { ImagesManager } from 'src/components/ImagesManager/ImagesManager';
import { TextWrap } from 'src/components/TextWrap/TextWrap';

export const EditPlace = () => {
    const { placeId } = useParams();
    const { showBoundary } = useErrorBoundary();

    const [data, error, isLoading] = useGetPlaceToEdit(placeId);
    const deleteImageHook = () => useDeletePlaceImage(placeId, data?.destinationId);
    const addImageHook = () => useAddPlaceNewImages(placeId, data?.destinationId);
    useDocumentTitle(`Edit ${data?.name}`);

    const placeTitle = `${data?.name}, ${data?.city}`;

    if (error) {
        showBoundary(error);
        return null;
    }

    return (
        <Container mb={3}>
            <h1 className="smaller mb-2">
                <TextWrap isLoading={isLoading} content={`Edit ${placeTitle}`} />
            </h1>

            <FlexSectionContainer>
                <Form
                    data={data || {}}
                    placeId={placeId}
                    destinationId={data?.destinationId}
                    isLoading={isLoading}
                />
                <ImagesManager
                    imagesData={data?.imageUrls || []}
                    deleteImageHook={deleteImageHook}
                    addImageHook={addImageHook}
                    isLoading={isLoading}
                />
            </FlexSectionContainer>
        </Container>
    );
};
