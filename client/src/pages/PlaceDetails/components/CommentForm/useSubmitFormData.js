import { useParams } from 'react-router-dom';
import { useState } from 'react';

// React Query Hooks
import { useAddComment } from 'src/hooks/queries/useAddComment';

// Validation
import { addCommentSchema } from 'src/utils/validationSchemas/placeSchemas';

export const useSubmitFormData = ({ title, content, rating, resetForm }) => {
    const { placeId } = useParams();
    const { isLoading, error, mutate: addComment } = useAddComment(placeId);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e, commentSectionRef) => {
        e.preventDefault();

        const data = { title, content, rating };

        try {
            await addCommentSchema.validate(data, { abortEarly: false });

            addComment(data, {
                onSuccess: () => {
                    setErrors('');
                    resetForm();
                    // when comment is added it scrolls right on it

                    commentSectionRef.current?.scrollIntoView();
                },
            });
        } catch (err) {
            setErrors(err.errors || [err.message]);
        }
    };

    return [handleSubmit, isLoading, error, errors];
};
