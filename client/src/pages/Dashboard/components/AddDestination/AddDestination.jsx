import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewDestination } from '../../../../hooks/queries/useAddDestination';
import { UploadImages } from './components/UploadImages';
import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';

// Components
import { SearchCity } from './components/SearchCity';
import { Description } from './components/Description';
import { Categories } from './components/Categories';
import { Details } from './components/Details';

import styles from './AddDestination.module.css';

export const AddDestination = () => {
    const [createDestination, createError, isLoading] = useAddNewDestination();
    const [state, dispatch] = useReducer(destinationFormReducer, initialState);
    const [showDetail, setShowDetail] = useState({ category: null });
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();

    if (createError) {
        console.log(createError.response.data || createError.message);
    }

    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    const showDetailHandler = (category) => {
        setShowDetail(category);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        const formData = new FormData();
        const imagePattern = /^image\/(jpe?g|png|webp)$/i;

        formData.append('city', state.city);
        formData.append('country', state.country);
        formData.append('description', state.description);
        formData.append('details', JSON.stringify(state.details));

        for (let [index, url] of state.imageUrls.entries()) {
            try {
                const res = await fetch(url);
                const blob = await res.blob();
                const contentType = blob.type;

                if (!imagePattern.test(contentType)) {
                    console.log('Only image files are allowed');
                    continue;
                }

                const fileExtension = '.' + contentType.split('/')[1];
                const file = new File([blob], `image-${index}${fileExtension}`, {
                    type: contentType,
                });

                formData.append('imageUrls', file);
            } catch (error) {
                console.log(error);
            }
        }

        createDestination(formData, {
            onSuccess: (newDestination) => {
                console.log(newDestination);
            },
        });
    };

    const openedDetailsCategory = state.details.find((x) => x.category == showDetail.category);

    return (
        <section>
            <form className={styles.form} onSubmit={submitHandler}>
                <SearchCity dispatchHandler={dispatchHandler} state={state} />
                <Description dispatchHandler={dispatchHandler} state={state} />
                <UploadImages dispatchHandler={dispatchHandler} images={state.imageUrls} />
                <Categories showDetailHandler={showDetailHandler} />
                {showDetail.category && (
                    <Details
                        dispatchHandler={dispatchHandler}
                        showDetailHandler={showDetailHandler}
                        openedDetailsCategory={openedDetailsCategory}
                    />
                )}
                <div>{errorMessage && errorMessage}</div>
                <div>
                    <button disabled={isLoading} className={styles.btn} type="submit">
                        Add
                    </button>
                </div>
            </form>
        </section>
    );
};
