import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';

// components
import { DestinationHeader } from './components/Header/Header';
import { EatSection } from './components/Eat/EatSection';
import { ExploreSection } from './components/Explore/ExploreSection';
import { ClubsAndPubsSection } from './components/ClubsSection/ClubsAndPubsSection';
import { CategorySwitcher } from './components/CategorySwitcher/CategorySwitcher';

import styles from './DestinationDetails.module.css';

export const DestinationDetails = () => {
    const { destinationId } = useParams();
    const { destination, places } = useDestination(destinationId);

    if (places.isLoading || destination.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (destination.error || places.error) {
        return <h1>An Error Has Occured</h1>;
    }

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <DestinationHeader destination={destination.data} />
                <CategorySwitcher />
                <ExploreSection places={places.data} />
                <EatSection places={places.data} />
                <ClubsAndPubsSection places={places.data} />
            </div>
        </div>
    );
};
