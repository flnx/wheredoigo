import styles from './Home.module.css';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from './Slider/CitiesSlider';
import { Categories } from './Categories/Categories';
import { Intro } from './Intro/Intro';
import { Destinations } from './Destinations/Destinations';

export const Home = () => {
    return (
        <>
            <Showcase />
            <div className={styles.grid}>
                <CitiesSlider />
                <Categories />
                <Destinations />
                <Intro />
            </div>
        </>
    );
};
