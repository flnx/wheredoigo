import { useEffect, useReducer, useState } from 'react';
import { Overlay } from '../../../../components/Overlay/Overlay';
import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';
import { ArrowCircleRight, MagnifyingGlass, XCircle } from 'phosphor-react';

import styles from './AddDestination.module.css';

const cities = ['sofia', 'varna', 'bourgas', 'pleven', 'bansko'];

export const AddDestination = () => {
    const [state, dispatch] = useReducer(destinationFormReducer, initialState);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    const [validCity, setValidCity] = useState(false);
    const [showDetail, setShowDetail] = useState({ category: null });

    const onDetailsClickHandler = (detailName) => {
        setShowDetail({ category: detailName });
    };

    console.log(state);

    const closeDetailWindowHandler = (e) => {
        setShowDetail({});
    };

    const onChangeHandler = (e) => {
        dispatch({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const onDetailsChange = (e, category) => {
        dispatch({
            type: 'details_change',
            category,
            payload: { name: e.target.name, description: e.target.value },
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        let validateCity = false;

        const regex = new RegExp(state.city, 'i');
        const result = cities.find((element) => regex.test(element));

        if (result) {
            validateCity = result;
        }

        setValidCity(validateCity);
    }, [state.city]);

    const isCityValidated = `${validCity && state.city && styles.validCity}`;
    const isCityInvalidated = `${state.city && !validCity && styles.invalidCity}`;
    const isTyping = state.city.length != 0;

    const detailSection = state.details.find((x) => x.category == showDetail.category);

    return (
        <section>
            <form className={styles.form} onSubmit={submitHandler}>
                {/* Search */}
                <div className={`${styles.formField} ${styles.cityInput}`}>
                    <label htmlFor="city">City</label>
                    <input
                        type="search"
                        autoComplete="off"
                        placeholder="Pick a city"
                        name="city"
                        id="city"
                        onChange={onChangeHandler}
                        onClick={() => setShowSearchDropdown(true)}
                        onBlur={() => setShowSearchDropdown(false)}
                        value={state.city}
                        className={`${isCityValidated} ${isCityInvalidated}`}
                    />
                    {showSearchDropdown && (
                        <div className={styles.searchDropdown}>
                            {!isTyping && (
                                <div className={styles.searchQuery}>
                                    <MagnifyingGlass size={28} />
                                    <span>Enter location...</span>
                                </div>
                            )}

                            {!validCity && isTyping && (
                                <div className={styles.searchQuery}>
                                    <XCircle size={28} />
                                    <span>No location found...</span>
                                </div>
                            )}

                            {validCity && isTyping && (
                                <div
                                    className={styles.searchQuery}
                                    onMouseDown={() => {
                                        dispatch({
                                            type: 'change',
                                            payload: { name: 'city', value: validCity },
                                        });
                                    }}
                                >
                                    <ArrowCircleRight size={28} />
                                    {'Add ' + validCity}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.formField}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="8"
                        name="description"
                        placeholder="Add destination description..."
                        value={state.description}
                        onChange={onChangeHandler}
                    />
                </div>

                <div className={styles.formField}>
                    <p>Help others by adding more information about the destination (not needed)</p>
                </div>

                <div className={styles.categoryDetails}>
                    <span onClick={() => onDetailsClickHandler('Good to Know')}>Good to Know</span>
                    <span onClick={() => onDetailsClickHandler('Transport')}>Transport</span>
                    <span onClick={() => onDetailsClickHandler('Pro Tips')}>Pro Tips</span>
                    <span onClick={() => onDetailsClickHandler('Local Customs')}>
                        Local Customs
                    </span>
                </div>

                {showDetail.category && (
                    <Overlay closeModalHandler={closeDetailWindowHandler}>
                        <h3 className={styles.detailsTitle}>{showDetail.category}</h3>

                        {detailSection.info.map((x) => {
                            return (
                                <div className={styles.formField} key={showDetail.category + x.name}>
                                    <label htmlFor={x.name}>{x.title}</label>
                                    <textarea
                                        key={x.name}
                                        id={x.name}
                                        name={x.name}
                                        rows={x.rows}
                                        placeholder="Add information..."
                                        onChange={(e) => onDetailsChange(e, showDetail.category)}
                                        value={x.description}
                                    />
                                </div>
                            );
                        })}
                    </Overlay>
                )}

                <div>
                    <button type="button">Add</button>
                </div>
            </form>
        </section>
    );
};
