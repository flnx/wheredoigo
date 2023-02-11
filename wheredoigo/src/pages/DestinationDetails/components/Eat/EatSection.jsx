import { PlacesSlider } from '../../../../components/Sliders/PlacesSlider/PlacesSlider';

import styles from '../../DestinationDetails.module.css';

export const EatSection = ({ places }) => {
    const eatingPlaces = places.filter((x) => x.type == 'eat');

    const isThereEatingPlaces = eatingPlaces.length > 0;

    return (
        isThereEatingPlaces && (
            <section>
                <h3 className={styles.sectionTitle}>Eat</h3>
                <span className={styles.sectionDescription}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Rem, natus.
                </span>
                <PlacesSlider places={eatingPlaces} />
            </section>
        )
    );
};
