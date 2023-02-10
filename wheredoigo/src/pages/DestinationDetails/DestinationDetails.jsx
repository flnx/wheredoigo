import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';

// components
import { DestinationHeader } from './components/Header/Header';
import { EatSection } from './components/Eat/EatSection';
import { ExploreSection } from './components/Explore/ExploreSection';
import { ClubsAndPubsSection } from './components/Stay/ClubsAndPubsSection';

import styles from './DestinationDetails.module.css';
import { CategorySwitcher } from './components/CategorySwitcher/CategorySwitcher';

export const DestinationDetails = () => {
    const { destinationId } = useParams();

    const { destinationData, placeData } = useDestination(destinationId);

    const {
        data: destination,
        isLoading: isDestinationDataLoading,
        error: destinationFetchError,
    } = destinationData;

    const {
        data: destinationPlaces,
        isLoading: isPlacesDataLoading,
        error: placesFetchError,
    } = placeData;

    // todo add spinner and error handling overlay

    if (isPlacesDataLoading || isDestinationDataLoading) return <h1>Loading...</h1>;
    if (destinationFetchError || placesFetchError) return <h1>An Error Has Occured</h1>;

    console.log(destinationPlaces);

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <DestinationHeader destination={destination.data} />
                <CategorySwitcher />
                <ExploreSection destination={destination.data} />
                <EatSection destination={destination.data} />
                <ClubsAndPubsSection destination={destination.data} />
            </div>
        </div>
    );
};
