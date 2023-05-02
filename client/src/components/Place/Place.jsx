// Components
import { WarningButton } from '../Buttons/Button-Warning/WarningButton';
import { LinkButtonSuccess } from '../Buttons/Success-Button/LinkButtonSuccess';
import { Link } from 'react-router-dom';

import routeConstants from '../../constants/routeConstants';
import styles from './Place.module.css';

const { BY_ID, EDIT } = routeConstants.PLACES;

export const Place = ({ place, onDeleteClickHandler }) => {
    const { _id, name, country, imageUrl } = place;

    return (
        <div className={styles['card']}>
            <div className={styles.imageContainer}>
                <Link to={BY_ID.routePath(_id)}>
                    <img src={imageUrl} alt={name} />
                </Link>
            </div>
            <section className={styles.content}>
                <h4 className={styles.placeName}>{name}</h4>
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
