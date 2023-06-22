import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useEditDestinationDetails } from '../../../../hooks/queries/useEditDestinationDetails';

import { validateFieldsOnEdit } from '../../../../utils/editValidators';
import { extractServerErrorMessage } from '../../../../utils/utils';

// Components
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
import { DetailsFormFields } from './components/DetailsFormFields';
import { TextWrap } from '../../../../components/TextWrap/TextWrap';
import { FormLoadingSkeleton } from '../../../../components/FormLoadingSkeleton/FormLoadingSkeleton';
import { Categories } from './components/Categories';

import styles from './Form.module.css';

const propTypes = {
    destinationId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
};

const defaultProps = {
    details: [],
    categories: [],
    description: '',
};

export const Form = ({ description, details, destinationId, isLoading, categories }) => {
    const [editDetails, isEditLoading] = useEditDestinationDetails(destinationId);
    const [editError, setEditError] = useState('');
    const [isEditable, setIsEditable] = useState({});

    const allowedCategories = ['Beach', 'Mountains', 'Cultural', 'Snow', 'Islands', 'Adventure'];

    const onEditButtonClickHandler = useCallback(
        (clickedId) => {
            // enables/disables the form fields
            setIsEditable((prevState) => {
                // opens/closes the edit field
                const newState = { [clickedId]: !prevState[clickedId] };

                // closes all previously opened edit formfields (if any)
                Object.keys(prevState).forEach((fieldId) => {
                    if (fieldId !== clickedId) {
                        newState[fieldId] = false;
                    }
                });
                return newState;
            });
            // removes the error message (if any)
            editError && setEditError('');
        },
        [editError]
    );

    const sendEditedFieldClickHandler = useCallback((fieldId, editedInfo) => {
        try {
            validateFieldsOnEdit(editedInfo, allowedCategories);

            editDetails(editedInfo, {
                onSuccess: () => onEditButtonClickHandler(fieldId),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.message);
        }
    }, []);

    const descriptionID = 'Description';
    const categoriesID = 'Categories';

    return (
        <section>
            <h3>
                <TextWrap isLoading={isLoading} content={'Destination Info'} />
            </h3>
            <form className={styles.form}>
                {isLoading && <FormLoadingSkeleton />}
                {!isLoading && (
                    <>
                        <MemoizedFormFieldEditor
                            fieldId={descriptionID}
                            title={descriptionID}
                            desc={description}
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            isEditable={isEditable[descriptionID]}
                            sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                            isLoading={isEditLoading}
                            error={editError}
                        />

                        <Categories
                            categories={categories}
                            options={allowedCategories}
                            errors={editError}
                            fieldId={categoriesID}
                            isEditable={isEditable[categoriesID]}
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                            isLoading={isEditLoading}
                        />

                        <DetailsFormFields
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            isEditable={isEditable}
                            sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                            isLoading={isEditLoading}
                            error={editError}
                            details={details}
                        />
                    </>
                )}
            </form>
        </section>
    );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
