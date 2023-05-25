import { Destination } from './Destination';
import styles from './DestinationsGrid.module.css';

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
