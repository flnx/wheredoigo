import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { useAddComment } from '../../../../hooks/queries/useAddComment';

export const useSubmitFormData = () => {
    const { placeId } = useParams();
    const { isLoading, error, mutate: addComment } = useAddComment(placeId);
    const [validationError, setValidationError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        if (title.length < 2) {
            return setValidationError('Title must be at least 2 characters long');
        }

        if (content.length < 10) {
            return setValidationError('Comment must contain at least 10 characters');
        }

        const data = { title, content, rating };

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

    return [handleSubmit, isLoading, error, validationError];
};
