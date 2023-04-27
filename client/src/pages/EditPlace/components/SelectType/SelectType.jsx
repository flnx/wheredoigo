import { memo, useState } from 'react';

// Components
import { EditTextareaPairs } from '../../../../components/Buttons/EditTextareaPairs/EditTextareaPairs';
import { ButtonSky } from '../../../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../../../components/Buttons/Cancel-Button/CancelButton';

import styles from './SelectType.module.css';

export const SelectType = ({
    typeId,
    isEditable,
    selectedType,
    types,
    onEditButtonClickHandler,
    sendEditedFieldClickHandler,
    isLoading,
}) => {
    const [type, setType] = useState(selectedType);
    const [cache, setCache] = useState(selectedType);

    const onChangeHandler = (e) => {
        setType(e.target.value);
    };

    const onCancelClickHandler = () => {
        onEditButtonClickHandler(typeId);
        setType(cache);
    };

    const setCacheHandler = (data) => setCache(data);

    const onSaveButtonClickHandler = (e) => {
        e.preventDefault();

        const editInfo = {
            infoId: typeId,
            description: type,
        };

        sendEditedFieldClickHandler(typeId, type, editInfo, setCacheHandler);
    };

    return (
        <div className={styles['wrapper']}>
            <span className={styles.label}>Type: </span>

            {isEditable ? (
                <div className={styles.selectWrapper}>
                    <select
                        id="type"
                        name="type"
                        value={type}
                        onChange={onChangeHandler}
                        className={styles.select}
                    >
                        {types.map((type) => (
                            <option value={type} key={type}>
                                {type}
                            </option>
                        ))}
                    </select>

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
                </div>
            ) : (
                <EditTextareaPairs
                    selected={selectedType}
                    onClickHandler={() => onEditButtonClickHandler(typeId)}
                />
            )}
        </div>
    );
};

// const MemoizedSelectType = memo(SelectType);
