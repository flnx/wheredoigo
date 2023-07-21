import PropTypes from 'prop-types';
import { useForm } from './useForm';

// Components
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
import { DetailsFormFields } from './components/DetailsFormFields';
import { FormLoadingSkeleton } from '../../../../components/FormLoadingSkeleton/FormLoadingSkeleton';
import { Categories } from './components/Categories';

const propTypes = {
    categories: PropTypes.array.isRequired,
    allowedCategories: PropTypes.array.isRequired,
    destinationId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.array.isRequired,
};

const defaultProps = {
    details: [],
    categories: [],
    allowedCategories: [],
    description: '',
};

export const Form = ({
    description,
    details,
    destinationId,
    isLoading,
    categories,
    allowedCategories,
}) => {
    const {
        isEditable,
        isEditLoading,
        editError,
        onEditButtonClickHandler,
        sendEditedFieldClickHandler,
        submitDescriptionHandler
    } = useForm({ destinationId, allowedCategories });

    const descriptionID = 'Description';
    const categoriesID = 'Categories';

    return (
        <section>
            <form>
                {isLoading && <FormLoadingSkeleton />}
                {!isLoading && (
                    <>
                        <MemoizedFormFieldEditor
                            fieldId={descriptionID}
                            title={descriptionID}
                            desc={description}
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            isEditable={isEditable[descriptionID]}
                            submitHandler={submitDescriptionHandler}
                            isLoading={isEditLoading}
                            error={editError}
                        />

                        <Categories
                            categories={categories}
                            options={allowedCategories}
                            error={editError}
                            fieldId={categoriesID}
                            isEditable={isEditable[categoriesID]}
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                            isLoading={isEditLoading}
                        />

                        <DetailsFormFields
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            isEditable={isEditable}
                            sendEditedFieldClickHandler={sendEditedFieldClickHandler}
                            isLoading={isEditLoading}
                            error={editError}
                            details={details}
                        />
                    </>
                )}
            </form>
        </section>
    );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
