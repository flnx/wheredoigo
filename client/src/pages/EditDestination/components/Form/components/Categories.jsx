import { useState } from 'react';

// Components

import { FormCheckboxes } from '../../../../../components/FormCheckboxes/FormCheckboxes';
import { EditTextareaPairs } from '../../../../../components/Buttons/EditTextareaPairs/EditTextareaPairs';
import { CancelButton } from '../../../../../components/Buttons/Cancel-Button/CancelButton';
import { ButtonSky } from '../../../../../components/Buttons/Button-Sky/ButtonSky';

import styles from './Categories.module.css';

export const Categories = ({
    categories,
    options,
    error,
    isEditable,
    onEditButtonClickHandler,
    sendEditedFieldClickHandler,
    fieldId,
    isLoading,
}) => {
    const [selectedCategories, setSelectedCategories] = useState(categories);

    const onChangeHandler = (category) => {
        // Adds newly selected category
        if (!selectedCategories.includes(category)) {
            setSelectedCategories((prev) => [...prev, category]);
        } else {
            // Removes the selected category
            setSelectedCategories((prev) => prev.filter((c) => c !== category));
        }
    };

    const onCancelClickHandler = () => {
        // passes the fieldId in order to reset isEditable and hide the textarea/input
        onEditButtonClickHandler(fieldId);
        setSelectedCategories(categories);
    };

    const onSaveButtonClickHandler = (e) => {
        e.preventDefault();

        const editInfo = {
            description: 'categories',
            infoId: fieldId,
            categories: selectedCategories,
        };

        sendEditedFieldClickHandler(fieldId, editInfo);
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>Categories</span>
            {isEditable ? (
                <div className={styles.checkboxWrapper}>
                    <FormCheckboxes
                        categories={selectedCategories}
                        options={options}
                        onChangeHandler={onChangeHandler}
                        errors={[]}
                    />
                    {error && <span className="error-message">{error}</span>}
                    <div className={styles.buttons}>
                        <ButtonSky
                            onClickHandler={onSaveButtonClickHandler}
                            isLoading={isLoading}
                        >
                            Save
                        </ButtonSky>
                        <CancelButton
                            onClickHandler={onCancelClickHandler}
                            isLoading={isLoading}
                        >
                            Cancel
                        </CancelButton>
                    </div>
                </div>
            ) : (
                <EditTextareaPairs
                    selected={selectedCategories.join(', ')}
                    onClickHandler={() => onEditButtonClickHandler(fieldId)}
                />
            )}
        </div>
    );
};
