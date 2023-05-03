import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';
import { extractServerErrorMessage } from '../../utils/utils';

// components
import { DestinationHeader } from './components/Header/Header';
import { SectionSlider } from './components/ExploreSection/SectionSlider';
import { Container } from '../../components/Containers/Container/Container';
import { LinkButtonSecondary } from '../../components/Buttons/Secondary-Btn/LinkButtonSecondary';

import routeConstants from '../../constants/routeConstants';
import styles from './DestinationDetails.module.css';
const { PLACES, DESTINATIONS } = routeConstants;

export const DestinationDetails = () => {
    const { destinationId } = useParams();
    const { isLoading, error, data } = useDestination(destinationId);

    const explorePlaces = data?.places.filter((x) => x.type.toLowerCase() == 'explore');
    const partyPlaces = data?.places.filter((x) => x.type.toLowerCase() == 'party');
    const eatingPlaces = data?.places.filter((x) => x.type.toLowerCase() == 'eat');

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
                            <DestinationHeader destination={data} pageRoute={pageRoute}/>

                            {data.isOwner && (
                                <LinkButtonSecondary to={PLACES.ADD.routePath(destinationId)}>
                                    Add More Places
                                </LinkButtonSecondary>
                            )}

                            {explorePlaces.length > 0 && (
                                <SectionSlider
                                    places={explorePlaces}
                                    type={'Explore'}
                                    description={'lorem ipsum 10 and lorem ipsum 25'}
                                />
                            )}

                            {partyPlaces.length > 0 && (
                                <SectionSlider
                                    places={partyPlaces}
                                    type={'Party'}
                                    description={'lorem ipsum 10 and lorem ipsum 25'}
                                />
                            )}

                            {eatingPlaces.length > 0 && (
                                <SectionSlider
                                    places={eatingPlaces}
                                    type={'Eat'}
                                    description={'lorem ipsum 10 and lorem ipsum 25'}
                                />
                            )}
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};
