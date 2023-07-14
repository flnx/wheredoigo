import { useState } from 'react';
import { useSubmitFormData } from './useSubmitFormData';

// Components
import { SecondaryButton } from '../../../../components/Buttons/Secondary-Btn/SecondaryButton';
import { Rate } from './Rate';
import { DarkOverlay } from '../../../../components/DarkOverlay/DarkOverlay';
import { ServerErrorPopUp } from '../../../../components/ServerErrorPopUp/ServerErrorPopUp';
import { ShowFormError } from '../../../../components/ShowFormError/ShowFormError';

import styles from './CommentForm.module.css';

export const CommentForm = ({ commentSectionRef }) => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [cachedRate, setCachedRate] = useState(0);
    const [handleSubmit, isLoading, error, validationErrors] = useSubmitFormData({
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

            <form className={styles.form} onSubmit={(e) => handleSubmit(e, commentSectionRef)}>
                <Rate
                    userRating={rating}
                    changeRateHandler={onRateChangeHandler}
                    handleRateCache={cacheRateHandler}
                    cachedRate={cachedRate}
                />
                <ShowFormError errors={validationErrors} errorParam={'rate'} />

                <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <ShowFormError errors={validationErrors} errorParam={'title'} />

                <textarea
                    className={styles.formTextarea}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                    value={content}
                />
                <ShowFormError errors={validationErrors} errorParam={'comment'} />
                <SecondaryButton padding={0.95} isLoading={isLoading}>
                    Submit your Review
                </SecondaryButton>
            </form>
            {isLoading && <DarkOverlay isLoading={isLoading} />}
            {error && <ServerErrorPopUp errorMessage={error} />}
        </div>
    );
};
