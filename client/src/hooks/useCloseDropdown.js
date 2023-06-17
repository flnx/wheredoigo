import { useEffect } from 'react';

export const useCloseDropdown = ({
    isDropDownModal,
    modalRef,
    treeDotsRef,
    handleCloseDropdownModal,
}) => {
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
            document.removeEventListener(
                'mousedown',
                handleClickOutsideDropdownModal
            );
        };
    }, [isDropDownModal]);
};
