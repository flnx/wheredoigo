import { useState } from 'react';

import { useSearchCity } from '../../../../../../hooks/queries/useSearchCity';
import { useDebounce } from '../../../../../../hooks/useDebounce';

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
    const debouncedSearch = useDebounce(city, 500);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [isSuccess, isFetching, error] = useSearchCity(debouncedSearch, dispatchHandler);

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



    // const isFreshlyFetchedCityValid = lastCityFetch.city && city && !isFetching;
    const isFreshlyFetchedCityValid = city && !isFetching && isSuccess;
    const isFreshlyFetchedCityInvalid = city && !isFetching && !isSuccess;
    const isUserInputValidCity = city && lastCityFetch.city.toLowerCase() == city.toLowerCase();

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

                    {city && isFetching && (
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
