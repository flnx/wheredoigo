import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddComment } from '../../../../hooks/queries/useAddComment';

import { SecondaryButton } from '../../../../components/Buttons/Secondary-Btn/SecondaryButton';
import { AuthContext } from '../../../../context/AuthContext';

import styles from './CommentForm.module.css';

export const CommentForm = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [validationError, setValidationError] = useState(false);
    const { placeId } = useParams();
    const { isLoading, error, mutate: addComment } = useAddComment(placeId);
    const { auth } = useContext(AuthContext);

    const handleSubmit = (e) => {
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
            token: auth.accessToken,
        };

        addComment(data, placeId);
    };

    return (
        <div>
            <h3 className={styles.title}>Leave a review</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Review Title..."
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className={styles.textarea}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add Review..."
                />
                <SecondaryButton clickHandler={handleSubmit}>Submit your Review</SecondaryButton>
            </form>
        </div>
    );
};
