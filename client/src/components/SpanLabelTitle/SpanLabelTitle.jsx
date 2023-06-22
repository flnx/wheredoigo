import styles from './SpanLabelTitle.module.css';

export const SpanLabelTitle = ({ title }) => {
    return <span className={styles.label}>{title}</span>;
};
