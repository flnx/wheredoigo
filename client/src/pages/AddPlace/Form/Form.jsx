import { useFormInput } from './useFormInput';
import { useSubmitFormData } from './useSubmitFormData';

// React Query Hooks
import { useImages } from 'src/hooks/useImages';

// Local Components
import { Input } from './Input';
import { Textarea } from './Textarea';

// Global Components
import { ImageUploader } from 'src/components/ImageUploader/ImageUploader';
import { ImageThumbnailsPreview } from 'src/components/ImageThumbnailsPreview/ImageThumbnailsPreview';
import { ShowFormError } from 'src/components/ShowFormError/ShowFormError';
import { DarkOverlay } from 'src/components/DarkOverlay/DarkOverlay';
import { FormSelect } from 'src/components/FormSelect/FormSelect';
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';
import { SuccessButton } from 'src/components/Buttons/Success-Button/SuccessButton';

import styles from './Form.module.css';

export const Form = ({ destinationId, allowedCategories, city }) => {
    const { state, onChangeHandler } = useFormInput();
    const { images, addImages, deleteImage } = useImages();

    const { handleSubmit, errors, isLoading, serverError } = useSubmitFormData({
        destinationId,
        allowedCategories,
        state,
        images,
    });

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Add place to {city}</h1>

            <Input name={state.name} onChangeHandler={onChangeHandler} errors={errors} />
            <Textarea
                description={state.description}
                onChangeHandler={onChangeHandler}
                errors={errors}
            />

            <FormSelect
                value={state.type}
                options={allowedCategories}
                onChangeHandler={onChangeHandler}
                label={'Type'}
                errors={errors}
            />

            <div className={styles.formRow}>
                <ImageUploader addImages={addImages} />

                <ImageThumbnailsPreview
                    images={images.imageUrls}
                    handleDeleteImage={(_, index) => deleteImage(index)}
                />

                {images.imageUrls.length < 4 && (
                    <ShowFormError errors={errors} errorParam={'images'} />
                )}
            </div>
            <SuccessButton isLoading={isLoading} type="submit" fw="600" p="0.6rem 1.15rem">
                Add Place
            </SuccessButton>
            {isLoading && <DarkOverlay isLoading={isLoading} />}
            {serverError && <ServerErrorPopUp errorMessage={serverError} />}
        </form>
    );
};
