import { useParams } from 'react-router-dom';
import { usePlace } from '../../hooks/queries/usePlace';
import { extractServerErrorMessage } from '../../utils/utils';

// components
import { Header } from './components/Header/Header';
import { Images } from './components/ImagesSection/ImagesSection';
import { Comments } from './components/Comments/Comments';
import { CommentForm } from './components/CommentForm/CommentForm';

import styles from './PlaceDetails.module.css';

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { data, isLoading, error } = usePlace(placeId);

    return (
        <div className="container">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error ? (
                        <p>{extractServerErrorMessage(error)}</p>
                    ) : (
                        <div className={styles.wrapper}>
                            <Images place={data} />
                            <Header place={data} />
                            <Comments comments={data.comments} />
                            {data.isAuth && <CommentForm />}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
