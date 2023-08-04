import parse from 'html-react-parser';
import styles from './EditTextareaPairs.module.scss';

export const EditTextareaPairs = ({ content = '', onClickHandler }) => {
    return (
        <div className={styles.pairs}>
            <div className={`${styles.desc} editor-content`}>
                {parse(content)}
            </div>
            <span className={styles.edit} onClick={onClickHandler}>
                Edit
            </span>
        </div>
    );
};
