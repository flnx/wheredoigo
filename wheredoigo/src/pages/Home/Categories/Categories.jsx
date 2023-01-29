import styles from './Categories.module.css';

export const Categories = () => {
    return (
        <div className={styles.categories}>
            <h2>Categories</h2>
            <Category>Lake</Category>
            <Category>Beach</Category>
            <Category>Mountain</Category>
            <Category>History</Category>
            <Category>Snow</Category>
            <Category>Summer</Category>
        </div>
    );
};

export const Category = ({ children: categoryName }) => {
    return (
        <div className={styles.card}>
            <span>{categoryName}</span>
        </div>
    );
};
