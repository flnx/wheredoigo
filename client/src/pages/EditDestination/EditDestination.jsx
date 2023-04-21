import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequestEditDestinationPermissions } from '../../hooks/queries/useRequestEditDestinationPermissions';

// Components
import { DetailsInputs } from './components/DetailsInputsFields/DetailsInputsFields';
import { MemoizedTextarea } from './components/Textarea/Textarea';


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
                <section>
                    <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>
                        Edit {`${data?.city}, ${data?.country}`}
                    </h1>
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
            )}
        </div>
    );
};
