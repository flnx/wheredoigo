import { useSearchCityInput } from './useSearchCityInput';

// Components
import { ClipLoader } from 'react-spinners';
import { NotFound } from './components/NotFound';
import { Input } from './components/Input';
import { ValidCity } from './components/ValidCity';
import { EnterLocation } from './components/EnterLocation';
import { ShowFormError } from '../../../../../../components/ShowFormError/ShowFormError';

import styles from '../../AddDestination.module.css';
import styles2 from './SearchCity.module.css';

export const SearchCity = ({ updateField, updateLastCityFetch, city, lastCityFetch, errors }) => {
    const {
        isFetching,
        error,
        onChangeHandler,
        onDropdownCityClickHandler,
        showSearchDropdownHandler,
        showSearchDropdown,
        isFreshlyFetchedCityValid,
        isUserInputValidCity
    } = useSearchCityInput(city, updateLastCityFetch, updateField, lastCityFetch);

    return (
        <div className={`${styles.formField} ${styles2.cityInput}`}>
            <Input
                showSearchDropdownHandler={showSearchDropdownHandler}
                isCityValidated={isUserInputValidCity}
                onChangeHandler={onChangeHandler}
                city={city}
            />

            {!isUserInputValidCity && <ShowFormError errors={errors} errorParam={'city'} />}

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

                    {city && error && <NotFound />}
                </div>
            )}
        </div>
    );
};
