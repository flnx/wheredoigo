import { useEffect, useReducer, useState } from 'react';
import { Overlay } from '../../../../components/Overlay/Overlay';
import {
    destinationFormReducer,
    initialState,
} from '../../../../utils/destinationReducer';
import { ArrowCircleRight } from 'phosphor-react';

import styles from './AddDestination.module.css';

const cities = ['sofia', 'varna', 'bourgas', 'pleven', 'bansko'];

export const AddDestination = () => {
    const [state, dispatch] = useReducer(destinationFormReducer, initialState);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    const [isCityValid, setIsCityValid] = useState(false);
    const [showDetails, setShowDetails] = useState({});

    const onDetailsClickHandler = (detailName) => {
        setShowDetails({ [detailName]: true });
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    const onChangeHandler = (e) => {
        dispatch({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const closeDetailWindowHandler = (e) => {
        setShowDetails({});
    };

    useEffect(() => {
        let validateCity = false;

        if (cities.includes(searchQuery)) {
            validateCity = true;
        }

        setIsCityValid(validateCity);
    }, [searchQuery]);

    const validCityClass = `${isCityValid ? styles.validatedCity : ''}`;

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
                        id="city"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={() => setShowSearchDropdown(true)}
                        onBlur={() => setShowSearchDropdown(false)}
                        value={searchQuery}
                        className={validCityClass}
                    />
                    {showSearchDropdown && (
                        <div className={styles.searchDropdown}>
                            <div className={styles.searchResult}>
                                <ArrowCircleRight size={28} />
                                <span className={styles.searchQuery}>
                                    {isCityValid
                                        ? searchQuery
                                        : 'Location not found'}
                                </span>
                            </div>
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
                    <p>
                        Help others by adding more information about the
                        destination (not needed)
                    </p>
                </div>

                <div className={styles.categoryDetails}>
                    <span onClick={() => onDetailsClickHandler('goodToKnow')}>
                        Good to Know
                    </span>
                    <span onClick={() => onDetailsClickHandler('transport')}>
                        Transport
                    </span>
                    <span onClick={() => onDetailsClickHandler('proTips')}>
                        Pro Tips
                    </span>
                    <span onClick={() => onDetailsClickHandler('localCustoms')}>
                        Local Customs
                    </span>
                </div>

                {showDetails.goodToKnow && (
                    <Overlay closeModalHandler={closeDetailWindowHandler}>
                        <div
                            className={`${styles.details} ${styles.formField}`}
                        >
                            <h3 className={styles.detailsTitle}>
                                Good to Know
                            </h3>

                            <label htmlFor="timezone">
                                What is the timezone?
                            </label>
                            <textarea
                                id="timezone"
                                rows="1"
                                placeholder="(GMT+1) / Eastern European Standard Time..."
                            />

                            <label htmlFor="plug-types">
                                What are the voltage/plug types?
                            </label>
                            <textarea
                                id="plug-types"
                                rows="3"
                                placeholder="Add destination description..."
                            />

                            <label htmlFor="currency">
                                What is the currency?
                            </label>
                            <textarea
                                id="currency"
                                rows="3"
                                placeholder="Add destination description..."
                            />

                            <label htmlFor="payment">
                                Are ATMs readily accessible?
                            </label>
                            <textarea
                                id="payment"
                                rows="3"
                                placeholder="Add destination description..."
                            />

                            <label htmlFor="credit-cards">
                                Are credit cards widely accepted?
                            </label>
                            <textarea
                                id="credit-cards"
                                rows="3"
                                placeholder="Add destination description..."
                            />

                            <label htmlFor="tip">How much do I tip?</label>
                            <textarea
                                id="tip"
                                rows="3"
                                placeholder="Add destination description..."
                            />

                            <label htmlFor="wifi">
                                Is WiFi widely available?
                            </label>
                            <textarea
                                id="wifi"
                                rows="3"
                                placeholder="Add destination description..."
                            />
                        </div>
                    </Overlay>
                )}

                {showDetails.proTips && (
                    <Overlay closeModalHandler={closeDetailWindowHandler}>
                        <div
                            className={`${styles.details} ${styles.formField}`}
                        >
                            <h3 className={styles.detailsTitle}>Pro Tips</h3>
                            <label htmlFor="before-you-go">
                                Any tips you can give about this destination? 😎
                            </label>
                            <textarea
                                id="before-you-go"
                                rows="25"
                                placeholder="Add description..."
                            />
                        </div>
                    </Overlay>
                )}

                {showDetails.localCustoms && (
                    <Overlay closeModalHandler={closeDetailWindowHandler}>
                        <div
                            className={`${styles.details} ${styles.formField}`}
                        >
                            <h3 className={styles.detailsTitle}>
                                Local Customs
                            </h3>
                            <label htmlFor="drinking">Drinking</label>
                            <textarea
                                id="drinking"
                                rows="6"
                                placeholder="Add description..."
                            />

                            <label htmlFor="drugs">Drugs</label>
                            <textarea
                                id="drugs"
                                rows="6"
                                placeholder="Add description..."
                            />

                            <label htmlFor="greetings">Greetings</label>
                            <textarea
                                id="greetings"
                                rows="6"
                                placeholder="Add description..."
                            />

                            <label htmlFor="personal-space">
                                Personal space
                            </label>
                            <textarea
                                id="personal-space"
                                rows="6"
                                placeholder="Add description..."
                            />

                            <label htmlFor="additional-info">
                                Additional info
                            </label>
                            <textarea
                                id="additional-info"
                                rows="6"
                                placeholder="Add description..."
                            />
                        </div>
                    </Overlay>
                )}
                {showDetails.transport && (
                    <Overlay closeModalHandler={closeDetailWindowHandler}>
                        <div
                            className={`${styles.details} ${styles.formField}`}
                        >
                            <h3 className={styles.detailsTitle}>Transport</h3>
                            <label htmlFor="cycling">Cycling</label>
                            <textarea
                                id="cycling"
                                rows="6"
                                placeholder="Add description..."
                            />

                            <label htmlFor="public-transport">
                                Train, Tram and Bus
                            </label>
                            <textarea
                                id="public-transport"
                                rows="6"
                                placeholder="Add description..."
                            />

                            <label htmlFor="taxis">Taxis</label>
                            <textarea
                                id="taxis"
                                rows="6"
                                placeholder="Add description..."
                            />

                            <label htmlFor="ridesharing">Rideesharing</label>
                            <textarea
                                id="ridesharing"
                                rows="6"
                                placeholder="Add description..."
                            />
                        </div>
                    </Overlay>
                )}

                <div>
                    <button type="button">Add</button>
                </div>
            </form>
        </section>
    );
};
