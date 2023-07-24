import { Container } from 'src/components/Containers/Container/Container';
import styles from './Forbidden.module.css';

const Forbidden = () => {
    return (
        <Container>
            <section className={styles.section}>
                <div className={styles.flex}>
                    <div className={styles.imageContainer}>
                        <img
                            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2EzNnh5cGQ0ZjdrZ2tucm40MGFoamFkcHpndXJ0b3o1cG5mazhpZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cjnGiXnjEtqcP4gPgl/giphy.gif"
                            alt="Woman says stop"
                        />
                    </div>

                    <div className={styles.content}>
                        <h1 className={styles.title}>403</h1>
                        <p className={styles.notFound}>ACCESS DENIED</p>
                        <p className={styles.text}>
                            Oops. You don't have permissions to access this page.
                        </p>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Forbidden;
