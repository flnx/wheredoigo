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
                    className={styles[errorClass]}
                />
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        </>
    );
};
