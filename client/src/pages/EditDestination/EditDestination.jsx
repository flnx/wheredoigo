import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDestinationToEdit } from '../../hooks/queries/useGetDestinationToEdit';
import { useDeleteDestinationImage } from '../../hooks/queries/useDeleteDestinationImage';
import { useAddDestinationNewImages } from '../../hooks/queries/useAddDestinationNewImages';

// Components
import { Container } from '../../components/Containers/Container/Container';
import { FlexSectionContainer } from '../../components/Containers/FlexSectionContainer/FlexSectionContainer';
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { Form } from './components/Form/Form';
import { ImagesManager } from '../../components/ImagesManager/ImagesManager';
import { TextWrap } from '../../components/TextWrap/TextWrap';

import { extractServerErrorMessage } from '../../utils/utils';
import routeConstants from '../../constants/routeConstants';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const navigate = useNavigate();
    const [data, error, isLoading] = useGetDestinationToEdit(destinationId);
    const deleteImageHook = () => useDeleteDestinationImage(destinationId);
    const addImageHook = () => useAddDestinationNewImages(destinationId);

    const destinationTitle = `${data?.city}, ${data?.country}`;

    useEffect(() => {
        if (error) {
            const { routePath } = routeConstants.DASHBOARD.MY_DESTINATIONS;
            navigate(routePath, { replace: true });
        }
    }, [error]);

    return (
        <Container>
            <>
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
