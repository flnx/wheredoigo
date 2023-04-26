import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';
import { useEditDestinationDetails } from '../../hooks/queries/useEditDestinationDetails';

// Components
import { MemoizedEditImages } from './components/EditImages/EditImages';
import { MemoizedEditPlaces } from './components/EditPlaces/EditPlaces';
import { MemoizedFormTextareaEditor } from '../../components/FormTextareaEditor/FormTextAreaEditor';

import styles from './EditDestination.module.css';
import { extractServerErrorMessage } from '../../utils/utils';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const [data, error, isLoading] = useRequestEditDestinationPermissions(destinationId);
    const [editDetails, editError, isEditLoading] = useEditDestinationDetails(destinationId);

    const [isEditable, setIsEditable] = useState({});

    const onEditButtonClickHandler = useCallback((clickedId) => {
        // enables/disables the form fields
        setIsEditable((prevState) => {
            const newState = { [clickedId]: !prevState[clickedId] };

            // set all other fields to false (closes the rest (if any opened))
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

    const descriptionID = 'Description';

    if (error) {
        return <h1>{extractServerErrorMessage(error)}</h1>;
    }

    return (
        <div className="container">
            {isLoading || !data ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className={styles.destinationTitle}>
                        Edit {`${data?.city}, ${data?.country}`}
                    </h1>

                    <div className={styles['flex-container']}>
                        <section>
                            <h3 className={styles.sectionTitle}>Destination Info</h3>
                            <form>
                                <MemoizedFormTextareaEditor
                                    fieldId={descriptionID}
                                    title={descriptionID}
                                    desc={data.description}
                                    onEditButtonClickHandler={onEditButtonClickHandler}
                                    isEditable={isEditable[descriptionID]}
                                    _mongo_id={data?._id}
                                    sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                                    isLoading={isEditLoading}
                                    error={editError}
                                />
                                {data.details.map((detail) => (
                                    <div className={styles.detailsWrapper} key={detail._id}>
                                        <h2 className={styles.catetegoryName}>{detail.category}</h2>
                                        {detail.info.map((x) => (
                                            <MemoizedFormTextareaEditor
                                                fieldId={x._id}
                                                title={x.title}
                                                desc={x.description}
                                                onEditButtonClickHandler={onEditButtonClickHandler}
                                                isEditable={isEditable[x._id]}
                                                _mongo_id={data?._id}
                                                sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                                                isLoading={isEditLoading}
                                                error={error}
                                                categoryId={detail._id}
                                                key={x._id}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </form>
                        </section>

                        <MemoizedEditImages imagesData={data?.imageUrls} destinationId={data?._id} />
                    </div>
                    <MemoizedEditPlaces placesData={data?.places} destinationId={data?._id} />
                </>
            )}
        </div>
    );
};
