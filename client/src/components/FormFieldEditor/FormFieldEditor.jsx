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
    isEditToggled: PropTypes.bool,
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
    isEditToggled,
    submitHandler,
    isLoading,
    error,
    limitChars,
    hideMenu
}) => {
    const [description, setDescription] = useState(desc);
    const [charCounter, setCharCounter] = useState(0);

    const onChangeHandler = (content, charCount) => {
        setDescription(content);
        setCharCounter(charCount);
    };

    const onCancelClickHandler = () => {
        // Closes the opened Edit field
        onEditButtonClickHandler(fieldId);
        setDescription(desc);
    };
    
    const onSaveButtonClickHandler = (e) => {
        e.preventDefault();

        const editInfo = {
            fieldId,
            description,
            charCounter
        };

        submitHandler({ editInfo });
    };

    return (
        <FormEditWrapper>
            <SpanLabelTitle title={title} />
            {isEditToggled ? (
                <WrapperWithWidth>
                    <TipTap
                        onChangeHandler={onChangeHandler}
                        content={description}
                        backgroundColor={'#fff'}
                        limitChars={limitChars}
                        hideMenu={hideMenu}
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
