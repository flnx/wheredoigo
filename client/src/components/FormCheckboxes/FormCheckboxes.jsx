import { ShowFormError } from '../ShowFormError/ShowFormError';
import styles from './FormCheckboxes.module.css';

export const FormCheckboxes = ({
    categories,
    options,
    onChangeHandler,
    boxshadow,
    errors,
}) => {
    return (
        <div className={`${styles.selectWrapper} ${boxshadow ? styles.boxShadow : ''}`}>
            <h3 className="mb-1">Select Categories</h3>

            <ul className={styles.categories}>
                {options.map((option, i) => {
                    return (
                        <li className={styles.category} key={i}>
                            <label htmlFor={option}>{option}</label>
                            <input
                                className={styles.checkbox}
                                id={option}
                                type="checkbox"
                                checked={categories.includes(option)}
                                onChange={() => onChangeHandler(option)}
                                value={option}
                            />
                        </li>
                    );
                })}
            </ul>

            <ShowFormError errors={errors} errorParam={'category'} />
        </div>
    );
};
