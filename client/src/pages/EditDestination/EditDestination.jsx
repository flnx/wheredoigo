import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';

// Components
import { DetailsInputs } from './components/DetailsInputsFields/DetailsInputsFields';
import { MemoizedTextarea } from './components/Textarea/Textarea';
import { MemoizedEditImages } from './components/EditImages/EditImages';
import { MemoizedEditPlaces } from './components/EditPlaces/EditPlaces';

import styles from './EditDestination.module.css';

export const EditDestination = () => {
    const { destinationId } = useParams();
    const { data, error, isLoading } = useRequestEditDestinationPermissions(destinationId);
    const [isEditable, setIsEditable] = useState({});

    const onEditClickHandler = useCallback((clickedId) => {
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

    const description = 'Description';

    if (error) {
        return (<h1>404 Not Found :(</h1>)
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
                                <MemoizedTextarea
                                    _id={description}
                                    title={description}
                                    desc={data.description}
                                    onEditClickHandler={onEditClickHandler}
                                    isEditable={isEditable[description]}
                                    destinationId={data?._id}
                                />
                                {data.details.map((detail) => (
                                    <DetailsInputs
                                        name={detail.category}
                                        info={detail.info}
                                        isEditable={isEditable}
                                        onEditClickHandler={onEditClickHandler}
                                        destinationId={data?._id}
                                        categoryId={detail._id}
                                        key={detail._id}
                                    />
                                ))}
                            </form>
                        </section>

                        <MemoizedEditImages
                            imagesData={data?.imageUrls}
                            destinationId={data?._id}
                        />
                    </div>
                    <MemoizedEditPlaces
                        placesData={data?.places}
                        destinationId={data?._id}
                    />
                </>
            )}
        </div>
    );
};
