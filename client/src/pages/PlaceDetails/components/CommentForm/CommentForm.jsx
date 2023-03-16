import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SecondaryButton } from '../../../../components/Buttons/Secondary-Btn/SecondaryButton';
import { AuthContext } from '../../../../context/AuthContext';
import { useAddComment } from '../../../../hooks/queries/useAddComment';
import { createPointer } from '../../../../utils/apiDataPointer';

import styles from './CommentForm.module.css';

export const CommentForm = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const { isLoading, error, mutate: addComment } = useAddComment()
    const { placeId } = useParams();
    const { auth } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (content.length < 10) return;
        if (title.length < 5) return;

        const data = {
            title,
            content,
            userImg: 'https://randomuser.me/api/portraits/women/64.jpg',
            username: auth.username,
            ownerId: createPointer('_User', auth.ownerId),
            placeId: createPointer('Place', placeId)
        }

        addComment(data);
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
                <SecondaryButton submitHandler={handleSubmit}>
                    Submit your Review
                </SecondaryButton>
            </form>
        </div>
    );
};
