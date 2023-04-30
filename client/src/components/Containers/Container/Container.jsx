import styles from './Container.module.css';

export const Container = ({ children, mb }) => {
    const containerStyle = {
        marginBottom: mb ? `${mb}rem` : 0,
    };

    return (
        <div className={styles.container} style={containerStyle}>
            {children}
        </div>
    );
};
