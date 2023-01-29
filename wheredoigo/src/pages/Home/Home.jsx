import styles from './Home.module.css';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from './Slider/CitiesSlider';

export const Home = () => {
    return (
        <>
            <Showcase />
            <CitiesSlider />
        </>
    );
};
