import styles from './EditTextareaPairs.module.css';

export const EditTextareaPairs = ({ selected, onClickHandler }) => {
    return (
        <div className={styles.pairs}>
            <span className={styles.desc}>{selected}</span>
            <span className={styles.edit} onClick={onClickHandler}>Edit</span>
        </div>
    );
};
