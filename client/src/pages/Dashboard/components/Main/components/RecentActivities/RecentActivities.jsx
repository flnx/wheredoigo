import styles from './RecentActivities.module.css';

const simulator = {
    commented: [
        { _id: 1, name: 'Place Name 1' },
        { _id: 2, name: 'Place Name 2' },
        { _id: 3, name: 'Place Name 3' },
    ],
    liked: [
        { _id: 1, name: 'Dest Name 1' },
        { _id: 2, name: 'Dest Name 2' },
        { _id: 3, name: 'Dest Name 3' },
    ],
    created: [
        { _id: 1, name: 'Dest Name 1' },
        { _id: 2, name: 'Dest Name 2' },
        { _id: 3, name: 'Dest Name 3' },
    ],
};

export const RecentActivities = () => {
    const { commented, liked, created } = simulator;
    const userName = 'Fln';

    return (
        <div>
            <h3 className={styles.title}>Recent activities</h3>

            <div className={styles.container}>
                <section>
                    {commented.map(({ _id, name }) => (
                        <Activity
                            _id={_id}
                            name={name}
                            user={userName}
                            text={'commented and rated'}
                            key={_id}
                        />
                    ))}
                </section>

                <section>
                    {liked.map(({ _id, name }) => (
                        <Activity
                            _id={_id}
                            name={name}
                            user={userName}
                            text={'likes'}
                            key={_id}
                        />
                    ))}
                </section>

                <section>
                    {created.map(({ _id, name }) => (
                        <Activity
                            _id={_id}
                            name={name}
                            user={userName}
                            text={'created'}
                            key={_id}
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
            <span className={styles.destination}>{name}</span>
        </p>
    );
};
