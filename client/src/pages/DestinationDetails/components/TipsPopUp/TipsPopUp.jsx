import PropTypes from 'prop-types';

// Components
import { LoadingSkeleton } from '../../../../components/LoadingSkeletons/LoadingSkeleton';
import { checkArrayAndPreloadElements } from '../../../../utils/utils';
import { Link } from 'react-router-dom';

import routeConstants from '../../../../constants/routeConstants';
import styles from './TipsPopUp.module.css';

const propTypes = {
    details: PropTypes.array,
    onCategoryClickHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

// This ensures that there will be 4 category divs for the loading skeleton during the fetching process
const defaultProps = {
    details: checkArrayAndPreloadElements([], 4),
};

export const TipsPopUp = ({ details, onCategoryClickHandler, isLoading }) => {
    const { INFO } = routeConstants.DESTINATIONS;

    return (
        <section className={styles.wrapper}>
            {details.map((detail) => (
                <Link
                    key={detail._id}
                    to={INFO.route}
                    className={styles.category}
                    onClick={() => onCategoryClickHandler(detail)}
                >
                    {detail.name}
                </Link>
            ))}
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <LoadingSkeleton />
                </div>
            )}
        </section>
    );
};

TipsPopUp.propTypes = propTypes;
TipsPopUp.defaultProps = defaultProps;
