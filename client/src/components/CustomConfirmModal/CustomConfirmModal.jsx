import { DarkOverlay } from '../DarkOverlay/DarkOverlay';
import styles from './CustomConfirmModal.module.css';

export const CustomConfirmModal = ({ children, onCloseHandler }) => {
    return (
        <>
            <DarkOverlay onClickHandler={onCloseHandler} />
            <div className={styles.modalMain}>{children}</div>
        </>
    );
};
