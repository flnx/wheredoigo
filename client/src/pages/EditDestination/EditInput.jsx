import { ButtonSky } from '../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../components/Buttons/Cancel-Button/CancelButton';
import styles from './EditInput.module.css';

export const Input = ({
    id,
    value,
    onChangeHandler,
    isEditable,
    handleSave,
    handleCancel,
    handleEdit,
    formFields,
}) => {
    const fieldName = id.charAt(0).toUpperCase() + id.slice(1);

    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{fieldName}</span>
            {isEditable[id] ? (
                <div className={styles.field}>
                    <input
                        id={id}
                        value={value || ''}
                        onChange={(e) => onChangeHandler(e, id)}
                        type="text"
                        className={styles.input}
                    />
                    <div className={styles.buttons}>
                        <ButtonSky onClickHandler={() => handleSave(id)}>Save</ButtonSky>
                        <CancelButton onClickHandler={() => handleCancel(id)}>Cancel</CancelButton>
                    </div>
                </div>
            ) : (
                <>
                    <span className={styles.desc}>{formFields[id]}</span>
                    <span className={styles.edit} onClick={() => handleEdit(id)}>
                        Edit
                    </span>
                </>
            )}
        </div>
    );
};

export const Textarea = ({
    id,
    value,
    onChangeHandler,
    isEditable,
    handleSave,
    handleCancel,
    handleEdit,
    formFields,
    categoryId,
}) => {
    const fieldName = id.charAt(0).toUpperCase() + id.slice(1);

    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{fieldName}</span>
            {isEditable[id] ? (
                <div className={styles.field}>
                    <textarea
                        id={id}
                        value={value || ''}
                        onChange={(e) => onChangeHandler(e, id, categoryId)}
                        className={styles.textarea}
                    />
                    <div className={styles.buttons}>
                        <ButtonSky onClickHandler={() => handleSave(id)}>Save</ButtonSky>
                        <CancelButton onClickHandler={() => handleCancel(id)}>Cancel</CancelButton>
                    </div>
                </div>
            ) : (
                <>
                    <span className={styles.desc}>{value}</span>
                    <span className={styles.edit} onClick={() => handleEdit(id)}>
                        Edit
                    </span>
                </>
            )}
        </div>
    );
};
