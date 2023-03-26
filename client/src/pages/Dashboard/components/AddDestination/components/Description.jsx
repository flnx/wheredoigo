import styles from '../AddDestination.module.css';

export const Description = ({ dispatchHandler, state }) => {
    const onChangeHandler = (e) => {
        dispatchHandler({
            type: 'change',
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    return (
        <div className={styles.formField}>
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                rows="8"
                name="description"
                placeholder="Add destination description..."
                value={state.description}
                onChange={onChangeHandler}
            />
        </div>
    );
};
