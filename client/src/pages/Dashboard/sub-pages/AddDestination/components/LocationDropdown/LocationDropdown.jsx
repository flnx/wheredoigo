import PropTypes from 'prop-types';

// Components
import { FormSelect } from '../../../../../../components/FormSelect/FormSelect';
import { useCountriesCities } from '../../../../../../hooks/queries/useCountriesCities';

const propTypes = {
    locations: PropTypes.array.isRequired,
    city: PropTypes.string,
    country: PropTypes.string,
};

const defaultProps = {
    locations: [],
};

export const LocationDropdown = ({ country, city, onChangeHandler }) => {
    const [locations, isLoading, error] = useCountriesCities();

    const countries = locations?.data?.map(l => l.country);

    console.log(country)

    return (
        <FormSelect
            value={country}
            options={countries}
            onChangeHandler={(e) => onChangeHandler(e.target.name, e.target.value)}
            label={'Country'}
            errors={[]}
            boxshadow={true}
        />
    );
};

LocationDropdown.propTypes = propTypes;
LocationDropdown.defaultProps = defaultProps;
