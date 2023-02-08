import { PlacesSlider } from '../../../../components/Sliders/PlacesSlider/PlacesSlider';

import styles from '../../DestinationDetails.module.css';

export const StaySection = () => {
    return (
        <section>
            <h3 className={styles.sectionTitle}>Stay</h3>
            <span className={styles.sectionDescription}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem,
                natus.
            </span>
            <PlacesSlider />
        </section>
    );
};
