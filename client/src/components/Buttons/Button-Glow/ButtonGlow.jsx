import styles from './ButtonGlow.module.css';

export const ButtonGlow = ({ children, onClickHandler, isLoading }) => {
    return (
        <section className="mb-2">
            <button 
                className={styles.neonBtn} 
                onClick={onClickHandler} 
                disabled={isLoading}
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {children}
            </button>
        </section>
    );
};