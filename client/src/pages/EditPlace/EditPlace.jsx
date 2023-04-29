import { useParams } from 'react-router-dom';
import { useGetPlaceToEdit } from '../../hooks/queries/useGetPlaceToEdit';
import { useDeletePlaceImage } from '../../hooks/queries/useDeletePlaceImage';
import { useAddPlaceNewImages } from '../../hooks/queries/useAddPlaceNewImages';

// Components
import { Container } from '../../components/Containers/Container/Container';
import { Form } from './components/Form/Form';
import { FlexSectionContainer } from '../../components/Containers/FlexSectionContainer/FlexSectionContainer';
import { ImagesManager } from '../../components/ImagesManager/ImagesManager';

import { extractServerErrorMessage } from '../../utils/utils';

export const EditPlace = () => {
    const { placeId } = useParams();
    const [data, error, isLoading, isSuccess] = useGetPlaceToEdit(placeId);
    const deleteImageHook = useDeletePlaceImage;
    const addImageHook = useAddPlaceNewImages;

    const placeTitle = `${data?.name}, ${data?.city}`;

    return (
        <Container>
            {isSuccess && (
                <>
                    <h1 className="smaller mb-2">Edit {placeTitle}</h1>

                    <FlexSectionContainer>
                        <Form data={data} placeId={placeId} destinationId={data._id} />
                        <ImagesManager
                            imagesData={data.imageUrls}
                            _id={placeId}
                            _id2={destinationId}
                            deleteImageHook={deleteImageHook}
                            addImageHook={addImageHook}
                        />
                    </FlexSectionContainer>
                </>
            )}

            {isLoading && <h1>Loading...</h1>}
            {error && extractServerErrorMessage(error)}
        </Container>
    );
};
