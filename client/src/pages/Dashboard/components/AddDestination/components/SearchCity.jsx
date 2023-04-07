import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { ArrowCircleRight, MagnifyingGlass, XCircle } from 'phosphor-react';

import { getCityData } from '../../../../../service/data/destinations';

import styles from '../AddDestination.module.css';

export const SearchCity = ({
    dispatchHandler,
    city,
    validCity,
    validateCityHandler,
    errorMessages,
}) => {
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    const debouncedFunction = useCallback(
        debounce((city) => fetchData(city), 300),
        []
    );

    useEffect(() => {
        if (city == '') return;
        if (validCity.city && validCity.city.includes(city)) return;

        debouncedFunction(city);
    }, [city]);

    async function fetchData(city) {
        try {
            const data = await getCityData({ city });
            const cityData = data[0];

            if (cityData) {
                validateCityHandler({
                    city: cityData.name,
                    country: cityData.country,
                });
            } else {
                validateCityHandler(false);
            }
        } catch (err) {
            validateCityHandler(false);
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

    const isCityFieldEmpty = city.length == 0;
    const isCityValidated = !isCityFieldEmpty && validCity.city?.toLowerCase() == city?.toLowerCase() ? `${styles.validField}` : null;
    const isCityInvalidated = !isCityFieldEmpty && !isCityValidated ? `${styles.error}` : null;

    const error = errorMessages.find((e) => e.includes('city'));

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
                value={city}
                className={`${isCityValidated} ${isCityInvalidated}`}
            />
            {error && !isCityValidated && <span className={styles.errorMessage}>{error}</span>}
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
