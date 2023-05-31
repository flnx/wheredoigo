import styles from './FormInput.module.css';

export const FormInput = ({ name, type, placeholder, value, onChangeHandler, Icon }) => {
    return (
        <div className={styles.formField}>
            <Icon size={24} color={'#fff'} className={styles.icon} />
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
