import { ButtonSky } from '../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../components/Buttons/Cancel-Button/CancelButton';
import styles from './EditInput.module.css';

export const Textarea = ({
    id,
    value,
    onChangeHandler,
    isEditable,
    handleSave,
    handleCancel,
    handleEdit,
    categoryId,
    isLoading,
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
                        <ButtonSky onClickHandler={handleSave} disabled={isLoading}>
                            Save
                        </ButtonSky>
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
