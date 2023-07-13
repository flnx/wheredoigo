import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePlace } from '../../hooks/queries/usePlace';
import { useErrorBoundary } from 'react-error-boundary';
import { useDocumentTitle } from '../../hooks/useTitle';

// components
import { Container } from '../../components/Containers/Container/Container';
import { Header } from './components/Header/Header';
import { Images } from './components/ImagesSection/ImagesSection';
import { Comments } from './components/Comments/Comments';
import { CommentForm } from './components/CommentForm/CommentForm';
import { GenerateAIComments } from './components/GenerateAIComments/GenerateAIComments';

import styles from './PlaceDetails.module.css';

export const PlaceDetails = () => {
    const { showBoundary } = useErrorBoundary();
    const { placeId } = useParams();
    const { data, isLoading, error } = usePlace(placeId);
    const commentSectionRef = useRef();
    useDocumentTitle(data?.name);

    if (error) {
        showBoundary(error);
        return null;
    }
    
    const place = data || {};
    const imagesData = place?.imageUrls || [];
    const { isAuth, hasCommented, hasAIComments, isOwner } = place;

    return (
        <Container>
            <div className={styles.wrapper}>
                <Images 
                    imageUrls={imagesData} 
                    isLoading={isLoading} 
                    city={place.city} 
                />

                <Header place={place} isLoading={isLoading} />

                {!isLoading && (
                    <>
                        {isOwner && !hasAIComments && 
                            <GenerateAIComments placeId={placeId} />
                        }

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
        </Container>
    );
};
