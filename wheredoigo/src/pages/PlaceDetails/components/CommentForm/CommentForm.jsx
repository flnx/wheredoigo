import { useParams } from 'react-router-dom';
import { SecondaryButton } from '../../../../components/Buttons/Secondary-Btn/SecondaryButton';
import styles from './CommentForm.module.css';

export const CommentForm = () => {
    const { placeId } = useParams();

    return (
        <div>
            <h3 className={styles.title}>Leave a review</h3>
            <form className={styles.form}>
                <textarea className={styles.textarea} />
                <SecondaryButton>Submit your Review</SecondaryButton>
            </form>
        </div>
    );
};
