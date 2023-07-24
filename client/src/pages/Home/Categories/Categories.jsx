import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Utils
import { checkArrayAndPreloadElements } from 'src/utils/utils';

// Components
import { Container } from 'src/components/Containers/Container/Container';
import { LoadingSkeleton } from 'src/components/LoadingSkeletons/LoadingSkeleton';
import { TextWrap } from 'src/components/TextWrap/TextWrap';

// Constants
import routeConstants from 'src/constants/routeConstants';

// Styles
import styles from './Categories.module.css';
import homeStyles from '../Home.module.css';

const propTypes = {
    categories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const Categories = ({ categories, isLoading }) => {
    // 1. If data is loading - it returns a new array with X elements
    // 1.1 This ensures that the section will render (X) amount of div boxes when the data is...
    // ...being fetched in order the loading skeleton to visualize inside them
    const data = checkArrayAndPreloadElements(categories, 6);
    const { categoryRoute } = routeConstants.DISCOVER;

    const hasCategories = !isLoading && categories.length > 0;

    return hasCategories ? (
        <section>
            <Container>
                <h2 className={homeStyles.title}>
                    <TextWrap 
                        content={'Have something in mind..?'} 
                        isLoading={isLoading} 
                    />
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
                                <Link
                                    to={categoryRoute(categoryName)}
                                    className={styles.categoryName}
                                >
                                    {categoryName}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    ) : null;
};

Categories.propTypes = propTypes;
