// Components
import { CaretDown } from '@phosphor-icons/react';
import { CaretUp } from '@phosphor-icons/react';

import styles from './AvatarIcon.module.css';

export const AvatarIcon = ({ onAvatarClickHandler, isNavToggled, avatarIconRef }) => {
    return (
        <div className={styles.dropdown}>
            <div
                className={styles.avatarContainer}
                onClick={onAvatarClickHandler}
                ref={avatarIconRef}
            >
                <img
                    src="https://randomuser.me/api/portraits/men/47.jpg"
                    alt="username"
                    className={styles.image}
                />
                {isNavToggled ? (
                    <CaretUp size={14} weight="bold" className={styles.caretDown} />
                ) : (
                    <CaretDown size={14} weight="bold" className={styles.caretDown} />
                )}
            </div>
        </div>
    );
};
