import { useEffect, useState } from 'react';
import { Overlay } from '../../../../components/Overlay/Overlay';

import styles from './AddDestination.module.css';

const cities = ['sofia', 'varna', 'bourgas', 'pleven', 'bansko'];

export const AddDestination = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCityValid, setIsCityValid] = useState(false);
    const [showDetails, setShowDetails] = useState({});

    const onDetailsClickHandler = (detailName) => {
        setShowDetails({ [detailName]: true });
    };

    const submitHandler = (e) => {
        e.preventDefault();
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
                <div className={styles.formField}>
                    <label htmlFor="city">City</label>
                    <input
                        type="search"
                        autoComplete="off"
                        placeholder="Pick a city"
                        id="city"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        className={validCityClass}
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="8"
                        placeholder="Add destination description..."
                    />
                </div>

                {/* Description */}

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
                        <div className={`${styles.details} ${styles.formField}`}>
                            <label htmlFor="timezone">
                                What is the timezone?
                            </label>
                            <textarea
                                type="text"
                                id="timezone"
                                rows="3"
                                placeholder="(GMT+1) / Eastern European Standard Time..."
                            />

                            <label htmlFor="plug-types">
                                What are the voltage/plug types?
                            </label>
                            <textarea
                                type="text"
                                id="plug-types"
                                rows="3"
                                placeholder="Add destination description..."
                            />

                            <label htmlFor="currency">
                                What is the currency?
                            </label>
                            <textarea
                                type="text"
                                id="currency"
                                rows="3"
                                placeholder="Add destination description..."
                            />

                            <label htmlFor="payment">
                                Are ATMs readily accessible?
                            </label>
                            <textarea
                                type="text"
                                id="payment"
                                rows="3"
                                placeholder="Add destination description..."
                            />
                            <label htmlFor="credit-cards">
                                Are credit cards widely accepted?
                            </label>
                            <textarea
                                type="text"
                                id="credit-cards"
                                rows="3"
                                placeholder="Add destination description..."
                            />
                            <label htmlFor="tip">How much do I tip?</label>
                            <textarea
                                type="text"
                                id="tip"
                                rows="3"
                                placeholder="Add destination description..."
                            />
                            <label htmlFor="wifi">
                                Is WiFi widely available?
                            </label>
                            <textarea
                                type="text"
                                id="wifi"
                                rows="3"
                                placeholder="Add destination description..."
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
