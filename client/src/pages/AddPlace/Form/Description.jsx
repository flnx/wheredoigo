import { TipTap } from 'src/components/TipTap/TipTap';
import { ShowFormError } from 'src/components/ShowFormError/ShowFormError';
import styles from './Form.module.css';

export const Description = ({ description, onChangeHandler, errors, charCounter }) => {
    const isNotValid = charCounter < 50 || charCounter > 5000;

    return (
        <div className={styles.formRow}>
            <label className={styles.formLabel}>Description</label>
            <TipTap
                content={description}
                onChangeHandler={onChangeHandler}
                backgroundColor='#fff'
            />
            {isNotValid && <ShowFormError errors={errors} errorParam={'description'} />}
        </div>
    );
};
