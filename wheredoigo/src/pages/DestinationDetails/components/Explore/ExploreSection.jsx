import { PlacesSlider } from '../../../../components/Sliders/PlacesSlider/PlacesSlider';

import styles from '../../DestinationDetails.module.css';

export const ExploreSection = ({ places }) => {
    const explorePlaces = places.filter((x) => x.type == 'explore');

    return (
        <section>
            <h3 className={styles.sectionTitle}>Explore</h3>
            <span className={styles.sectionDescription}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem,
                natus.
            </span>
            <PlacesSlider places={explorePlaces} />
        </section>
    );
};
