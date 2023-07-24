import { useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

// React Query Hooks
import { useDestination } from 'src/hooks/queries/useDestination';

// Custom Hooks
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';

// Local Components
import { ImagesSection } from './components/ImagesSection/ImagesSection';
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { DestinationHeader } from './components/Header/Header';

// Global Components
import { Container } from 'src/components/Containers/Container/Container';
import { LinkButtonSecondary } from 'src/components/Buttons/Secondary-Btn/LinkButtonSecondary';

import routeConstants from 'src/constants/routeConstants';
import styles from './DestinationDetails.module.css';

export const DestinationDetails = () => {
    const { showBoundary } = useErrorBoundary();
    const { destinationId } = useParams();
    const { isLoading, error, data } = useDestination(destinationId);
    const { routePath } = routeConstants.PLACES.ADD;
    useDocumentTitle(data?.city);
    
    const destination = data || {};
    const placesData = destination.places || [];
    const imagesData = destination.imageUrls || [];

  
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

                <DestinationHeader 
                    destination={destination} 
                    isLoading={isLoading} 
                />

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
