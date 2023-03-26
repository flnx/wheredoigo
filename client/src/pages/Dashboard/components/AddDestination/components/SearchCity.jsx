import { useEffect, useState } from 'react';
import { ArrowCircleRight, MagnifyingGlass, XCircle } from 'phosphor-react';

import { getCityData } from '../../../../../service/data/destinations';

import styles from '../AddDestination.module.css';

export const SearchCity = ({ dispatchHandler, state }) => {
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [validCity, setValidCity] = useState(false);

    useEffect(() => {
        if (state.city == '') return;

        getCityData({ city: state.city }).then((data) => {
            const cityData = data[0];

            if (cityData) {
                setValidCity(cityData.name);
            } else {
                setValidCity(false);
            }
        });
    }, [state.city]);

    const onChangeHandler = (e) => {
        dispatchHandler({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const onDropdownCityClickHandler = () => {
        dispatchHandler({
            type: 'change',
            payload: { name: 'city', value: validCity },
        });
    };

    const showSearchDropdownHandler = (boolean) => {
        setShowSearchDropdown(boolean);
    };

    const isCityFieldEmpty = state.city.length == 0;
    const isCityValidated = `${!isCityFieldEmpty && validCity && styles.validCity}`;
    const isCityInvalidated = `${!isCityFieldEmpty && !validCity && styles.invalidCity}`;

    return (
        <div className={`${styles.formField} ${styles.cityInput}`}>
            <label htmlFor="city">City</label>
            <input
                type="search"
                autoComplete="off"
                placeholder="Pick a city"
                name="city"
                id="city"
                onChange={onChangeHandler}
                onClick={() => showSearchDropdownHandler(true)}
                onBlur={() => showSearchDropdownHandler(false)}
                value={state.city}
                className={`${isCityValidated} ${isCityInvalidated}`}
            />
            {showSearchDropdown && (
                <div className={styles.searchDropdown}>
                    {isCityFieldEmpty && (
                        <div className={styles.searchQuery}>
                            <MagnifyingGlass size={28} />
                            <span>Enter location...</span>
                        </div>
                    )}

                    {!validCity && !isCityFieldEmpty && (
                        <div className={styles.searchQuery}>
                            <XCircle size={28} />
                            <span>No location found...</span>
                        </div>
                    )}

                    {validCity && !isCityFieldEmpty && (
                        <div
                            className={styles.searchQuery}
                            onMouseDown={onDropdownCityClickHandler}
                        >
                            <ArrowCircleRight size={28} />
                            {'Add ' + validCity}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
