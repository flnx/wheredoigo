import PropTypes from 'prop-types';

// Components
import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '../../LoadingSkeletons/LoadingSkeleton';

import routeConstants from '../../../constants/routeConstants';
import styles from './CitiesSlider.module.css';

const propTypes = {
    destination: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const SliderCard = ({ destination, isLoading }) => {
    const { imageUrls, city, country, _id } = destination;
    const { routePath } = routeConstants.DESTINATIONS.BY_ID;

    const loadingClass = `${isLoading ? styles.pointersDisabled : null}`;

    return (
        <Link to={routePath(_id)} className={loadingClass}>
            <div className={styles.imageContainer}>
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <img src={imageUrls} alt={city} className={styles.image} />
                )}
            </div>
            {isLoading ? (
                <div className={styles.loading}>
                    <h3><LoadingSkeleton /></h3>
                    <p><LoadingSkeleton /></p>
                </div>
            ) : (
                <div className={styles.cardBody}>
                    <section className={styles.content}>
                        <h3>{city}</h3>
                        <p className={styles.country}>{country?.name || country}</p>
                        <div className={styles.contentLikes}>
                            <div className={styles.userAvatars}>
                                <img src="https://randomuser.me/api/portraits/women/91.jpg" alt="test" />
                                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="test" className={styles.avatar2}/>
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" alt="test" className={styles.avatar3}/>
                            </div>
                            <p className={styles.likedBy}>Liked by {'McMuffinAndRoflCopter'.slice(0, 12)} and 5 others</p>
                        </div>
                    </section>
                </div>
            )}
        </Link>
    );
};

SliderCard.propTypes = propTypes;
