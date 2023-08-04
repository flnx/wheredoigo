import styles from './SpanLabelTitle.module.css';

export const SpanLabelTitle = ({ title, size }) => {
    const customStyle = {
        fontSize: size || '0.965rem',
    };

    return (
        <span style={customStyle} className={styles.label}>
            {title}
        </span>
    );
};
