import { useReducer, useState } from 'react';
import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';
import { createDestination } from '../../../../service/data/destinations';

// Components
import { SearchCity } from './components/SearchCity';
import { Description } from './components/Description';
import { Categories } from './components/Categories';
import { Details } from './components/Details';

import styles from './AddDestination.module.css';
import { UploadImages } from './components/UploadImages';

export const AddDestination = () => {
    const [state, dispatch] = useReducer(destinationFormReducer, initialState);
    const [showDetail, setShowDetail] = useState({ category: null });

    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    const showDetailHandler = (category) => {
        setShowDetail(category);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('city', state.city);
        formData.append('country', state.country);
        formData.append('description', state.description);
        formData.append('details', state.details);

        state.imageUrls.forEach((blob, index) => {
            const file = new File([blob], `image-${index}.jpg`, { type: 'image/jpeg' });
            formData.append('imageUrls', file);
        });

        createDestination(formData);
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
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </section>
    );
};
