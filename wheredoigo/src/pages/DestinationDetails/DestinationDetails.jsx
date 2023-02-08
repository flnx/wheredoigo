import { useParams } from 'react-router-dom';
import { PlacesSlider } from '../../components/Sliders/PlacesSlider/PlacesSlider';
import { StarRating } from '../../components/StarRating/StarRating';
import { useDestination } from '../../hooks/queries/useDestination';

import styles from './DestinationDetails.module.css';

export const DestinationDetails = () => {
    const { destinationId } = useParams();

    const { destination, isLoading, error } = useDestination(destinationId);

    // todo add spinner and error handling overlay
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;

    return (
        <div className="container">
            <section className={styles.destination}>
                <img src={destination.imageUrl.url} alt={destination.city} />

                <header className={styles.header}>
                    <div className={styles.flex}>
                        <h1>{destination.city}</h1>
                        <StarRating rating={5} />
                    </div>
                    <p>{destination.country}</p>
                </header>

                <article className={styles.descriptionSection}>
                    <h3>Overview</h3>
                    <p>{destination.description}</p>
                </article>

                <section className={styles.staySection}>
                    <h3>Stay</h3>
                    <PlacesSlider />
                </section>

                <section className={styles.exploreSection}>
                    <h3>Explore</h3>
                    <PlacesSlider />
                </section>

                <section className={styles.eatSection}>
                    <h3>Eat</h3>
                    <PlacesSlider />
                </section>

            </section>
        </div>
    );
};
