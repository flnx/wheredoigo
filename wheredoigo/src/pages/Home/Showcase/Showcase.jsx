import styles from './Showcase.module.css';

export const Showcase = () => {
    return (
        <div className={styles.showcase}>
            <section>
                <div className="container">
                    <div className={styles.intro}>
                        <h1>Discover the world. Adventure is out there</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ex, voluptates.
                        </p>
                        <div className="buttons">
                            <button>Discover</button>
                            <button>Discover</button>
                        </div>
                        <div className="search-bar">
                            <input type="search" name="" placeholder='search a city, country, place'/>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div className={styles['image-container']}></div> */}
        </div>
    );
};
