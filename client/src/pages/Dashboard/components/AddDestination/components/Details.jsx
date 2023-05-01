import styles from '../AddDestination.module.css';
import { Overlay } from '../../../../../components/Overlay/Overlay';

export const Details = ({ showDetailHandler, openedDetailsCategory, dispatchHandler }) => {
    const onDetailsChange = (e, category) => {
        dispatchHandler({
            type: 'details_change',
            category,
            payload: { name: e.target.name, description: e.target.value },
        });
    };

    const closeDetailWindowHandler = () => {
        showDetailHandler({});
    };

    return (
        <Overlay closeModalHandler={closeDetailWindowHandler}>
            <div className={styles.detailsContainer}>
                <h3 className={styles.detailsTitle}>{openedDetailsCategory.category}</h3>

                {openedDetailsCategory.info.map((x) => {
                    return (
                        <div
                            className={styles.formField}
                            key={openedDetailsCategory.category + x.name}
                        >
                            <label htmlFor={x.name}>{x.title}</label>
                            <textarea
                                key={x.name}
                                id={x.name}
                                name={x.name}
                                rows={x.rows}
                                placeholder="Add information..."
                                onChange={(e) =>
                                    onDetailsChange(e, openedDetailsCategory.category)
                                }
                                value={x.description}
                            />
                        </div>
                    );
                })}
            </div>
        </Overlay>
    );
};
