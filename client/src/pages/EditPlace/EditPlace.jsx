import { useParams } from 'react-router-dom';
import { useGetPlaceToEdit } from '../../hooks/queries/useGetPlaceToEdit';
import { useDeletePlaceImage } from '../../hooks/queries/useDeletePlaceImage';
import { useAddPlaceNewImages } from '../../hooks/queries/useAddPlaceNewImages';
import { useErrorBoundary } from 'react-error-boundary';

// Components
import { Container } from '../../components/Containers/Container/Container';
import { Form } from './components/Form/Form';
import { FlexSectionContainer } from '../../components/Containers/FlexSectionContainer/FlexSectionContainer';
import { ImagesManager } from '../../components/ImagesManager/ImagesManager';
import { TextWrap } from '../../components/TextWrap/TextWrap';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

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
