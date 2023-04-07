import styles from '../AddDestination.module.css';

export const Description = ({ dispatchHandler, state, inputErrorClass, errorMessages }) => {
    const onChangeHandler = (e) => {
        dispatchHandler({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const error = errorMessages.find((e) => e.includes('Description'));
    const errorClass = inputErrorClass('description');

    const minChars = state.description.length;
    const validClass = minChars >= 10 ? styles.validField : styles[errorClass];
    const isValidActive = error && !validClass.includes('valid');

    return (
        <>
            <div className={`${styles.formField} ${styles.description}`}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    rows="8"
                    name="description"
                    placeholder="Add destination description..."
                    value={state.description}
                    onChange={onChangeHandler}
                    className={validClass}
                />
                {minChars != 0 && isValidActive && <span className={styles.errorMessage}>{error}</span>}
            </div>
        </>
    );
};
