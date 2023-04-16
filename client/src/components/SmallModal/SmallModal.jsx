import styles from './SmallModal.module.css';

export const SmallModal = ({ items, onItemClick, modalRef }) => {
    const handleItemClick = (item) => {
        onItemClick(item);
    };

    return (
        <div className={styles.modal} ref={modalRef}>
            <ul>
                {items.map((item) => (
                    <li key={item} onClick={() => handleItemClick(item.toLowerCase())}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};
