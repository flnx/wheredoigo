import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import styles from './TipsPopUp.module.css';

export const TipsPopUp = ({ destination }) => {
    const [tips, setTips] = useState('');

    const onCategoryClickHandler = (tipsInfo) => {
        setTips(tipsInfo);
    };

    return (
        <>
            <section className={styles.wrapper}>
                <Link
                    to="info"
                    className={styles.category}
                    onClick={() =>
                        onCategoryClickHandler(destination.transportInfo)
                    }
                >
                    Transport
                </Link>

                <Link
                    to="info"
                    className={styles.category}
                    onClick={() =>
                        onCategoryClickHandler(destination.goodToKnowInfo)
                    }
                >
                    Good to Know
                </Link>
                <Link
                    to="info"
                    className={styles.category}
                    onClick={() =>
                        onCategoryClickHandler(destination.localCustomsInfo)
                    }
                >
                    Local Customs
                </Link>
                <Link
                    to="info"
                    className={styles.category}
                    onClick={() => onCategoryClickHandler(destination.proTipsInfo)}
                >
                    Pro Tips
                </Link>
            </section>
            <Outlet context={tips} />
        </>
    );
};
