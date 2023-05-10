// Components
import { WarningButton } from '../Buttons/Button-Warning/WarningButton';
import { LinkButtonSuccess } from '../Buttons/Success-Button/LinkButtonSuccess';
import { Link } from 'react-router-dom';

import routeConstants from '../../constants/routeConstants';
import styles from './Places.module.css';
import { StarRating } from '../StarRating/StarRating';

const { BY_ID, EDIT } = routeConstants.PLACES;

export const Places = ({ places = [], onDeleteClickHandler, isOwner }) => {
    return (
        <div className={styles['places']}>
            {places.map(({ _id, name, country, city, imageUrl, averageRating }) => (
                <div className={styles.card} key={_id}>
                    <div className={styles.imageContainer}>
                        <Link to={BY_ID.routePath(_id)}>
                            <img src={imageUrl} alt={name} />
                        </Link>
                    </div>
                    <section className={styles.content}>
                        <h4 className={styles.placeName}>{name}</h4>
                        {averageRating !== undefined && <StarRating averageRating={averageRating} />}
                        <span className={styles.location}>
                            {city}, {country}
                        </span>
                        {isOwner && (
                            <div className={styles.buttons}>
                                <LinkButtonSuccess to={EDIT.routePath(_id)}>
                                    Edit
                                </LinkButtonSuccess>
                                <WarningButton
                                    onClickHandler={() => onDeleteClickHandler(_id)}
                                >
                                    Delete
                                </WarningButton>
                            </div>
                        )}
                    </section>
                </div>
            ))}
        </div>
    );
};
