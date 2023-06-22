import { useState } from 'react';

// Components
import { EditTextareaPairs } from '../../../../components/Buttons/EditTextareaPairs/EditTextareaPairs';
import { ButtonSky } from '../../../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../../../components/Buttons/Cancel-Button/CancelButton';
import { SpanLabelTitle } from '../../../../components/SpanLabelTitle/SpanLabelTitle';
import { FormEditWrapper, WrapperWithWidth } from '../../../../components/Containers/FormEditWrapper/FormEditWrapper';

import styles from './SelectType.module.css';

export const SelectType = ({
    typeId,
    isEditable,
    selectedType,
    types,
    onEditButtonClickHandler,
    sendEditedFieldClickHandler,
    isLoading,
    error,
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
        <div>
            <h3>Category</h3>
            <FormEditWrapper>
                <SpanLabelTitle title={'Type: '} />

                {isEditable ? (
                    <WrapperWithWidth>
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
                        {error && <span className="error-message">{error}</span>}
                        <div className={styles.buttons}>
                            <ButtonSky
                                onClickHandler={onSaveButtonClickHandler}
                                isLoading={isLoading}
                            >
                                Save
                            </ButtonSky>
                            <CancelButton onClickHandler={onCancelClickHandler}>
                                Cancel
                            </CancelButton>
                        </div>
                    </WrapperWithWidth>
                ) : (
                    <EditTextareaPairs
                        selected={selectedType}
                        onClickHandler={() => onEditButtonClickHandler(typeId)}
                    />
                )}
            </FormEditWrapper>
        </div>
    );
};

// const MemoizedSelectType = memo(SelectType);
