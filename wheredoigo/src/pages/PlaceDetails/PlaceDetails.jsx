import { useParams } from 'react-router-dom';
import { usePlace } from '../../hooks/queries/usePlace';

// components
import { Header } from './components/Header/Header';

import styles from './PlaceDetails.module.css';

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { data, isLoading, error } = usePlace(placeId);
    
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    
    if (error) {
        return <h1>An Error Has Occured</h1>;
    }

    return (
        <div className="container">
            <Header place={data} />
        </div>
    );
};
