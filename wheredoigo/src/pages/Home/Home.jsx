import styles from './Home.module.css';

// Components
import { Showcase } from './Showcase/Showcase';
import { CitiesSlider } from './Slider/CitiesSlider';
import { Categories } from './Categories/Categories';

export const Home = () => {
    return (
        <>
            <Showcase />
            <div className="container">
                <CitiesSlider />
                <Categories />
            </div>
        </>
    );
};
