import { useParams } from 'react-router-dom';
import { usePlace } from '../../hooks/queries/usePlace';
import { extractServerErrorMessage } from '../../utils/utils';

// components
import { Container } from '../../components/Containers/Container/Container';
import { Header } from './components/Header/Header';
import { Images } from './components/ImagesSection/ImagesSection';
import { Comments } from './components/Comments/Comments';
import { CommentForm } from './components/CommentForm/CommentForm';

import styles from './PlaceDetails.module.css';

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { data, isLoading, error } = usePlace(placeId);

    const place = data || {};
    const { isAuth, hasCommented } = data || {};

    return (
        <Container>
            {error ? (
                <p>{extractServerErrorMessage(error)}</p>
            ) : (
                <div className={styles.wrapper}>
                    <Images place={place} isLoading={isLoading} city={place.city} />
                    <Header place={place} isLoading={isLoading} />
                    {!isLoading && (
                        <>
                            {<Comments placeId={placeId} />}
                            {isAuth && !hasCommented && <CommentForm />}
                        </>
                    )}
                </div>
            )}
        </Container>
    );
};
