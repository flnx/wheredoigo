import { useErrorBoundary } from 'react-error-boundary';

// React Query Hook
import { useDestinationsAndPlaces } from "src/hooks/queries/useDestinations";

// Local Components
import { Showcase } from './Showcase/Showcase';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { TopPlaces } from './TopPlaces/TopPlaces';

// Global Components
import { CitiesSlider } from 'src/components/Sliders/CitiesSlider/CitiesSlider';

import styles from './Home.module.css';

export const Home = () => {
    const [destinations, places, isLoading, serverError] = useDestinationsAndPlaces();
    const { showBoundary } = useErrorBoundary();

    const allowedCategories = destinations.data?.allowedCategories || [];

    if (serverError) {
        showBoundary(destinations.error);
        return null;
    }

    return (
        <>
            <Showcase isLoading={isLoading} />
            <div className={styles.grid}>
                <CitiesSlider destinationsData={destinations} isLoading={isLoading} />
                <Categories categories={allowedCategories} isLoading={isLoading} />
                <TopPlaces places={places} isLoading={isLoading} />
                <Intro isLoading={isLoading} />
            </div>
        </>
    );
};
