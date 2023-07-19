import { Outlet } from 'react-router-dom';
import { ShowMoreButton } from '../../../../components/Buttons/ShowMoreButton/ShowMoreButton';
import { StarRating } from '../../../../components/StarRating/StarRating';
import { TextWrap } from '../../../../components/TextWrap/TextWrap';

import parse from 'html-react-parser';
import routeConstants from '../../../../constants/routeConstants';
import styles from './Header.module.css';

export const Header = ({ place, isLoading }) => {
    const { name, city, description, averageRating } = place;

    const { ABOUT, BY_ID } = routeConstants.PLACES;
    const pageRoute = BY_ID.routePath(place?._id);

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
                <h3 className={styles.title}>
                    <TextWrap isLoading={isLoading} content={'Overview'} />
                </h3>
                <div className={`${styles.description} ${isLoading ? styles.loading : ''}`}>
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
