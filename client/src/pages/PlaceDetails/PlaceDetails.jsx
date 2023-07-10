import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePlace } from '../../hooks/queries/usePlace';
import { extractServerErrorMessage } from '../../utils/utils';

// components
import { Container } from '../../components/Containers/Container/Container';
import { Header } from './components/Header/Header';
import { Images } from './components/ImagesSection/ImagesSection';
import { Comments } from './components/Comments/Comments';
import { CommentForm } from './components/CommentForm/CommentForm';
import { GenerateAIComments } from './components/GenerateAIComments/GenerateAIComments';
import { NotFound } from '../../components/NotFound/NotFound';

import styles from './PlaceDetails.module.css';

export const PlaceDetails = () => {
    const { placeId } = useParams();
    const { data, isLoading, error } = usePlace(placeId);
    const commentSectionRef = useRef();

    const place = data || {};
    const imagesData = place?.imageUrls || [];

    const { isAuth, hasCommented, hasAIComments, isOwner } = data || {};

    if (error && error?.response.status == 404) {
        return <NotFound />;
    }

    return (
        <Container>
            {error ? (
                <p>{extractServerErrorMessage(error)}</p>
            ) : (
                <div className={styles.wrapper}>
                    <Images imageUrls={imagesData} isLoading={isLoading} city={place.city} />
                    <Header place={place} isLoading={isLoading} />
                    {!isLoading && (
                        <>
                            {isOwner && !hasAIComments && (
                                <GenerateAIComments placeId={placeId} />
                            )}

                            <Comments
                                placeId={placeId}
                                commentSectionRef={commentSectionRef}
                            />
                            {isAuth && !hasCommented && (
                                <CommentForm commentSectionRef={commentSectionRef} />
                            )}
                        </>
                    )}
                </div>
            )}
        </Container>
    );
};
