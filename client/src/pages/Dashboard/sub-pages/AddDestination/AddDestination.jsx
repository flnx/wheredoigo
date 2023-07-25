import { useCallback, useState } from 'react';
import { useDestinationInput } from './useDestinationInput';
import { useSubmitData } from './useSubmitData';
import { useImages } from 'src/hooks/useImages';

// Home Components
import { Description } from './components/Description';
import { Details } from './components/Details';
import { MemoizedLocationDropdown } from './components/LocationDropdown/LocationDropdown';
import { DetailsButtons } from './components/DetailsButtons/DetailsButtons';

// Global Components
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';
import { ImageUploader } from 'src/components/ImageUploader/ImageUploader';
import { ImageThumbnailsPreview } from 'src/components/ImageThumbnailsPreview/ImageThumbnailsPreview';
import { SuccessButton } from 'src/components/Buttons/Success-Button/SuccessButton';
import { DarkOverlay } from 'src/components/DarkOverlay/DarkOverlay';
import { ShowFormError } from 'src/components/ShowFormError/ShowFormError';
import { FormCheckboxes } from 'src/components/FormCheckboxes/FormCheckboxes';

import styles from './AddDestination.module.css';

export const AddDestination = () => {
    const [showDetail, setShowDetail] = useState({ name: '' });
    const { images, addImages, deleteImage } = useImages();
    
    const categories = ['Beach', 'Mountains', 'Cultural', 'Snow', 'Islands', 'Adventure'];
    
    const {
        updateField,
        updateDescription,
        updateDetail,
        updateCategory,
        state,
    } = useDestinationInput();

    const { submitHandler, isLoading, error, errors } = useSubmitData(
        images,
        state,
        categories
    );

    const updateFieldCb = useCallback((name, value) => updateField(name, value), []);
    const showDetailHandler = (detail) => setShowDetail(detail);
    const hideDetailHandler = () => setShowDetail({ name: '' });
    const selectedDetail = state.details.find((d) => d.name == showDetail.name);

    return (
        <div className={styles.container}>
            <h1 className="smaller mb-2">Add destination</h1>

            {isLoading && <DarkOverlay isLoading={isLoading} />}
            {error && <ServerErrorPopUp errorMessage={error} />}

            <form className={styles.form} onSubmit={submitHandler}>
                <MemoizedLocationDropdown
                    onChangeHandler={updateFieldCb}
                    city={state.city}
                    country={state.country}
                    errors={errors}
                />

                <Description
                    updateDescription={updateDescription}
                    errors={errors}
                    charCounter={state.description.charCounter}
                />

                <FormCheckboxes
                    options={categories}
                    categories={state.categories}
                    onChangeHandler={updateCategory}
                    errors={errors}
                />

                <DetailsButtons showDetailHandler={showDetailHandler} />
                {selectedDetail && (
                    <Details
                        updateDetail={updateDetail}
                        hideDetailHandler={hideDetailHandler}
                        selectedDetail={selectedDetail}
                    />
                )}

                <ImageUploader addImages={addImages} />

                <ImageThumbnailsPreview
                    images={images.imageUrls}
                    handleDeleteImage={(_, index) => deleteImage(index)}
                />

                {images.imageUrls.length < 5 && (
                    <ShowFormError errors={errors} errorParam={'images'} />
                )}

                <SuccessButton isLoading={isLoading} type="submit" fw="600" p="0.6rem 1.15rem">
                    Create Destination
                </SuccessButton>
            </form>
        </div>
    );
};
