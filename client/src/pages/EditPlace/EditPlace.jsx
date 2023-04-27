import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useGetPlaceToEdit } from '../../hooks/queries/useGetPlaceToEdit';

import { capitalizeFirstLetter, extractServerErrorMessage } from '../../utils/utils';

// Components
import { MemoizedFormFieldEditor } from '../../components/FormFieldEditor/FormFieldEditor';
import { SelectType } from './components/SelectType/SelectType';

import styles from './EditPlace.module.css';

export const EditPlace = () => {
    const { placeId } = useParams();
    const [data, error, isLoading] = useGetPlaceToEdit(placeId);
    const [isEditable, setIsEditable] = useState({});
    // const [editDetails, editError, isEditLoading] = useEditDestinationDetails(destinationId);

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
        (fieldId, description, editedInfo, cbCacheHandler) => {
            editDetails(editedInfo, {
                onSuccess: () => {
                    onEditButtonClickHandler(fieldId);
                    cbCacheHandler(description);
                },
            });
        },
        []
    );

    if (error) {
        return <h1>{extractServerErrorMessage(error)}</h1>;
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const types = ['Explore', 'Eat', 'Party'];
    const typeId = 'Types';

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
                                _mongo_id={data._id}
                                sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                                // isLoading={isEditLoading}
                                isLoading={false}
                                // error={editError}
                                error={null}
                                key={key}
                            />
                        ))}

                        <div className={styles.category}>
                            <h3 className={styles.catetegoryName}>Category</h3>

                            <SelectType
                                typeId={typeId}
                                isEditable={isEditable[typeId]}
                                selectedType={'Explore'}
                                types={types}
                                onEditButtonClickHandler={onEditButtonClickHandler}
                            />
                        </div>
                    </form>
                </section>

                <section>Images</section>
            </div>
        </div>
    );
};
