import parse from 'html-react-parser';
import { Outlet } from 'react-router-dom';

// Components
import { ShowMoreButton } from 'src/components/Buttons/ShowMoreButton/ShowMoreButton';
import { StarRating } from 'src/components/StarRating/StarRating';
import { TextWrap } from 'src/components/TextWrap/TextWrap';

import routeConstants from 'src/constants/routeConstants';
import styles from './Header.module.css';

export const Header = ({ place, isLoading }) => {
    const { name, city, description, averageRating } = place;

    const { ABOUT, BY_ID } = routeConstants.PLACES;
    const pageRoute = BY_ID.routePath(place?._id);

    const descLoading = isLoading ? styles.loading : '';

    return (
        <header>
            <section className={styles.introSection}>
                <div className={styles.flex}>
                    <h1 className={styles.introTitle}>
                        <TextWrap isLoading={isLoading} content={name} />
                    </h1>
                    {!isLoading && <StarRating averageRating={averageRating} size={26} />}
                </div>
                <p className={styles.city}>
                    <TextWrap isLoading={isLoading} content={city} />
                </p>
            </section>
            <section className={styles.overview}>
                <div className={`${styles.description} ${descLoading} editor-content`}>
                    <TextWrap isLoading={isLoading} content={parse(description || '')} />
                </div>
                <ShowMoreButton path={ABOUT.route} isLoading={isLoading} />
            </section>
            <Outlet
                context={{
                    pageRoute,
                    name: ABOUT.name,
                    content: description,
                }}
            />
        </header>
    );
};
