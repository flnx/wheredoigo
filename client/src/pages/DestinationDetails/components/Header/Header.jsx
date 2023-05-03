import { useState } from 'react';
import { Outlet } from 'react-router-dom';

// components
import { StarRating } from '../../../../components/StarRating/StarRating';
import { ShowMoreButton } from '../../../../components/Buttons/ShowMoreButton/ShowMoreButton';
import { TipsPopUp } from '../TipsPopUp/TipsPopUp';

import routeConstants from '../../../../constants/routeConstants';
import styles from './Header.module.css';

const { OVERVIEW } = routeConstants.DESTINATIONS;

export const DestinationHeader = ({ destination, pageRoute }) => {
    const [modalPopUpInfo, setModalPopUpInfo] = useState('');

    const { city, country, description } = destination;

    const onCategoryClickHandler = (tipsInfo) => {
        setModalPopUpInfo({
            ...tipsInfo,
            pageRoute,
        });
    };

    const onOverviewClickHandler = () => {
        setModalPopUpInfo({
            pageRoute,
            info: [{ _id: 1, title: OVERVIEW.name, description }],
        });
    };

    return (
        <header>
            <div className={styles.intro}>
                <h1>{city}</h1>
                <StarRating rating={5} />
            </div>
            <div className={styles.content}>
                <p className={styles.country}>{country}</p>
                <h3 className={styles.descriptionTitle}>{OVERVIEW.name}</h3>
                <p className={styles.description}>{description}</p>
                <ShowMoreButton path={OVERVIEW.route} onClick={onOverviewClickHandler} />
            </div>

            <TipsPopUp
                details={destination.details}
                onCategoryClickHandler={onCategoryClickHandler}
            />

            <Outlet context={modalPopUpInfo} />
        </header>
    );
};
