import PropTypes from 'prop-types';
import { useState } from 'react';
import { memo } from 'react';

// Components
import { ButtonSky } from '../../components/Buttons/Button-Sky/ButtonSky';
import { CancelButton } from '../../components/Buttons/Cancel-Button/CancelButton';
import { EditTextareaPairs } from '../Buttons/EditTextareaPairs/EditTextareaPairs';
import { SpanLabelTitle } from '../SpanLabelTitle/SpanLabelTitle';
import { TipTap } from '../TipTap/TipTap';
import { FormEditWrapper, WrapperWithWidth, EditButtonsWrapper } from '../Containers/FormEditWrapper/FormEditWrapper';


const propTypes = {
    categoryId: PropTypes.string,
    isEditable: PropTypes.bool,
    fieldId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired,
    onEditButtonClickHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

const FormFieldEditor = ({
    fieldId,
    title,
    desc,
    onEditButtonClickHandler,
    isEditable,
    submitHandler,
    isLoading,
    error,
    categoryId,
}) => {
    const [description, setDescription] = useState(desc);
    const [charCounter, setCharCounter] = useState(0);

    const onChangeHandler = (content, charCount) => {
        setDescription(content);
        setCharCounter(charCount);
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
            charCounter
        };

        submitHandler({ fieldId, editInfo });
    };

    return (
        <FormEditWrapper>
            <SpanLabelTitle title={title} />
            {isEditable ? (
                <WrapperWithWidth>
                    <TipTap
                        onChangeHandler={onChangeHandler}
                        content={description}
                        backgroundColor={'#fff'}
                    />

                    <EditButtonsWrapper>
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
                    </EditButtonsWrapper>

                    {error && <span className="error-message">{error}</span>}
                </WrapperWithWidth>
            ) : (
                <EditTextareaPairs
                    content={description}
                    onClickHandler={() => onEditButtonClickHandler(fieldId)}
                />
            )}
        </FormEditWrapper>
    );
};

FormFieldEditor.propTypes = propTypes;

export const MemoizedFormFieldEditor = memo(FormFieldEditor);
