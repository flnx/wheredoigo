import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import { ImagesGridWrapper } from '../../components/ImagesGridWrapper/ImagesGridWrapper';
import { Gallery } from '../../components/Gallery/Gallery';

import styles from './PlaceDetails.module.css';

const fakeImages = {
    img1: 'https://images.unsplash.com/photo-1500076898857-ad1ff4074429?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    img2: 'https://images.unsplash.com/photo-1521514454979-3d663c89c03a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    img3: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    img4: 'https://images.unsplash.com/photo-1446482972539-0ed52b3e9520?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    img5: 'https://images.unsplash.com/photo-1496492254320-b16c3f10f788?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
};

export const PlaceDetails = () => {
    const [gallery, setGallery] = useState([]);
    const { placeId } = useParams();
    console.log(placeId);

    const onImageClickHandler = (clickedImage) => {
        const arrayWithoutClickedImage = Object.values(fakeImages).filter(
            (x) => x !== clickedImage
        );

        // adding clicked img on index 0
        setGallery([clickedImage, ...arrayWithoutClickedImage]);
    };

    const closeGalleryHandler = () => {
        setGallery([]);
    };

    const isGalleryOpen = gallery.length > 0;

    return (
        <div className="container">
            <h1>Place Name</h1>
            <p>Country, city</p>
            {isGalleryOpen &&
                createPortal(
                    <Gallery
                        closeGalleryHandler={closeGalleryHandler}
                        images={gallery}
                    />,
                    document.body
                )}

            <ImagesGridWrapper
                onClickHandler={onImageClickHandler}
                images={fakeImages}
            />
        </div>
    );
};
