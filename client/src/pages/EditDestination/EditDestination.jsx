import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';

// Components
import { DetailsInputs } from './components/DetailsInputsFields/DetailsInputsFields';
import { MemoizedTextarea } from './components/Textarea/Textarea';
import { MemoizedEditImages } from './components/EditImages/EditImages';

import styles from './EditDestination.module.css';

export const EditDestination = () => {
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState({});
    const { state: destinationId } = useLocation();
    const { data, error, isLoading } = useRequestEditDestinationPermissions(destinationId);

    const URL_DASHBOARD = '/dashboard/destinations-created-by-user';

    useEffect(() => {
        if (!destinationId) {
            navigate(URL_DASHBOARD, { replace: true });
        }
    }, []);

    if (error) {
        navigate(URL_DASHBOARD, { replace: true });
        return null;
    }

    const onEditClickHandler = useCallback((clickedId) => {
        // enables/disables the form fields
        setIsEditable((prevState) => {
            // set the clicked field to true/false (opens/closes it)
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
            {isLoading || !data || !destinationId ? (
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
                                    destinationId={destinationId}
                                />
                                {data.details.map((detail) => (
                                    <DetailsInputs
                                        name={detail.category}
                                        info={detail.info}
                                        isEditable={isEditable}
                                        onEditClickHandler={onEditClickHandler}
                                        destinationId={destinationId}
                                        categoryId={detail._id}
                                        key={detail._id}
                                    />
                                ))}
                            </form>
                        </section>

                        <section>
                            <h3 className={styles.sectionTitle}>Images</h3>

                            <MemoizedEditImages imagesData={data?.imageUrls} />
                        </section>
                    </div>
                </>
            )}
        </div>
    );
};
