import styles from './Categories.module.css';

export const Categories = () => {
    return (
        <section>
            <div className="container">
                <div className={styles.categories}>
                    <h2 className={styles.title}>Categories</h2>
                    <Category>Lake</Category>
                    <Category>Beach</Category>
                    <Category>Mountain</Category>
                    <Category>History</Category>
                    <Category>Snow</Category>
                    <Category>Summer</Category>
                </div>
            </div>
        </section>
    );
};

export const Category = ({ children: categoryName }) => {
    return (
        <div className={styles.card}>
            <span>{categoryName}</span>
        </div>
    );
};
