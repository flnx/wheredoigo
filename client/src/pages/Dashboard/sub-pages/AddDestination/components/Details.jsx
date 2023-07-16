import styles from '../AddDestination.module.css';
import { OverlayDisabledBodyScroll } from '../../../../../components/OverlayDisabledBodyScroll/OverlayDisabledBodyScroll';

export const Details = ({ showDetailHandler, selectedDetail, updateDetail }) => {
    return (
        <OverlayDisabledBodyScroll 
            closeModalHandler={() => showDetailHandler({ name: '' })
        }>
            <div className={styles.detailsContainer}>
                <h3 className={styles.detailsTitle}>{selectedDetail.name}</h3>

                <div className={styles.formField}>
                    <label htmlFor={selectedDetail.name}>{selectedDetail.name}</label>

                    <textarea
                        id={selectedDetail.name}
                        name={selectedDetail.name}
                        placeholder="Add information..."
                        onChange={(e) => updateDetail(e.target.name, e.target.value)}
                        rows={20}
                        value={selectedDetail.content}
                    />
                </div>
            </div>
        </OverlayDisabledBodyScroll>
    );
};
