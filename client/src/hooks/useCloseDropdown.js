import { useEffect } from 'react';

export const useCloseDropdown = ({
    isDropdownOpen,
    mainElementRef,
    dropdownRef,
    handleCloseDropdownModal,
}) => {
    useEffect(() => {
        const handleClickOutsideDropdownModal = (e) => {
            // * Check if the dropdown is open and the necessary elements exist

            // Check if the dropdown is open
            const isDropDownOpen = isDropdownOpen && dropdownRef?.current;

            // Check if the click target is not within the dropdown
            const isOutsideDropdown = !dropdownRef?.current?.contains(e.target);

            // Check if the click target is not within the main element
            const isOutsideMainElement = !mainElementRef?.current?.contains(e.target);

            // If all conditions are met, close the dropdown
            if (isDropDownOpen && isOutsideDropdown && isOutsideMainElement) {
                handleCloseDropdownModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutsideDropdownModal);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdownModal);
        };
    }, [isDropdownOpen, dropdownRef, mainElementRef, handleCloseDropdownModal]);
};
