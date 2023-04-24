import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';

// Components
import { DetailsInputs } from './components/DetailsInputsFields/DetailsInputsFields';
import { MemoizedTextarea } from './components/Textarea/Textarea';
import { MemoizedEditImages } from './components/EditImages/EditImages';
import { MemoizedPlaces } from './components/Places/places';

import styles from './EditDestination.module.css';
const URL_DASHBOARD = '/dashboard/destinations-created-by-user';

export const EditDestination = () => {
    const searchParams = new URLSearchParams(location.search);

    const { data, error, isLoading } = useRequestEditDestinationPermissions(
        searchParams.get('id')
    );
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState({});

    useEffect(() => {
        if (!searchParams.get('id') || error) {
            navigate(URL_DASHBOARD, { replace: true });
        }
    }, [searchParams, error]);

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

    return (
        <div className="container">
            {isLoading || !data ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className={styles['destination-title']}>
                        Edit {`${data?.city}, ${data?.country}`}
                    </h1>

                    <div className={styles['wrapper']}>
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

                        <section className={styles['images']}>
                            <h3 className={styles.sectionTitle}>Images</h3>

                            <MemoizedEditImages
                                imagesData={data?.imageUrls}
                                destinationId={data?._id}
                            />
                        </section>
                    </div>
                    <MemoizedPlaces places={data?.places} destinationId={data?._id} />
                </>
            )}
        </div>
    );
};
