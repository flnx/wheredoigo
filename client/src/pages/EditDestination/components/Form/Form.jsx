import PropTypes from 'prop-types';
import { useForm } from './useForm';

// Components
import { MemoizedFormFieldEditor } from '../../../../components/FormFieldEditor/FormFieldEditor';
import { DetailsFormFields } from './components/DetailsFormFields';
import { TextWrap } from '../../../../components/TextWrap/TextWrap';
import { FormLoadingSkeleton } from '../../../../components/FormLoadingSkeleton/FormLoadingSkeleton';
import { Categories } from './components/Categories';

import styles from './Form.module.css';

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
        descriptionID,
        categoriesID,
    } = useForm({ destinationId, allowedCategories });

    return (
        <section>
            <h3>
                <TextWrap isLoading={isLoading} content={'Destination Info'} />
            </h3>
            <form className={styles.form}>
                {isLoading && <FormLoadingSkeleton />}
                {!isLoading && (
                    <>
                        <MemoizedFormFieldEditor
                            fieldId={descriptionID}
                            title={descriptionID}
                            desc={description}
                            onEditButtonClickHandler={onEditButtonClickHandler}
                            isEditable={isEditable[descriptionID]}
                            sendEditedFieldClickHandler={sendEditedFieldClickHandler}
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
