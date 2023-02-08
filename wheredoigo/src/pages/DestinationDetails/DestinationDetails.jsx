import { useParams } from 'react-router-dom';
import { useDestination } from '../../hooks/queries/useDestination';

// components
import { DestinationHeader } from './components/Header/Header';
import { EatSection } from './components/Eat/EatSection';
import { ExploreSection } from './components/Explore/ExploreSection';
import { StaySection } from './components/Stay/StaySection';

import styles from './DestinationDetails.module.css';
import { CategorySwitcher } from './components/CategorySwitcher/CategorySwitcher';

export const DestinationDetails = () => {
    const { destinationId } = useParams();

    const { destination, isLoading, error } = useDestination(destinationId);

    // todo add spinner and error handling overlay
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <DestinationHeader destination={destination} />
                <CategorySwitcher />
                <ExploreSection destination={destination} />
                <EatSection destination={destination} />
                <StaySection destination={destination} />
            </div>
        </div>
    );
};
