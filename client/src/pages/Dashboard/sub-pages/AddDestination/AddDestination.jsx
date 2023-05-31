import { useState } from 'react';
import { useDestinationInput } from './useDestinationInput';
import { useSubmitData } from './useSubmitData';
import { useImages } from '../../../../hooks/useImages';

// Components
import { ServerError } from '../../../../components/ServerError/ServerError';
import { SearchCity } from './components/SearchCity/SearchCity';
import { Description } from './components/Description';
import { Details } from './components/Details';
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';
import { SuccessButton } from '../../../../components/Buttons/Success-Button/SuccessButton';
import { DetailsButtons } from './components/DetailsButtons/DetailsButtons';
import { DarkOverlay } from '../../../../components/DarkOverlay/DarkOverlay';
import { ShowFormError } from '../../../../components/ShowFormError/ShowFormError';
import { FormSelect } from '../../../../components/FormSelect/FormSelect';

import styles from './AddDestination.module.css';

export const AddDestination = () => {
    const categories = ['Beach', 'Mountains', 'Cultural', 'Snow', 'Islands', 'Adventure'];

    const [showDetail, setShowDetail] = useState({ category: null });
    const { updateField, updateDetail, updateLastCityFetch, state } = useDestinationInput();
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
                <UploadImagesPreview
                    addImages={addImages}
                    deleteImage={deleteImage}
                    images={images.imageUrls}
                />

                {images.imageUrls.length < 4 && (
                    <ShowFormError errors={errors} errorParam={'images'} />
                )}
                <DetailsButtons showDetailHandler={showDetailHandler} />
                {showDetail.category && (
                    <Details
                        updateDetail={updateDetail}
                        showDetailHandler={showDetailHandler}
                        openedDetailsCategory={openedDetailsCategory}
                    />
                )}
                <FormSelect
                    value={state.category}
                    options={categories}
                    onChangeHandler={(e) => updateField(e.target.name, e.target.value)}
                    label={'Category'}
                    errors={errors}
                    boxshadow={true}
                />

                <SuccessButton isLoading={isLoading} type="submit" fw="600" p="0.6rem 1.15rem">
                    Create Destination
                </SuccessButton>
            </form>
        </div>
    );
};
