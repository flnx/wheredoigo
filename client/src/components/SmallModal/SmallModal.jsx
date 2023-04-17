import styles from './SmallModal.module.css';

export const SmallModal = ({ isOwner, onItemClick, modalRef }) => {
    const btnNames = ['Report'];

    isOwner && btnNames.push(...['Delete', 'Edit']);

    const handleItemClick = (item) => {
        onItemClick(item);
    };

    return (
        <div className={styles.modal} ref={modalRef}>
            <ul>
                {btnNames.map((item) => (
                    <li key={item} onClick={() => handleItemClick(item.toLowerCase())}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};
