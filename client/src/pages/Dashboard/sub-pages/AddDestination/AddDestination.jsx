import { useAddDestinationInput } from './useAddDestinationInput';

// Components
import { ServerError } from '../../../../components/ServerError/ServerError';
import { SearchCity } from './components/SearchCity/SearchCity';
import { Description } from './components/Description';
import { Details } from './components/Details';
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';
import { SuccessButton } from '../../../../components/Buttons/Success-Button/SuccessButton';
import { SelectCategory } from './components/SelectCategory/SelectCategory';
import { DetailsButtons } from './components/DetailsButtons/DetailsButtons';
import { DarkOverlay } from '../../../../components/DarkOverlay/DarkOverlay';
import { ShowFormError } from '../../../../components/ShowFormError/ShowFormError';

import styles from './AddDestination.module.css';

export const AddDestination = () => {
    const {
        dispatchHandler,
        showDetailHandler,
        submitHandler,
        openedDetailsCategory,
        createError,
        errorMessages,
        isLoading,
        state,
        showDetail
    } = useAddDestinationInput();

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} smaller`}>Add destination</h1>
            {isLoading && <DarkOverlay isLoading={isLoading} />}
            {createError && <ServerError errorMessage={createError} />}
            <form className={styles.form} onSubmit={submitHandler}>
                <SearchCity
                    dispatchHandler={dispatchHandler}
                    errorMessages={errorMessages}
                    city={state.city}
                    lastCityFetch={state.lastCityFetch}
                />
                <Description
                    dispatchHandler={dispatchHandler}
                    description={state.description}
                    errorMessages={errorMessages}
                />
                <UploadImagesPreview
                    dispatchHandler={dispatchHandler}
                    images={state.imageUrls}
                />
                <ShowFormError errors={errorMessages} errorParam={'images'} />
                <DetailsButtons showDetailHandler={showDetailHandler} />
                {showDetail.category && (
                    <Details
                        dispatchHandler={dispatchHandler}
                        showDetailHandler={showDetailHandler}
                        openedDetailsCategory={openedDetailsCategory}
                    />
                )}

                <SelectCategory dispatchHandler={dispatchHandler} state={state} />
                <section>
                    <SuccessButton
                        disabled={isLoading}
                        type="submit"
                        fw="600"
                        p="0.6rem 1.15rem"
                    >
                        Create Destination
                    </SuccessButton>
                </section>
            </form>
        </div>
    );
};
