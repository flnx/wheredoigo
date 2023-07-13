import { useFormInput } from './useFormInput';
import { useSubmitFormData } from './useSubmitFormData';
import { useImages } from '../../../hooks/useImages';

// Components
import { ImageUploader } from '../../../components/ImageUploader/ImageUploader';
import { ImageThumbnailsPreview } from '../../../components/ImageThumbnailsPreview/ImageThumbnailsPreview';
import { ShowFormError } from '../../../components/ShowFormError/ShowFormError';
import { DarkOverlay } from '../../../components/DarkOverlay/DarkOverlay';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { FormSelect } from '../../../components/FormSelect/FormSelect';
import { ServerErrorPopUp } from '../../../components/ServerErrorPopUp/ServerErrorPopUp';
import { SuccessButton } from '../../../components/Buttons/Success-Button/SuccessButton';

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
