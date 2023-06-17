import { useState } from 'react';
import { useSubmitFormData } from './useSubmitFormData';

// Components
import { SecondaryButton } from '../../../../components/Buttons/Secondary-Btn/SecondaryButton';
import { Rate } from './Rate';
import { DarkOverlay } from '../../../../components/DarkOverlay/DarkOverlay';
import { ServerError } from '../../../../components/ServerError/ServerError';

import styles from './CommentForm.module.css';

export const CommentForm = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [cachedRate, setCachedRate] = useState(0);
    const [handleSubmit, isLoading, error, validationError] = useSubmitFormData({
        title,
        content,
        rating,
        resetForm,
    });

    function cacheRateHandler(value) {
        setCachedRate(value);
    }

    function onRateChangeHandler(clickedStarValue) {
        setRating(clickedStarValue);
    }

    function resetForm() {
        setTitle('');
        setContent('');
        onRateChangeHandler(0);
        cacheRateHandler(0);
    }

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
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                    value={content}
                />
                <SecondaryButton isLoading={isLoading}>Submit your Review</SecondaryButton>
            </form>
            {isLoading && <DarkOverlay isLoading={isLoading} />}
            {validationError && <span className={styles.error}>{validationError}</span>}
            {error && <ServerError errorMessage={error} />}
        </div>
    );
};
