import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.wrapper}>
                    <section className={styles.intro}>
                        <h3> Where Do I Go?</h3>
                        <p>
                            We always strive to make our customers happy by
                            providing the best choices possible!
                        </p>
                        <div className="socials">
                            <span>X</span>
                            <span>Y</span>
                            <span>Z</span>
                        </div>
                    </section>
                    <section className={styles.about}>
                        <h3>About</h3>
                        <p>About us</p>
                        <p>FAQ</p>
                    </section>
                    <section className={styles.company}>
                        <h3>Company</h3>
                        <p>Why "Where Do I Go?"</p>
                        <p>Our Team</p>
                    </section>
                    <section className={styles.newsletter}>
                        <h3>Stay in touch with our weekly newsletter</h3>
                        <input type="search" name="" id="" />
                    </section>
                </div>
            </div>
        </footer>
    );
};
