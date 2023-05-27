import styles from '../AddDestination.module.css';
import { OverlayDisabledBodyScroll } from '../../../../../components/OverlayDisabledBodyScroll/OverlayDisabledBodyScroll';

export const Details = ({ showDetailHandler, openedDetailsCategory, updateDetail }) => {
    const onDetailsChange = (e, category) => {
        updateDetail(e.target.name, e.target.value, category);
    };

    const closeDetailWindowHandler = () => {
        showDetailHandler({});
    };

    return (
        <OverlayDisabledBodyScroll closeModalHandler={closeDetailWindowHandler}>
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
        </OverlayDisabledBodyScroll>
    );
};
