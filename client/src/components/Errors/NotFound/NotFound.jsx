import { Container } from '../../Containers/Container/Container';
import styles from './NotFound.module.css';

export const NotFound = () => {
    return (
        <Container>
            <section className={styles.section}>
                <div className={styles.flex}>
                    <div className={styles.imageContainer}>
                        <img
                            src="https://media1.giphy.com/media/HppSXgWJM13UllO5vo/giphy.gif?cid=ecf05e474ugnwdyek05bykowfriljcfor84woo0esbh8n7ib&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                            alt="person tries to see something but cant"
                        />
                    </div>

                    <div className={styles.content}>
                        <h1 className={styles.title}>404</h1>
                        <p className={styles.notFound}>Not Found</p>
                        <p className={styles.text}>
                            The page you're looking for doesn't exist
                        </p>
                    </div>
                </div>
            </section>
        </Container>
    );
};
