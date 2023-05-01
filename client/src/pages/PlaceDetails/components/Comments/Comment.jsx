import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DotsThree } from '@phosphor-icons/react';
import { SmallModal } from '../../../../components/SmallModal/SmallModal';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';

import styles from './Comments.module.css';
import { useRemoveComment } from '../../../../hooks/queries/useRemoveComment';

export const Comment = ({ comment }) => {
    const { placeId } = useParams();
    const [removeComment, isRemoveLoading, removeError] = useRemoveComment(comment._id, placeId);
    const [isDropDownModal, setIsDropdownModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const modalRef = useRef(null);
    const treeDotsRef = useRef(null);

    const handleThreeDotsDropdownClick = () => {
        setIsDropdownModalOpen((current) => !current);
    };

    const handleCloseDropdownModal = () => {
        setIsDropdownModalOpen(false);
    };

    const handleDropdownModalItemClick = (clickedDropdownItem) => {
        handleCloseDropdownModal();

        switch (clickedDropdownItem) {
            case 'delete': {
                return handleOpenConfirmModalClick();
            }
            default:
                break;
        }
    };

    const handleOpenConfirmModalClick = () => {
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModalClick = () => {
        setIsConfirmModalOpen(false);
    };

    const handleDeleteComment = async () => {
        handleCloseConfirmModalClick();
        removeComment();
    };

    useEffect(() => {
        const handleClickOutsideDropdownModal = (e) => {
            if (
                isDropDownModal &&
                modalRef.current &&
                !modalRef.current.contains(e.target) &&
                !treeDotsRef.current?.contains(e.target)
            ) {
                handleCloseDropdownModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutsideDropdownModal);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdownModal);
        };
    }, [isDropDownModal]);

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
                ref={treeDotsRef}
            />

            {isDropDownModal && (
                <SmallModal
                    onItemClick={handleDropdownModalItemClick}
                    modalRef={modalRef}
                    isOwner={comment.isOwner}
                />
            )}

            {isConfirmModalOpen && (
                <ConfirmModal
                    onCloseHandler={handleCloseConfirmModalClick}
                    actionClickHandler={handleDeleteComment}
                >
                    Are you sure you wanna delete this comment?
                </ConfirmModal>
            )}
        </section>
    );
};
