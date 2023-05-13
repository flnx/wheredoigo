import { useDestinationsAndPlaces } from '../../hooks/queries/useDestinations';
import { extractServerErrorMessage } from '../../utils/utils';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from '../../components/Sliders/CitiesSlider/CitiesSlider';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { TopPlaces } from './TopPlaces/TopPlaces';
import { LoadingSkeleton } from '../../components/LoadingSkeletons/LoadingSkeleton';

import styles from './Home.module.css';

export const Home = () => {
    const [destinations, places] = useDestinationsAndPlaces();

    const isLoading = destinations.isLoading || places.isLoading;

    return (
        <>
            <Showcase isLoading={true} />
            <div className={styles.grid}>
                {destinations.error ? (
                    <p>{extractServerErrorMessage(destinations.error)}</p>
                ) : (
                    <CitiesSlider 
                        destinations={destinations?.data?.result} 
                        isLoading={true} 
                    />
                )}
                <Categories categories={destinations?.data?.allowedCategories} />
                <TopPlaces places={places} />

                <Intro />
            </div>
        </>
    );
};
