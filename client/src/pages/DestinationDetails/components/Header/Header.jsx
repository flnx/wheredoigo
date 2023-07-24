import parse from 'html-react-parser';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

// Global Components
import { ShowMoreButton } from 'src/components/Buttons/ShowMoreButton/ShowMoreButton';
import { TextWrap } from 'src/components/TextWrap/TextWrap';
import { AddToFavorites } from 'src/components/AddToFavorites/AddToFavorites';

// Local Components
import { TipsPopUp } from '../TipsPopUp/TipsPopUp';

import routeConstants from 'src/constants/routeConstants';
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
