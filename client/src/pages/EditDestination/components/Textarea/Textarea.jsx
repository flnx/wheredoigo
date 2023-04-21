import { useState } from 'react';
import { memo } from 'react';

import { useEditDestinationDetails } from '../../../../hooks/queries/useEditDestinationDetails';

// Components
import { ButtonSky } from '../../../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../../../components/Buttons/Cancel-Button/CancelButton';

import styles from './Textarea.module.css';

const Textarea = ({
    _id,
    title,
    desc,
    onEditClickHandler,
    isEditable,
    destinationId,
    categoryId,
}) => {
    const [description, setDescription] = useState(desc);
    const [cache, setCache] = useState(desc);
    const [editDestinationDetails, error, isLoading] = useEditDestinationDetails(destinationId);

    const onChangeHandler = (e) => {
        setDescription(e.target.value);
    };

    const onCancelClickHandler = () => {
        onEditClickHandler(_id);
        setDescription(cache);
    };

    const onSaveButtonClickHandler = (e) => {
        e.preventDefault();

        const editInfo = {
            destinationId,
            categoryId,
            infoId: _id,
            description,
        };

        editDestinationDetails(editInfo, {
            onSuccess: (up) => {

                console.log(up);
                onEditClickHandler(_id);
                setCache(description);
            },
        });
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
                        <ButtonSky onClickHandler={onSaveButtonClickHandler} disabled={isLoading}>
                            Save
                        </ButtonSky>
                        <CancelButton onClickHandler={onCancelClickHandler}>Cancel</CancelButton>
                    </div>
                </div>
            ) : (
                <>
                    <span className={styles.desc}>{description}</span>
                    <span className={styles.edit} onClick={() => onEditClickHandler(_id)}>
                        Edit
                    </span>
                </>
            )}
        </div>
    );
};

export const MemoizedTextarea = memo(Textarea);
