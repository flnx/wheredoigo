import { useDestinations } from '../../hooks/queries/useDestinations';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from '../../components/Sliders/CitiesSlider/CitiesSlider';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { Destinations } from './Destinations/Destinations';

import { extractServerErrorMessage } from '../../utils/utils';

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
                    <Destinations />
                    <Intro />
                </div>
            )}
        </>
    );
};
