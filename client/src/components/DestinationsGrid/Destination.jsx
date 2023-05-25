import { Link } from 'react-router-dom';
import { WarningButton } from '../Buttons/Button-Warning/WarningButton';
import { LinkButtonSuccess } from '../Buttons/Success-Button/LinkButtonSuccess';

import styles from './DestinationsGrid.module.css';
import routeConstants from '../../constants/routeConstants';

export const Destination = ({ destination, onDeleteClickHandler, isEditable, background }) => {
    const { _id, city, country, imageUrls } = destination;
    const { BY_ID, EDIT } = routeConstants.DESTINATIONS;

    const style = background ? { background } : {};

    return (
        <div className={styles['card']} style={style}>
            <div className={styles.imageContainer}>
                <Link to={BY_ID.routePath(_id)}>
                    <img src={imageUrls} alt={city} />
                </Link>
            </div>
            <section className={styles.content}>
                <h3>{city}</h3>
                <p>{country.name || country}</p>
                {isEditable && (
                    <div className={styles.buttons}>
                        <LinkButtonSuccess to={EDIT.routePath(_id)}>Edit</LinkButtonSuccess>
                        <WarningButton onClickHandler={() => onDeleteClickHandler(_id)}>
                            Delete
                        </WarningButton>
                    </div>
                )}
            </section>
        </div>
    );
};
