import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAddNewDestination } from '../../../../hooks/queries/useAddDestination';
import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';
import { createDestinationFormData } from '../../../../utils/formData';
import { validateDestinationData } from '../../../../utils/formValidators';

// Components
import { SearchCity } from './components/SearchCity';
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
    const [validCity, setValidCity] = useState(false);
    const navigate = useNavigate();

    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    const validateCityHandler = (city) => {
        setValidCity(city);
    };

    const showDetailHandler = (category) => {
        setShowDetail(category);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const errors = validateDestinationData(state, validCity);
        setErrorMessages(errors);
        
        if (errors.length > 0) {
            return;
        }
        
        const formData = await createDestinationFormData(state);
        
        createDestination(formData, {
            onSuccess: (newDestination) => {
                const { _id } = newDestination;
                const { DESTINATIONS } = routeConstants;
                
                navigate(DESTINATIONS.BY_ID.routePath(_id));
            },
        });
    };

    const inputErrorClass = (name) => {
        const isInputError = errorMessages.some((errMsg) =>
            errMsg.toLowerCase().includes(name.toLowerCase())
        );

        return isInputError ? 'error' : null;
    };

    const openedDetailsCategory = state.details.find((x) => x.category == showDetail.category);
    const errorMessage = createError && extractServerErrorMessage(createError);


    return (
        <div className={styles.container}>
            {createError && <span class={styles.serverError}>{errorMessage}</span>}
            <form className={styles.form} onSubmit={submitHandler}>
                <SearchCity
                    city={state.city}
                    dispatchHandler={dispatchHandler}
                    validateCityHandler={validateCityHandler}
                    validCity={validCity}
                    errorMessages={errorMessages}
                />
                <Description
                    state={state}
                    dispatchHandler={dispatchHandler}
                    inputErrorClass={inputErrorClass}
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
                    <SuccessButton
                        disabled={isLoading}
                        type="submit"
                        fw="600"
                        p="0.6rem 1.15rem"
                    >
                        Create Destination
                    </SuccessButton>
                </div>
            </form>
        </div>
    );
};
