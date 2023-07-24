import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

// Custom Hooks
import { useCloseDropdown } from 'src/hooks/useCloseDropdown';
import { useRemoveComment } from 'src/hooks/queries/useRemoveComment';

// Global Components
import { DotsThree } from '@phosphor-icons/react';
import { ConfirmModal } from 'src/components/ConfirmModal/ConfirmModal';
import { StarRating } from 'src/components/StarRating/StarRating';
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';

// Local Components
import { Dropdown } from './Dropdown/Dropdown';

import styles from './Comments.module.css';

export const Comment = ({ comment }) => {
    const { placeId } = useParams();
    const [removeComment, isRemoveLoading, removeError] = useRemoveComment(
        comment._id,
        placeId
    );
    const [isDropDownModalOpen, setIsDropdownModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const treeDotsRef = useRef(null);

    useCloseDropdown({
        isDropdownOpen: isDropDownModalOpen,
        mainElementRef: treeDotsRef,
        dropdownRef,
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

            {isDropDownModalOpen && (
                <Dropdown
                    onItemClick={handleDropdownModalItemClick}
                    dropdownRef={dropdownRef}
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
