import { useDestinations } from '../../hooks/queries/useDestinations';
import { extractServerErrorMessage } from '../../utils/utils';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from '../../components/Sliders/CitiesSlider/CitiesSlider';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { TopPlaces } from './TopPlaces/TopPlaces';

import styles from './Home.module.css';

export const Home = () => {
    const { isLoading, error, data: destinations } = useDestinations();

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <>
            <Showcase />
            {error ? (
                <p>{extractServerErrorMessage(error)}</p>
            ) : (
                <div className={styles.grid}>
                    <CitiesSlider destinations={destinations} />
                    <Categories />
                    <TopPlaces />
                    <Intro />
                </div>
            )}
        </>
    );
};
