import { useState } from 'react';
import { memo } from 'react';

// Components
import { ButtonSky } from '../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../components/Buttons/Cancel-Button/CancelButton';
import { EditTextareaPairs } from '../Buttons/EditTextareaPairs/EditTextareaPairs';

import styles from './FormFieldEditor.module.css';
import { extractServerErrorMessage } from '../../utils/utils';

const FormFieldEditor = ({
    fieldId,
    title,
    desc,
    onEditButtonClickHandler,
    isEditable,
    sendEditedFieldClickHandler,
    isLoading,
    error,
    categoryId,
}) => {
    const [description, setDescription] = useState(desc);
    const [cache, setCache] = useState(desc);

    const onChangeHandler = (e) => {
        setDescription(e.target.value);
    };

    const onCancelClickHandler = () => {
        onEditButtonClickHandler(fieldId);
        setDescription(cache);
    };

    const setCacheHandler = (data) => setCache(data);

    const onSaveButtonClickHandler = (e) => {
        e.preventDefault();

        const editInfo = {
            categoryId,
            infoId: fieldId,
            description,
        };

        sendEditedFieldClickHandler(fieldId, description, editInfo, setCacheHandler);
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{title}</span>
            {isEditable ? (
                <div className={styles.textareaWrapper}>
                    <textarea
                        value={description}
                        onChange={onChangeHandler}
                        className={styles.textarea}
                    />
                    <div className={styles.buttons}>
                        <ButtonSky
                            onClickHandler={onSaveButtonClickHandler}
                            disabled={isLoading}
                        >
                            Save
                        </ButtonSky>
                        <CancelButton onClickHandler={onCancelClickHandler}>
                            Cancel
                        </CancelButton>
                    </div>
                    {error && <span className="error-message">{error}</span>}
                </div>
            ) : (
                <EditTextareaPairs
                    selected={description}
                    onClickHandler={() => onEditButtonClickHandler(fieldId)}
                />
            )}
        </div>
    );
};

export const MemoizedFormFieldEditor = memo(FormFieldEditor);
