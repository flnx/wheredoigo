import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import routeConstants from '../../../../constants/routeConstants';
import styles from './TipsPopUp.module.css';

const { INFO } = routeConstants.DESTINATIONS;

export const TipsPopUp = ({ details, pageRoute }) => {
    const [tips, setTips] = useState('');

    const onCategoryClickHandler = (tipsInfo) => {
        setTips({
            ...tipsInfo,
            pageRoute,
        });
    };

    return (
        <>
            <section className={styles.wrapper}>
                {details.map((x) => (
                    <Link
                        key={x._id}
                        to={INFO.route}
                        className={styles.category}
                        onClick={() => onCategoryClickHandler(x)}
                    >
                        {x.category}
                    </Link>
                ))}
            </section>
            <Outlet context={tips} />
        </>
    );
};
