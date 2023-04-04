import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { ArrowCircleRight, MagnifyingGlass, XCircle } from 'phosphor-react';

import { getCityData } from '../../../../../service/data/destinations';

import styles from '../AddDestination.module.css';

export const SearchCity = ({ dispatchHandler, state }) => {
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [validCity, setValidCity] = useState(false);

    const debouncedFunction = useCallback(
        debounce((city) => fetchData(city), 300), []
    );

    useEffect(() => {
        if (state.city == '') return;
        if (validCity.city && validCity.city.includes(state.city)) return;

        debouncedFunction(state.city);
    }, [state.city]);

    const isCityFieldEmpty = state.city.length == 0;
    const isCityValidated = `${!isCityFieldEmpty && validCity.city == state.city && styles.validCity}`;
    const isCityInvalidated = `${!isCityFieldEmpty && !validCity && styles.invalidCity}`;

    async function fetchData(city) {
        try {
            const data = await getCityData({ city });
            const cityData = data[0];

            if (cityData) {
                setValidCity({
                    city: cityData.name,
                    country: cityData.country,
                });
            } else {
                setValidCity(false);
            }
        } catch (err) {
            setValidCity(false);
        }
    }

    function onChangeHandler(e) {
        dispatchHandler({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    }

    function onDropdownCityClickHandler() {
        dispatchHandler({
            type: 'change',
            payload: { name: 'city', value: validCity.city },
        });
    }

    function showSearchDropdownHandler(boolean) {
        setShowSearchDropdown(boolean);
    }

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
                            <p>
                                Add {validCity.city}, {validCity.country}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
