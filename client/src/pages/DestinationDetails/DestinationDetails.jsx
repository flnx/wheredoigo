import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';
import { extractServerErrorMessage } from '../../utils/utils';

// Components
import { ImagesSection } from './components/ImagesSection/ImagesSection';
import { DestinationHeader } from './components/Header/Header';
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { Container } from '../../components/Containers/Container/Container';
import { LinkButtonSecondary } from '../../components/Buttons/Secondary-Btn/LinkButtonSecondary';
import { NotFound } from '../../components/NotFound/NotFound';

import routeConstants from '../../constants/routeConstants';
import styles from './DestinationDetails.module.css';

export const DestinationDetails = () => {
    const { destinationId } = useParams();
    const { isLoading, error, data } = useDestination(destinationId);
    const { routePath } = routeConstants.PLACES.ADD;

    const destination = data || {};
    const placesData = destination?.places || [];
    const imagesData = destination?.imageUrls || [];

    if (error && error?.response.status == 404) {
        return <NotFound />;
    }

    return (
        <Container>
            {error ? (
                <h1>{extractServerErrorMessage(error)}</h1>
            ) : (
                <div className={styles.wrapper}>
                    <ImagesSection
                        imageUrls={imagesData}
                        city={destination.city}
                        isLoading={isLoading}
                    />

                    <DestinationHeader destination={destination} isLoading={isLoading} />

                    {!isLoading && data.isOwner && (
                        <LinkButtonSecondary to={routePath(destinationId)}>
                            Add More Places
                        </LinkButtonSecondary>
                    )}

                    <PlacesShowcase places={placesData} isLoading={isLoading} />
                </div>
            )}
        </Container>
    );
};
