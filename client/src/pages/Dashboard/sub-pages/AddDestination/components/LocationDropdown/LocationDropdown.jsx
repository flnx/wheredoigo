import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';

// Components
import { FormSelect } from '../../../../../../components/FormSelect/FormSelect';
import { useCountriesCities } from '../../../../../../hooks/queries/useCountriesCities';

import { extractServerErrorMessage } from '../../../../../../utils/utils';
import styles from './LocationDropdown.module.css';

const propTypes = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
};

const LocationDropdown = ({ country, city, onChangeHandler, errors }) => {
    const [locations, isLoading, locationsError] = useCountriesCities();

    const countries = useMemo(() => {
        return locations?.data?.map((l) => l.country) ?? [];
    }, [locations?.data]);

    const cities = useMemo(() => {
        // Check if a country is selected
        if (country) {
            // Find the selected country object from the data
            const selectedCountry = locations?.data?.find((l) => l.country === country);

            // Extract the cities from the selected country object
            const selectedCountryCities = selectedCountry?.cities ?? [];

            return selectedCountryCities;
        }

        // Return an empty array if no country is selected
        return [];
    }, [country, locations?.data]);

    return (
        <>
            <div className={styles.dropdowns}>
                <div className={styles.flex}>
                    <FormSelect
                        value={country}
                        options={countries}
                        onChangeHandler={(e) => onChangeHandler(e.target.name, e.target.value)}
                        label={'Country'}
                        errors={errors}
                        isLoading={isLoading}
                    />

                    <FormSelect
                        value={city}
                        options={cities}
                        onChangeHandler={(e) => onChangeHandler(e.target.name, e.target.value)}
                        label={'City'}
                        errors={errors}
                        disabled={!country}
                    />
                </div>

                {locationsError && (
                    <span className="error-message">
                        {extractServerErrorMessage(locationsError)}
                    </span>
                )}
            </div>
        </>
    );
};

LocationDropdown.propTypes = propTypes;
export const MemoizedLocationDropdown = memo(LocationDropdown);
