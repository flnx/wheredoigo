import { useCallback, useState } from 'react';
import { useEditPlaceDetails } from '../../../../hooks/queries/useEditPlaceDetails';
import { validateFieldsOnEdit } from '../../../../utils/editValidators';

// Components
import { SelectType } from '../SelectType/SelectType';
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
import { capitalizeFirstLetter } from '../../../../utils/utils';

import styles from './Form.module.css';

export const Form = ({ data, placeId, destinationId }) => {
    const [editDetails, isEditLoading] = useEditPlaceDetails(placeId);
    const [editError, setEditError] = useState('');
    const [isEditable, setIsEditable] = useState({});

    const typeId = 'type';
    const allowedCategories = data.allowedPlaceCategories;
    const allowedFieldsToUpdate = data.allowedFieldsToUpdate.filter((x) => x !== 'type');

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
        (fieldId, newContent, editedInfo, cbCacheHandler) => {
            try {
                validateFieldsOnEdit(editedInfo, allowedFieldsToUpdate);

                editDetails(
                    { ...editedInfo, destinationId },
                    {
                        onSuccess: () => {
                            onEditButtonClickHandler(fieldId);
                            cbCacheHandler(newContent);
                        },
                        onError: (err) => {
                            setEditError(extractServerErrorMessage(err));
                        },
                    }
                );
            } catch (err) {
                setEditError(err.message);
            }
        },
        [destinationId]
    );

    return (
        <section>
            <h3>Place Info</h3>
            <form className={styles.form}>
                {allowedFieldsToUpdate.map((fieldName) => (
                    <MemoizedFormFieldEditor
                        fieldId={fieldName}
                        title={capitalizeFirstLetter(fieldName)}
                        desc={data[fieldName]}
                        onEditButtonClickHandler={onEditButtonClickHandler}
                        isEditable={isEditable[fieldName]}
                        sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                        isLoading={isEditLoading}
                        error={editError}
                        key={fieldName}
                    />
                ))}

                <SelectType
                    typeId={typeId}
                    isEditable={isEditable[typeId]}
                    selectedType={data.type}
                    types={allowedCategories}
                    onEditButtonClickHandler={onEditButtonClickHandler}
                    sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                    isLoading={isEditLoading}
                    error={editError}
                />
            </form>
        </section>
    );
};
