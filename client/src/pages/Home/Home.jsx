import { useDestinationsAndPlaces } from '../../hooks/queries/useDestinations';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from '../../components/Sliders/CitiesSlider/CitiesSlider';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { TopPlaces } from './TopPlaces/TopPlaces';

import styles from './Home.module.css';

export const Home = () => {
    const [destinations, places] = useDestinationsAndPlaces();

    const isLoading = destinations.isLoading || places.isLoading;
    const allowedCategories = destinations?.data?.allowedCategories || [];

    return (
        <>
            <Showcase isLoading={isLoading} />
            <div className={styles.grid}>
                <CitiesSlider destinationsData={destinations} isLoading={isLoading} />
                <Categories categories={allowedCategories} isLoading={isLoading} />
                <TopPlaces placesData={places} isLoading={isLoading} />
                <Intro isLoading={isLoading} />
            </div>
        </>
    );
};
