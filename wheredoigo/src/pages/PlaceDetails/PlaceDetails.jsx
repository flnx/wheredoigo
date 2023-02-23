import { useParams } from 'react-router-dom';
import { usePlace } from '../../hooks/queries/usePlace';

// components
import { Header } from './components/Header/Header';
import { Images } from './components/ImagesSection/ImagesSection';
import { Reviews } from './components/Reviews/Reviews';
import { CommentForm } from './components/CommentForm/CommentForm';

import styles from './PlaceDetails.module.css';

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { place,  comments } = usePlace(placeId);

    if (place.isLoading || comments.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (place.error) {
        return <h1>An Error Has Occured</h1>;
    }

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <Images place={place.data} />
                <Header place={place.data} />
                <Reviews reviews={comments.data}/>
                <CommentForm />
            </div>
        </div>
    );
};
