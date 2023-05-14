import { useDestinationsAndPlaces } from '../../hooks/queries/useDestinations';
import { extractServerErrorMessage } from '../../utils/utils';

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

    const destinationsData = destinations?.data?.result || [];
    const placesData = places?.data || [];
    const allowedCategories = destinations?.data?.allowedCategories || [];

    return (
        <>
            <Showcase isLoading={isLoading} />
            <div className={styles.grid}>
                {destinations.error ? (
                    <p>{extractServerErrorMessage(destinations.error)}</p>
                ) : (
                    <CitiesSlider 
                        destinations={destinationsData} 
                        isLoading={isLoading} 
                    />
                )}
                <Categories categories={allowedCategories} isLoading={isLoading}/>
                <TopPlaces places={placesData} />

                <Intro />
            </div>
        </>
    );
};
