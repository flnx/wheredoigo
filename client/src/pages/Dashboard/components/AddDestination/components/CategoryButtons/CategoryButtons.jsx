import styles from './CategoryButtons.module.css';

export const CategoryButtons = ({ showDetailHandler }) => {
    const onDetailsClickHandler = (detailName) => {
        showDetailHandler({ category: detailName });
    };

    return (
        <>
            <div>
                <p>
                    Help others by adding more information about the destination (not needed)
                </p>
            </div>

            <div className={styles.categoryDetails}>
                <span onClick={() => onDetailsClickHandler('Good to Know')}>Good to Know</span>
                <span onClick={() => onDetailsClickHandler('Transport')}>Transport</span>
                <span onClick={() => onDetailsClickHandler('Pro Tips')}>Pro Tips</span>
                <span onClick={() => onDetailsClickHandler('Local Customs')}>
                    Local Customs
                </span>
            </div>
        </>
    );
};
