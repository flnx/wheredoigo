import styles from './Destination.module.css';

export const Destination = () => {
    return (
        <div className={styles.destination}>
            <img
                src="https://images.pexels.com/photos/61381/pexels-photo-61381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="travel place"
                className={styles.image}
            />
            <h3 className={styles.title}>Random Place Republic</h3>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                ab!
            </p>
        </div>
    );
};
