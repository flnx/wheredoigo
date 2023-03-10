import { useDestinations } from '../../hooks/queries/useDestinations';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from '../../components/Sliders/CitiesSlider/CitiesSlider';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { Destinations } from './Destinations/Destinations';

import styles from './Home.module.css';

export const Home = () => {
    const { isLoading, error, data: destinations } = useDestinations();

    if (isLoading) return;

    return (
        <>
            <Showcase />
            <div className={styles.grid}>
                <CitiesSlider destinations={destinations.data.results} />
                <Categories />
                <Destinations />
                <Intro />
            </div>
        </>
    );
};
