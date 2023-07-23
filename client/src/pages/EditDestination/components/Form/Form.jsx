import PropTypes from 'prop-types';
import { useForm } from './useForm';

// Components
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
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
    const formProps = useForm({ destinationId, allowedCategories });
    const { isEditToggled, isEditLoading, editError, toggleEditHandler } = formProps;
    const { submitCategories, submitDescription, submitDetails } = formProps;

    const descriptionID = 'Description';
    const categoriesID = 'Categories';

    return (
        <section>
            <form>
                {isLoading && <FormLoadingSkeleton />}
                {!isLoading && (
                    <>
                        {/* Description */}
                        <MemoizedFormFieldEditor
                            submitHandler={submitDescription}
                            onEditButtonClickHandler={toggleEditHandler}
                            fieldId={descriptionID}
                            title={descriptionID}
                            desc={description}
                            error={editError}
                            isEditable={isEditToggled[descriptionID]}
                            isLoading={isEditLoading}
                        />
                        {/* Categories */}
                        <Categories
                            categories={categories}
                            options={allowedCategories}
                            fieldId={categoriesID}
                            isEditToggled={isEditToggled[categoriesID]}
                            error={editError}
                            toggleEditHandler={toggleEditHandler}
                            submitCategories={submitCategories}
                            isLoading={isEditLoading}
                        />
                        {/* Details */}
                        {details.map((detail) => (
                            <div key={detail._id}>
                                <MemoizedFormFieldEditor
                                    submitHandler={submitDetails}
                                    onEditButtonClickHandler={toggleEditHandler}
                                    fieldId={detail._id}
                                    title={detail.name}
                                    desc={detail.content}
                                    error={editError}
                                    isEditable={isEditToggled[detail._id]}
                                    isLoading={isEditLoading}
                                />
                            </div>
                        ))}
                    </>
                )}
            </form>
        </section>
    );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
