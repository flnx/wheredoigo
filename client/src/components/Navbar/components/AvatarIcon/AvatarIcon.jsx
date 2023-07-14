// Components
import { CaretDown } from '@phosphor-icons/react';
import { CaretUp } from '@phosphor-icons/react';

import styles from './AvatarIcon.module.css';

export const AvatarIcon = ({ onAvatarClickHandler, isNavToggled, avatarIconRef, auth }) => {
    return (
        <div className={styles.dropdown}>
            <div
                className={styles.avatarContainer}
                onClick={onAvatarClickHandler}
                ref={avatarIconRef}
            >
                <img src={auth.avatarUrl} alt={auth.username} className={styles.image} />
                {isNavToggled ? (
                    <CaretUp size={14} weight="bold" className={styles.caretDown} />
                ) : (
                    <CaretDown size={14} weight="bold" className={styles.caretDown} />
                )}
            </div>
        </div>
    );
};
