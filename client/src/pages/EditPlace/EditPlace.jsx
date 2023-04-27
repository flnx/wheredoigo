import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useGetPlaceToEdit } from '../../hooks/queries/useGetPlaceToEdit';
import { useEditPlaceDetails } from '../../hooks/queries/useEditPlaceDetails';

import { capitalizeFirstLetter, extractServerErrorMessage } from '../../utils/utils';

// Components
import { MemoizedFormFieldEditor } from '../../components/FormFieldEditor/FormFieldEditor';
import { SelectType } from './components/SelectType/SelectType';

import styles from './EditPlace.module.css';

export const EditPlace = () => {
    const { placeId } = useParams();
    const [data, error, isLoading] = useGetPlaceToEdit(placeId);
    const [editDetails, editError, isEditLoading] = useEditPlaceDetails(placeId);
    const [isEditable, setIsEditable] = useState({});

    const onEditButtonClickHandler = useCallback((clickedId) => {
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
    }, []);

    const sendEditedFieldClickHandler = useCallback(
        (fieldId, newContent, editedInfo, cbCacheHandler) => {
            editedInfo.destinationId = data.destinationId

            editDetails(editedInfo, {
                onSuccess: () => {
                    onEditButtonClickHandler(fieldId);
                    cbCacheHandler(newContent);
                },
            });
        },
        []
    );

    if (error) return <h1>{extractServerErrorMessage(error)}</h1>;
    if (isLoading) return <h1>Loading...</h1>;

    const types = ['Explore', 'Eat', 'Party'];
    const typeId = 'type';

    return (
        <div className="container">
            <h1 className={styles.placeTitle}>
                Edit {data.name}, {data.city}
            </h1>
            <div className={styles['flex-container']}>
                <section>
                    <h3 className={styles.sectionTitle}>Place Info</h3>
                    <form>
                        {data.fieldKeys.map((key) => (
                            <MemoizedFormFieldEditor
                                fieldId={key}
                                title={capitalizeFirstLetter(key)}
                                desc={data[key]}
                                onEditButtonClickHandler={onEditButtonClickHandler}
                                isEditable={isEditable[key]}
                                sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                                isLoading={isEditLoading}
                                error={editError}
                                key={key}
                            />
                        ))}

                        <div className={styles.category}>
                            <h3 className={styles.catetegoryName}>Category</h3>

                            <SelectType
                                typeId={typeId}
                                isEditable={isEditable[typeId]}
                                selectedType={data.type}
                                types={types}
                                onEditButtonClickHandler={onEditButtonClickHandler}
                                sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                                isLoading={isEditLoading}
                            />
                        </div>
                    </form>
                </section>

                <section>Images</section>
            </div>
        </div>
    );
};
