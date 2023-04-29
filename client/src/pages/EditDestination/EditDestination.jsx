import { useParams } from 'react-router-dom';
import { useGetDestinationToEdit } from '../../hooks/queries/useGetDestinationToEdit';

// Components
import { FlexSectionContainer } from '../../components/FlexSectionContainer/FlexSectionContainer';
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { EditImages } from './components/EditImages/EditImages';
import { Form } from './components/Form/Form';

import { extractServerErrorMessage } from '../../utils/utils';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const [data, error, isLoading] = useGetDestinationToEdit(destinationId);

    if (error) return <h1>{extractServerErrorMessage(error)}</h1>;

    const destinationTitle = `${data?.city}, ${data?.country}`;

    return (
        <div className="container">
            {isLoading || !data ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className="smaller mb-2">Edit {destinationTitle}</h1>
                    <FlexSectionContainer>
                        <Form data={data} destinationId={destinationId} />

                        <EditImages
                            imagesData={data.imageUrls}
                            destinationId={destinationId}
                        />
                    </FlexSectionContainer>
                    <PlacesShowcase placesData={data.places} destinationId={destinationId} />
                </>
            )}
        </div>
    );
};
