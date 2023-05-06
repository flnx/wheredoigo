import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddComment } from '../../../../hooks/queries/useAddComment';
import { SecondaryButton } from '../../../../components/Buttons/Secondary-Btn/SecondaryButton';
import { Rate } from './Rate';

import styles from './CommentForm.module.css';

export const CommentForm = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [validationError, setValidationError] = useState(false);
    const [rating, setRating] = useState(0);
    const [cachedRate, setCachedRate] = useState(0);
    const { placeId } = useParams();
    const { isLoading, error, mutate: addComment } = useAddComment(placeId);

    const cacheRateHandler = (value) => {
        setCachedRate(value);
    };

    const onRateChangeHandler = (clickedStarValue) => {
        setRating(clickedStarValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.length < 2) {
            return setValidationError('Title must be at least 2 characters long');
        }

        if (content.length < 10) {
            return setValidationError('Comment must contain at least 10 characters');
        }

        const data = {
            title,
            content,
            rating,
        };

        addComment(data, {
            onSuccess: () => {
                setValidationError('');
                setTitle('');
                setContent('');
                onRateChangeHandler(0);
                cacheRateHandler(0);
            },
        });
    };

    return (
        <div>
            <h3 className={styles.title}>Leave a comment</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Rate
                    userRating={rating}
                    changeRateHandler={onRateChangeHandler}
                    handleRateCache={cacheRateHandler}
                    cachedRate={cachedRate}
                />

                <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <textarea
                    className={styles.formTextarea}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    placeholder="Add a comment..."
                    value={content}
                />
                <SecondaryButton>Submit your Review</SecondaryButton>
            </form>
            {isLoading && <span>Loading...</span>}
            {validationError && <span className={styles.error}>{validationError}</span>}
        </div>
    );
};
