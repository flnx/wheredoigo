import { useFormInput } from './useFormInput';
import { useSubmitFormData } from './useSubmitFormData';
import { useImages } from '../../../hooks/useImages';

// Components
import { UploadImagesPreview } from '../../../components/UploadImagesPreview/UploadImagesPreview';
import { ShowFormError } from '../../../components/ShowFormError/ShowFormError';
import { DarkOverlay } from '../../../components/DarkOverlay/DarkOverlay';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { FormSelect } from '../../../components/FormSelect/FormSelect';
import { ServerError } from '../../../components/ServerError/ServerError';
import { SuccessButton } from '../../../components/Buttons/Success-Button/SuccessButton';

import styles from './Form.module.css';

export const Form = ({ destinationId, allowedCategories }) => {
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
                <UploadImagesPreview
                    addImages={addImages}
                    deleteImage={deleteImage}
                    images={images.imageUrls}
                />
                {images.imageUrls.length < 4 && (
                    <ShowFormError errors={errors} errorParam={'images'} />
                )}
            </div>
            <SuccessButton isLoading={isLoading} type="submit" fw="600" p="0.6rem 1.15rem">
                Add Place
            </SuccessButton>
            {isLoading && <DarkOverlay isLoading={isLoading} />}
            <ServerError errorMessage={serverError} />
        </form>
    );
};
