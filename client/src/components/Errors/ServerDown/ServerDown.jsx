import styles from './ServerDown.module.css';
import { Container } from 'src/components/Containers/Container/Container';

const ServerDown = () => {
    return (
        <Container>
            <section className={styles.section}>
                <div className={styles.flex}>
                    <div className={styles.imageContainer}>
                        <img
                            src="https://media2.giphy.com/media/PD9hjqdeidgqY/giphy.gif?cid=ecf05e470g5kz51tq5cxqe4ndu9abk3j6wn4gegvw39auko0&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                            alt="cap america cant figure out why servers are down"
                        />
                    </div>

                    <div className={styles.content}>
                        <h1 className="smaller mb-2">
                            Oops, Our Servers Went on a Coffee Break!
                        </h1>
                        <p className={styles.text}>
                            Don't worry, they'll be back soon, fully caffeinated and ready to
                            serve you. In the meantime, feel free to take a break yourself or
                            try refreshing the page like it's a magic spell.
                        </p>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default ServerDown;