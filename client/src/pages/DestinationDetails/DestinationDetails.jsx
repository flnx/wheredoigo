import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';
import { extractServerErrorMessage } from '../../utils/utils';

// components
import { DestinationHeader } from './components/Header/Header';
import { SectionSlider } from './components/ExploreSection/SectionSlider';
import { TipsPopUp } from '../../components/TipsPopUp/TipsPopUp';
import { Container } from '../../components/Containers/Container/Container';
import { LinkButtonSecondary } from '../../components/Buttons/Secondary-Btn/LinkButtonSecondary';

import styles from './DestinationDetails.module.css';

export const DestinationDetails = () => {
    const { destinationId } = useParams();
    const { isLoading, error, data } = useDestination(destinationId);

    const explorePlaces = data?.places.filter((x) => x.type.toLowerCase() == 'explore');
    const partyPlaces = data?.places.filter((x) => x.type.toLowerCase() == 'party');
    const eatingPlaces = data?.places.filter((x) => x.type.toLowerCase() == 'eat');

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
                            <DestinationHeader destination={data} />
                            <TipsPopUp details={data.details} />

                            {data.isOwner && (
                                <LinkButtonSecondary to={'places/add'}>
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
