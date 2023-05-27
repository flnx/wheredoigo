import { useState } from 'react';
import { useDebounce } from '../../../../../../hooks/useDebounce';
import { useSearchCity } from '../../../../../../hooks/queries/useSearchCity';

export const useSearchCityInput = (
    city,
    updateLastCityFetch,
    updateField,
    lastCityFetch
) => {
    const debouncedSearch = useDebounce(city, 350);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [isSuccess, isFetching, error] = useSearchCity(debouncedSearch, updateLastCityFetch);

    function onChangeHandler(e) {
        updateField(e.target.name, e.target.value);
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

    const isFreshlyFetchedCityValid = city && !isFetching && isSuccess;
    const isUserInputValidCity = city && lastCityFetch.city.toLowerCase() == city.toLowerCase();

    return {
        isSuccess,
        isFetching,
        error,
        onChangeHandler,
        onDropdownCityClickHandler,
        showSearchDropdownHandler,
        showSearchDropdown,
        isFreshlyFetchedCityValid,
        isUserInputValidCity,
    };
};
