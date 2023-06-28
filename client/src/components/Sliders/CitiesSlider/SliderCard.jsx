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
    const { imageUrls, city, country, _id, likesCount, lastUserLikes } = destination;
    const { routePath } = routeConstants.DESTINATIONS.BY_ID;

    const loadingClass = `${isLoading ? styles.pointersDisabled : null}`;

    const likedByMsg = likedByMessage({ lastUserLikes, likesCount });

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
                                {lastUserLikes?.slice(0, 3).map((user, i) => (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.username}
                                        key={user.username + i}
                                        className={styles[`avatar${i}`]}
                                    />
                                ))}
                            </div>
                            <p className={styles.likedBy}>{likedByMsg}</p>
                        </div>
                    </section>
                </div>
            )}
        </Link>
    );
};

const likedByMessage = ({ lastUserLikes, likesCount }) => {
    if (lastUserLikes) {
        const lastUsernameLike = lastUserLikes?.slice(0, 3).at(-1).username?.slice(0, 12);
        const totalLikesWithoutLastOne = likesCount - 1;
        const likedByOtherMsg = likesCount - 1 == 1 ? 'other' : 'others';
        const likedByMessage = `Liked By ${lastUsernameLike} and ${totalLikesWithoutLastOne} ${likedByOtherMsg}`;

        return likedByMessage;
    }

    return null;
};

SliderCard.propTypes = propTypes;
