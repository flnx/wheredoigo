import styles from './SomethingBroke.module.css';
import { Container } from '../../Containers/Container/Container';

export const SomethingBroke = () => {
    return (
        <Container>
            <section className={styles.section}>
                <div className={styles.flex}>
                    <div className={styles.imageContainer}>
                        <img src="https://media.tenor.com/Svg4wm7e5JoAAAAC/no-why.gif" />
                    </div>

                    <div className={styles.content}>
                        <h1 className="smaller mb-2">
                            Oops, It Seems Something Went Bonkers!
                        </h1>
                        <p className={styles.text}>
                            Looks like our servers stumbled upon some mischievous gremlins
                            causing a bit of chaos. We've sent our best tech wizards to hunt
                            them down and restore order. While we work our magic, feel free to
                            grab a cup of coffee and contemplate the mysteries of technology.
                            We appreciate your understanding and apologize for the temporary
                            inconvenience. Stay tuned for a triumphant return!
                        </p>
                    </div>
                </div>
            </section>
        </Container>
    );
};
