import styles from '../../../AddDestination.module.css';

export const Input = ({
    showSearchDropdownHandler,
    isCityValidated,
    onChangeHandler,
    city,
}) => {
    const validatedClass = isCityValidated ? `${styles.validField}` : null;
    const invalidatedClass = !city.length == 0 && !isCityValidated ? styles.error : null;

    return (
        <>
            <label htmlFor="city">City</label>
            <input
                type="search"
                autoComplete="off"
                placeholder="Add a city name"
                name="city"
                id="city"
                onChange={onChangeHandler}
                onClick={() => showSearchDropdownHandler(true)}
                onBlur={() => showSearchDropdownHandler(false)}
                value={city}
                className={`${validatedClass} ${invalidatedClass}`}
            />
        </>
    );
};
