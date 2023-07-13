import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { useAddComment } from '../../../../hooks/queries/useAddComment';

export const useSubmitFormData = ({ title, content, rating, resetForm }) => {
    const { placeId } = useParams();
    const { isLoading, error, mutate: addComment } = useAddComment(placeId);
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e, commentSectionRef) => {
        e.preventDefault();

        let errors = [];

        if (isLoading) return;

        if (rating == 0) {
            errors.push('Please rate the place to share your experience')
        }
        
        if (title.length < 2) {
            errors.push('Title must be at least 2 characters long')
        }

        if (content.length < 10) {
            errors.push('Comment must contain at least 10 characters');
        }

        if (errors.length > 0) {
            return setValidationErrors(errors);
        }

        const data = { title, content, rating };

        addComment(data, {
            onSuccess: () => {
                setValidationErrors('');
                resetForm();
                // when comment is added it scrolls right on it

                commentSectionRef.current?.scrollIntoView();
            },
        });
    };

    return [handleSubmit, isLoading, error, validationErrors];
};
