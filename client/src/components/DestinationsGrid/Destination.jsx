import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { WarningButton } from '../Buttons/Button-Warning/WarningButton';
import { LinkButtonSuccess } from '../Buttons/Success-Button/LinkButtonSuccess';

import styles from './DestinationsGrid.module.css';
import routeConstants from '../../constants/routeConstants';
import { applyCloudinaryTransformation } from '../../utils/utils';

const propTypes = {
    destination: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        imageUrls: PropTypes.string.isRequired,
    }).isRequired,
    onDeleteClickHandler: PropTypes.func,
    isEditable: PropTypes.bool,
    background: PropTypes.string,
};

export const Destination = ({ destination, onDeleteClickHandler, isEditable, background }) => {
    const { _id, city, country, imageUrls } = destination;
    const { BY_ID, EDIT } = routeConstants.DESTINATIONS;

    const style = background ? { background } : {};

    return (
        <div className={styles['card']} style={style} data-testid={'destination'}>
            <div className={styles.imageContainer}>
                <Link to={BY_ID.routePath(_id)}>
                    <img 
                        src={applyCloudinaryTransformation(imageUrls)} 
                        alt={city} 
                    />
                </Link>
            </div>
            <section className={styles.content}>
                <h3>{city}</h3>
                <p>{country}</p>
                {isEditable && (
                    <div className={styles.buttons}>
                        <LinkButtonSuccess to={EDIT.routePath(_id)}>Edit</LinkButtonSuccess>
                        <WarningButton onClickHandler={() => onDeleteClickHandler(_id)}>
                            Delete
                        </WarningButton>
                    </div>
                )}
            </section>
        </div>
    );
};

Destination.propTypes = propTypes;
