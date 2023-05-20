import styles from './CreatorData.module.css';

export const CreatorData = () => {
    return (
        <section>
            <h3 className={styles.title}>Destinations</h3>
            <div className={styles['flex-container']}>
                <Card title={'Created'} num={15} />
                <Card title={'Favorites'} num={500} />
                <Card title={'Comments'} num={300} />
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
