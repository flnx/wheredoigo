import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useGetPlaceToEdit } from '../../hooks/queries/useGetPlaceToEdit';
import { useEditPlaceDetails } from '../../hooks/queries/useEditPlaceDetails';

import { capitalizeFirstLetter, extractServerErrorMessage } from '../../utils/utils';
import { validateFieldsOnEdit } from '../../utils/editValidators';

// Components
import { MemoizedFormFieldEditor } from '../../components/FormFieldEditor/FormFieldEditor';
import { SelectType } from './components/SelectType/SelectType';

import styles from './EditPlace.module.css';
import { Container } from '../../components/Containers/Container/Container';

export const EditPlace = () => {
    const { placeId } = useParams();
    const [data, error, isLoading] = useGetPlaceToEdit(placeId);
    const [editDetails, isEditLoading] = useEditPlaceDetails(placeId);
    const [editError, setEditError] = useState('');
    const [isEditable, setIsEditable] = useState({});
    const destinationId = data?.destinationId;

    const typeId = 'type';
    const allowedCategories = data?.allowedPlaceCategories;
    const allowedFieldsToUpdate = data?.allowedFieldsToUpdate.filter((x) => x !== 'type');

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

    if (error) return <h1>{extractServerErrorMessage(error)}</h1>;
    if (isLoading) return <h1>Loading...</h1>;

    return (
        <Container>
            <h1 className={styles.placeTitle}>
                Edit {data.name}, {data.city}
            </h1>
            <div className={styles['flex-container']}>
                <section>
                    <h3 className={styles.sectionTitle}>Place Info</h3>
                    <form>
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

                        <div className={styles.category}>
                            <h3 className={styles.catetegoryName}>Category</h3>

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
                        </div>
                    </form>
                </section>

                <section>Images</section>
            </div>
        </Container>
    );
};
