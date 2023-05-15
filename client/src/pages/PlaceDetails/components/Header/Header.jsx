import { Outlet } from 'react-router-dom';
import { ShowMoreButton } from '../../../../components/Buttons/ShowMoreButton/ShowMoreButton';
import { StarRating } from '../../../../components/StarRating/StarRating';

import routeConstants from '../../../../constants/routeConstants';
import styles from './Header.module.css';

export const Header = ({ place }) => {
    const { name, city, description, averageRating } = place;

    const { ABOUT, BY_ID } = routeConstants.PLACES;
    const pageRoute = BY_ID.routePath(place._id);

    return (
        <header>
            <section className={styles.introSection}>
                <div className={styles.flex}>
                    <h1>{name}</h1>
                    <StarRating averageRating={averageRating} size={26} />
                </div>
                <p className={styles.city}>{city}</p>
            </section>
            <section className={styles.overview}>
                <div className={styles.flex}>
                    <h3 className={styles.title}>Overview</h3>
                </div>
                <p className={styles.description}>{description}</p>
                <ShowMoreButton path={ABOUT.route} />
            </section>

            <Outlet
                context={{
                    pageRoute,
                    info: [{ _id: 1, title: ABOUT.name, description }],
                }}
            />
        </header>
    );
};
