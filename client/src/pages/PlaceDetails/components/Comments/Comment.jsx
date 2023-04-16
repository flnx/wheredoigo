import { useEffect, useRef, useState } from 'react';
import { DotsThree } from 'phosphor-react';
import { SmallModal } from '../../../../components/SmallModal/SmallModal';

import styles from './Comments.module.css';

export const Comment = ({ comment }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const handleThreeDotsDropdownClick = () => {
        setIsModalOpen((current) => !current);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleModalItemClick = (clickedDropdownItem) => {
        handleCloseModal();

        console.log(clickedDropdownItem);

        const operations = {
            delete: '',
            edit: '',
            report: '',
        };
    };

    useEffect(() => {
        const handleClickOutsideModal = (e) => {
            if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
                handleCloseModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutsideModal);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
        };
    }, [isModalOpen]);

    return (
        <section className={styles.comment}>
            <div className={styles.avatar}>
                <img src={comment.ownerId.avatarUrl} alt="img" />
                <span className={styles.username}>{comment.ownerId.username}</span>
            </div>

            <div className={styles.content}>
                <span className={styles.rating}>* * * * *</span>
                <h3 className={styles.commentTitle}>{comment.title}</h3>
                <p className={styles.commentContent}>{comment.content}</p>
            </div>

            <DotsThree
                size={32}
                className={styles.treeDotsDropdown}
                onClick={handleThreeDotsDropdownClick}
            />
            {isModalOpen && (
                <SmallModal
                    items={['Delete', 'Edit', 'Report']}
                    onItemClick={handleModalItemClick}
                    modalRef={modalRef}
                />
            )}
        </section>
    );
};
