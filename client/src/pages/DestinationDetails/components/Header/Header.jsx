import { useState } from 'react';
import { createPortal } from 'react-dom';

// components
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';
import { StarRating } from '../../../../components/StarRating/StarRating';

import routeConstants from '../../../../constants/routeConstants';

import styles from './Header.module.css';
import { ShowMoreButton } from '../../../../components/Buttons/ShowMoreButton/ShowMoreButton';
import { Outlet } from 'react-router-dom';
import { TipsPopUp } from '../TipsPopUp/TipsPopUp';

const { OVERVIEW } = routeConstants.DESTINATIONS;

export const DestinationHeader = ({ destination, pageRoute }) => {
    const [gallery, setGallery] = useState([]);
    const [modalPopUpInfo, setModalPopUpInfo] = useState('');

    const { city, country, description, imageUrls } = destination;

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

    const onImageClickHandler = (clickedImage) => {
        const arrayWithoutClickedImage = destination.imageUrls.filter(
            (x) => x._id !== clickedImage._id
        );

        // adding clicked img on index 0
        setGallery([clickedImage, ...arrayWithoutClickedImage]);
    };

    const closeGalleryHandler = () => {
        setGallery([]);
    };

    const isGalleryOpen = gallery.length > 0;

    return (
        <header className={styles.intro}>
            {isGalleryOpen &&
                createPortal(
                    <Gallery images={gallery} closeGalleryHandler={closeGalleryHandler} />,
                    document.body
                )}
            <ImagesGridWrapper
                images={imageUrls}
                alt={city}
                onClickHandler={onImageClickHandler}
            />
            <div className={styles.titleWrapper}>
                <h1>{city}</h1>
                <StarRating rating={5} />
            </div>
            <div className={styles.headerContent}>
                <p className={styles.countryName}>{country}</p>
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
