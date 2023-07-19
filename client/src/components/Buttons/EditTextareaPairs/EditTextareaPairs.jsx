import styles from './EditTextareaPairs.module.css';
import parse from 'html-react-parser';

export const EditTextareaPairs = ({ content = '', onClickHandler }) => {
    return (
        <div className={styles.pairs}>
            <div className={styles.desc}>{parse(content)}</div>
            <span className={styles.edit} onClick={onClickHandler}>
                Edit
            </span>
        </div>
    );
};
