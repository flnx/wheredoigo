import PropTypes from 'prop-types';
import { Destination } from './Destination';
import styles from './DestinationsGrid.module.css';

const propTypes = {
    destinations: PropTypes.array.isRequired,
    isEditable: PropTypes.bool,
    onDeleteClickHandler: PropTypes.func,
    background: PropTypes.string,
};

export const DestinationsGrid = ({
    destinations,
    isEditable,
    onDeleteClickHandler,
    background,
}) => {
    return (
        <div className={styles.grid}>
            {destinations?.map((destination) => (
                <Destination
                    destination={destination}
                    key={destination._id}
                    onDeleteClickHandler={onDeleteClickHandler}
                    isEditable={isEditable}
                    background={background}
                />
            ))}
        </div>
    );
};

DestinationsGrid.propTypes = propTypes;