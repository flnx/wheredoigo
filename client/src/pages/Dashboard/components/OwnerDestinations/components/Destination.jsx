import { Link } from 'react-router-dom';
import { WarningButton } from '../../../../../components/Buttons/Button-Warning/WarningButton';
import { LinkButtonSuccess } from '../../../../../components/Buttons/Success-Button/LinkButtonSuccess';

import routeConstants from '../../../../../constants/routeConstants';
import styles from './Destination.module.css';

const { BY_ID, EDIT } = routeConstants.DESTINATIONS;

export const Destination = ({ destination, onDeleteClickHandler }) => {
    const { _id, city, country, imageUrls } = destination;

    return (
        <div className={styles['card']}>
            <div className={styles.imageContainer}>
                <Link to={BY_ID.routePath(_id)}>
                    <img src={imageUrls} alt={city} />
                </Link>
            </div>
            <section className={styles.content}>
                <h3>{city}</h3>
                <p>{country}</p>
                <div className={styles.buttons}>
                    <LinkButtonSuccess to={EDIT.routePath(_id)}>
                        Edit
                    </LinkButtonSuccess>
                    <WarningButton onClickHandler={() => onDeleteClickHandler(_id)}>
                        Delete
                    </WarningButton>
                </div>
            </section>
        </div>
    );
};
