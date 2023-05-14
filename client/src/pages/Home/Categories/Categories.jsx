import PropTypes from 'prop-types';
import { Container } from '../../../components/Containers/Container/Container';
import { LoadingSkeleton } from '../../../components/LoadingSkeletons/LoadingSkeleton';

import styles from './Categories.module.css';
import homeStyles from '../Home.module.css';

export const Categories = ({ categories, isLoading }) => {
    const data = validateCategoryData(categories);

    return (
        <section>
            <Container>
                <h2 className={homeStyles.title}>
                    {isLoading ? <LoadingSkeleton /> : 'Have something in mind..?'}
                </h2>
                <div className={styles['categories']}>
                    {data.map((categoryName) => (
                        <div className={`${styles.card} ${styles[categoryName]}`}>
                            {isLoading ? (
                                <div className={styles.loading}>
                                    <LoadingSkeleton />
                                </div>
                            ) : (
                                <span className={styles.categoryName}>{categoryName}</span>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

function validateCategoryData(categories = [0, 1, 2, 3, 4, 5]) {
    if (Array.isArray(categories) && categories.length > 0) {
        return categories;
    }
    return [0, 1, 2, 3, 4, 5];
}

Categories.propTypes = {
    categories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};
