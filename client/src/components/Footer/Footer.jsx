import { Container } from '../Containers/Container/Container';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.wrapper}>
                    <section className={styles.intro}>
                        <h3 className={styles.title}> Where Do I Go?</h3>
                        <p className={styles.link}>
                            We always strive to make our customers happy by providing the best
                            choices possible!
                        </p>
                        <div className="socials">
                            <span>X</span>
                            <span>Y</span>
                            <span>Z</span>
                        </div>
                    </section>
                    <section className={styles.about}>
                        <h3 className={styles.title}>About</h3>
                        <p className={styles.link}>About us</p>
                        <p className={styles.link}>FAQ</p>
                        <p className={styles.link}>Terms and Conditions</p>
                    </section>
                    <section className={styles.company}>
                        <h3 className={styles.title}>Company</h3>
                        <p className={styles.link}>Why "Where Do I Go?"</p>
                        <p className={styles.link}>Our Team</p>
                        <p className={styles.link}>Lorem Ipsum</p>
                    </section>
                    <section className={styles.newsletter}>
                        <h3 className={styles.title}>
                            Stay in touch with our weekly newsletter
                        </h3>
                        <input type="search" name="" id="" />
                    </section>
                </div>
            </Container>
        </footer>
    );
};
