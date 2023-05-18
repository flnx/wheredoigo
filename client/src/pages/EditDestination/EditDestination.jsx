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
import { TextWrap } from '../../components/TextWrap/TextWrap';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const [data, error, isLoading] = useGetDestinationToEdit(destinationId);
    const deleteImageHook = useDeleteDestinationImage;
    const addImageHook = useAddDestinationNewImages;

    const destinationTitle = `${data?.city}, ${data?.country}`;

    return (
        <Container>
            <>
                <h1 className="smaller mb-2">
                    <TextWrap isLoading={isLoading} content={`Edit ${destinationTitle}`} />
                </h1>
                <FlexSectionContainer>
                    <Form
                        description={data?.description}
                        details={data?.details}
                        destinationId={destinationId}
                        isLoading={isLoading}
                    />

                    <ImagesManager
                        imagesData={data?.imageUrls || []}
                        destinationId={destinationId}
                        deleteImageHook={deleteImageHook}
                        addImageHook={addImageHook}
                        isLoading={isLoading}
                    />
                </FlexSectionContainer>
            </>

            <PlacesShowcase
                places={data?.places || []}
                destinationId={destinationId}
                isLoading={isLoading}
            />

            {error && extractServerErrorMessage(error)}
        </Container>
    );
};
