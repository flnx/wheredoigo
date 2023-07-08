import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPlaceToEdit } from '../../hooks/queries/useGetPlaceToEdit';
import { useDeletePlaceImage } from '../../hooks/queries/useDeletePlaceImage';
import { useAddPlaceNewImages } from '../../hooks/queries/useAddPlaceNewImages';

// Components
import { Container } from '../../components/Containers/Container/Container';
import { Form } from './components/Form/Form';
import { FlexSectionContainer } from '../../components/Containers/FlexSectionContainer/FlexSectionContainer';
import { ImagesManager } from '../../components/ImagesManager/ImagesManager';
import { TextWrap } from '../../components/TextWrap/TextWrap';

import routeConstants from '../../constants/routeConstants';
import { extractServerErrorMessage } from '../../utils/utils';

export const EditPlace = () => {
    const { placeId } = useParams();
    const navigate = useNavigate();

    const [data, error, isLoading] = useGetPlaceToEdit(placeId);
    const deleteImageHook = () => useDeletePlaceImage(placeId, data?.destinationId);
    const addImageHook = () => useAddPlaceNewImages(placeId, data?.destinationId);

    const placeTitle = `${data?.name}, ${data?.city}`;

    useEffect(() => {
        if (error) {
            const { routePath } = routeConstants.PLACES.BY_ID;
            navigate(routePath(placeId), { replace: true });
        }
    }, [error]);

    return (
        <Container mb={3}>
            {error ? (
                extractServerErrorMessage(error)
            ) : (
                <>
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
                </>
            )}
        </Container>
    );
};
