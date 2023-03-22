import { PlacesSlider } from '../../../../components/Sliders/PlacesSlider/PlacesSlider';

import styles from '../../DestinationDetails.module.css';

export const SectionSlider = ({ places, type, description }) => {
    return (
        <section>
            <h3 className={styles.sectionTitle}>{type}</h3>
            <span className={styles.sectionDescription}>{description}</span>
            <PlacesSlider places={places} />
        </section>
    );
};
