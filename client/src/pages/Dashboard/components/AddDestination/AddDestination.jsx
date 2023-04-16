import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAddNewDestination } from '../../../../hooks/queries/useAddDestination';
import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';
import { createDestinationFormData } from '../../../../utils/formData';
import { validateDestinationData } from '../../../../utils/formValidators';

// Components
import { SearchCity } from './components/SearchCity';
import { Description } from './components/Description';
import { Categories } from './components/Categories';
import { Details } from './components/Details';
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';

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
                navigate(`/destinations/${newDestination._id}`);
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
    const errorMessage = createError?.response?.data || createError?.message;

    return (
        <section>
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
                <UploadImagesPreview dispatchHandler={dispatchHandler} images={state.imageUrls} />
                <Categories showDetailHandler={showDetailHandler} />
                {showDetail.category && (
                    <Details
                        dispatchHandler={dispatchHandler}
                        showDetailHandler={showDetailHandler}
                        openedDetailsCategory={openedDetailsCategory}
                    />
                )}
                <div>
                    <button disabled={isLoading} className={styles.btn} type="submit">
                        Add
                    </button>
                </div>
            </form>
        </section>
    );
};
