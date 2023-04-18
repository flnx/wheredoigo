import { Destination } from '../../../../components/Destination/Destination';
import { useCreatorDestinations } from '../../../../hooks/queries/useCreatorDestinations';

import styles from './MyTrips.module.css';

export const MyTrips = () => {
    const { data, isLoading, error } = useCreatorDestinations();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <h1>An Error Has Occured</h1>;
    }

    return (
        <>
            <h2 className={styles.title}>Highest rated destinations:</h2>
            <div className={styles.wrapper}>
                {data.map((destination) => (
                    <Destination destination={destination} key={destination._id} />
                ))}
            </div>
        </>
    );
};
