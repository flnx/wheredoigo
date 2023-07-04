import PropTypes from 'prop-types';

// Components
import { WarningButton } from '../Buttons/Button-Warning/WarningButton';
import { LinkButtonSuccess } from '../Buttons/Success-Button/LinkButtonSuccess';
import { Link } from 'react-router-dom';
import { StarRating } from '../StarRating/StarRating';
import { LoadingSkeleton } from '../LoadingSkeletons/LoadingSkeleton';

import routeConstants from '../../constants/routeConstants';
import styles from './Places.module.css';

const propTypes = {
    places: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    isOwner: PropTypes.bool,
    onDeleteClickHandler: PropTypes.func
};

export const Places = ({ places, isLoading, onDeleteClickHandler, isOwner }) => {
    const { BY_ID } = routeConstants.PLACES;
    
    return (
        <div className={styles['places']}>
            {places.map(({ _id, name, country, city, imageUrl, averageRating }) => (
                <div className={styles.card} key={_id}>
                    <div className={styles.imageContainer}>
                        {isLoading
                            ? <LoadingSkeleton />
                            : <Link to={BY_ID.routePath(_id)}>
                                <img src={imageUrl} alt={name} />
                              </Link>
                        }
                    </div>
                    <section className={styles.content}>
                        <h4 className={styles.placeName}>
                            {isLoading ? <LoadingSkeleton /> : name}
                        </h4>
                        {isLoading 
                            ? <LoadingSkeleton />
                            : <StarRating averageRating={averageRating} size={20}/>
                        }
                        <span className={styles.location}>
                            {isLoading ? <LoadingSkeleton /> : `${city}, ${country}`}
                        </span>
                        {isOwner && !isLoading && (
                            <OwnerButtons
                                _id={_id}
                                onDeleteClickHandler={onDeleteClickHandler}
                                isLoading={isLoading}
                            />
                        )}
                    </section>
                </div>
            ))}
        </div>
    );
};

const OwnerButtons = ({ _id, onDeleteClickHandler }) => {
    const { EDIT } = routeConstants.PLACES;

    return (
        <div className={styles.buttons}>
            <LinkButtonSuccess to={EDIT.routePath(_id)}>
                Edit
            </LinkButtonSuccess>
            <WarningButton onClickHandler={() => onDeleteClickHandler(_id)}>
                Delete
            </WarningButton>
        </div>
    );
};

Places.propTypes = propTypes;
