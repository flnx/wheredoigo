import styles from './UserDashboardData.module.css';

export const UserLastActivities = ({ dashboardData }) => {
    const { countComments, countCreated, countFavorites } = dashboardData;

    return (
        <section>
            <h3 className={styles.title}>Destinations</h3>
            <div className={styles['flex-container']}>
                <Card title={'Created'} num={countCreated} />
                <Card title={'Favorites'} num={countComments} />
                <Card title={'Comments'} num={countFavorites} />
            </div>
        </section>
    );
};

const Card = ({ title, num }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>{title}</div>
            <hr className={styles.divider} />
            <div className={styles.number}>{num}</div>
        </div>
    );
};
