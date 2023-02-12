import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './TipsPopUp.module.css';

export const TipsPopUp = ({ destination }) => {
    const [tips, setTips] = useState('');

    const onCategoryClickHandler = (text) => {
        setTips(text);
    };

    return (
        <section className={styles.wrapper}>
            <Link to="info">
                <span
                    className={styles.category}
                    onClick={() =>
                        onCategoryClickHandler(destination.transport)
                    }
                >
                    Transport
                </span>
            </Link>

            <span
                className={styles.category}
                onClick={() => onCategoryClickHandler(destination.goodToKnow)}
            >
                Good to Know
            </span>
            <span
                className={styles.category}
                onClick={() => onCategoryClickHandler(destination.localCustoms)}
            >
                Local Customs
            </span>
            <span
                className={styles.category}
                onClick={() => onCategoryClickHandler(destination.proTips)}
            >
                Pro Tips
            </span>
            <Outlet context={tips}/>
        </section>
    );
};
