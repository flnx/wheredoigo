import { useFormInput } from './useAddPlaceInput';

// Components
import { UploadImagesPreview } from '../../../components/UploadImagesPreview/UploadImagesPreview';
import { ShowFormError } from '../../../components/ShowFormError/ShowFormError';
import { DarkOverlay } from '../../../components/DarkOverlay/DarkOverlay';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';

import styles from './Form.module.css';

export const Form = ({ destinationId, allowedCategories }) => {
    const { 
        handleSubmit, 
        state, 
        handleChange, 
        errors, 
        dispatchHandler, 
        isLoading 
    } = useFormInput(destinationId, allowedCategories)

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input name={state.name} onChangeHandler={handleChange} errors={errors} />
            <Textarea
                description={state.description}
                onChangeHandler={handleChange}
                errors={errors}
            />
            <Select
                type={state.type}
                onChangeHandler={handleChange}
                errors={errors}
                categories={allowedCategories}
            />

            <div className={styles.formRow}>
                <UploadImagesPreview
                    dispatchHandler={dispatchHandler}
                    images={state.imageUrls}
                />
                <ShowFormError errors={errors} errorParam={'images'} />
            </div>
            <button type="submit" className={styles.formButton} disabled={isLoading}>
                Submit
            </button>
            {isLoading && <DarkOverlay isLoading={isLoading} />}
        </form>
    );
};
