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
            <section className={styles.intro}>
                <h1>{name}</h1>
                <p className={styles.city}>{city}</p>
            </section>
            <div className={styles.flexContainer}>
                <section className={styles.flexChild}>
                    <h3 className={styles.title}>About</h3>
                    <p>{description}</p>
                    <ShowMoreButton path={ABOUT.route} />
                </section>
                <section className={styles.flexChild}>
                    <h3 className={styles.title}>Ratings and Reviews</h3>
                    <StarRating averageRating={averageRating} />
                </section>
                <section className={styles.flexChild}>
                    <h3 className={styles.title}>In Progress..</h3>
                    <p>🦖🦖🦖</p>
                </section>
            </div>

            <Outlet
                context={{
                    pageRoute,
                    info: [
                        {
                            _id: 1,
                            title: ABOUT.name,
                            description,
                        },
                    ],
                }}
            />
        </header>
    );
};
