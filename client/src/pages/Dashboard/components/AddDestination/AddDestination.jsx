import { useReducer, useState } from 'react';
import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';

// Components
import { SearchCity } from './components/SearchCity';
import { Description } from './components/Description';
import { Categories } from './components/Categories';
import { Details } from './components/Details';

import styles from './AddDestination.module.css';

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
        console.log(state);
    };

    const openedDetailsCategory = state.details.find((x) => x.category == showDetail.category);

    return (
        <section>
            <form className={styles.form} onSubmit={submitHandler}>
                <SearchCity dispatchHandler={dispatchHandler} state={state} />
                <Description dispatchHandler={dispatchHandler} state={state} />
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
