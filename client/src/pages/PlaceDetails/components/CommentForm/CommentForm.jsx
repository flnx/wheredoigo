import { useState } from 'react';
import { useSubmitFormData } from './useSubmitFormData';

// Local Components
import { Rate } from './Rate';

// Global Components
import { SecondaryButton } from 'src/components/Buttons/Secondary-Btn/SecondaryButton';
import { DarkOverlay } from 'src/components/DarkOverlay/DarkOverlay';
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';
import { ShowFormError } from 'src/components/ShowFormError/ShowFormError';

import styles from './CommentForm.module.css';

export const CommentForm = ({ commentSectionRef }) => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [cachedRate, setCachedRate] = useState(0);
    const [handleSubmit, isLoading, error, errors] = useSubmitFormData({
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

    const isNotTitled = title.length < 2 && errors.some((err) => err.includes('Title'));
    const hasCommentError = errors.some((err) => err.includes('Comment'));
    const hasCommentCharBoundary = content.length < 10 || content.length > 2000;

    return (
        <div>
            <h3 className={styles.title}>Leave a comment</h3>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e, commentSectionRef)}>
                <Rate
                    userRating={rating}
                    changeRateHandler={onRateChangeHandler}
                    handleRateCache={cacheRateHandler}
                    cachedRate={cachedRate}
                    errors={errors}
                />

                <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                {isNotTitled && <ShowFormError errors={errors} errorParam={'title'} />}

                <textarea
                    className={styles.formTextarea}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                    value={content}
                />
                {hasCommentError && hasCommentCharBoundary && (
                    <ShowFormError errors={errors} errorParam={'comment'} />
                )}

                <SecondaryButton padding={0.95} isLoading={isLoading}>
                    Submit your Review
                </SecondaryButton>
            </form>
            {isLoading && <DarkOverlay isLoading={isLoading} />}
            {error && <ServerErrorPopUp errorMessage={error} />}
        </div>
    );
};
