import { useParams } from 'react-router-dom';
import { useGetDestinationToEdit } from '../../hooks/queries/useGetDestinationToEdit';
import { useDeleteDestinationImage } from '../../hooks/queries/useDeleteDestinationImage';
import { useAddDestinationNewImages } from '../../hooks/queries/useAddDestinationNewImages';

// Components
import { Container } from '../../components/Containers/Container/Container';
import { FlexSectionContainer } from '../../components/Containers/FlexSectionContainer/FlexSectionContainer';
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { Form } from './components/Form/Form';
import { ImagesManager } from '../../components/ImagesManager/ImagesManager';

import { extractServerErrorMessage } from '../../utils/utils';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const [data, error, isLoading, isSuccess] = useGetDestinationToEdit(destinationId);
    const deleteImageHook = useDeleteDestinationImage;
    const addImageHook = useAddDestinationNewImages;

    const destinationTitle = `${data?.city}, ${data?.country}`;

    return (
        <Container>
            {isSuccess && (
                <>
                    <h1 className="smaller mb-2">Edit {destinationTitle}</h1>
                    <FlexSectionContainer>
                        <Form data={data} destinationId={destinationId} />

                        <ImagesManager
                            imagesData={data.imageUrls}
                            _id={destinationId}
                            deleteImageHook={deleteImageHook}
                            addImageHook={addImageHook}
                        />
                    </FlexSectionContainer>

                    <PlacesShowcase places={data.places} destinationId={destinationId} />
                </>
            )}

            {isLoading && <h1>Loading...</h1>}
            {error && extractServerErrorMessage(error)}
        </Container>
    );
};
