import { useCallback, useState } from 'react';
import { useDestinationInput } from './useDestinationInput';
import { useSubmitData } from './useSubmitData';
import { useImages } from '../../../../hooks/useImages';

// Components
import { ServerErrorPopUp } from '../../../../components/ServerErrorPopUp/ServerErrorPopUp';
import { Description } from './components/Description';
import { Details } from './components/Details';
import { ImageUploader } from '../../../../components/ImageUploader/ImageUploader';
import { ImageThumbnailsPreview } from '../../../../components/ImageThumbnailsPreview/ImageThumbnailsPreview';
import { SuccessButton } from '../../../../components/Buttons/Success-Button/SuccessButton';
import { DetailsButtons } from './components/DetailsButtons/DetailsButtons';
import { DarkOverlay } from '../../../../components/DarkOverlay/DarkOverlay';
import { ShowFormError } from '../../../../components/ShowFormError/ShowFormError';
import { FormCheckboxes } from '../../../../components/FormCheckboxes/FormCheckboxes';
import { MemoizedLocationDropdown } from './components/LocationDropdown/LocationDropdown';

import styles from './AddDestination.module.css';

const categories = ['Beach', 'Mountains', 'Cultural', 'Snow', 'Islands', 'Adventure'];

export const AddDestination = () => {
    const [showDetail, setShowDetail] = useState({ name: '' });
    const { updateField, updateDescription, updateDetail, updateCategory, state } =
        useDestinationInput();
    const { images, addImages, deleteImage } = useImages();

    const { submitHandler, isLoading, error, errors } = useSubmitData(
        images,
        state,
        categories
    );

    const updateFieldCb = useCallback((name, value) => updateField(name, value), []);
    const showDetailHandler = (detail) => setShowDetail(detail);
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
                        showDetailHandler={showDetailHandler}
                        selectedDetail={selectedDetail}
                    />
                )}

                <ImageUploader addImages={addImages} />

                <ImageThumbnailsPreview
                    images={images.imageUrls}
                    handleDeleteImage={(_, index) => deleteImage(index)}
                />

                {images.imageUrls.length < 4 && (
                    <ShowFormError errors={errors} errorParam={'images'} />
                )}

                <SuccessButton isLoading={isLoading} type="submit" fw="600" p="0.6rem 1.15rem">
                    Create Destination
                </SuccessButton>
            </form>
        </div>
    );
};
