import styles from './FormInput.module.css';

export const FormInput = ({
    name,
    label,
    type,
    placeholder,
    value,
    onChangeHandler,
}) => {
    return (
        <div className={styles.formField}>
            <label className={styles.formFieldLabel} htmlFor={name}>
                {label}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChangeHandler}
                className={styles.formFieldInput}
            />
        </div>
    );
};
