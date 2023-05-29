import { AuthContext } from '../../../../../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import routeConstants from '../../../../../../constants/routeConstants';
import styles from './RecentActivities.module.css';

export const RecentActivities = ({ activities }) => {
    const { comments, likes, hasNoActivity } = activities;
    const { DESTINATIONS, PLACES } = routeConstants;

    return (
        <section>
            <h3 className={styles.title}>Recent activities</h3>
            {hasNoActivity && (
                <p className={styles.text}>You don't have any recent activities.</p>
            )}
            <div className={styles.container}>
                {comments
                    .slice()
                    .reverse()
                    .map(({ placeId, name, date, time }) => (
                        <Activity
                            path={PLACES.BY_ID.routePath(placeId)}
                            name={name}
                            text={'commented and rated'}
                            key={placeId}
                            date={date}
                            time={time}
                        />
                    ))}

                {likes
                    .slice()
                    .reverse()
                    .map(({ destinationId, city, date, time }) => (
                        <Activity
                            path={DESTINATIONS.BY_ID.routePath(destinationId)}
                            name={city}
                            text={'likes'}
                            key={destinationId}
                            date={date}
                            time={time}
                        />
                    ))}
            </div>
        </section>
    );
};

const Activity = ({ name, text, path, date, time }) => {
    const { auth } = useContext(AuthContext);
    const userName = auth.username;

    return (
        <section className={styles.activity}>
            <div className={styles.time}>
                <span>{date}</span>
                <time className={styles.hour}>{time.slice(0, 5)}</time>
            </div>
            <p className={styles.text}>
                <span className={styles.user}>{userName}</span> {text}{' '}
                <Link to={path} className={styles.destination}>
                    {name}
                </Link>
            </p>
        </section>
    );
};
