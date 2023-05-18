import { useCallback, useEffect, useState } from 'react';
import { getCityData } from '../../../../../../service/data/destinations';
import debounce from 'lodash.debounce';

// Components
import { ClipLoader } from 'react-spinners';
import { NotFound } from './components/NotFound';
import { Input } from './components/Input';
import { ValidCity } from './components/ValidCity';
import { EnterLocation } from './components/EnterLocation';
import { ShowFormError } from '../../../../../../components/ShowFormError/ShowFormError';

import styles from '../../AddDestination.module.css';
import styles2 from './SearchCity.module.css';

export const SearchCity = ({ dispatchHandler, errorMessages, city, lastCityFetch }) => {
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedFunction = useCallback(
        debounce((city) => fetchData(city), 300),
        []
    );

    useEffect(() => {
        if (!city || (lastCityFetch.city && lastCityFetch.city.includes(city))) {
            return;
        }

        debouncedFunction(city);
    }, [city]);

    async function fetchData(city) {
        try {
            setIsLoading(true);
            const data = await getCityData({ city });

            dispatchHandler({
                type: 'last_city_fetched',
                payload: { city: data[0].name, country: data[0].country },
            });
        } catch (err) {
            dispatchHandler({ type: 'reset_last_fetch' });
        } finally {
            setIsLoading(false);
        }
    }

    function onChangeHandler(e) {
        dispatchHandler({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    }

    function onDropdownCityClickHandler() {
        // when the new city is fetched and the dropdown is shown, it dispatches it on click (if valid);
        if (lastCityFetch) {
            onChangeHandler({ target: { name: 'city', value: lastCityFetch.city } });
        }
    }

    function showSearchDropdownHandler(boolean) {
        setShowSearchDropdown(boolean);
    }

    const isFreshlyFetchedCityValid = lastCityFetch.city && city && !isLoading;
    const isFreshlyFetchedCityInvalid = !lastCityFetch.city && city && !isLoading;
    const isUserInputValidCity =
        city && lastCityFetch.city.toLowerCase() == city.toLowerCase();

    return (
        <div className={`${styles.formField} ${styles2.cityInput}`}>
            <Input
                showSearchDropdownHandler={showSearchDropdownHandler}
                isCityValidated={isUserInputValidCity}
                onChangeHandler={onChangeHandler}
                city={city}
            />

            {!isUserInputValidCity && (
                <ShowFormError errors={errorMessages} errorParam={'city'} />
            )}

            {showSearchDropdown && (
                <div className={styles2.searchDropdown}>
                    {!city && <EnterLocation />}

                    {isLoading && (
                        <ClipLoader
                            color="#36d7b7"
                            aria-label="Loading Spinner"
                            size={24}
                            className={styles2.spinner}
                        />
                    )}

                    {isFreshlyFetchedCityValid && (
                        <ValidCity
                            city={lastCityFetch.city}
                            country={lastCityFetch.country}
                            onDropdownCityClickHandler={onDropdownCityClickHandler}
                        />
                    )}

                    {isFreshlyFetchedCityInvalid && <NotFound />}
                </div>
            )}
        </div>
    );
};
