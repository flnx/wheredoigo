import { useReducer, useState } from 'react';
import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';

// Components
import { SearchCity } from './components/SearchCity';
import { Description } from './components/Description';
import { Categories } from './components/Categories';

import styles from './AddDestination.module.css';
import { Details } from './components/Details';

export const AddDestination = () => {
    const [state, dispatch] = useReducer(destinationFormReducer, initialState);
    const [showDetail, setShowDetail] = useState({ category: null });

    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    const onDetailsClickHandler = (detailName) => {
        setShowDetail({ category: detailName });
    };

    const closeDetailWindowHandler = () => {
        setShowDetail({});
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    const detailSection = state.details.find((x) => x.category == showDetail.category);

    return (
        <section>
            <form className={styles.form} onSubmit={submitHandler}>
                <SearchCity dispatchHandler={dispatchHandler} state={state} />
                <Description dispatchHandler={dispatchHandler} state={state} />
                <Categories onDetailsClickHandler={onDetailsClickHandler} />
                {showDetail.category && (
                    <Details
                        dispatchHandler={dispatchHandler}
                        closeDetailWindowHandler={closeDetailWindowHandler}
                        detailSection={detailSection}
                    />
                )}
                <div>
                    <button type="button">Add</button>
                </div>
            </form>
        </section>
    );
};
