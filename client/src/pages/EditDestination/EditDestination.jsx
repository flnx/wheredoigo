import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDestinationToEdit } from '../../hooks/queries/useGetDestinationToEdit';
import { useEditDestinationDetails } from '../../hooks/queries/useEditDestinationDetails';
import { extractServerErrorMessage } from '../../utils/utils';

// Components
import { MemoizedEditImages } from './components/EditImages/EditImages';
import { MemoizedFormFieldEditor } from '../../components/FormFieldEditor/FormFieldEditor';
import { MemoizedPlacesShowcase } from './components/PlacesShowcase/PlacesShowcase';

import styles from './EditDestination.module.css';
import { validateFieldsOnEdit } from '../../utils/editValidators';
import { useDeleteDestinationImage } from '../../hooks/queries/useDeleteDestinationImage';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const [data, error, isLoading] = useGetDestinationToEdit(destinationId);
    const [editDetails, isEditLoading] = useEditDestinationDetails(destinationId);
    const [deleteImage, deleteImgError, isDeleteImgLoading] =
        useDeleteDestinationImage(destinationId);
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

    const deleteImageHandler = useCallback((imgId, cbSetImages) => {
        deleteImage(imgId, {
            onSuccess: () => cbSetImages(),
        });
    }, []);

    const descriptionID = 'Description';

    if (error) return <h1>{extractServerErrorMessage(error)}</h1>;

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
                                {data.details.map((detail) => (
                                    <div className={styles.detailsWrapper} key={detail._id}>
                                        <h2 className={styles.catetegoryName}>
                                            {detail.category}
                                        </h2>
                                        {detail.info.map((x) => (
                                            <MemoizedFormFieldEditor
                                                fieldId={x._id}
                                                title={x.title}
                                                desc={x.description}
                                                onEditButtonClickHandler={
                                                    onEditButtonClickHandler
                                                }
                                                isEditable={isEditable[x._id]}
                                                sendEditedFieldClickHandler={
                                                    sendEditedFieldClickHandler
                                                }
                                                isLoading={isEditLoading}
                                                error={editError}
                                                categoryId={detail._id}
                                                key={x._id}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </form>
                        </section>

                        <MemoizedEditImages
                            imagesData={data?.imageUrls}
                            destinationId={data?._id}
                            deleteImageHandler={deleteImageHandler}
                            isLoading={isDeleteImgLoading}
                        />
                    </div>
                    <MemoizedPlacesShowcase
                        placesData={data?.places}
                        destinationId={data?._id}
                    />
                </>
            )}
        </div>
    );
};
