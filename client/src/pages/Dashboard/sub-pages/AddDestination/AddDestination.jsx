import { useState } from 'react';
import { useDestinationInput } from './useDestinationInput';
import { useSubmitData } from './useSubmitData';
import { useImages } from '../../../../hooks/useImages';

// Components
import { ServerError } from '../../../../components/ServerError/ServerError';
import { SearchCity } from './components/SearchCity/SearchCity';
import { Description } from './components/Description';
import { Details } from './components/Details';
import { ImageUploader } from '../../../../components/ImageUploader/ImageUploader';
import { ImageThumbnailsPreview } from '../../../../components/ImageThumbnailsPreview/ImageThumbnailsPreview';
import { SuccessButton } from '../../../../components/Buttons/Success-Button/SuccessButton';
import { DetailsButtons } from './components/DetailsButtons/DetailsButtons';
import { DarkOverlay } from '../../../../components/DarkOverlay/DarkOverlay';
import { ShowFormError } from '../../../../components/ShowFormError/ShowFormError';
import { FormSelect } from '../../../../components/FormSelect/FormSelect';

import styles from './AddDestination.module.css';
import { FormCheckboxes } from '../../../../components/FormCheckboxes/FormCheckboxes';

export const AddDestination = () => {
    const categories = ['Beach', 'Mountains', 'Cultural', 'Snow', 'Islands', 'Adventure'];

    const [showDetail, setShowDetail] = useState({ category: null });
    const { updateField, updateDetail, updateLastCityFetch, updateCategory, state } = useDestinationInput();
    const { images, addImages, deleteImage } = useImages();
    const { submitHandler, isLoading, error, errors } = useSubmitData(
        images,
        state,
        categories
    );

    const showDetailHandler = (category) => setShowDetail(category);
    const openedDetailsCategory = state.details.find((x) => x.category == showDetail.category);

    return (
        <div className={styles.container}>
            <h1 className="smaller mb-2">Add destination</h1>

            {isLoading && <DarkOverlay isLoading={isLoading} />}
            {error && <ServerError errorMessage={error} />}

            <form className={styles.form} onSubmit={submitHandler}>
                <SearchCity
                    updateField={updateField}
                    updateLastCityFetch={updateLastCityFetch}
                    city={state.city}
                    lastCityFetch={state.lastCityFetch}
                    errors={errors}
                />
                <Description
                    updateField={updateField}
                    description={state.description}
                    errors={errors}
                />

                <FormCheckboxes
                    options={categories}
                    categories={state.categories}
                    onChangeHandler={updateCategory}
                    boxshadow={true}
                    errors={errors}
                />

                <DetailsButtons showDetailHandler={showDetailHandler} />
                {showDetail.category && (
                    <Details
                        updateDetail={updateDetail}
                        showDetailHandler={showDetailHandler}
                        openedDetailsCategory={openedDetailsCategory}
                    />
                )}
                {/* <FormSelect
                    categories={state.categories}
                    options={categories}
                    onChangeHandler={(e) => updateField(e.target.name, e.target.value)}
                    label={'Category'}
                    errors={errors}
                    boxshadow={true}
                /> */}

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
