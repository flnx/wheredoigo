import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useEditPlaceDetails } from '../../../../hooks/queries/useEditPlaceDetails';
import { validateFieldsOnEdit } from '../../../../utils/editValidators';
import { capitalizeFirstLetter } from '../../../../utils/utils';

// Components
import { SelectType } from '../SelectType/SelectType';
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
import { FormLoadingSkeleton } from '../../../../components/FormLoadingSkeleton/FormLoadingSkeleton';
import { TextWrap } from '../../../../components/TextWrap/TextWrap';

import styles from './Form.module.css';

const propTypes = {
    data: PropTypes.object.isRequired,
    placeId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    destinationId: PropTypes.string,
};

export const Form = ({ data, placeId, destinationId, isLoading }) => {
    const [editDetails, isEditLoading] = useEditPlaceDetails(placeId);
    const [editError, setEditError] = useState('');
    const [isEditable, setIsEditable] = useState({});

    const typeId = 'type';
    const { allowedPlaceCategories, allowedFieldsToUpdate } = data;

    const sendEditedFieldClickHandler = useCallback(
        (fieldId, newContent, editedInfo, cbCacheHandler) => {
            try {
                validateFieldsOnEdit(editedInfo, allowedPlaceCategories);

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

    const onEditButtonClickHandler = useCallback((clickedId) => {
            // enables/disables the form fields
            setIsEditable((prevState) => {
                // opens/closes the edit field
                const newState = { [clickedId]: !prevState[clickedId] };

                // closes all previously opened edit form fields (if any)
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

    const fieldsToUpdate = allowedFieldsToUpdate?.filter((x) => x !== 'type');

    return (
        <section>
            <h3>
                <TextWrap isLoading={isLoading} content={'Place Info'} />
            </h3>
            <form className={styles.form}>
                {isLoading && <FormLoadingSkeleton />}

                {!isLoading && (
                    <>
                        {fieldsToUpdate.map((fieldName) => (
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
                            types={allowedPlaceCategories}
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                            isLoading={isEditLoading}
                            error={editError}
                        />
                    </>
                )}
            </form>
        </section>
    );
};

Form.propTypes = propTypes;
