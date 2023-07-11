import { useRef, useState } from 'react';
import { useRemoveComment } from '../../../../hooks/queries/useRemoveComment';
import { useParams } from 'react-router-dom';
import { useCloseDropdown } from '../../../../hooks/useCloseDropdown';

// Components
import { DotsThree } from '@phosphor-icons/react';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { StarRating } from '../../../../components/StarRating/StarRating';
import { Dropdown } from './Dropdown/Dropdown';
import { ServerErrorPopUp } from '../../../../components/ServerErrorPopUp/ServerErrorPopUp';

import styles from './Comments.module.css';

export const Comment = ({ comment }) => {
    const { placeId } = useParams();
    const [removeComment, isRemoveLoading, removeError] = useRemoveComment(
        comment._id,
        placeId
    );
    const [isDropDownModal, setIsDropdownModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const modalRef = useRef(null);
    const treeDotsRef = useRef(null);

    useCloseDropdown({
        isDropDownModal,
        modalRef,
        treeDotsRef,
        handleCloseDropdownModal,
    });

    function handleThreeDotsDropdownClick() {
        setIsDropdownModalOpen((current) => !current);
    }

    function handleCloseDropdownModal() {
        setIsDropdownModalOpen(false);
    }

    function handleDropdownModalItemClick(clickedDropdownItem) {
        handleCloseDropdownModal();

        if (clickedDropdownItem == 'delete') {
            handleOpenConfirmModalClick();
        }
    }

    function handleOpenConfirmModalClick() {
        setIsConfirmModalOpen(true);
    }

    function handleCloseConfirmModalClick() {
        if (isRemoveLoading) return;
        setIsConfirmModalOpen(false);
    }

    async function handleDeleteComment() {
        removeComment(null, {
            onSuccess: () => handleCloseConfirmModalClick(),
            onError: () => handleCloseConfirmModalClick(),
        });
    }

    return (
        <section className={styles.comment}>
            {removeError && <ServerErrorPopUp errorMessage={removeError} />}

            <div className={styles.avatar}>
                <img src={comment.ownerId.avatarUrl} alt="img" />
                <span className={styles.username}>{comment.ownerId.username}</span>
            </div>

            <div className={styles.content}>
                <StarRating averageRating={comment.rating} />
                <div className={styles.contentBody}>
                    <h3 className={styles.commentTitle}>{comment.title}</h3>
                    <p className={styles.commentContent}>{comment.content}</p>
                </div>
            </div>

            {comment.isOwner && (
                <DotsThree
                    size={32}
                    className={styles.treeDotsDropdown}
                    onClick={handleThreeDotsDropdownClick}
                    ref={treeDotsRef}
                />
            )}

            {isDropDownModal && (
                <Dropdown
                    onItemClick={handleDropdownModalItemClick}
                    modalRef={modalRef}
                    isOwner={comment.isOwner}
                />
            )}

            {isConfirmModalOpen && (
                <ConfirmModal
                    onCloseHandler={handleCloseConfirmModalClick}
                    actionClickHandler={handleDeleteComment}
                    isLoading={isRemoveLoading}
                >
                    Are you sure you wanna delete this comment?
                </ConfirmModal>
            )}
        </section>
    );
};
