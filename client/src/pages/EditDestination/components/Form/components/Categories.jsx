import { useState } from 'react';

// Components

import { FormCheckboxes } from '../../../../../components/FormCheckboxes/FormCheckboxes';
import { EditTextareaPairs } from '../../../../../components/Buttons/EditTextareaPairs/EditTextareaPairs';
import { CancelButton } from '../../../../../components/Buttons/Cancel-Button/CancelButton';
import { ButtonSky } from '../../../../../components/Buttons/Button-Sky/ButtonSky';
import {
    FormEditWrapper,
    WrapperWithWidth,
    EditButtonsWrapper,
} from '../../../../../components/Containers/FormEditWrapper/FormEditWrapper';
import { SpanLabelTitle } from '../../../../../components/SpanLabelTitle/SpanLabelTitle';

export const Categories = ({
    categories,
    options,
    error,
    isEditToggled,
    toggleEditHandler,
    submitCategories,
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
        // Closes the toggled categories
        toggleEditHandler(fieldId);
        // Sets the previously seleccted categories back
        setSelectedCategories(categories);
    };

    const onSaveButtonClickHandler = (e) => {
        e.preventDefault();

        submitCategories({
            categories: selectedCategories,
        });
    };

    return (
        <FormEditWrapper>
            <SpanLabelTitle title={fieldId} />
            {isEditToggled ? (
                <WrapperWithWidth>
                    <FormCheckboxes
                        categories={selectedCategories}
                        options={options}
                        onChangeHandler={onChangeHandler}
                        errors={[]}
                    />
                    <EditButtonsWrapper>
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
                    </EditButtonsWrapper>
                    {error && <span className="error-message">{error}</span>}
                </WrapperWithWidth>
            ) : (
                <EditTextareaPairs
                    content={selectedCategories.join(', ')}
                    onClickHandler={() => toggleEditHandler(fieldId)}
                />
            )}
        </FormEditWrapper>
    );
};
