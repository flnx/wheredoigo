import { PlacesSlider } from '../../../../components/Sliders/PlacesSlider/PlacesSlider';

import styles from '../../DestinationDetails.module.css';

export const PartySection = ({ places }) => {
    const partyPlaces = places.filter((x) => x.type == 'party');

    const isTherePartyPlaces = partyPlaces.length > 0;

    return (
        isTherePartyPlaces && (
            <section>
                <h3 className={styles.sectionTitle}>Clubs & Pubs</h3>
                <span className={styles.sectionDescription}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Rem, natus.
                </span>
                <PlacesSlider places={partyPlaces} />
            </section>
        )
    );
};
