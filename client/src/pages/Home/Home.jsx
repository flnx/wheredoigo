import { useErrorBoundary } from 'react-error-boundary';
import { useDestinationsAndPlaces } from '../../hooks/queries/useDestinations';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from '../../components/Sliders/CitiesSlider/CitiesSlider';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { TopPlaces } from './TopPlaces/TopPlaces';

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
