import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAddNewDestination } from '../../../../hooks/queries/useAddDestination';
import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';
import { createDestinationFormData } from '../../../../utils/formData';
import { validateDestinationData } from '../../../../utils/formValidators';

// Components
import { SearchCity } from './components/SearchCity/SearchCity';
import { Description } from './components/Description';
import { DetailsButtons } from './components/DetailsButtons';
import { Details } from './components/Details';
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';
import { SuccessButton } from '../../../../components/Buttons/Success-Button/SuccessButton';
import { CategoriesSelect } from './components/CategoriesSelect';

import { extractServerErrorMessage } from '../../../../utils/utils';

import routeConstants from '../../../../constants/routeConstants';
import styles from './AddDestination.module.css';

export const AddDestination = () => {
    const [createDestination, createError, isLoading] = useAddNewDestination();
    const [state, dispatch] = useReducer(destinationFormReducer, initialState);
    const [showDetail, setShowDetail] = useState({ category: null });
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    const showDetailHandler = (category) => {
        setShowDetail(category);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const errors = validateDestinationData(state);
        setErrorMessages(errors);

        if (errors.length > 0) return;

        const formData = await createDestinationFormData(state);

        createDestination(formData, {
            onSuccess: (newDestination) => {
                const { routePath } = routeConstants.DESTINATIONS.BY_ID;
                navigate(routePath(newDestination._id));
            },
        });
    };

    const openedDetailsCategory = state.details.find((x) => x.category == showDetail.category);
    const errorMessage = createError && extractServerErrorMessage(createError);

    return (
        <div className={styles.container}>
            {createError && <span class={styles.serverError}>{errorMessage}</span>}
            <form className={styles.form} onSubmit={submitHandler}>
                <SearchCity
                    dispatchHandler={dispatchHandler}
                    errorMessages={errorMessages}
                    city={state.city}
                    lastCityFetch={state.lastCityFetch}
                />
                <Description
                    description={state.description}
                    dispatchHandler={dispatchHandler}
                    errorMessages={errorMessages}
                />
                <UploadImagesPreview
                    dispatchHandler={dispatchHandler}
                    images={state.imageUrls}
                />
                <DetailsButtons showDetailHandler={showDetailHandler} />
                {showDetail.category && (
                    <Details
                        dispatchHandler={dispatchHandler}
                        showDetailHandler={showDetailHandler}
                        openedDetailsCategory={openedDetailsCategory}
                    />
                )}

                <CategoriesSelect dispatchHandler={dispatchHandler} state={state} />
                <div>
                    <SuccessButton disabled={isLoading} type="submit" fw="600" p="0.6rem 1.15rem">
                        Create Destination
                    </SuccessButton>
                </div>
            </form>
        </div>
    );
};
