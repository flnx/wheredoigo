// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { ContinentsNav } from '../../components/ContinentsNav/ContinentsNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { CitiesSlider } from '../Home/Slider/CitiesSlider';
import { Destinations } from '../../components/Destinations/Destinations';

import styles from './Discover.module.css';

export const Discover = () => {
    return (
        <div className="container">
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>

                <SearchBar />
                <ContinentsNav />
                <CitiesSlider />
                <CategoriesNav />
                <Destinations />
            </div>
        </div>
    );
};
