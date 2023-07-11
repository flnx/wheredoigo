import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';
import { useErrorBoundary } from 'react-error-boundary';

// Components
import { ImagesSection } from './components/ImagesSection/ImagesSection';
import { DestinationHeader } from './components/Header/Header';
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { Container } from '../../components/Containers/Container/Container';
import { LinkButtonSecondary } from '../../components/Buttons/Secondary-Btn/LinkButtonSecondary';

import routeConstants from '../../constants/routeConstants';
import styles from './DestinationDetails.module.css';

export const DestinationDetails = () => {
    const { showBoundary } = useErrorBoundary();
    const { destinationId } = useParams();
    const { isLoading, error, data } = useDestination(destinationId);
    const { routePath } = routeConstants.PLACES.ADD;

    const destination = data || {};
    const placesData = destination?.places || [];
    const imagesData = destination?.imageUrls || [];

    if (error) {
        showBoundary(error);
        return null;
    }

    return (
        <Container>
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
        </Container>
    );
};
