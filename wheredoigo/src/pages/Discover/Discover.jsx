import { ContinentsNav } from '../../components/ContinentsNav/ContinentsNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { CitiesSlider } from '../Home/Slider/CitiesSlider';

import styles from './Discover.module.css';

export const Discover = () => {
    return (
        <div className="container">
            <div className={styles.grid}>
                <h1>Where do you want to go?</h1>

                <section className={styles.searchBar}>
                    <SearchBar />
                </section>

                <section className={styles.continents}>
                    <ContinentsNav />
                </section>

                <CitiesSlider />

              


                <section className={styles.categories}>
                    <h2>Popular Categories</h2>
                </section>

                <section className={styles.places}>
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <img
                                src="http://localhost:5173/src/assets/pictures/cities/berlin/1.jpg"
                                alt="travel place"
                            />
                            <h3 className={styles.cardTitle}>
                                Random Place Republic
                            </h3>
                            <p className={styles.cardContent}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Vitae, ab!
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
