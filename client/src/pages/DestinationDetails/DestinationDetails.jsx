import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';
import { extractServerErrorMessage } from '../../utils/utils';

// Components
import { ImagesSection } from './components/ImagesSection/ImagesSection';
import { DestinationHeader } from './components/Header/Header';
import { PlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';
import { Container } from '../../components/Containers/Container/Container';
import { LinkButtonSecondary } from '../../components/Buttons/Secondary-Btn/LinkButtonSecondary';

import routeConstants from '../../constants/routeConstants';
import styles from './DestinationDetails.module.css';

export const DestinationDetails = () => {
    const { destinationId } = useParams();
    const { isLoading, error, data } = useDestination(destinationId);

    const placesData = data?.places || [];
    const imagesData = data?.imageUrls || [];

    // page routes
    const { PLACES, DESTINATIONS } = routeConstants;
    const pageRoute = DESTINATIONS.BY_ID.routePath(destinationId);

    return (
        <Container>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error ? (
                        <h1>{extractServerErrorMessage(error)}</h1>
                    ) : (
                        <div className={styles.wrapper}>
                            <ImagesSection
                                imageUrls={imagesData}
                                city={data?.city}
                                isLoading={isLoading}
                            />
                            <DestinationHeader destination={data} pageRoute={pageRoute} />

                            {data.isOwner && (
                                <LinkButtonSecondary to={PLACES.ADD.routePath(destinationId)}>
                                    Add More Places
                                </LinkButtonSecondary>
                            )}

                            <PlacesShowcase places={placesData} isLoading={isLoading} />
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};
