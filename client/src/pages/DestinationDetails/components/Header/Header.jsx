import parse from 'html-react-parser';
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
    const { city, country, description, _id, isLikedByUser, hasSession } = destination;

    const { routePath } = routeConstants.DESTINATIONS.BY_ID;
    const { OVERVIEW } = routeConstants.DESTINATIONS;

    const onCategoryClickHandler = (detail) => {
        setModalPopUpInfo({
            ...detail,
            pageRoute: routePath(_id),
        });
    };

    const onOverviewClickHandler = () => {
        setModalPopUpInfo({
            pageRoute: routePath(_id),
            name: OVERVIEW.name,
            content: description,
        });
    };

    const descLoading = `${isLoading ? styles.descriptionLoading : ''}`;

    return (
        <header>
            <div className={styles.intro}>
                <h1 className={styles.title}>
                    <TextWrap isLoading={isLoading} content={city} />
                </h1>
                {!isLoading && (
                    <AddToFavorites
                        _id={_id}
                        isLikedByUser={isLikedByUser}
                        hasSession={hasSession}
                    />
                )}
            </div>
            <div className={styles.content}>
                <p className={styles.country}>
                    <TextWrap isLoading={isLoading} content={country} />
                </p>
                <div className={`${styles.description} ${descLoading} editor-content`}>
                    <TextWrap isLoading={isLoading} content={parse(description || '')} />
                </div>
                <ShowMoreButton
                    path={OVERVIEW.route}
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
