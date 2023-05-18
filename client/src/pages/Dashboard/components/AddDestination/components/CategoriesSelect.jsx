import styles from '../AddDestination.module.css';

export const CategoriesSelect = ({ dispatchHandler, state, inputErrorClass, errorMessages }) => {
    const onChangeHandler = (e) => {
        dispatchHandler({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const categories = ['Beach', 'Nature', 'Cultural', 'Snow', 'Islands', 'Adventure'];

    return (
        <div className={styles.formField}>
            <label htmlFor="category">
                Category
            </label>
            <select
                id="category"
                name="category"
                value={state.category}
                onChange={onChangeHandler}
                className={styles.select}
            >
                {categories.map((type) => (
                    <option value={type} key={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};
