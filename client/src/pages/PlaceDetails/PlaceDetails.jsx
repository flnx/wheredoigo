import { useParams } from 'react-router-dom';
import { usePlace } from '../../hooks/queries/usePlace';

// components
import { Header } from './components/Header/Header';
import { Images } from './components/ImagesSection/ImagesSection';
import { Comments } from './components/Comments/Comments';
import { CommentForm } from './components/CommentForm/CommentForm';

import styles from './PlaceDetails.module.css';

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { data, isLoading, error } = usePlace(placeId);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>404 Not Found</h1>;
    }

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <Images place={data} />
                <Header place={data} />
                <Comments comments={data.comments} />
                <CommentForm />
            </div>
        </div>
    );
};
