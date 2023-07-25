import { useParams } from 'react-router-dom';
import { useState } from 'react';

// React Query Hooks
import { useAddComment } from 'src/hooks/queries/useAddComment';

// Validation
import { addCommentSchema } from 'src/utils/validationSchemas/placeSchemas';

export const useSubmitFormData = ({ title, content, rating, resetForm }) => {
    const { placeId } = useParams();
    const { isLoading, error, mutate: addComment } = useAddComment(placeId);
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e, commentSectionRef) => {
        e.preventDefault();

        const data = { title, content, rating };

        try {
            await addCommentSchema.validate(data, { abortEarly: false });

            addComment(data, {
                onSuccess: () => {
                    setValidationErrors('');
                    resetForm();
                    // when comment is added it scrolls right on it

                    commentSectionRef.current?.scrollIntoView();
                },
            });
        } catch (err) {
            console.log(err.errors);
            setValidationErrors(err.errors || [err.message]);
        }
    };

    return [handleSubmit, isLoading, error, validationErrors];
};
