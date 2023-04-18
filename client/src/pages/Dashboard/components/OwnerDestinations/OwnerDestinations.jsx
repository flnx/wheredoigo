import { useNavigate } from 'react-router-dom';
import { Destination } from '../../../../components/Destination/Destination';
import { useCreatorDestinations } from '../../../../hooks/queries/useCreatorDestinations';

import styles from './OwnerDestinations.module.css';

export const OwnerDestinations = () => {
    const { data, isLoading, error } = useCreatorDestinations();
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <h1>An Error Has Occured</h1>;
    }

    const onEditHandler = (destinationId) => {
        navigate('/destination/edit', { state: destinationId });
    };

    return (
        <>
            <h2 className={styles.title}>Highest rated destinations:</h2>
            <div className={styles.wrapper}>
                {data.map((destination) => (
                    <Destination
                        destination={destination}
                        key={destination._id}
                        onClickHandler={onEditHandler}
                    />
                ))}
            </div>
        </>
    );
};
