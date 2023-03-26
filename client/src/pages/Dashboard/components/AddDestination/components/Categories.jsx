import styles from '../AddDestination.module.css';

export const Categories = ({ onDetailsClickHandler }) => {
    return (
        <>
            <div className={styles.formField}>
                <p>Help others by adding more information about the destination (not needed)</p>
            </div>

            <div className={styles.categoryDetails}>
                <span onClick={() => onDetailsClickHandler('Good to Know')}>Good to Know</span>
                <span onClick={() => onDetailsClickHandler('Transport')}>Transport</span>
                <span onClick={() => onDetailsClickHandler('Pro Tips')}>Pro Tips</span>
                <span onClick={() => onDetailsClickHandler('Local Customs')}>Local Customs</span>
            </div>
        </>
    );
};
