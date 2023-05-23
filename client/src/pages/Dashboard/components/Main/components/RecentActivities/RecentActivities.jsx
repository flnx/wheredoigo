import { Link } from 'react-router-dom';
import styles from './RecentActivities.module.css';

export const RecentActivities = ({ activities }) => {
    const { comments, likes, creations, hasNoActivity } = activities;
    const userName = 'Fln';

    return (
        <div>
            <h3 className={styles.title}>Recent activities</h3>
            {hasNoActivity && (
                <p className={styles.text}>You don't have any recent activities.</p>
            )}
            <div className={styles.container}>
                <section>
                    {comments.map(({ destinationId, city }) => (
                        <Activity
                            _id={destinationId}
                            name={city}
                            user={userName}
                            text={'commented and rated'}
                            key={destinationId}
                        />
                    ))}
                </section>

                <section>
                    {likes.map(({ destinationId, city }) => (
                        <Activity
                            _id={destinationId}
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
                            _id={destinationId}
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

const Activity = ({ _id, name, user, text }) => {
    return (
        <p className={styles.text} key={_id}>
            <span className={styles.user}>{user}</span> {text}{' '}
            <Link to={`/destinations/${_id}`} className={styles.destination}>
                {name}
            </Link>
        </p>
    );
};
