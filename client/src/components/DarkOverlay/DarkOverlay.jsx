import styles from './DarkOverlay.module.css';

export const DarkOverlay = ({ onClickHandler }) => {
    return (
        <div 
            className={styles.overlay} 
            onClick={onClickHandler} 
        />
    )
};