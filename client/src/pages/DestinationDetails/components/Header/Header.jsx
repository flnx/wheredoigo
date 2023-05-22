import { useState } from 'react';
import { Outlet } from 'react-router-dom';

// components
import { ShowMoreButton } from '../../../../components/Buttons/ShowMoreButton/ShowMoreButton';
import { TipsPopUp } from '../TipsPopUp/TipsPopUp';
import { TextWrap } from '../../../../components/TextWrap/TextWrap';
import { AddToFavorites } from '../../../../components/AddToFavorites/AddToFavorites';

import routeConstants from '../../../../constants/routeConstants';
import styles from './Header.module.css';

export const DestinationHeader = ({ destination, isLoading }) => {
    const [modalPopUpInfo, setModalPopUpInfo] = useState('');
    const { city, country, description, _id, isLikedByUser } = destination;

    const { routePath } = routeConstants.DESTINATIONS.BY_ID;
    const { name, route } = routeConstants.DESTINATIONS.OVERVIEW;

    const onCategoryClickHandler = (tipsInfo) => {
        setModalPopUpInfo({
            ...tipsInfo,
            pageRoute: routePath(_id),
        });
    };

    const onOverviewClickHandler = () => {
        setModalPopUpInfo({
            pageRoute: routePath(_id),
            info: [{ _id: 1, title: name, description }],
        });
    };

    const descLoading = `${isLoading ? styles.descriptionLoading : null}`;

    return (
        <header>
            <div className={styles.intro}>
                <h1 className={styles.title}>
                    <TextWrap isLoading={isLoading} content={city} />
                </h1>
                {!isLoading && (
                    <AddToFavorites
                        isLoading={isLoading}
                        _id={_id}
                        isLikedByUser={isLikedByUser}
                    />
                )}
            </div>
            <div className={styles.content}>
                <p className={styles.country}>
                    <TextWrap isLoading={isLoading} content={country} />
                </p>
                <h3 className={styles.descriptionTitle}>
                    <TextWrap isLoading={isLoading} content={name} />
                </h3>
                <p className={`${styles.description} ${descLoading}`}>
                    <TextWrap isLoading={isLoading} content={description} />
                </p>
                <ShowMoreButton
                    path={route}
                    onClick={onOverviewClickHandler}
                    isLoading={isLoading}
                />
            </div>

            <TipsPopUp
                details={destination.details}
                onCategoryClickHandler={onCategoryClickHandler}
                isLoading={isLoading}
            />

            <Outlet context={modalPopUpInfo} />
        </header>
    );
};
