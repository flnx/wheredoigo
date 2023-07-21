import { useState } from 'react';

export const useEditFieldToggle = () => {
    const [isFieldToggled, setIsFieldToggled] = useState({});

    const toggleFieldHandler = (clickedId) => {
        setIsFieldToggled((prevState) => {
            // opens/closes the edit field
            const newState = {
                [clickedId]: !prevState[clickedId],
            };

            // closes all previously opened edit formfields (if any)
            Object.keys(prevState).forEach((fieldId) => {
                if (fieldId !== clickedId) {
                    newState[fieldId] = false;
                }
            });

            return newState;
        });
    };

    const closeEditableFieldHandler = () => {
        setIsFieldToggled({});
    };

    return [isFieldToggled, toggleFieldHandler, closeEditableFieldHandler];
};
