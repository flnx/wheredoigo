import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { CitiesSlider } from '../Home/Slider/CitiesSlider';

export const Discover = () => {
    return (
        <div className="container">
            <div className="grid">
                <h1>Where do you want to go?</h1>
                <section className="searchBar">
                    <SearchBar />
                </section>

                <section className="continentsSlider">
                    <span>All</span>
                    <span>Europe</span>
                    <span>Asia</span>
                    <span>America</span>
                    <span>Oceania</span>
                    <span>Africa</span>
                </section>

                <CitiesSlider />

                <section className="categories">
                    <h2>Popular Categories</h2>
                    <div className="categories__wrapper">
                        <span>X</span>
                        <span>X</span>
                        <span>X</span>
                        <span>X</span>
                        <span>X</span>
                        <span>X</span>
                    </div>
                </section>

                <section className="places">
                    <div className="cards">
                        <div className="card">
                            <img src="http://localhost:5173/src/assets/pictures/cities/berlin/1.jpg" alt="travel place" />
                            <h3 className="title">Random Place Republic</h3>
                            <p className="c">
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
