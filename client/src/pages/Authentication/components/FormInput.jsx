import { ShowFormError } from 'src/components/ShowFormError/ShowFormError';
import styles from './FormInput.module.css';

export const FormInput = ({
    name,
    type,
    placeholder,
    value,
    onChangeHandler,
    Icon,
    errors,
}) => {

    const errorParam = name == 'repeatPassword' ? 'match' : name;

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
            <div style={{ height: '1rem' }} className={styles.error}>
                <ShowFormError errors={errors} errorParam={errorParam} />
            </div>
        </div>
    );
};
