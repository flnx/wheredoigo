import { useDestinationsAndPlaces } from '../../hooks/queries/useDestinations';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from '../../components/Sliders/CitiesSlider/CitiesSlider';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { TopPlaces } from './TopPlaces/TopPlaces';

import { extractServerErrorMessage } from '../../utils/utils';
import styles from './Home.module.css';

export const Home = () => {
    const [destinations, places] = useDestinationsAndPlaces();

    const isLoading = destinations.isLoading || places.isLoading;
    const allowedCategories = destinations.data?.allowedCategories || [];

    const serverError = destinations.error && places.error;

    return (
        <>
            <Showcase isLoading={isLoading} />
            {serverError ? (
                <h2 className="server-error">{extractServerErrorMessage(destinations.error)}</h2>
            ) : (
                <div className={styles.grid}>
                    <CitiesSlider destinationsData={destinations} isLoading={isLoading} />
                    <Categories categories={allowedCategories} isLoading={isLoading} />
                    <TopPlaces placesData={places} isLoading={isLoading} />
                    <Intro isLoading={isLoading} />
                </div>
            )}
        </>
    );
};
