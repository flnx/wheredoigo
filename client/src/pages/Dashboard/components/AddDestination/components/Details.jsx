import styles from '../AddDestination.module.css';
import { Overlay } from '../../../../../components/Overlay/Overlay';

export const Details = ({ closeDetailWindowHandler, detailSection, dispatchHandler }) => {
    const onDetailsChange = (e, category) => {
        dispatchHandler({
            type: 'details_change',
            category,
            payload: { name: e.target.name, description: e.target.value },
        });
    };

    return (
        <Overlay closeModalHandler={closeDetailWindowHandler}>
            <h3 className={styles.detailsTitle}>{detailSection.category}</h3>

            {detailSection.info.map((x) => {
                return (
                    <div className={styles.formField} key={detailSection.category + x.name}>
                        <label htmlFor={x.name}>{x.title}</label>
                        <textarea
                            key={x.name}
                            id={x.name}
                            name={x.name}
                            rows={x.rows}
                            placeholder="Add information..."
                            onChange={(e) => onDetailsChange(e, detailSection.category)}
                            value={x.description}
                        />
                    </div>
                );
            })}
        </Overlay>
    );
};
