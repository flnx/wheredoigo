import PropTypes from 'prop-types';
import { checkArrayAndPreloadElements } from '../../../utils/utils';

// Components
import { Container } from '../../../components/Containers/Container/Container';
import { LoadingSkeleton } from '../../../components/LoadingSkeletons/LoadingSkeleton';

import styles from './Categories.module.css';
import homeStyles from '../Home.module.css';

const propTypes = {
    categories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const Categories = ({ categories, isLoading }) => {
    // 1. If data is loading - it returns a new array with X elements
    // 1.1 This ensures that the section will render (X) amount of div boxes when the data is being fetched in order the loading skeleton to visualize inside them
    const data = checkArrayAndPreloadElements(categories, 6);

    return (
        <section>
            <Container>
                <h2 className={homeStyles.title}>
                    {isLoading ? <LoadingSkeleton /> : 'Have something in mind..?'}
                </h2>
                <div className={styles['categories']}>
                    {data.map((categoryName, i) => (
                        // adds additional dynamic class name (categoryName from the server)
                        <div className={`${styles.card} ${styles[categoryName]}`} key={i}>
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

Categories.propTypes = propTypes;
