import { PlacesSlider } from '../../../../components/Sliders/PlacesSlider/PlacesSlider';

import styles from '../../DestinationDetails.module.css';

export const EatSection = ({ places }) => {
    const eatPlaces = places.filter((x) => x.type == 'eat');

    return (
        <section>
            <h3 className={styles.sectionTitle}>Eat</h3>
            <span className={styles.sectionDescription}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem,
                natus.
            </span>
            <PlacesSlider places={eatPlaces} />
        </section>
    );
};
