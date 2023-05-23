import { AuthContext } from '../../../../../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import routeConstants from '../../../../../../constants/routeConstants';
import styles from './RecentActivities.module.css';

export const RecentActivities = ({ activities }) => {
    const { comments, likes, creations, hasNoActivity } = activities;
    const { DESTINATIONS, PLACES } = routeConstants;
    const { auth } = useContext(AuthContext);

    console.log(auth);
    const userName = 'Fln';

    return (
        <div>
            <h3 className={styles.title}>Recent activities</h3>
            {hasNoActivity && (
                <p className={styles.text}>You don't have any recent activities.</p>
            )}
            <div className={styles.container}>
                <section>
                    {comments.map(({ placeId, name }) => (
                        <Activity
                            path={PLACES.BY_ID.routePath(placeId)}
                            name={name}
                            user={userName}
                            text={'commented and rated'}
                            key={placeId}
                        />
                    ))}
                </section>

                <section>
                    {likes.map(({ destinationId, city }) => (
                        <Activity
                            path={DESTINATIONS.BY_ID.routePath(destinationId)}
                            name={city}
                            user={userName}
                            text={'likes'}
                            key={destinationId}
                        />
                    ))}
                </section>

                <section>
                    {creations.map(({ destinationId, city }) => (
                        <Activity
                            path={DESTINATIONS.BY_ID.routePath(destinationId)}
                            name={city}
                            user={userName}
                            text={'created'}
                            key={destinationId}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
};

const Activity = ({ name, user, text, path }) => {
    return (
        <p className={styles.text}>
            <span className={styles.user}>{user}</span> {text}{' '}
            <Link to={path} className={styles.destination}>
                {name}
            </Link>
        </p>
    );
};
