import PropTypes from 'prop-types';
import { useState } from 'react';
import { memo } from 'react';

// Components
import { ButtonSky } from '../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../components/Buttons/Cancel-Button/CancelButton';
import { EditTextareaPairs } from '../Buttons/EditTextareaPairs/EditTextareaPairs';
import { SpanLabelTitle } from '../SpanLabelTitle/SpanLabelTitle';
import { FormEditWrapper, WrapperWithWidth } from '../Containers/FormEditWrapper/FormEditWrapper';

import styles from './FormFieldEditor.module.css';

const propTypes = {
    categoryId: PropTypes.string,
    isEditable: PropTypes.bool,
    fieldId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    sendEditedFieldClickHandler: PropTypes.func.isRequired,
    onEditButtonClickHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

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

    const onChangeHandler = (e) => {
        setDescription(e.target.value);
    };

    const onCancelClickHandler = () => {
        // passes the fieldId in order to reset isEditable and hide the textarea/input
        onEditButtonClickHandler(fieldId);
        setDescription(desc);
    };

    const onSaveButtonClickHandler = (e) => {
        e.preventDefault();

        const editInfo = {
            categoryId,
            infoId: fieldId,
            description,
        };

        sendEditedFieldClickHandler(fieldId, editInfo);
    };

    return (
        <FormEditWrapper>
            <SpanLabelTitle title={title} />
            {isEditable ? (
                <WrapperWithWidth>
                    <textarea
                        name={title}
                        aria-label={title}
                        value={description}
                        onChange={onChangeHandler}
                        className={styles.textarea}
                    />
                    <div className={styles.buttons}>
                        <ButtonSky
                            onClickHandler={onSaveButtonClickHandler}
                            isLoading={isLoading}
                        >
                            Save
                        </ButtonSky>
                        <CancelButton
                            onClickHandler={onCancelClickHandler}
                            isLoading={isLoading}
                        >
                            Cancel
                        </CancelButton>
                    </div>
                    {error && <span className="error-message">{error}</span>}
                </WrapperWithWidth>
            ) : (
                <EditTextareaPairs
                    selected={description}
                    onClickHandler={() => onEditButtonClickHandler(fieldId)}
                />
            )}
        </FormEditWrapper>
    );
};

FormFieldEditor.propTypes = propTypes;

export const MemoizedFormFieldEditor = memo(FormFieldEditor);
