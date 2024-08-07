import styles from './Dropdown.module.css';

export const Dropdown = ({ isOwner, onItemClick, dropdownRef }) => {
    const btnNames = []; // Maybe will implement "Report" functionality later

    isOwner && btnNames.push(...['Delete']); // Edit... ?

    const handleItemClick = (item) => {
        onItemClick(item);
    };

    return (
        <div className={styles.modal} ref={dropdownRef}>
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
