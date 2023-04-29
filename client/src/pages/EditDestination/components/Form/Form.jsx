import { useCallback, useState } from 'react';
import { useEditDestinationDetails } from '../../../../hooks/queries/useEditDestinationDetails';

import { validateFieldsOnEdit } from '../../../../utils/editValidators';
import { extractServerErrorMessage } from '../../../../utils/utils';

// Components
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
import { DetailsFormFields } from './DetailsFormFields';

import styles from './Form.module.css';

export const Form = ({ data, destinationId }) => {
    const [editDetails, isEditLoading] = useEditDestinationDetails(destinationId);
    const [editError, setEditError] = useState('');
    const [isEditable, setIsEditable] = useState({});

    const onEditButtonClickHandler = useCallback(
        (clickedId) => {
            // enables/disables the form fields
            setIsEditable((prevState) => {
                // opens/closes the field related to the "edit" button
                const newState = { [clickedId]: !prevState[clickedId] };

                // closes all previously opened edit formfields if any
                Object.keys(prevState).forEach((fieldId) => {
                    if (fieldId !== clickedId) {
                        newState[fieldId] = false;
                    }
                });
                return newState;
            });

            editError && setEditError('');
        },
        [editError]
    );

    const sendEditedFieldClickHandler = useCallback(
        (fieldId, description, editedInfo, cbCacheHandler) => {
            try {
                validateFieldsOnEdit(editedInfo);

                editDetails(editedInfo, {
                    onSuccess: () => {
                        onEditButtonClickHandler(fieldId);
                        cbCacheHandler(description);
                    },
                    onError: (err) => {
                        setEditError(extractServerErrorMessage(err));
                    },
                });
            } catch (err) {
                setEditError(err.message);
            }
        },
        []
    );

    const descriptionID = 'Description';

    return (
        <section>
            <h3>Destination Info</h3>
            <form className={styles.form}>
                <MemoizedFormFieldEditor
                    fieldId={descriptionID}
                    title={descriptionID}
                    desc={data.description}
                    onEditButtonClickHandler={onEditButtonClickHandler}
                    isEditable={isEditable[descriptionID]}
                    sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                    isLoading={isEditLoading}
                    error={editError}
                />
                <DetailsFormFields
                    onEditButtonClickHandler={onEditButtonClickHandler}
                    isEditable={isEditable}
                    sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                    isLoading={isEditLoading}
                    error={editError}
                    details={data.details}
                />
            </form>
        </section>
    );
};
