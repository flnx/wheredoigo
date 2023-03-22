import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import styles from './TipsPopUp.module.css';

export const TipsPopUp = ({ details }) => {
    const [tips, setTips] = useState('');

    const onCategoryClickHandler = (tipsInfo) => {
        setTips(tipsInfo);
    };

    return (
        <>
            <section className={styles.wrapper}>
                {details.map((x) => (
                    <Link
                        key={x._id}
                        to="info"
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
